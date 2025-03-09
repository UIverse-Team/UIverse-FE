import BreakpointTest from '@/components/design-system/BreakpointTest'
import ColorPalette from '@/components/design-system/ColorPalette'
import TypoSystem from '@/components/design-system/TypoSystem'

export default function Home() {
  return (
    <main className="space-y-8">
      <h1 className="text-title1 text-center">UIverse 디자인 시스템</h1>

      <BreakpointTest />

      <ColorPalette />

      <TypoSystem />
    </main>
  )
}
