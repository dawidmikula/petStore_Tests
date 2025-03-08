import test, { expect } from "@playwright/test";
import { Header } from "../components/header.component";
import { BlogPage } from "../pages/blog.page";
import { getBlogPosts } from "../utils/blogContent";

test.describe("test", () => {
  let header: Header;
  let blogPage: BlogPage;

  test.beforeEach(async ({ page }) => {
    header = new Header(page);
    blogPage = new BlogPage(page);

    await page.goto("https://dawidmikula.github.io/petStore/blog.html");
    // await header.cartButton.click();
  });

  test("Blog - check after first entry", async ({ page }) => {
    await expect(blogPage.blogHeader).toHaveText("BLOG");
    await expect(blogPage.blogDescrition).toHaveText("We write You read");
    await expect(blogPage.startDateFilter).toHaveText("Select Date:");
    await expect(blogPage.blogDateFilterButton).toHaveText("Filter");
    await expect(blogPage.blogDateResetButton).toHaveText("Reset");
    await expect(blogPage.blogDateFilterMessage).toHaveText(
      "⚠ No blog posts found for today."
    );
    await expect(blogPage.noPostsFoundMessage).toHaveText("⚠ No posts found.");

    // await page.waitForSelector("#blog-date", { state: "attached" });
    const today = new Date().toISOString().split("T")[0];
    const blogDate = await page.locator("#blog-date").inputValue();
    expect(blogDate).toBe(today);
  });

  test("Blog - check correct exact dates", async ({ page }) => {
    const expectedDate = ["2025-01-01", "2025-01-02", "2025-01-03"];

    for (let index = 0; index < expectedDate.length; index++) {
      const date = expectedDate[index];

      try {
        await blogPage.blogDateInput.fill(date);
        await blogPage.blogDateFilterButton.click();

        await expect(blogPage.blogDateFilterMessage).toHaveText(
          `✅ Showing results for ${expectedDate[index]}`
        );
        const blogPosts = await getBlogPosts(page);
        expect(blogPosts.length).toBeGreaterThan(0);

        for (const post of blogPosts) {
          expect(post.date).toBe(expectedDate[index]);

          if (post.link === "No link") {
            throw new Error(`Post with date ${post.date} has no link.`);
          }
          if (post.title === "No title") {
            throw new Error(`Post with date ${post.date} has no title.`);
          }
          if (post.description === "No description") {
            throw new Error(`Post with date ${post.date} has no description.`);
          }
          if (post.image === false) {
            throw new Error(`Post with date ${post.date} is missing an image.`);
          }
        }
      } catch (error) {
        console.error(
          `Error checking posts for date ${expectedDate[index]}:`,
          error.message
        );
        throw error;
      }
    }
  });

  test("Blog - check incorrect exact dates", async ({ page }) => {
    const expectedDate = ["2025-01-10", "2025-01-12", "2025-01-13"];

    for (let index = 0; index < expectedDate.length; index++) {
      const date = expectedDate[index];

      await blogPage.blogDateInput.fill(date);
      await blogPage.blogDateFilterButton.click();

      await expect(blogPage.blogDateFilterMessage).toHaveText(
        `⚠ No blog posts found for this date.`
      );
      await expect(blogPage.noPostsFoundMessage).toHaveText(
        "⚠ No posts found."
      );
    }
  });

  test("Blog - check all results", async ({ page }) => {
    await blogPage.blogDateResetButton.click();

    const paginationLinks = await page.$$eval("#pagination a", (links) =>
      links
        .map((link) => link.textContent?.trim())
        .filter((text) => text && !isNaN(Number(text)))
        .map(Number)
    );

    const lastPageNumber =
      paginationLinks.length > 0 ? Math.max(...paginationLinks) : 0;

    let allBlogPosts: BlogPost[] = [];

    for (let p = 1; p <= lastPageNumber; p++) {
      const blogPosts = await getBlogPosts(page);
      expect(blogPosts.length).toBeGreaterThan(0);
      expect(blogPosts.length).toBeLessThan(6);

      allBlogPosts = [...allBlogPosts, ...blogPosts];

      if (p < lastPageNumber) {
        await blogPage.nextBlogPage.click();
      }
    }
    expect(allBlogPosts.length).toBeGreaterThan((lastPageNumber - 1) * 5);
    expect(allBlogPosts.length).toBeLessThan(lastPageNumber * 5 + 1);
  });

  test("Blog - ", async ({ page }) => {
    //
  });
});
