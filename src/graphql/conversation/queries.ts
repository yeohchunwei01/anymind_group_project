import { gql } from '@apollo/client'

export const GET_LATEST_MESSAGES = gql`
    query fetchLatestMessages(
        $channelId: String!
    ){
        fetchLatestMessages(channelId: $channelId){
            messageId,
            text,
            datetime,
            userId
        }
    }
`

export const GET_PREVIOUS_MESSAGES = gql`
    query fetchMoreMessages(
        $channelId: String!,
        $messageId: String!,
        $old: Boolean!
    ){
        fetchMoreMessages(
            channelId: $channelId,
            messageId: $messageId,
            old: $old
        ){
            messageId,
            text,
            datetime,
            userId
        }
    }
`
