import { AuthRepository } from "./AuthRepository"
import { PointRepository } from "./PointRepository"
import { ServerRepository } from "./ServerRepository"
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:4100/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export const authRepo = new AuthRepository(axiosInstance)
export const pointRepo = new PointRepository(axiosInstance)
export const serverRepo = new ServerRepository(axiosInstance)
