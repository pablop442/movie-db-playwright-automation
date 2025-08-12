import { Page, Locator } from '@playwright/test';
export class HomePage {
  readonly page: Page;
  readonly mainSearchBar: Locator;
  readonly movieSearchButton: Locator;
  
    constructor(page: Page) {
    this.page = page;
    this.mainSearchBar = page.getByPlaceholder('Search for a movie, tv show, person......');
    this.movieSearchButton = page.getByRole('button', { name: 'Search' });
  }
}