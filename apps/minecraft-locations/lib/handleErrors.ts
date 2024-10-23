import { Alert, Platform } from "react-native"
import { AxiosError } from "axios"

export const handleError = ({
  error,
  shouldAlert = false,
}: {
  error: unknown
  shouldAlert?: boolean
}) => {
  const message = getErrorMessage(error)
  console.error(message)
  if (message && shouldAlert) sendAlert(message)
}

export const getErrorMessage = (error: unknown): string | null => {
  if (error instanceof Error) {
    return error.message
  }
  if (error instanceof AxiosError) {
    return getFormattedAxiosError(error)
  }
  return null
}

export const sendAlert = (message: string) => {
  if (Platform.OS === "web") {
    alert(message)
  } else {
    Alert.alert(message)
  }
}

// Define types for the error structure
type ErrorReason = { message: string }
type ErrorResponse = { message: string; data: ErrorReason[] }
type ErrorResponseData = { errors: ErrorResponse[] }

export function getFormattedAxiosError(error: AxiosError): string {
  const errorRespData = error.response?.data
  if (!isErrorRespData(errorRespData)) return error.message
  return errorRespData.errors
    .map(({ message, data }) =>
      [message, ...data.map(({ message }) => message)].join("\n")
    )
    .join("\n\n")
}

function isErrorRespData(value: unknown): value is ErrorResponseData {
  return (
    typeof value === "object" && // Check if it's an object
    value !== null && // Ensure it's not null
    "errors" in value && // Check if the `errors` key exists
    Array.isArray(value.errors) && // Ensure `errors` is an array
    value.errors.every((error) => isErrorResponse(error))
  )
}

function isErrorResponse(value: unknown): value is ErrorResponse {
  return (
    typeof value === "object" && // Check if it's an object
    value !== null && // Ensure it's not null
    "message" in value && // Check if the `message` key exists
    "data" in value && // Check if the `data` key exists
    Array.isArray(value.data) && // Ensure `data` is an array
    value.data.every((error) => isErrorReason(error))
  )
}

function isErrorReason(value: unknown): value is ErrorReason {
  return (
    typeof value === "object" && // Check if it's an object
    value !== null && // Ensure it's not null
    "message" in value // Check if the `message` key exists
  )
}
