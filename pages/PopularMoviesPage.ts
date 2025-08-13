import { Page, Locator } from '@playwright/test';
export class PopularMoviesPage {
    readonly page: Page;
    readonly sortDropdownButton: Locator;
    readonly sortResultsByDropdownButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.sortDropdownButton = page.getByRole('heading', { name: 'Sort', exact: true });
        this.sortResultsByDropdownButton = page.getByRole('combobox').filter({ hasText: 'Popularity' }).getByLabel('select')
    }

    movieDetailTitle(sortByText: string): Locator {
        return this.page.locator('a').filter({ hasText: new RegExp(`^${sortByText}$`) });
    }
}