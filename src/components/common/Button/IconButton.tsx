import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

const IconButton = ({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : 'button'

  return <Comp type="button" data-slot="button" className={className} {...props} />
}

export default IconButton
