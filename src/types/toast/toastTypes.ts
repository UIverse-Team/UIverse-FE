export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center'

export type ToastType = 'default' | 'error' | 'success' | 'info'

export interface CustomToastOptions {
  type?: ToastType
  content: string
  duration?: number
  position?: ToastPosition
}
