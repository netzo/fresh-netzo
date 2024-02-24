import { z } from "zod";

// schemas:

export const linkSchema = z.object({
  website: z.string().url(),
  facebook: z.string().url(),
  linkedin: z.string().url(),
  twitter: z.string().url(),
  other: z.string().url(),
});

export const noteSchema = z.object({
  name: z.string(),
  tags: z.array(z.string()),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Note = z.infer<typeof noteSchema>;

export type Link = z.infer<typeof linkSchema>;

// i18n:

// NOTE: keep object flat (use "." notation for nesting) for consistency
export const I18N: Record<string, string> = {
  "id": "ID",
  "createdAt": "Created at",
  "updatedAt": "Updated at",
  "type": "Type",
  "name": "Name",
  "description": "Description",
  "tags": "Tags",
  "image": "Image",
  "emails": "Emails",
  "email": "Email",
  "email.work": "Work Email",
  "email.personal": "Personal Email",
  "phones": "Phones",
  "phone": "Phone",
  "phone.work": "Work Phone",
  "phone.mobile": "Mobile Phone",
  "phone.personal": "Personal Phone",
  "links": "Links",
  "links.website": "Website",
  "links.facebook": "Facebook",
  "links.linkedin": "LinkedIn",
  "links.twitter": "Twitter",
  "links.other": "Other",
  "notes": "Notes",
  "position": "Position",
  "department": "Department",
  "status": "Status",
  "status.lead": "Lead",
  "status.qualified": "Qualified",
  "status.negotiation": "Negotiation",
  "status.won": "Won",
  "status.lost": "Lost",
  "amount": "Amount",
  "currencyCode": "Currency",
  "xml": "XML",
  "pdf": "PDF",
  // relations:
  "accountId": "Account ID",
  "accountIds": "Accounts IDs",
  "contactId": "Contact ID",
  "contactIds": "Contacts IDs",
  "dealId": "Deal ID",
  "dealIds": "Deals IDs",
  "userId": "User ID",
  "userIds": "Users IDs",
};

// utils:

export const toDateTime = (dateTime: string) =>
  new Date(dateTime).toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// adapted from https://stackoverflow.com/a/66494926 (space-separated hsl syntax for unocss)
export const toHslColor = (value: string, saturation = 75, lightness = 50) => {
  const stringUniqueHash = [...value].reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  const hue = Math.abs(stringUniqueHash % 360);
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
};
