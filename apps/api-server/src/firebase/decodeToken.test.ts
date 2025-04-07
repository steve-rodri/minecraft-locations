import { describe, expect, it } from "vitest"

import { getTokenFromHeader } from "./decodeToken"

describe("getTokenFromHeader", () => {
  it("extracts the token from a valid authorization header", () => {
    expect(getTokenFromHeader("Bearer my-secret-token")).toBe("my-secret-token")
  })

  it("trims spaces around the token", () => {
    expect(getTokenFromHeader("Bearer   my-token   ")).toBe("my-token")
  })

  it("is case insensitive for 'Bearer'", () => {
    expect(getTokenFromHeader("bearer my-token")).toBe("my-token")
    expect(getTokenFromHeader("BEARER my-token")).toBe("my-token")
  })

  it("returns undefined if 'Bearer' is missing", () => {
    expect(getTokenFromHeader("Basic my-token")).toBeUndefined()
    expect(getTokenFromHeader("my-token")).toBeUndefined()
    expect(getTokenFromHeader("Token my-token")).toBeUndefined()
  })

  it("returns undefined if 'Bearer' is not followed by a token", () => {
    expect(getTokenFromHeader("Bearer")).toBeUndefined()
    expect(getTokenFromHeader("Bearer ")).toBeUndefined()
  })

  it("returns undefined for empty or invalid input", () => {
    expect(getTokenFromHeader(undefined)).toBeUndefined()
    expect(getTokenFromHeader(null as unknown as string)).toBeUndefined()
    expect(getTokenFromHeader("")).toBeUndefined()
  })

  it("returns undefined for non-string input", () => {
    expect(getTokenFromHeader(123 as unknown as string)).toBeUndefined()
    expect(getTokenFromHeader({} as unknown as string)).toBeUndefined()
    expect(getTokenFromHeader([] as unknown as string)).toBeUndefined()
  })
})
