import React from 'react'

interface ContainerProps extends React.PropsWithChildren {
  type?: 'default' | 'login' | 'signup'
  isBg?: boolean
}

const Container = ({ isBg = true, type = 'default', children }: ContainerProps) => {
  let padding = 'py-8'

  if (type === 'signup') padding = 'py-29.5'
  else if (type === 'login') padding = 'py-10'

  return (
    <main className={`${isBg ? 'bg-neutral' : 'bg-white'}`}>
      <div className={`container flex-1 ${padding}`}>{children}</div>
    </main>
  )
}

export default Container
