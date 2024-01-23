import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

const whiteList = {
  student: {
    pages: {
      classes: true,
      calendar: true,
    },
    api: {
      get: true,
      enrollments: {
        post: true,
        delete: true,
      },
    },
  },
};
const flatWhiteList = flattenObject(whiteList);

function flattenObject(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}

function getReqParams(
  paramsString: string,
  requestMethod: string,
  userRole: string
): [string[], string] {
  const paramsList = paramsString.split("/");

  if (paramsList[1] === "api")
    return [
      paramsList.slice(2),
      userRole + paramsList.join(".") + "." + requestMethod,
    ];

  return [paramsList.slice(1), userRole + "." + "pages" + paramsList.join(".")];
}

function recursiveWhiteListCheck(
  key: string,
  requestMethod: string,
  flatObject: object
) {
  const splittedKey = key.split(".");
  if (flatObject[key]) return true;
  else if (splittedKey.length > 1 && splittedKey[0] !== "") {
    const newKey = key.split(".").slice(0, -2).join(".") + "." + requestMethod;
    return recursiveWhiteListCheck(newKey, requestMethod, flatObject);
  } else return false;
}

function replaceUuids(paramsString: string) {
  const uuidRegex = /[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/g;
  return paramsString.replace(uuidRegex, "[id]");
}

export async function middleware(req: any) {
  const res = NextResponse.next();
  const reqUrl = new URL(req.url);
  const reqGenericPath = replaceUuids(reqUrl.pathname);
  const reqMethod = req.method.toLowerCase();

  const supabase = createMiddlewareClient({ req, res });

  const { data, error } = await supabase.auth.getSession();
  if (!data.session) return NextResponse.redirect(`${reqUrl.origin}`);

  const userRoleData = await supabase
    .from("user")
    .select()
    .eq("id", data.session?.user.id);

  const userRole = userRoleData.data && userRoleData.data[0]?.role;

  if (userRole === "admin") return res;

  const [paramsList, paramsStr] = getReqParams(
    reqGenericPath,
    reqMethod,
    userRole
  );

  if (!recursiveWhiteListCheck(paramsStr, reqMethod, flatWhiteList)) {
    return NextResponse.redirect(`${reqUrl.origin}/classes`);
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|login|api/auth/sign-in-google|api/auth|$).*)",
  ],
};
