'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@/libs/tailwindcss/utils'
import ChevronDownIcon from 'public/icons/chevron-down.svg?svgr'

type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'md' | 'lg'
  variant?: 'default' | 'focused' | 'focusout'
}

function SelectTrigger({ className, children, size = 'md', ...props }: SelectTriggerProps) {
  const sizeStyles = {
    md: 'py-2.5 px-4 text-caption1',
    lg: 'p-4 text-body3',
  }

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        'flex w-full items-center justify-between rounded-sm border border-assist-line data-[placeholder]:text-assistive appearance-none',
        'disabled:cursor-not-allowed]',
        sizeStyles[size],
        'focus-visible:outline-none',
        '*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        'data-[state=open]:[&_svg]:rotate-180', // Sharp rotation without transition
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className={size === 'md' ? 'size-[18px]' : 'size-3'} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

// Keep other components from the original file
function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'bg-white text-normal relative z-50 overflow-hidden rounded-b-sm border border-assist-line flex flex-col gap-2 py-2 mt-2 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08),_0px_16px_30px_4px_rgba(0,0,0,0.10)]',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            position === 'popper' &&
              'w-full p-2 min-w-[var(--radix-select-trigger-width)] scroll-my-1',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        " cursor-pointer rounded-sm hover:bg-neutral relative flex w-full items-center gap-2 p-2 outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          {/* <CheckIcon className="size-4" /> */}
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      {/* <ChevronUpIcon className="size-4" /> */}
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      {/* <ChevronDownIcon className="size-4" /> */}
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
