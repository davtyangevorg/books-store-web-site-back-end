import nodemailer from "nodemailer";
import { config } from "../config";

const EMAIL_USER = config.email.user;
const EMAIL_PASS = config.email.pass;

export const emailAdapter = {
  sendEmail: async function (to: string, subject: string, body: string) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: EMAIL_USER,
        to,
        subject,
        html: body,
      });

      return info.messageId;
    } catch (error) {
      throw new Error("Failed to send email");
    }
  },
};
