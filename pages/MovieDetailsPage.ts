import { Page, Locator } from '@playwright/test';
export class MovieDetailsPage {
    readonly page: Page;
    readonly movieDetailsOverviewSection: Locator;
    readonly movieDetailsCastSection: Locator;
    readonly movieDetailsMediaSection: Locator;

    constructor(page: Page) {
        this.page = page;
        this.movieDetailsOverviewSection = page.getByRole('heading', { name: 'Overview' });
        this.movieDetailsCastSection = page.getByRole('heading', { name: 'Top Billed Cast' });
        this.movieDetailsMediaSection = page.getByRole('heading', { name: 'Media' })
    }
    movieDetailTitle(title: string): Locator {
        return this.page.getByRole('link', { name: new RegExp(`^${title}$`) });
    }
}