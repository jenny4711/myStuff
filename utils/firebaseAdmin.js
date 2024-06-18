const admin = require('firebase-admin');
require('dotenv').config();

//아래 정보 찾는 방법
//1. firebase console 접속
//2. 프로젝트 선택
//3. 설정
//4. 서비스 계정
//5. 새 비공개 키 생성
//6. 생성된 json 파일을 프로젝트 루트에 저장
//7. json 파일의 정보를 아래와 같이 입력


admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email":process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url":process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url":process.env.FIREBASE_CLIENT_X509_CERT_URL,
  "universe_domain": "googleapis.com"
  }),
});

module.exports = admin;