import React from 'react'
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom'
import ChannelProvider from '@/contexts/ChannelContext'
import UserProvider from '@/contexts/UserContext'
import AppLayout from '@/layouts/AppLayout'
import Conversation from '@/pages/Conversation/Conversation'
import ApolloProvider from './ApolloConfig'

function App() {
  return (
    <Router>
      <ApolloProvider>
        <UserProvider>
          <ChannelProvider>
            <AppLayout>
              <Switch>
                <Redirect exact from="/" to="/conversation" />
                <Route exact path="/conversation">
                  <Conversation />
                </Route>
                <Route path="*">
                  <Redirect to="/conversation" />
                </Route>
              </Switch>
            </AppLayout>
          </ChannelProvider>
        </UserProvider>
      </ApolloProvider>
    </Router>
  )
}

export default App
