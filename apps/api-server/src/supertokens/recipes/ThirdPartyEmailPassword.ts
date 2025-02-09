import EmailPassword from "supertokens-node/recipe/thirdpartyemailpassword"

import { apple, google } from "./providers"

export const ThirdPartyEmailPassword = EmailPassword.init({
  providers: [EmailPassword.Google(google), EmailPassword.Apple(apple)],
  signUpFeature: {
    formFields: [
      {
        id: "name",
        optional: true,
      },
      {
        id: "dateOfBirth",
        optional: true,
      },
      {
        id: "phone",
        optional: true,
      },
    ],
  },
  override: {
    apis: (originalImplementation) => {
      return {
        ...originalImplementation,
        emailPasswordSignUpPOST: async (input) => {
          if (originalImplementation.emailPasswordSignUpPOST === undefined)
            throw Error("Should never come here")

          // First we call the original implementation
          const response =
            await originalImplementation.emailPasswordSignUpPOST(input)

          // If sign up was successful
          if (response.status === "OK") {
            const user = response.user
            // We can get the form fields from the input like this
            const formFields = input.formFields
            const nameField = formFields.find((field) => field.id === "name")
            const phoneField = formFields.find((field) => field.id === "phone")
            const dateOfBirthField = formFields.find(
              (field) => field.id === "dateOfBirth",
            )
            await prisma.user.upsert({
              where: {
                id: user.id,
              },
              create: {
                id: user.id,
                email: user.email,
                name: nameField?.value ?? null,
                phone: phoneField?.value ?? null,
                dateOfBirth: dateOfBirthField?.value
                  ? new Date(dateOfBirthField.value)
                  : null,
                createdAt: new Date(user.timeJoined),
              },
              update: {
                name: nameField?.value ?? null,
                phone: phoneField?.value ?? null,
                dateOfBirth: dateOfBirthField?.value
                  ? new Date(dateOfBirthField.value)
                  : null,
              },
            })
          }
          return response
        },
        emailPasswordSignInPOST: async (input) => {
          if (originalImplementation.emailPasswordSignInPOST === undefined) {
            throw Error("Should never come here")
          }
          const response =
            await originalImplementation.emailPasswordSignInPOST(input)
          if (response.status === "OK") {
            const user = response.user
            await prisma.user.upsert({
              where: {
                id: user.id,
              },
              create: {
                id: user.id,
                email: user.email,
              },
              update: {},
            })
          }
          return response
        },
      }
    },
  },
})
