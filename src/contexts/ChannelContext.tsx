import React, { createContext, useState } from 'react'
import { channels } from '@/common/const'

interface ChannelProviderProps {
  children: React.ReactElement | Array<React.ReactElement>
}

export const ChannelContext = createContext<any>(null)
export const DraftContext = createContext<any>(null)

function ChannelProvider({ children }: ChannelProviderProps) {
  const [channel, setChannel] = useState<string>(channels[0].value)
  const [draft, setDraft] = useState<object>({})

  return (
    <ChannelContext.Provider value={[channel, setChannel]}>
      <DraftContext.Provider value={[draft, setDraft]}>
        {children}
      </DraftContext.Provider>
    </ChannelContext.Provider>
  )
}

export default ChannelProvider
