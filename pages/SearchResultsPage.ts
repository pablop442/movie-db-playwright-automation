import { Page, Locator } from '@playwright/test';
export class SearchResultsPage {
  readonly page: Page;
  
    constructor(page: Page) {
    this.page = page;
}
    movieSearchResult(title: string): Locator {
    return this.page.locator('a').filter({ hasText: new RegExp(`^${title}$`) });
  }
}