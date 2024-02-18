import { phoneRegex } from "@/data/utils/global.types.ts";
import { z } from "zod";

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

export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  contact: z.object({
    mobilePhone: z.string().regex(phoneRegex),
    officePhone: z.string().regex(phoneRegex),
    companyEmail: z.string().email(),
  }),
  info: z.object({
    avatar: z.string().url(),
    position: z.string(),
    seniority: z.enum(senorityLevels),
    department: z.enum(departments),
    office: z.enum(offices),
  }),
  socialMedia: z.object({
    linkedin: z.string().url(),
    twitter: z.string().url(),
    github: z.string().url(),
  }),
  meta: z.object({
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
});

export type Team = z.infer<typeof teamSchema>;

export const I18N = {
  "id": "Employee ID",
  "name": "Name",
  "contact": {
    "title": "Contact",
    "mobilePhone": "Mobile Phone",
    "officePhone": "Office Phone",
    "companyEmail": "Company Email",
  },
  "info": {
    "title": "Information",
    "avatar": "Avatar",
    "position": "Position",
    "seniority": "Seniority",
    "department": "Department",
    "office": "Office",
  },
  "socialMedia": {
    "title": "Social Media",
    "linkedin": "LinkedIn",
    "twitter": "Twitter",
    "github": "GitHub",
  },
  "meta": {
    "title": "Metadata",
    "createdAt": "Created At",
    "updatedAt": "Updated At",
  },
};
