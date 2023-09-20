import { Elysia } from "elysia";

const app = new Elysia()
  .listen(process.env.APP_PORT ?? 8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
