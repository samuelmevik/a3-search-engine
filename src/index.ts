import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import api from "./api";
import pages from "./pages";

const app = new Elysia().use(html());

app.use(pages)

app.use(api)

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
