import { Page, Locator } from '@playwright/test';
export class PopularMoviesPage {
    readonly page: Page;
    readonly sortDropdownButton: Locator;
    readonly sortResultsByDropdownButton: Locator;
    readonly popularMoviesSearchButton: Locator;
    readonly popularMoviesLoadMoreButton: Locator;
    readonly popularMoviesTitles: Locator;
    readonly actionGenreButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.sortDropdownButton = page.locator('.name').first()
        this.sortResultsByDropdownButton = page.locator('//select[@id="sort_by"]//preceding::button')
        this.popularMoviesSearchButton = page.getByRole('link', { name: 'Search' }).nth(1);
        this.popularMoviesLoadMoreButton = page.getByRole('paragraph').filter({ hasText: 'Load More' });
        this.popularMoviesTitles = page.locator('//h2//a[@title]');
        this.actionGenreButton = page.getByRole('link', { name: 'Action' });

    }

    sortBySelectOption(sortByText: string): Locator {
        return this.page.getByRole('option', { name: `${sortByText}` })
    }
}