import fastify from "fastify";
import { usersRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { questionsRoutes } from "./http/controllers/questions/routes";
import { answersRoutes } from "./http/controllers/answer/routes";
import fastifyCors from "@fastify/cors";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "1d",
  },
});

app.register(fastifyCookie);
app.register(fastifyCors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.register(usersRoutes);
app.register(questionsRoutes);
app.register(answersRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError)
    // Erro de validação
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });

  if (env.NODE_ENV !== "production") console.error(error);
  // else: TODO: deveria fazer o log em uma ferramenta externa DataLog/NewRelic/Sentry
  return reply.status(500).send({ message: "Internal server error." });
});
