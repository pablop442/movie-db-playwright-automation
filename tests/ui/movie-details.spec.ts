import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SearchResultsPage } from '../../pages/SearchResultsPage';
import { MovieDetailsPage } from '../../pages/MovieDetailsPage';
import { testData } from '../../utils/movieTestData';


test.describe('Movie Detail Page Display', () => {

    //Pages 
    let homePage: HomePage;
    let searchResultsPage: SearchResultsPage;
    let movieDetailsPage: MovieDetailsPage;

    //Edit this variable to search different movies
    const movie = testData.whiplash;


    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        searchResultsPage = new SearchResultsPage(page);
        movieDetailsPage = new MovieDetailsPage(page);

        //Directly access movie detail page
        await page.goto(`/${movie.detailsPageUrl}`);


    });

    test('As a user, I can see movie details in the Details page', async () => {

        await test.step('Movie title is displayed', async () => {
            await expect(movieDetailsPage.movieDetailTitle(movie.title)).toBeVisible();
        });
        await test.step('Movie release year is displayed', async () => {
            await expect(movieDetailsPage.movieDetailYear(movie.year)).toBeVisible();
        });
        await test.step('Movie rating is displayed', async () => {
            await expect(movieDetailsPage.movieRating(movie.rating)).toBeVisible();
        });
    });

    test('As a user, I can watch the movie trailer', async () => {

        await test.step('Click Play Trailer button', async () => {
            await movieDetailsPage.playTrailerButton.click();
        });
        await test.step('Media player is launched', async () => {
            await expect(movieDetailsPage.trailerVideoIframe).toBeVisible();
        });
        await test.step('Close media player', async () => {
            await movieDetailsPage.closeTrailerButton.click();
        });
    });
});