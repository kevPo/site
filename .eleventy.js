module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("png");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("fonts");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return dateObj.toDateString();
  });

  eleventyConfig.addFilter("favoriteBooks", books => {
    const favorites = books.filter(b => b.rank != undefined);
    return favorites.sort((a, b) => a.rank - b.rank);
  });

  eleventyConfig.addFilter("currentlyReading", books => {
    return books.filter(b => b.inProgress);
  });

  eleventyConfig.addFilter("groupedYears", books => {
    const allYears = books.map(d => d.year);
    const years = [...new Set(allYears)].sort((a, b) => b - a); 
    const groups = years.map(year => ({year, books: books.filter(b => b.year === year && !b.inProgress)}));
    
    return groups;
  });
};