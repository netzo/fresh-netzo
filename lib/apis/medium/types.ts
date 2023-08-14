export interface User {
  data: {
    id: string;
    username: string;
    name: string;
    url: string;
    imageUrl: string;
  };
}

export interface Publications {
  data: Array<{
    id: string;
    name: string;
    description: string;
    url: string;
    imageUrl: string;
  }>;
}

export interface Post {
  data: {
    id: string;
    title: string;
    authorId: string;
    tags: Array<string>;
    url: string;
    canonicalUrl: string;
    publishStatus: string;
    publishedAt: number;
    license: string;
    licenseUrl: string;
  };
}

export interface QueryPost {
  title: string;
  contentFormat: "html" | "markdown";
  content: string;
  tags?: string[];
  canonicalUrl?: string;
  publishStatus?: "public" | "draft" | "unlisted";
  license?:
    | "all-rights-reserved"
    | "cc-40-by"
    | "cc-40-by-sa"
    | "cc-40-by-nd"
    | "cc-40-by-nc"
    | "cc-40-by-nc-nd"
    | "cc-40-by-nc-sa"
    | "cc-40-zero"
    | "public-domain";
  notifyFollowers?: boolean;
}
