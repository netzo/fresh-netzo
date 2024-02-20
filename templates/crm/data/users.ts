import { z } from "zod";
import { emailSchema, linkSchema, phoneSchema } from "./utils/global.types.ts";

export const senorityLevels = [
  "entry",
  "junior",
  "mid",
  "senior",
  "manager",
  "executive",
] as const;

export const offices = [
  "Monterrey, Mexico",
  "Madrid, Spain",
  "Munich, Germany",
  "Houston, USA",
  "San Francisco, USA",
] as const;

export const departments = [
  "sales",
  "marketing",
  "management",
  "finance",
  "hr",
  "legal",
  "operations",
  "productAndEngineering",
  "customerSuccess",
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
  phones: z.array(phoneSchema),
  emails: z.array(emailSchema),
  links: z.array(linkSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof userSchema>;

export const I18N = {
  "id": "Employee ID",
  "name": "Name",
  "image": "User image",
  "department": {
    "label": "Department",
    "sales": "Sales",
    "marketing": "Marketing",
    "management": "Management",
    "finance": "Finance",
    "hr": "Human Resources",
    "legal": "Legal",
    "operations": "Operations",
    "productAndEngineering": "Product & Engineering",
  },
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
