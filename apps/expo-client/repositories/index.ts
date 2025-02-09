import { AuthRepository } from "./AuthRepository"
import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5500/auth",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export const authRepo = new AuthRepository(axiosInstance)
