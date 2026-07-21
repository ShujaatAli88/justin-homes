/**
 * TODO(client): placeholder posts until real blog content is supplied.
 */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "placeholder-post-1",
    title: "{{BLOG_TITLE_1}}",
    excerpt: "{{BLOG_EXCERPT_1}}",
    content: "{{BLOG_CONTENT_1}}",
    coverImage: "{{BLOG_IMAGE_1}}",
    publishedAt: "2026-06-01",
    author: "Justin Cadenhead",
  },
  {
    slug: "placeholder-post-2",
    title: "{{BLOG_TITLE_2}}",
    excerpt: "{{BLOG_EXCERPT_2}}",
    content: "{{BLOG_CONTENT_2}}",
    coverImage: "{{BLOG_IMAGE_2}}",
    publishedAt: "2026-05-15",
    author: "Justin Cadenhead",
  },
  {
    slug: "placeholder-post-3",
    title: "{{BLOG_TITLE_3}}",
    excerpt: "{{BLOG_EXCERPT_3}}",
    content: "{{BLOG_CONTENT_3}}",
    coverImage: "{{BLOG_IMAGE_3}}",
    publishedAt: "2026-04-30",
    author: "Justin Cadenhead",
  },
];
