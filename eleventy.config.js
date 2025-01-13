export default async function (eleventyConfig) {
  // Configure Eleventy
}
export const config = {
  markdownTemplateEngine: "njk",
  dataTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  templateFormats: ["html", "liquid", "njk", "md", "scss"],
  dir: {
    input: "_input",
    output: "_output",
  },
};
