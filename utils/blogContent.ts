import { Page } from "@playwright/test";
import { blogSelectors } from "../pages/blog.page";

type BlogPost = {
  date: string;
  title: string;
  description: string;
  link: string;
  image: boolean;
};

export async function getBlogPosts(page: Page): Promise<BlogPost[]> {
  return await page.evaluate((selectors) => {
    const posts: BlogPost[] = [];

    document.querySelectorAll(selectors.blogBox).forEach((blogBox) => {
      const date = blogBox.getAttribute(selectors.dateAttr) || "";
      const image = !!blogBox.querySelector(selectors.image);
      const title =
        blogBox.querySelector(selectors.title)?.textContent?.trim() ||
        "No title";
      const description =
        blogBox.querySelector(selectors.description)?.textContent?.trim() ||
        "No description";
      const link =
        blogBox.querySelector(selectors.link)?.getAttribute("href") ||
        "No link";

      posts.push({ date, image, title, description, link });
    });

    return posts;
  }, blogSelectors);
}
