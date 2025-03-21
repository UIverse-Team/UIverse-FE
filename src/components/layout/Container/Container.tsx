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
    <div className={`container flex-1 ${padding} ${isBg ? 'bg-neutral' : 'bg-white'}`}>
      {children}
    </div>
  )
}

export default Container
