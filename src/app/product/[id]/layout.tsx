import React from 'react'
export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 bg-gray-75 -z-10" />
      {children}
    </>
  )
}
