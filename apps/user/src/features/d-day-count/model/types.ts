export interface Countdown {
  type: "HOME";
  title: string;
  targetAt: string;
}

export interface CountdownsResponse {
  serverNow: string;
  countdowns: Countdown[];
}
