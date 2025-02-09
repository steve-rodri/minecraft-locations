import { PrismaClient } from "@prisma/client"
import Passwordless from "supertokens-node/recipe/thirdpartypasswordless"

import { apple, google } from "./providers"

const prisma = new PrismaClient()

export const EmailMagicLink = Passwordless.init({
  flowType: "MAGIC_LINK",
  contactMethod: "EMAIL",
  providers: [Passwordless.Google(google), Passwordless.Apple(apple)],
  override: {
    apis: (originalImplementation) => {
      return {
        ...originalImplementation,
        thirdPartySignInUpPOST: async (input) => {
          if (originalImplementation.thirdPartySignInUpPOST === undefined)
            throw Error("Should never come here")

          // First we call the original implementation
          const response =
            await originalImplementation.thirdPartySignInUpPOST(input)
          // If sign up was successful
          if (response.status === "OK") {
            const user = response.user
            if (!user.email) return response
            // Create the user in the gateway db
            await prisma.user.create({
              data: {
                id: user.id,
                email: user.email,
                createdAt: new Date(user.timeJoined),
              },
            })
          }
          return response
        },
      }
    },
  },
})
