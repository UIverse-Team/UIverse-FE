# 💫 [TEAM] UIverse / Fast Campus Devcamp Final Project

<br />

## 팀 소개

<img src = "https://github.com/user-attachments/assets/8f20ac7e-7b7c-4437-87aa-95bb6a9de21f" width = 80%>

안녕하세요 저희는 팀 `UIVerse`입니다.
`UIverse`란 **개발과 디자인이 조화로운 우주**라는 의미를 담고 있습니다.

`UIVerse`는 모든 사람들의 개인화된 쇼핑 경험을 만들어 나가기 위해 노력합니다.

<br />

## 팀원

<table>
  <tr>
    <th>Frontend</th>
    <th>Frontend</th>
    <th>Frontend</th>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/55516901?v=4" width="100"/></td>
    <td><img src="https://avatars.githubusercontent.com/u/50770004?v=4" width="100"/></td>
    <td><img src="https://avatars.githubusercontent.com/u/109134495?v=4" width="100"/></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/rondido">박진현</a></td>
    <td align="center"><a href="https://github.com/mgYang53">양명규</a></td>
    <td align="center"><a href="https://github.com/choiyoungae">최영애</a></td>
  </tr>
</table>

<table>
  <tr>
    <th>Backend</th>
    <th>Backend</th>
    <th>Backend</th>
    <th>Backend</th>
    <th>Backend</th>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/174756236?v=4" width="100"/></td>
    <td><img src="https://avatars.githubusercontent.com/u/104291422?v=4" width="100"/></td>
    <td><img src="https://avatars.githubusercontent.com/u/110446078?v=4" width="100"/></td>
    <td><img src="https://avatars.githubusercontent.com/u/61807816?v=4" width="100"/></td>
    <td><img src="https://avatars.githubusercontent.com/u/150502999?v=4" width="100"/></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/KWAK-JINHO">곽진호</a></td>
    <td align="center"><a href="https://github.com/jihaneol">지한얼</a></td>
    <td align="center"><a href="https://github.com/JangBJ">장병중</a></td>
    <td align="center"><a href="https://github.com/ehouse16">박소윤</a></td>
    <td align="center"><a href="https://github.com/kiteof-park">박의연</a></td>
  </tr>
</table>

<table>
  <tr>
    <th>UXUI</th>
    <th>UXUI</th>
  </tr>
  <tr>
    <td><img src="https://i.pinimg.com/736x/4b/74/01/4b7401e166d19975d18302042879e14e.jpg" width="100"/></td>
    <td><img src="https://i.pinimg.com/736x/4b/74/01/4b7401e166d19975d18302042879e14e.jpg" width="100"/></td> 
  </tr>
  <tr>
    <td align="center">나소나</td>
    <td align="center">한은서</td>
  </tr>
</table>

<br />

## 프로젝트 소개

<img src ="https://github.com/user-attachments/assets/6c5e73af-0824-498c-917f-0f311813ac66" width = 60%>

### Ora 오늘도, 내일도, 오라

`Ora`는 이탈리아어로 "지금"을 뜻합니다.

편리하고 빠르게 쇼핑하고자 하는 소비자들에게 `오라`는 언제나 열려있음을 의미합니다.

`오라`는 **고객 데이터 수집과 분석을 통해 사용자 맞춤형 쇼핑 경험을 제공하는 것을 목표로 하는 쇼핑 플랫폼**입니다.

<br />

## 역할 분담

#### 🧑‍💻박진현 [@rondido](https://github.com/rondido)

- PlayList, ConfirmModal 공통 컴포넌트 제작
- 카카오/구글 소셜로그인, 단계별 회원가입 구현
- 영상링크 기반 플레이리스트 생성페이지 UI, 이미지 업로드 기능구현
- 사용자의 플레이리스트 조회, 삭제, 공개여부 설정
- ErrorBoundary 에러 핸들링
- 로그인 , 회원가입 테스트

#### 🧑‍💻양명규 [@mgYang53](https://github.com/mgYang53)

