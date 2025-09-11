export const sortOptions = {
  popularityDesc: { label: 'Popularity Descending', apiValue: 'popularity.desc' },
  popularityAsc: { label: 'Popularity Ascending', apiValue: 'popularity.asc' },
  ratingDesc: { label: 'Rating Descending', apiValue: 'vote_average.desc' },
  ratingAsc: { label: 'Rating Ascending', apiValue: 'vote_average.asc' },
  releaseDateDesc: { label: 'Release Date Descending', apiValue: 'primary_release_date.desc' },
  releaseDateAsc: { label: 'Release Date Ascending', apiValue: 'primary_release_date.asc' },
  titleAsc: { label: 'Title (A-Z)', apiValue: 'original_title.asc' },
  titleDesc: { label: 'Title (Z-A)', apiValue: 'original_title.desc' }
} as const;
