'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

const Provider = ({ children }: { children: ReactNode[] | ReactNode}) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default Provider
