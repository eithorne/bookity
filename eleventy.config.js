import { EleventyRenderPlugin } from "@11ty/eleventy";

import fs from "node:fs";

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

  // Build collections from folders :: borrowed from pack11ty while I try figure out how collections work, will be replacing with my own code later
  const folders = () => {
    const foldersList = [];
    if (fs.existsSync("_input/library")) {
      const items = fs.readdirSync("_input/library", {
        encoding: "utf8",
        withFileTypes: true,
      });
      for (const item of items) {
        if (item.isDirectory()) {
          foldersList.push(item.name);
        }
      }
    }
    return foldersList;
  };

  const filteredCollectionsMemoization = {};

  const getFilteredCollection = (collection, folder, limit = false) => {
    if (folder in filteredCollectionsMemoization) {
      // This collection already exists in memoization
      return filteredCollectionsMemoization[folder];
    }
    // TODO: deal with different sorts
    let filteredCollection = collection
      .getFilteredByGlob(`_input/library/${folder}/*.md`)
      .filter(
        (item) => !item.filePathStem.match(/^\/collections\/[^\/]+\/index$/)
      )
      .sort((a, b) => b.date - a.date);

    if (limit) {
      // Keep only a few items per collection for performance (useful in dev mode)
      filteredCollection = filteredCollection.slice(0, limit);
    }

    // Keep a copy of this collection in memoization for later reuse
    filteredCollectionsMemoization[folder] = filteredCollection;

    return filteredCollection;
  };

  const collections = {};

  for (const folder of folders()) {
    // Add a collection for each autocollection folder
    collections[folder] = (collection) =>
      getFilteredCollection(collection, folder, false);
  }

  if (folders.length > 0) {
    // Add a global collection with all autocollection folders
    collections.contents = (collection) =>
      getFilteredCollection(collection, `{${folders.join(",")}}`, false);
  }
  for (const [name, collection] of Object.entries(collections)) {
    eleventyConfig.addCollection(name, collection);
  }
}
export const config = {
  markdownTemplateEngine: "njk",
  dataTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  templateFormats: ["html", "liquid", "njk", "md"],
  dir: {
    input: "_input",
    layouts: "_includes/layouts",
    output: "_output",
  },
};
