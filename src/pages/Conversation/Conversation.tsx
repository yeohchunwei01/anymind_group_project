import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import React, {
  useContext, useEffect, useLayoutEffect, useRef, useState,
} from 'react'
import { MdArrowUpward, MdSend } from 'react-icons/md'
import ReactLoading from 'react-loading'
import uuid from 'react-uuid'
import { useApolloClient } from '@apollo/client'
import { css } from '@emotion/css'
import Button from '@/components/Button'
import Box from '@/components/Box'
import Grid from '@/components/Grid'
import Textarea from '@/components/Textarea'
import { ChannelContext, DraftContext } from '@/contexts/ChannelContext'
import { UserContext } from '@/contexts/UserContext'
import { CREATE_MESSAGE_MUTATION } from '@/graphql/conversation/mutations'
import { GET_LATEST_MESSAGES, GET_PREVIOUS_MESSAGES } from '@/graphql/conversation/queries'
import MessageInformation from './components/MessageInformation'

interface Message {
  messageId: string;
  text: string;
  datetime: Date;
  userId: string;
}

function Conversation() {
  const [messages, setMessages] = useState<Array<Message>>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMore, setIsMore] = useState<boolean>(false)
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const [channel] = useContext(ChannelContext)
  const [draft, setDraft] = useContext(DraftContext)
  const [user] = useContext(UserContext)

  const client = useApolloClient()
  const container = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    // this layout effect is used for conversation scroll position
    container.current!.scrollTop = scrollPosition || container.current!.scrollHeight
  }, [messages])

  useEffect(() => {
    setScrollPosition(0)
    setIsLoading(true)
    client.query({
      query: GET_LATEST_MESSAGES,
      fetchPolicy: 'network-only',
      variables: { channelId: channel },
    }).then(({ data }) => {
      if (data && data.fetchLatestMessages) {
        const sort = data.fetchLatestMessages.slice()
          .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
        setMessages(sort)

        if (data.fetchLatestMessages.length >= 10) setIsMore(true)
        else setIsMore(false)
      }
    }).finally(() => setIsLoading(false))
  }, [channel, user])

  function readMore() {
    // the bottom/latest read more button is remove from the implementation
    // the show more message only available for old messages.
    // it is because the latest messages should always show in the conversation.

    setScrollPosition(container.current!.scrollHeight - scrollPosition)
    const items = cloneDeep(messages)
    const oldestMessage = items[0]

    setIsLoading(true)
    client.query({
      query: GET_PREVIOUS_MESSAGES,
      fetchPolicy: 'network-only',
      variables: {
        channelId: channel,
        messageId: oldestMessage.messageId,
        old: true,
      },
    }).then(({ data }) => {
      if (data && data.fetchMoreMessages) {
        if (!isEmpty(data.fetchMoreMessages)) {
          const sort = data.fetchMoreMessages.slice()
            .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
          const combine = sort.concat(items)
          setMessages(combine)
        }

        if (data.fetchMoreMessages.length >= 10) setIsMore(true)
        else setIsMore(false)
      }
    }).finally(() => setIsLoading(false))
  }

  function sendMessage({
    errorId, channelId, text, userId,
  }: {
    errorId?: string;
    channelId: string;
    text: string;
    userId: string;
  } = {
    channelId: channel,
    text: draft[user][channel],
    userId: user,
  }) {
    const items = cloneDeep(messages)
    client.mutate({
      mutation: CREATE_MESSAGE_MUTATION,
      variables: {
        channelId,
        text,
        userId,
      },
    }).then(({ data, errors }: any) => {
      if (errors) {
        items.push({
          errorId: uuid(),
          channelId,
          text,
          userId,
        })
        setMessages(items)
      } else if (data && !isEmpty(data.postMessage)) {
        if (errorId) {
          const index = items.findIndex((item) => item.errorId === errorId)
          if (index > -1) items.splice(index, 1)
        }
        items.push(data.postMessage)
        setMessages(items)
      }
    }).catch(() => {
      items.push({
        errorId: uuid(),
        channelId,
        text,
        userId,
      })
      setMessages(items)
    }).finally(() => {
      setDraft({ ...draft, [user]: { ...draft[user], [channel]: '' } })
    })
  }

  return (
    <Grid style={{ padding: 20 }}>
      <div className={classes.conversationContainer} ref={container}>
        <Box>
          {isLoading && (
          <Grid justifyContent="center">
            <ReactLoading color="#17a2b8" height={40} type="spin" width={40} />
          </Grid>
          )}
          {isMore && !isLoading && (
          <Box mb={30}>
            <Button
              endIcon={<MdArrowUpward size={20} />}
              onClick={readMore}
            >
              Read More
            </Button>
          </Box>
          )}
          <Grid>
            {messages.map((message, index) => (
              <>
                <Box my={10}>
                  <MessageInformation key={index} value={message} onResend={(value) => sendMessage(value)} />
                </Box>
              </>
            ))}
          </Grid>
        </Box>
      </div>
      <Grid>
        <Textarea
          placeholder="Type your message here..."
          rows={5}
          value={(draft[user] && draft[user][channel]) || ''}
          onChange={(e) => setDraft({ ...draft, [user]: { ...draft[user], [channel]: e.target.value } })}
        />
        <Box mb={5} />
        <Button
          endIcon={<MdSend size={20} />}
          onClick={() => (draft[user] && draft[user][channel].trim() ? sendMessage() : null)}
        >
          Send Message
        </Button>
      </Grid>
    </Grid>
  )
}

const classes = {
  conversationContainer: css`
    height: 60vh;
    overflow: scroll;
  `,
}

export default Conversation
