import { z } from "zod";
import { EmailSchema, LinksSchema, PhoneSchema } from "./utils/global.types.ts";

// sub-schemas:

const senorityLevels = [
  "Entry-Level",
  "Junior",
  "Mid-Level",
  "Senior",
  "Lead",
  "Principal",
] as const;

const offices = [
  "Monterrey",
  "Madrid",
  "Munich",
  "Houston",
  "San Francisco",
] as const;

const departments = [
  "Sales",
  "Marketing",
  "Management",
  "Finance",
  "HR",
  "Legal",
  "Operations",
  "Product & Engineering",
  "Customer Success",
] as const;

// schemas:

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().url(),
  department: z.enum(departments),
  userInfo: z.object({
    position: z.string(),
    seniority: z.enum(senorityLevels),
    office: z.enum(offices),
  }),
  phones: z.array(z.object(PhoneSchema)),
  emails: z.array(z.object(EmailSchema)),
  links: z.array(z.object(LinksSchema)),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof userSchema>;

export const I18N = {
  "id": "Employee ID",
  "name": "Name",
  "image": "User image",
  "department": "Department",
  "userInfo": {
    "label": "User information",
    "position": "Position",
    "seniority": "Seniority",
    "office": "Office",
  },
  "phones": "Contact phone",
  "emails": "Contact email",
  "links": "Links",
  "createdAt": "Created at",
  "updatedAt": "Updated at",
};
