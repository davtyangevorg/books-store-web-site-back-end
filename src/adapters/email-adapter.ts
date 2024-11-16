import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER || "gevbackgevbackfront@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "ufgh fobw cfia hhpg";

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
