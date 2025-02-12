import { z } from "zod"

// Base Schemas
const baseResponseSchema = z.object({})

// User Schema
export const stUserSchema = z.object({
  id: z.string(),
  timeJoined: z.number(),
  isPrimaryUser: z.boolean(),
  tenantIds: z.array(z.string()),
  emails: z.array(z.string().email()),
  phoneNumbers: z.array(z.string()),
  thirdParty: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
    }),
  ),
  loginMethods: z.array(
    z.object({
      tenantIds: z.array(z.string()),
      timeJoined: z.number(),
      recipeId: z.enum(["emailpassword", "thirdparty", "passwordless"]),
      recipeUserId: z.string(),
      verified: z.boolean().optional(),
      email: z.string().email().optional(),
      phoneNumber: z.string().optional(),
      thirdParty: z
        .object({
          id: z.string(),
          userId: z.string(),
        })
        .optional(),
    }),
  ),
})

// Shared Schemas
const fieldErrorSchema = z.object({
  id: z.string(),
  error: z.string(),
})

const fieldErrorResponseSchema = baseResponseSchema.extend({
  status: z.literal("FIELD_ERROR"),
  formFields: z.array(fieldErrorSchema),
})

const successResponseSchema = baseResponseSchema.extend({
  status: z.literal("OK"),
  user: stUserSchema,
})

// Sign-In & Sign-Up Error Schemas
const signInErrorsSchema = z.union([
  z
    .object({ status: z.literal("WRONG_CREDENTIALS_ERROR") })
    .extend(baseResponseSchema.shape),
  z
    .object({
      status: z.literal("SIGN_IN_NOT_ALLOWED"),
      reason: z.string(),
    })
    .extend(baseResponseSchema.shape),
])

const signUpErrorsSchema = z
  .object({
    status: z.literal("SIGN_UP_NOT_ALLOWED"),
    reason: z.string(),
  })
  .extend(baseResponseSchema.shape)

// SuperTokens Response Schemas
export const stSignInResponseSchema = z.union([
  successResponseSchema,
  fieldErrorResponseSchema,
  signInErrorsSchema,
])

export const stSignUpResponseSchema = z.union([
  successResponseSchema,
  fieldErrorResponseSchema,
  signUpErrorsSchema,
])

const sessionBaseResponseSchema = z.object({
  isAuthenticated: z.literal(false),
})

const sessionSuccessResponseSchema = baseResponseSchema.extend({
  isAuthenticated: z.literal(true),
  userId: z.string(),
})

export const sessionResponseSchema = z.union([
  sessionBaseResponseSchema,
  sessionSuccessResponseSchema,
])

export type STUser = z.infer<typeof stUserSchema>
export type STSignInResponse = z.infer<typeof stSignInResponseSchema>
export type STSignUpResponse = z.infer<typeof stSignUpResponseSchema>
export type SessionResponse = z.infer<typeof sessionResponseSchema>
