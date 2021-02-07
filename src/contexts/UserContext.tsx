import React, { createContext, useState } from 'react'
import { users } from '@/common/const'

interface UserProviderProps {
  children: React.ReactElement | Array<React.ReactElement>;
}

export const UserContext = createContext<any>(null)

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<string>(users[0].value)

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
