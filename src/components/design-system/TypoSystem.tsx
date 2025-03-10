export default function TypoSystem() {
  return (
    <div className="space-y-8">
      {/* Titles */}
      <div className="space-y-4">
        <h1 className="text-title1">Title1 - 타이포그래피 시스템</h1>
        <h2 className="text-h1">H1 - 헤딩 텍스트</h2>
        <h3 className="text-h2">H2 - 헤딩 텍스트</h3>
        <h4 className="text-h3">H3 - 헤딩 텍스트</h4>
      </div>

      {/* Body Text */}
      <div className="space-y-4">
        <p className="text-body1">
          Body1 - 본문 텍스트입니다. 가장 큰 본문 텍스트로 중요한 내용을 표시할 때 사용합니다.
        </p>
        <p className="text-body2">
          Body2 - 본문 텍스트입니다. 일반적인 본문 내용을 표시할 때 사용하는 크기입니다.
        </p>
        <p className="text-body3">
          Body3 - 본문 텍스트입니다. 부가적인 설명이나 덜 중요한 내용을 표시할 때 사용합니다.
        </p>
      </div>

      {/* Buttons */}
      <div className="space-x-4">
        <button className="text-button1 bg-primary text-white px-4 py-2 rounded">
          Button1 텍스트
        </button>
        <button className="text-button2 bg-secondary text-white px-4 py-2 rounded">
          Button2 텍스트
        </button>
      </div>

      {/* Captions */}
      <div className="space-y-2">
        <p className="text-caption1 text-gray-600">Caption1 - 작은 설명 텍스트입니다.</p>
        <p className="text-caption2 text-gray-500">Caption2 - 가장 작은 설명 텍스트입니다.</p>
      </div>
    </div>
  )
}
