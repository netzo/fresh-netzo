import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

/**
 * SDK constructor function for the Sendgrid API
 *
 * @see https://netzo.io/docs/netzo/apis/sendgrid
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const sendgrid = ({
  apiKey = Deno.env.get("SENDGRID_API_KEY")!,
}) => {
  const api = createApi({
    baseURL: "https://api.sendgrid.com/v3",
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "bearer",
        token: apiKey,
      }, ctx);
    },
  });

  return { api };
};

interface Personalization {
  email: string;
  name: string;
}

interface Email {
  toEmail: string;
  toName: string;
  subject: string;
  content: string;
  fromEmail: string;
  fromName: string;
  replyToEmail: string;
  replyToName: string;
}

/**
 * Send an email
 * @example const result = await postEmail({
 *  toEmail: "
 * toName: "
 * subject: "
 * content: "
 * fromEmail: "
 * fromName: "
 * replyToEmail: "
 * replyToName: "
 * });
*/
const postEmail = async (email: Email) => {
  const result = await api.mail.send.post({
    personalizations: [
      {
        to: [
          {
            email: email.toEmail,
            name: email.toName,
          },
        ],
        subject: email.subject,
      },
    ],
    content: [
      {
        type: "text/plain",
        value: email.content,
      },
    ],
    from: {
      email: email.fromEmail,
      name: email.fromName,
    },
    reply_to: {
      email: email.replyToEmail,
      name: email.replyToName,
    },
  }, email.fromEmail); // Add email.fromEmail as the second argument to api.mail.send.post

  return result;
};
