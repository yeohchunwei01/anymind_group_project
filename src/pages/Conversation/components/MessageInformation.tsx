import moment from 'moment'
import React, { useContext } from 'react'
import { MdCheckCircle, MdError } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { css, cx } from '@emotion/css'
import Avatar from '@/components/Avatar'
import Box from '@/components/Box'
import Grid from '@/components/Grid'
import Typography from '@/components/Typography'
import { UserContext } from '@/contexts/UserContext'

interface Message {
  datetime: Date;
  messageId: string;
  text: string,
  userId: string;
}

interface MessageInformationProps {
  value: Message;
  onResend?: (Message) => void
}

function MessageInformation({ value, onResend }: MessageInformationProps) {
  const [user] = useContext(UserContext)
  const isMobile = useMediaQuery({ query: '(max-width: 415px)' })

  return (
    <>
      {value.userId === user ? (
        <Grid alignItems="center" container style={{ float: 'right' }}>
          <Grid container>
            <Typography fontSize={13}>{moment(value.datetime).format('hh:mm A')}</Typography>
            {value.messageId ? (
              <>
                <MdCheckCircle color="#9ec94a" />
                <Typography color="#999999" fontSize={13}>Sent</Typography>
              </>
            ) : (
              <Grid container style={{ cursor: 'pointer' }} onClick={() => onResend!(value)}>
                <MdError color="#b71e3c" />
                <Typography color="#999999" fontSize={13}>Error</Typography>
              </Grid>
            )}
          </Grid>
          <Grid container>
            <Box className={cx(classes.messageContainer, classes.rightTriangle)} mr={20} style={isMobile ? { maxWidth: 230 } : {}}>
              {value.text}
            </Box>
            <Box>
              <Avatar name={value.userId} />
              <Typography color="#999999" fontSize={12} textAlign="center">{value.userId}</Typography>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid alignItems="center" container>
          <Box>
            <Avatar name={value.userId} />
            <Typography color="#999999" fontSize={12} textAlign="center">{value.userId}</Typography>
          </Box>
          <Box className={cx(classes.messageContainer, classes.leftTriagle)} ml={20} style={isMobile ? { maxWidth: 230 } : {}}>
            {value.text}
          </Box>
          <Box ml={10}>
            <Typography fontSize={13}>{moment(value.datetime).format('hh:mm A')}</Typography>
          </Box>
        </Grid>
      )}
    </>
  )
}

MessageInformation.defaultProps = {
  onResend: () => {},
}

const classes = {
  leftTriagle: css`
    &:after {
      border-bottom: 10px solid transparent;
      border-right: 10px solid #fff; 
      border-top: 10px solid transparent; 
      content: ""; 
      left: -10px;
      height: 0; 
      position: absolute;
      top: 10px; 
      width: 0; 
    }
  `,
  messageContainer: css`
    background-color: #fff;
    border-radius: 5px;
    font-weight: 300;
    height: fit-content;
    max-width: 350px;
    min-height: 50px;
    padding: 5px 16px !important;
    position: relative;
    white-space: pre-wrap;
  `,
  rightTriangle: css`
    &:after {
      border-bottom: 10px solid transparent;
      border-left: 10px solid #fff; 
      border-top: 10px solid transparent; 
      content: ""; 
      left: 100%;
      height: 0; 
      position: absolute;
      top: 10px; 
      width: 0; 
    }
  `,
}

export default MessageInformation