- 디자인 시스템

  - Tailwindcss 공통 설정 (레이아웃, breakpoints, 유틸리티 클래스)
  - 타이포그래피 및 색상 시스템 설정
  - svgr 플러그인 설정 및 아이콘 컴포넌트 생성
  - 모바일 Viewport 비율 자동조절 기능 개발

- UI 컴포넌트 개발
  - Atom 단위 컴포넌트 개발 (Button, Radio, Checkbox, Tag 등)
  - Molecule 단위 컴포넌트 개발 (Tab, Snackbar 등)
  - Organism 단위 컴포넌트 개발 (Header, Footer 등)
  - Storybook에 컴포넌트 스토리 추가
- 기능 개발
  - 공통 기능
    - Data Fetching 전략 제안
      - Tanstack Query 설정
      - 쿼리키 관리하는 상수 객체 설정
      - 서버 컴포넌트에서의 데이터 Prefetching 공통 컴포넌트 개발(PrefetchedQueryHydrationBoundary)
      - 클라이언트 컴포넌트에서의 데이터 처리 커스텀 훅 개발(useFetchData & useDataMutation)
      - 서버/클라이언트 컴포넌트에서의 효율적인 데이터 페칭 전략 제시
    - 비동기 처리 공통 설정
      - 서버/클라이언트 사용 구분에 따른 Axios 인스턴스 및 인터셉터 설정
      - Next.js API Route에 catch-all 동적 세그먼트 설정하여 기본 API 요청 로직 최소화
  - 도메인별 기능
    - 상품 검색 결과 구현
    - 상품 찜하기 기능 구현
    - 이메일/휴대폰 인증 기능 구현
    - 아이디/비밀번호 찾기 기능 구현

#### 🧑‍💻최영애 [@choiyoungae](https://github.com/choiyoungae)

- UI 컴포넌트 개발
  - Atom 단위 컴포넌트 개발 (Input, Label, HelperLabel)
  - Molecules 단위 컴포넌트 개발 (Modal, Select)
- 인증인가

  - 회원가입, 로컬/소셜 로그인, 로그아웃 화면 마크업 및 기능 구현
  - zustand persist, cookie를 활용한 상태 관리 및 미들웨어 설정

- 마이페이지

  - 홈 및 레이아웃 구성

- 주문
  - 주문 목록/상세 페이지 마크업 및 기능 구현
  - 비회원 주문조회 마크업 및 기능 구현

<br />

## Demo

프로젝트 도메인 첨부

<br />

## 프로젝트 실행

브라우저에서 `http://localhost:3000`에 접속 혹은
`https://uiverse.shop/`에서서 확인할 수 있습니다.

Yarn Version
1.22.22

Yarn 명령어

```bash
yarn run dev
```

<br />

## Environment Variables

이 프로젝트를 실행하려면, environment variables가 있는 .env 파일이 필요합니다.

페이지 하단 팀원 연락처로 연락바랍니다.

<br />

## 프로젝트 구조

