# 🎬 Movie & TV Database – Playwright UI & API Tests

End-to-end test automation for [TheMovieDB](https://www.themoviedb.org/) using **Playwright + TypeScript**.  
Includes UI and API tests, a Page Object Model structure, and CI-ready config to showcase a real-world QA framework.

## 📌 Features
- **UI tests**
  - Search for movies and TV shows
  - Validate movie details (title, release date, genres)
  - Filters, sorting and navigation checks
  - Infinite scroll / pagination checks
  - Responsive viewport tests (mobile / tablet / desktop)

- **API tests**
  - Search movie by title
  - Fetch movie details
  - Get popular movies list
  - Cross-check UI vs API data for consistency

- **Framework**
  - Page Object Model (POM)
  - TypeScript
  - Playwright test runner
  - Configurable via env variables
  - HTML reports (Playwright) and Allure support
  - CI workflow (GitHub Actions)

## ⚙️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/playwright-moviedb.git
   cd playwright-moviedb

2. **Install Dependencies**
   ```bash
   npm install
   npx playwright install

3. **Set Environment Variables**
   ```bash
   TMDB_API_URL=https://api.themoviedb.org/3
   TMDB_API_KEY=your_api_key_here

3. **Run the Tests**
   ```bash
   npx playwright test


