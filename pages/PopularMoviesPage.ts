import { Page, Locator } from '@playwright/test';
export class PopularMoviesPage {
    readonly page: Page;
    readonly sortDropdownButton: Locator;
    readonly sortResultsByDropdownButton: Locator;
    readonly popularMoviesSearchButton: Locator;
    readonly popularMoviesLoadMoreButton: Locator;
    readonly popularMoviesTitles: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.sortDropdownButton = page.getByRole('heading', { name: 'Sort', exact: true });
        this.sortResultsByDropdownButton = page.getByRole('combobox').filter({ hasText: 'Popularity' }).getByLabel('select');
        this.popularMoviesSearchButton = page.getByRole('link', { name: 'Search' }).nth(1);
        this.popularMoviesLoadMoreButton = page.getByRole('paragraph').filter({ hasText: 'Load More' });
        this.popularMoviesTitles = page.locator('//h2//a[@title]');
    }

    sortBySelectOption(sortByText: string): Locator {
        return this.page.getByRole('option', { name: `${sortByText}` })
    }
}