```text
├── 📂 public/                      # 정적 파일 (이미지, 폰트 등)
│   ├── 📂 icons/                   # 프로젝트에서 사용하는 아이콘 이미지
├── 📂 src/                         # 소스 코드
│   ├── 📂 app/                     # Next.js App Router (페이지 및 API 라우트)
│   │   ├── 📂 (auth)/              # 인증 관련 그룹 라우트 (예: 로그인, 회원가입 등)
│   │   │   └── 📂 login/           # 로그인 페이지
│   │   ├── 📂 guest/               # 비회원 주문조회 페이지
│   │   │   └── 📂 [orderNumber]/     # 주문번호를 URL 파라미터로 받는 동적 페이지
│   │   ├── 📂 api/                 # API Route (서버사이드 API 핸들링)
│   │   │   └── 📂 [...path]/       # 동적 경로 API (catch-all 라우트)
│   ├── 📂 components/              # 재사용 가능한 UI 컴포넌트
│   │   ├── 📂 common/              # 프로젝트 단위 공통 컴포넌트
│   │   │   ├── 📂 Button/          # 버튼 컴포넌트
│   │   │   └── 📂 Label/           # 라벨 컴포넌트
│   │   ├── 📂 layout/              # 레이아웃 관련 컴포넌트
│   │   │   ├── 📂 Header/          # 헤더 컴포넌트
│   │   │   ├── 📂 Main/            # 메인 콘텐츠 영역 컴포넌트
│   │   │   └── 📂 Container/       # 페이지 컨테이너 컴포넌트
│   │   ├── 📂 order/               # 주문 관련 UI 컴포넌트
│   ├── 📂 constants/               # 프로젝트에서 사용하는 상수 모음
│   ├── 📂 hooks/                   # 커스텀 훅 (예: 데이터 페칭, 상태 관리 등)
│   ├── 📂 lib/                     # 외부 유틸리티 및 라이브러리 설정
│   │   ├── 📂 axios/               # Axios 설정 및 인스턴스 관리
│   │   └── 📂 tanstackQuery/       # TanStack Query 설정 및 API 관련 유틸리티
│   ├── 📂 utils/                   # 유틸리티 함수 (예: 날짜 포맷 변환, 데이터 처리 등)
│   ├── 📂 stores/                  # Zustand 상태 관리 스토어
│   ├── 📂 stories/                 # 스토리북 (UI 컴포넌트 테스트 및 문서화)
│   ├── 📂 services/                # 서비스 함수 (비즈니스 로직 처리)
│   ├── 📂 serverActions/           # 서버 액션 함수 (Next.js 서버 액션 API)
│   ├── 📂 providers/               # 프로바이더
│   ├── 📂 styles/                  # 글로벌 및 컴포넌트 스타일 파일
│   └── 📂 types/                   # TypeScript 타입 정의
│       ├── 📂 login/               # 로그인 관련 타입 정의
│       └── 📂 category/            # 카테고리 관련 타입 정의
├── 📄 .gitignore                   # Git 무시 파일 목록
├── 📄 README.md                    # 프로젝트 개요 및 가이드 문서
├── 📄 package.json                 # 프로젝트 종속성 및 스크립트
├── 📄 tsconfig.json                # TypeScript 설정 파일
├── 📄 next.config.js               # Next.js 설정 파일
└── 📄 yarn.lock                    # 종속성 버전 관리 파일

```

<br/>

## 기술스택

<img src="https://img.shields.io/badge/Next-212121?style=for-the-badge&logo=Next&logoColor=black">   
 <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
 <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">                              
 <img src="https://img.shields.io/badge/Tanstackquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">                             
 <img src="https://img.shields.io/badge/Zustand-82612C?style=for-the-badge&logo=Zustandlogo&Color=white">
 <img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">                  
 <img src="https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white">
 <img src="https://img.shields.io/badge/Tailwindcss-5f85ff?style=for-the-badge&logo=tailwindcss&logoColor=white">
 <img src="https://img.shields.io/badge/shadcn-3FCF8E?style=for-the-badge&logo=shadcn&logoColor=white">
 <img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white">
 <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
 <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black">

<br />

## 회고 및 앞으로의 계획

#### 🧑‍💻박진현 [@rondido](https://github.com/rondido)

- **배운 점**
  - 예) OAuth 기반 소셜 로그인 플로우를 직접 구현하면서 인증 플로우 전반에 대한 이해도가 높아졌습니다.
- **어려웠던 점**
  - 예) 이미지 업로드 및 미리보기 구현 시 브라우저 동작 방식에 대한 이해가 부족했던 점이 아쉬웠습니다.
- **개선하고 싶은 점**
  - 예) 에러 핸들링 처리 로직을 좀 더 범용적으로 추상화하지 못한 것이 아쉽습니다.
- **앞으로의 계획**
  - 예) 사용자 경험 개선을 위해 애니메이션 라이브러리 도입과 테스트 자동화 도구 학습을 계획하고 있습니다.

---

#### 🧑‍💻양명규 [@mgYang53](https://github.com/mgYang53)

- **배운 점**
  - Tailwind CSS를 활용한 디자인 시스템 구축 과정에서 재사용 가능한 유틸리티 클래스의 효율성과 확장성을 경험했습니다.
  - Atomic Design 방법론을 적용해 컴포넌트를 체계적으로 설계하는 방법을 습득했습니다.
  - Next.js의 서버/클라이언트 컴포넌트를 효과적으로 구분하여 데이터 페칭 전략을 최적화하는 방법을 익혔습니다.
  - Tanstack Query를 활용한 상태 관리와 서버 상태 동기화의 효율적인 패턴을 학습했습니다.
