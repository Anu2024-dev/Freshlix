const isProduction = process.env.NODE_ENV === "production";
const isHttpsClient = process.env.CLIENT_URL?.startsWith("https://");
const useSecureCookies = isProduction || isHttpsClient;

export const authCookieOptions = {
  httpOnly: true,
  secure: useSecureCookies,
  sameSite: useSecureCookies ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const clearAuthCookieOptions = {
  httpOnly: true,
  secure: useSecureCookies,
  sameSite: useSecureCookies ? "none" : "lax",
};
