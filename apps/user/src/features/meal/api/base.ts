import axios from "axios";

export const API = axios.create({
  baseURL: "https://open.neis.go.kr/hub",
  headers: {
    "Content-Type": "application/json",
  },
});
