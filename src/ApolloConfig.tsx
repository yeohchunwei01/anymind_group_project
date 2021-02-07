import React from 'react'
import {
  ApolloClient, ApolloProvider, InMemoryCache,
} from '@apollo/client'

interface ApolloConfigProps {
  children: React.ReactElement | Array<React.ReactElement>
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql',
})

function ApolloConfig({ children }: ApolloConfigProps) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default ApolloConfig
