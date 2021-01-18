# Introduction
- https://mini-link.site/
- 소셜 프로필에 연결할 수 있는 멀티링크 서비스

# Feature
- 계정별 멀티링크를 담은 미니홈 생성
- 서버사이드렌더링으로 미니홈에 SEO 적용
- 미니홈 커버이미지, 소개글, 웹사이트, 인스타그램, 유투브 링크 관리
- 링크별 썸네일이미지, 링크이름, URL, 공개여부 관리
- 어드민에서 링크별 클릭 수, 미니홈 방문자 수(총 방문자, 오늘 방문자) 데이터 확인
- Web Share API 사용한 네이티브 공유 기능 (폴백적용)
- NAVER Cloud GeoLocation API를 통해 ip로 접속한 방문자의 대략적인 위도, 경도, 주소 정보를 수집

# Skills

## (1) Frontend
- Next.js
- React Hook
- Redux Toolkit
- redux-saga
- styled-component
- react-hook-form
- axios

## (2) Backend
- Express
- MySQL
- Sequelize
- Passport

## Deployment
- AWS EC2를 이용한 Frontend, Backend 서버를 각각 배포
- Nginx를 이용한 리버스프록시 설정 및 HTTPS/SSL 적용
- pm2를 이용한 Node.js 프로세스 관리
- 이미지 스토리지로 AWS S3 사용

# Installation
## (1) Frontend
```sh
git clone https://github.com/dwook/mini-link.git
cd front
npm install
npm run build
npx pm2 start npm -- start
```
## (2) Backend
```sh
git clone https://github.com/dwook/mini-link.git
cd back
npm install
npx sequelize db:create
npm run start
```
- Backend 환경변수 설정
  - AWS S3 리소스에 접근가능한 ACCESS_KEY_ID, SECRET_ACCESS_KEY를 발급 후 작성
  - [NAVER Cloud GeoLocation](https://docs.ncloud.com/ko/api/api-2-1.html) 이용신청 후 ACCESS_KEY, SECRET_KEY 작성

```
COOKIE_SECRET=
DB_PASSWORD=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
NAVER_GEO_ACCESS_KEY=
NAVER_GEO_SECRET_KEY=
```

# Things to do
[] 프론트엔드 테스트 코드 작성
[] 백엔드 테스트 코드 작성
[] 접속 로그를 활용한 데이터 시각화
