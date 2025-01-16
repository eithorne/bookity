import { EleventyRenderPlugin } from "@11ty/eleventy";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const configFile = basename(__filename);
import { createLibrary } from "./_input/_11ty/collections/createLibrary";

const inputFolderName = "_input";
const outputFolderName = "_output";
const libraryFolderPath = "/library";

export const config = {
  dir: {
    input: inputFolderName,
    layouts: "/_includes/layouts",
    library: inputFolderName + libraryFolderPath,
    output: outputFolderName,
    config: configFile,
  },
  markdownTemplateEngine: "njk",
  dataTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  templateFormats: ["html", "liquid", "njk", "md"],
};

export default async function (eleventyConfig) {
  // Configure Eleventy Here

  // Copy these folders and their contents to the corresponding directory in _output
  eleventyConfig.addPassthroughCopy("_input/assets");
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fortawesome/fontawesome-free/webfonts": "/assets/fonts",
  });

  // Copy files with these extensions from _input to the corresponding directory in _output
  eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.jpg");

  // Plugins
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Custom Shortcodes
  eleventyConfig.addShortcode("fa", function (classString, stylingString = "") {
    const classes = classString.split(" ");
    const styling = `style="${stylingString}"`;

    if (classes.length === 1) {
      classes[0] = "fa-solid fa-" + classes[0];
    } else {
      classes[0] = "fa-" + classes[0];
      classes[1] = "fa-" + classes[1];
    }

    return `<i class="${classes.join(" ")}" ${styling}></i>`;
  });

  eleventyConfig.addPairedShortcode(
    "card",
    function (content, title, classString = "", styling = "") {
      const header = title ? `<div class="card-header">${title}</div>` : "";
      const body = `<div class="card-body">${content}</div>`;

      return `<div class="card ${classString}" style="${styling}">${header}${body}</div>`;
    }
  );

  // Custom Filters

  function sortByOrder(collections) {
    let collectionsClone = [...collections];
    return collectionsClone.sort((a, b) => {
      // if order is not set, we'll send it to the end, maintaining the default order
      const maxValue = collections.length * 2;
      const orderA = a.data.order
        ? a.data.order
        : maxValue - collectionsClone.indexOf(a);
      const orderB = b.data.order
        ? b.data.order
        : maxValue - collectionsClone.indexOf(b);
      return Math.sign(orderA - orderB);
    });
  }

  eleventyConfig.addFilter("sortByOrder", sortByOrder);

  // Create Library
  createLibrary(eleventyConfig, config.dir.library);
}
