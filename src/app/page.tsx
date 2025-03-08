import ColorPalette from '@/components/design-system/ColorPalette'
import TypoSystem from '@/components/design-system/TypoSystem'

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold mb-8">UIverse 디자인 시스템</h1>

      <ColorPalette />

      <TypoSystem />
    </main>
  )
}
