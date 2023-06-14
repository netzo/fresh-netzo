import { createResourceHTTP } from "netzo/mod.ts";
import * as sendinblue from "./sendinblue.ts";

const sendinblue = createResourceHTTP({
  baseURL: "https://api.sendinblue.com/v3",
  headers: {
    "api-key": Deno.env.get('SENDINBLUE_API_KEY'),
    "Content-Type": "application/json",
  },
});

interface EmailOptions {
  data: any
  html: string
  templateData: any
}

export async function sendTransactionalEmail(options: EmailOptions): Promise<object> {
  const { data, html, templateData } = options
  try {
    const plainText = html.replace(/<[^>]+>/g, "");
    const email = await sendinblue.smtp.email.post(
      {
        sender: {
          name: "Netzo",
          email: "hello@netzo.io"
        },
        to: [
          {
            email: data.invitedEmail,
            name: `${data.inviterFirstName} ${data.inviterLastName}`
          }
        ],
        replyTo: {
          email: "hello@netzo.io",
          name: "Netzo Team"
        },
        htmlContent: html,
        textContent: plainText,
        subject: templateData.emailSubject
      })

    return email;
  } catch (error) {
    console.log(error);
  }
}