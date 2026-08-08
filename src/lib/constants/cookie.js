
export const COOKIE = {
  SESSION: {
    name: "session",
    secretKey: process.env.SESSION_SECRET,
    alg: "HS256",
    sevenDaysInMilliseconds: 7 * 24 * 60 * 60 * 1000,
    expTime: "7d",
  },

}