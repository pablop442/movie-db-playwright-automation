import { test, expect } from '@playwright/test';
import { testData } from '../../utils/movieTestData';

test.describe('Search Movies via API', () => {
    const apiUrl = process.env.TMDB_API_URL;
    const apiKey = process.env.TMDB_API_KEY!;

    const movies = [testData.whiplash.title, testData.inception.title, testData.theBigLebowski.title]

    for (const movie of movies) {
        test(`As a user, I can make a GET request to search ${movie} through the API`, async ({ request }) => {

            const endpoint = `${apiUrl}/search/movie`;
            const response = await request.get(
                endpoint,
                {
                    params: {
                        api_key: apiKey,
                        query: movie
                    }
                }
            )

            expect(response.ok()).toBeTruthy();

            const data = await response.json();
            expect(data.results.length).toBeGreaterThan(0);

            const titles = data.results.map((item: any) => item.title.toLowerCase());
            expect(titles).toContain(movie.toLowerCase());

            console.log(`Found movies: ${titles.slice(0, 5).join(', ')}`);
        });

    }

});
