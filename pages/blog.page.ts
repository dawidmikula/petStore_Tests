import { Page } from "@playwright/test";
export class BlogPage {
  constructor(private page: Page) {}

  blogHeader = this.page.locator("#page-header h2");
  blogDescrition = this.page.locator("#page-header p");

  startDateFilter = this.page.locator("#blog-filter :has-text('Select date:')");
  blogDateInput = this.page.locator("#blog-date");
  blogDateFilterButton = this.page.locator("#filter-date");
  blogDateResetButton = this.page.locator("#reset-date");
  blogDateFilterMessage = this.page.locator("#filter-message");
  noPostsFoundMessage = this.page.getByText("⚠ No posts found.");

  nextBlogPage = this.page.locator("#pagination a").last();
  //
}

export const blogSelectors = {
  blogBox: "#blog .blog-box",
  image: ".blog-img",
  dateAttr: "data-date",
  title: ".blog-details h4",
  description: ".blog-details p",
  link: ".blog-details a",
};
