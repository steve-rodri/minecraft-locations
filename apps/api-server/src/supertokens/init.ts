import supertokens from "supertokens-node"
import Dashboard from "supertokens-node/recipe/dashboard"
import Session from "supertokens-node/recipe/session"
import EmailPassword from "supertokens-node/recipe/emailpassword"

import { BASE_URL, CLIENT_URL, SUPER_TOKENS_CONNECTION_URI } from "../env"
// import { EmailMagicLink, ThirdPartyEmailPassword } from "./recipes"

export const initSuperTokens = () => {
  supertokens.init({
    framework: "express",
    supertokens: {
      connectionURI: SUPER_TOKENS_CONNECTION_URI ?? "http://localhost:3567",
    },
    appInfo: {
      appName: "gateway-server",
      apiDomain: BASE_URL ?? "http://localhost:5500",
      websiteDomain: CLIENT_URL ?? "http://localhost:8081",
      apiBasePath: "/auth",
      websiteBasePath: "/auth",
    },
    recipeList: [
      EmailPassword.init(),
      Session.init(),
      Dashboard.init(), // enables dashboard at /auth/dashboard
    ],
  })
}
