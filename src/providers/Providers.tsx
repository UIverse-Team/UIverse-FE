'use client'

import { ReactNode } from 'react'
import TanstackQueryClientProvider from '@/libs/tanstackQuery/QueryClientProvider'

export default function Providers({ children }: { children: ReactNode }) {
  return <TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>
}
