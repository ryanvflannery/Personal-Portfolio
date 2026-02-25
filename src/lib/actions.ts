"use server";

import ContactFormEmail from "@/components/email/ContactFormEmail";
import { Resend } from "resend";
import { z } from "zod";
import { ContactFormSchema } from "./schemas";

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.format() };
  }

  const apiKey = process.env.RESEND_API_KEY;

  // 🟢 Prevent runtime crash
  if (!apiKey) {
    return { error: "Email service not configured." };
  }

  const resend = new Resend(apiKey);

  try {
    const { name, email, message } = result.data;

    const { data, error } = await resend.emails.send({
      from: "Ryan Portfolio <contact@ryanvflannery.dev>",
      to: "ryanvflannery@gmail.com",
      replyTo: [email],
      cc: [email],
      subject: `New message from ${name}!`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
    });

    if (!data || error) {
      console.error(error?.message);
      throw new Error("Failed to send email!");
    }

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong sending the email." };
  }
}