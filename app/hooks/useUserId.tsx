import jwt from "jsonwebtoken";
import { useCookies } from "next-client-cookies";

export function useUserId() {
  const cookies = useCookies();
  const accessToken = cookies.get("access_token");
  const decoded = accessToken ? jwt.decode(accessToken) : null;
  return decoded?.sub;
}
