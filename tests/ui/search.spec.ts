import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SearchResultsPage } from '../../pages/SearchResultsPage';
import { MovieDetailsPage } from '../../pages/MovieDetailsPage';





test.describe('Search Movie Functionality', () => {
    
    //Pages 
    let homePage: HomePage;
    let searchResultsPage: SearchResultsPage;
    let movieDetailsPage: MovieDetailsPage;

    //Edit this variable to search different movies
    const movieToSearch = 'The Big Lebowski';

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        searchResultsPage = new SearchResultsPage(page);
        movieDetailsPage = new MovieDetailsPage(page);

    });

    test('As a user, I can search a given movie using the main search bar', async ({ page }) => {

        await test.step('Input a movie title into the search bar', async () => {
            await page.goto('/');
            await homePage.mainSearchBar.fill(movieToSearch);
            await homePage.movieSearchButton.click();
        });

        await test.step('Correct movie search result is displayed', async () => {
            
            await expect(searchResultsPage.movieSearchResult(movieToSearch)).toBeVisible();
        });

        await test.step('Search result opens the correct page', async () => {
          await searchResultsPage.movieSearchResult(movieToSearch).click();
          await expect(movieDetailsPage.movieDetailTitle(movieToSearch)).toBeVisible();
          await expect(movieDetailsPage.movieDetailsCastSection).toBeVisible();
          await expect(movieDetailsPage.movieDetailsOverviewSection).toBeVisible();
          await expect(movieDetailsPage.movieDetailsMediaSection).toBeVisible();

        })
    });
});