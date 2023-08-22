interface ProfileBase {
  about: string;
  address: string;
  description: string;
  email: string;
  messaging_product: "whatsapp";
  profile_picture_url: string;
  websites: Array<string>;
  vertical: string;
}

export interface Profile {
  data: Array<ProfileBase>;
}

export type QueryProfile = Partial<ProfileBase>;

export interface QueryUpdateProfile
  extends Partial<Omit<ProfileBase, "messaging_product">> {
  messaging_product: "whatsapp";
}

export interface UpdateProfileResponse {
  success: boolean;
}
