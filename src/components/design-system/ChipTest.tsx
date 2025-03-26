'use client'

import Chip from '@/components/common/Chip/Chip'

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Chip 컴포넌트 데모</h1>

      <div className="space-y-8">
        {/* Disclosure: False */}
        <div>
          <h2 className="text-xl font-semibold text-purple-500 mb-4">Disclosure: False</h2>
          <div className="grid grid-cols-3 gap-8">
            {/* Primary */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-purple-500">Primary</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-purple-500 mb-2">Default</h4>
                  <div className="flex flex-wrap gap-2 items-start">
                    <Chip variant="primary" size="lg" selected={false}>
                      Chip
                    </Chip>
                    <Chip variant="primary" size="md" selected={false}>
                      Chip
                    </Chip>
                    <Chip variant="primary" size="sm" selected={false}>
                      Chip
                    </Chip>
                  </div>
                </div>

                <div>
                  <h4 className="text-purple-500 mb-2">Selected</h4>
                  <div className="flex flex-wrap gap-2 items-start">
                    <Chip variant="primary" size="lg" selected={true}>
                      Chip
                    </Chip>
                    <Chip variant="primary" size="md" selected={true}>
                      Chip
                    </Chip>
                    <Chip variant="primary" size="sm" selected={true}>
                      Chip
                    </Chip>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-purple-500">Secondary</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-purple-500 mb-2">Default</h4>
                  <div className="flex flex-wrap gap-2 items-start">
                    <Chip variant="secondary" size="lg" selected={false}>
                      Chip
                    </Chip>
                    <Chip variant="secondary" size="md" selected={false}>
                      Chip
                    </Chip>
                    <Chip variant="secondary" size="sm" selected={false}>
                      Chip
                    </Chip>
                  </div>
                </div>

                <div>
                  <h4 className="text-purple-500 mb-2">Selected</h4>
                  <div className="flex flex-wrap gap-2 items-start">
                    <Chip variant="secondary" size="lg" selected={true}>
                      Chip
                    </Chip>
                    <Chip variant="secondary" size="md" selected={true}>
                      Chip
                    </Chip>
                    <Chip variant="secondary" size="sm" selected={true}>
                      Chip
                    </Chip>
                  </div>
                </div>
              </div>
            </div>

            {/* Tertiary */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-purple-500">Tertiary</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-purple-500 mb-2">Default</h4>
                  <div className="flex flex-wrap gap-2 items-start">
                    <Chip variant="tertiary" size="lg" selected={false}>
                      Chip
                    </Chip>
                    <Chip variant="tertiary" size="md" selected={false}>
                      Chip
                    </Chip>
                    <Chip variant="tertiary" size="sm" selected={false}>
                      Chip
                    </Chip>
                  </div>
                </div>

                <div>
                  <h4 className="text-purple-500 mb-2">Selected</h4>
                  <div className="flex flex-wrap gap-2 items-start">
                    <Chip variant="tertiary" size="lg" selected={true}>
                      Chip
                    </Chip>
                    <Chip variant="tertiary" size="md" selected={true}>
                      Chip
                    </Chip>
                    <Chip variant="tertiary" size="sm" selected={true}>
                      Chip
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclosure: True */}
        <div>
          <h2 className="text-xl font-semibold text-purple-500 mb-4">Disclosure: True</h2>
          <div className="grid grid-cols-3 gap-8">
            {/* Primary */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-purple-500">Primary</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-purple-500 mb-2">Default</h4>
                  <div className="flex flex-wrap gap-2 items-start">
                    <Chip
                      variant="primary"
                      size="lg"
                      selected={false}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                    <Chip
                      variant="primary"
                      size="md"
                      selected={false}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                    <Chip
                      variant="primary"
                      size="sm"
                      selected={false}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                  </div>
                </div>

                <div>
                  <h4 className="text-purple-500 mb-2">Selected</h4>
                  <div className="flex flex-wrap gap-2 items-start">
                    <Chip
                      variant="primary"
                      size="lg"
                      selected={true}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                    <Chip
                      variant="primary"
                      size="md"
                      selected={true}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                    <Chip
                      variant="primary"
                      size="sm"
                      selected={true}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-purple-500">Secondary</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-purple-500 mb-2">Default</h4>
                  <div className="flex flex-wrap gap-2 items-start">
                    <Chip
                      variant="secondary"
                      size="lg"
                      selected={false}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                    <Chip
                      variant="secondary"
                      size="md"
                      selected={false}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                    <Chip
                      variant="secondary"
                      size="sm"
                      selected={false}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                  </div>
                </div>

                <div>
                  <h4 className="text-purple-500 mb-2">Selected</h4>
                  <div className="flex flex-wrap gap-2 items-start">
                    <Chip
                      variant="secondary"
                      size="lg"
                      selected={true}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                    <Chip
                      variant="secondary"
                      size="md"
                      selected={true}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                    <Chip
                      variant="secondary"
                      size="sm"
                      selected={true}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                  </div>
                </div>
              </div>
            </div>

            {/* Tertiary */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-purple-500">Tertiary</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-purple-500 mb-2">Default</h4>
                  <div className="flex flex-wrap gap-2 items-start">
                    <Chip
                      variant="tertiary"
                      size="lg"
                      selected={false}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                    <Chip
                      variant="tertiary"
                      size="md"
                      selected={false}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                    <Chip
                      variant="tertiary"
                      size="sm"
                      selected={false}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                  </div>
                </div>

                <div>
                  <h4 className="text-purple-500 mb-2">Selected</h4>
                  <div className="flex flex-wrap gap-2 items-start">
                    <Chip
                      variant="tertiary"
                      size="lg"
                      selected={true}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                    <Chip
                      variant="tertiary"
                      size="md"
                      selected={true}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                    <Chip
                      variant="tertiary"
                      size="sm"
                      selected={true}
                      disclosure={true}
                      onClose={() => console.log('close')}
                    >
                      Chip
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
