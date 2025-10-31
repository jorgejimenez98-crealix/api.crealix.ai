import type { Context } from "hono"
import { UserService } from "./user.service"

export class UserController {
  /* Get Users List */
  static async list(c: Context) {
    const users = await UserService.list()

    return c.json({ success: true, data: users })
  }
}
