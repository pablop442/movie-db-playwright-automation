import { test, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PopularMoviesPage } from '../../pages/PopularMoviesPage';
import { sortOptions } from '../../utils/sortOptionsData';

test.describe('Filter and Sort Movies', () => {

    //Pages 
    let homePage: HomePage;
    let popularMoviesPage: PopularMoviesPage;

    // Api utils
    const apiUrl = process.env.TMDB_API_URL;
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
        throw new Error('TMDB_API_KEY environment variable is not set');
    };
    const endpoint = `${apiUrl}/discover/movie`;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        popularMoviesPage = new PopularMoviesPage(page);

        //Access Popular Movies page through the Home page
        await page.goto(`/`);
        await homePage.movieNavBarButton.hover();
        await homePage.popularMovieMenuOption.click();
    });

    test('As a user, I can sort movies by Popularity Descending', async ({ page, request }) => {

        let capturedParams: Record<string, any> = {};

        await test.step('Select Popularity Descending option from menu', async () => {
            // Hack to activate the Search button
            await popularMoviesPage.sortDropdownButton.click();
            await popularMoviesPage.sortResultsByDropdownButton.click();
            await popularMoviesPage.sortBySelectOption(sortOptions.popularityAsc.label).click();

            // Capture the request made by the UI
            const [apiRequest] = await Promise.all([
                page.waitForRequest(req => req.url().includes('/discover/movie') && req.method() === 'POST'),
                (async () => {
                    await popularMoviesPage.sortResultsByDropdownButton.click();
                    await popularMoviesPage.sortBySelectOption(sortOptions.popularityDesc.label).click();
                    await popularMoviesPage.popularMoviesSearchButton.click()
                })()
            ]);
            // Extract POST body params
            capturedParams = apiRequest.postDataJSON();
            capturedParams.api_key = apiKey; // inject API key
        });

        await test.step('Compare Popularity Descending UI sorted results against API sorted results', async () => {

            // Call the TMDB API with the same params
            const apiResponse = await request.get(endpoint, { params: capturedParams });
            expect(apiResponse.ok()).toBeTruthy();
            const data = await apiResponse.json();
            
            //Map all movie titles from API
            const expectedOrder = data.results.map((movie: any) => movie.title);

            //Get order from the UI
            const uiMovieTitles = await popularMoviesPage.popularMoviesTitles.allTextContents();

            //Compare first 10 items
            expect(uiMovieTitles.slice(0, 10)).toEqual(expectedOrder.slice(0, 10));
        });
    });

    test('As a user, I can sort movies by Popularity Ascending', async ({ page, request }) => {

        let capturedParams: Record<string, any> = {};

        await test.step('Select Popularity Ascending option from menu', async () => {

            const [apiRequest] = await Promise.all([
                page.waitForRequest(req => req.url().includes('/discover/movie') && req.method() === 'POST'),
                (async () => {
                    await popularMoviesPage.sortDropdownButton.click();
                    await popularMoviesPage.sortResultsByDropdownButton.click();
                    await popularMoviesPage.sortBySelectOption(sortOptions.popularityAsc.label).click();

                    // Capture the first title BEFORE sorting
                    const firstMovieBefore = await popularMoviesPage.popularMoviesTitles.first().textContent() ?? '';
                    await popularMoviesPage.popularMoviesSearchButton.click();
                    // Wait until the first title is different
                    await expect(popularMoviesPage.popularMoviesTitles.first()).not.toHaveText(firstMovieBefore);
                })()
            ]);
            capturedParams = apiRequest.postDataJSON();
            capturedParams.api_key = apiKey; // inject API key
        });

        await test.step('Compare Popularity Ascending UI sorted results against API sorted results', async () => {
            const apiResponse = await request.get(endpoint, { params: capturedParams });
            expect(apiResponse.ok()).toBeTruthy();

            const data = await apiResponse.json();
            const expectedOrder = data.results.map((movie: any) => movie.title);
            const uiMovieTitles = await popularMoviesPage.popularMoviesTitles.allTextContents();

            expect(uiMovieTitles.slice(0, 10)).toEqual(expectedOrder.slice(0, 10));
        });
    });

    test('As a user, I can filter Action movies and sort them by Release Date Descending', async ({ page, request }) => {

        let capturedParams: Record<string, any> = {};

        await test.step('Select Rating Descending and add Action filter', async () => {

            const [apiRequest] = await Promise.all([
                page.waitForRequest(req => req.url().includes('/discover/movie') && req.method() === 'POST'),
                (async () => {
                    await popularMoviesPage.sortDropdownButton.click();
                    await popularMoviesPage.sortResultsByDropdownButton.click();
                    await popularMoviesPage.sortBySelectOption(sortOptions.releaseDateDesc.label).click();
                    await popularMoviesPage.actionGenreButton.click();

                    // Capture the first title BEFORE sorting
                    const firstMovieBefore = await popularMoviesPage.popularMoviesTitles.first().textContent() ?? '';
                    await popularMoviesPage.popularMoviesSearchButton.click();
                    // Wait until the first title is different
                    await expect(popularMoviesPage.popularMoviesTitles.first()).not.toHaveText(firstMovieBefore);
                })()
            ]);
            capturedParams = apiRequest.postDataJSON();
            capturedParams.api_key = apiKey; // inject API key
        });

        await test.step('Compare UI Action Filter and Rating sort results against API sorted results', async () => {
            const apiResponse = await request.get(endpoint, { params: capturedParams });
            expect(apiResponse.ok()).toBeTruthy();

            const data = await apiResponse.json();
            const expectedOrder = data.results.map((movie: any) => movie.title);
            const uiMovieTitles = await popularMoviesPage.popularMoviesTitles.allTextContents();

            expect(uiMovieTitles.slice(0, 10)).toEqual(expectedOrder.slice(0, 10));
        });
    });
});