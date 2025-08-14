import { Page, Locator } from '@playwright/test';
export class MovieDetailsPage {
    readonly page: Page;
    readonly movieDetailsOverviewSection: Locator;
    readonly movieDetailsCastSection: Locator;
    readonly movieDetailsMediaSection: Locator;
    readonly playTrailerButton: Locator;
    readonly trailerVideoIframe: Locator;
    readonly closeTrailerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.movieDetailsOverviewSection = page.getByRole('heading', { name: 'Overview' });
        this.movieDetailsCastSection = page.getByRole('heading', { name: 'Top Billed Cast' });
        this.movieDetailsMediaSection = page.getByRole('heading', { name: 'Media' });
        this.playTrailerButton = page.getByRole('link', { name: 'Play Trailer' });
        this.trailerVideoIframe = page.getByRole('dialog', { name: 'Play Trailer' }).locator('iframe').contentFrame().locator('video')
        this.closeTrailerButton = page.getByRole('dialog', { name: 'Play Trailer' }).getByLabel('Close')
    }
    movieDetailTitle(title: string): Locator {
        return this.page.getByRole('link', { name: new RegExp(`^${title}$`) });
    }
     movieDetailYear(year: string): Locator {
        return this.page.getByRole('heading', { name: new RegExp(`${year}`) });
    }

    movieRating(ratingPercent: string): Locator{
        return this.page.locator(`//div[@data-percent="${ratingPercent}"]`);
    }
}