import nodemailer from "nodemailer";
import { SMTP } from "../portfolio/portfolio.js";
import { env } from "./env.js";
export const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: env(SMTP.SMTP_PORT),
  secure: true,
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASS),
  },
});
