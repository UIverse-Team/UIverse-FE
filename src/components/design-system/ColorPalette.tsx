export default function ColorPalette() {
  const bgGrayClasses: Record<number, string> = {
    50: 'bg-gray-50',
    100: 'bg-gray-100',
    200: 'bg-gray-200',
    300: 'bg-gray-300',
    400: 'bg-gray-400',
    500: 'bg-gray-500',
    600: 'bg-gray-600',
    700: 'bg-gray-700',
    800: 'bg-gray-800',
    900: 'bg-gray-900',
    950: 'bg-gray-950',
  }

  const bgOrangeClasses: Record<number, string> = {
    50: 'bg-orange-50',
    100: 'bg-orange-100',
    200: 'bg-orange-200',
    300: 'bg-orange-300',
    400: 'bg-orange-400',
    500: 'bg-orange-500',
    600: 'bg-orange-600',
    700: 'bg-orange-700',
    800: 'bg-orange-800',
    900: 'bg-orange-900',
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">색상 팔레트</h2>

      <div className="space-y-8">
        {/* Primitive Grayscale */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Grayscale (Primitive)</h3>
          <div className="grid grid-cols-11 gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => (
              <div key={weight} className="flex flex-col">
                <div
                  className={`h-16 rounded-md ${bgGrayClasses[weight]}`}
                  title={bgGrayClasses[weight]}
                ></div>
                <span className="text-xs mt-1 text-center">{weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Primitive Orangescale */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Orangescale (Primitive)</h3>
          <div className="grid grid-cols-11 gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => (
              <div key={weight} className="flex flex-col">
                <div
                  className={`h-16 rounded-md ${bgOrangeClasses[weight]}`}
                  title={bgOrangeClasses[weight]}
                ></div>
                <span className="text-xs mt-1 text-center">{weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Semantic Colors */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Semantic Colors</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-primary"></div>
              <span className="text-sm">primary</span>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-secondary"></div>
              <span className="text-sm">secondary</span>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-tertiary"></div>
              <span className="text-sm">tertiary</span>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-white"></div>
              <span className="text-sm">white</span>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-error"></div>
              <span className="text-sm">error</span>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-positive"></div>
              <span className="text-sm">positive</span>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-success"></div>
              <span className="text-sm">success</span>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-warning"></div>
              <span className="text-sm">warning</span>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-center">
            <div className="h-16 rounded-md bg-gradient"></div>
            <span className="text-sm">gradient</span>
          </div>
        </div>
      </div>
    </>
  )
}
