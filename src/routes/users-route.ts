import { Elysia } from "elysia";
import { registerUser } from "../services/users-service";

export const usersRoute = new Elysia({ prefix: "/api" })
  .post("/users", async ({ body, set }: any) => {
    try {
      const result = await registerUser(body);
      return { data: result };
    } catch (error: any) {
      set.status = 400;
      return { error: error.message };
    }
  });
