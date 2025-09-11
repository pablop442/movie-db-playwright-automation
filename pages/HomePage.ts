import { Page, Locator } from '@playwright/test';
export class HomePage {
  readonly page: Page;
  readonly mainSearchBar: Locator;
  readonly movieSearchButton: Locator;
  readonly movieNavBarButton: Locator;
  readonly popularMovieMenuOption: Locator;
  
    constructor(page: Page) {
    this.page = page;
    this.mainSearchBar = page.getByPlaceholder('Search for a movie, tv show, person......');
    this.movieSearchButton = page.getByRole('button', { name: 'Search' });
    this.movieNavBarButton = page.getByLabel('Movies');
    this.popularMovieMenuOption = page.getByRole('menuitem', { name: 'Popular' }).getByLabel('Popular')
  }
}