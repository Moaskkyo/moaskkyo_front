import axios from "axios";

export const neisApi = axios.create({
  baseURL: "https://open.neis.go.kr/hub",
});