- **어려웠던 점**
  - 서버 컴포넌트와 클라이언트 컴포넌트 간의 데이터 전달 및 hydration 과정에서 예상치 못한 문제들이 발생했습니다.
  - Prefetching 전략을 구현하면서 SSR과 CSR의 경계에서 발생하는 성능 이슈를 해결하는 데 어려움이 있었습니다.
  - 여러 도메인별 기능 개발 시 일관된 에러 처리 방식을 정립하는 데 시간이 많이 소요되었습니다.
  - 디자인 시스템의 일관성을 유지하면서도 각 페이지별 특성을 반영하는 유연한 컴포넌트 설계에 어려움이 있었습니다.
- **개선하고 싶은 점**
  - 컴포넌트별 테스트 코드 작성이 부족했던 점을 개선하여 안정적인 UI를 구축하고 싶습니다.
  - 디자인 토큰 관리 체계를 더 세분화하여 테마 변경이나 스타일 수정 시 유지보수 효율을 높이고 싶습니다.
  - Storybook 문서화가 컴포넌트 개발 속도에 비해 뒤처진 부분을 개선하여 팀 내 컴포넌트 활용도를 높이고 싶습니다.
  - API 요청 로직과 에러 핸들링 패턴을 더 체계적으로 정립하여 코드 중복을 줄이고 싶습니다.
  - 성능 모니터링 및 최적화 전략이 부족했던 점을 보완하여 사용자 경험을 향상시키고 싶습니다.
- **앞으로의 계획**
  - 컴포넌트 단위 테스트와 E2E 테스트를 도입하여 UI 품질을 보장하는 시스템을 구축할 예정입니다.
  - 성능 측정 메트릭을 정의하고 지속적인 모니터링 체계를 구축하여 웹 성능을 최적화할 예정입니다.
  - Tanstack Query의 고급 기능(Invalidation, Optimistic Updates)을 활용한 사용자 경험 향상 전략을 적용할 계획입니다.
  - 컴포넌트 번들 사이즈 분석 및 최적화를 통해 초기 로딩 속도를 개선할 계획입니다.

---

#### 🧑‍💻최영애 [@choiyoungae](https://github.com/choiyoungae)

- **배운 점**
  - Nextjs를 경험해볼 수 있었고 zustand persist 기능과 미들웨어 설정을 활용한 인증 흐름을 작업하면서 많이 배웠습니다.
- **어려웠던 점**
  - 인증 관련 로직 처리에 정말 품을 많이 들였습니다. 그래도 그만큼 배운 점이 많았던 것 같습니다.
- **개선하고 싶은 점**
  - 회원가입에서 useState를 너무 많이 쓴 것 같아 react-hook-form을 활용해보고 싶습니다.
- **앞으로의 계획**
  - 코드 리팩토링과 회원 정보 수정 등 추가 기능을 구현할 예정입니다.

<br />

## Roadmap

- [상품] 검색 필터 기능 추가
- [상품] 카테고리별 상품 페이지
- [결제] 상품 결제 및 결제 완료 페이지
- [쇼핑몰] 상세 페이지 구현
- [로그] 페이지 방문, 상품 클릭, 리뷰 조회 로그 수집
- [마이페이지] 회원정보수정, 맞춤정보설정, 내 소비 리포트
- [마이페이지] 결제 취소 상세 페이지
- [마이페이지] 최근 본 상품, 찜한 상품/스토어, 나의 리뷰, 재입고알림
- [마이페이지] 공지사항, 문의사항, FAQ
- [컴포넌트 관리 및 테스트] Storybook 보완 및 단위/E2E 테스트 도입
- [최적화] 성능 측정 및 최적화

<br />

## 팀원 연락처

박진현: rppr01@naver.com  
양명규: mg960503@gmail.com  
최영애: choiaeyoung@gmail.com

<br />

## 연관 프로젝트

[UIverse-BE](https://github.com/UIverse-Team/UIverse-BE)
