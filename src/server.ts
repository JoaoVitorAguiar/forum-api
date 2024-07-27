import { app } from "./app";
import { env } from "@/env";

app
  .listen({
    host: "0.0.0.0", // Mais acessível para frontends
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP Server Running on port ${env.PORT}!`);
  });
