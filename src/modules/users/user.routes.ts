import { Hono } from "hono"
import { UserController } from "./user.controller"

export const usersRoute = new Hono().get("/", UserController.list)
