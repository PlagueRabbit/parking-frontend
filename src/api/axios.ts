// src/api/axios.ts
import axios from "axios";

// ngrok로 연결된 백엔드 주소로 설정
const baseURL = "https://privately-firm-cat.ngrok-free.app";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    // 브라우저에서 기본적으로 막히는 헤더는 제거
    // 'User-Agent': 'custom', ← 이런 건 넣지 마세요
  },
});

export default axiosInstance;
