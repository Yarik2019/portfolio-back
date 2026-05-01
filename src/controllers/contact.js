import createHttpError from "http-errors";
import crypto from "crypto";
import { transporter } from "../utils/mail.js";
import { env } from "../utils/env.js";
import { ContactCollection } from "../db/models/contact.js";

export const sendContactEmailController = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      throw createHttpError(400, "Missing required fields");
    }

    const token = crypto.randomBytes(20).toString("hex");

    await ContactCollection.create({
      name,
      email,
      message,
      token,
      verified: false,
    });

    const confirmLink = `${env("APP_URL")}/confirm?token=${token}`;

    await transporter.sendMail({
      from: `Portfolio Form <${env("MAIL_TO")}>`,
      to: email,
      replyTo: email,
      subject: "Confirm your email",
      html: `
        <h2>Hello ${name}</h2>
        <p>Thank you for your message.</p>
        <p>Please confirm your email:<a href="${confirmLink}">Confirm Email</a></p>
      `,
    });

    res.status(200).json({
      status: 200,
      message: "Confirmation email sent",
    });
  } catch (error) {
    throw createHttpError(500, `${error.message}`);
  }
};

export const confirmEmailController = async (req, res) => {
  try {
    const { token } = req.query;
    

    if (!token) {
      throw createHttpError(400, "Token required");
    }
    const contact = await ContactCollection.findOne({ token });
    if (!contact) {
      throw createHttpError(404, "Contact not found");
    }
    if (contact.verified) {
      return res.send("Email already confirmed");
    }

    contact.verified = true;
    contact.token = null;
    await contact.save();

    await transporter.sendMail({
      from: `Portfolio <${env("MAIL_TO")}>`,
      to: env("MAIL_TO"),
      replyTo: contact.email,
      subject: `New message from ${contact.name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${contact.name}</p>
        <p><b>Email:</b> ${contact.email}</p>
        <p><b>Message:</b></p>
        <p>${contact.message}</p>
      `,
    });

    res.send("Email confirmed successfully");
  } catch (error) {
    throw createHttpError(500, `${error.message}`);
  }
};
