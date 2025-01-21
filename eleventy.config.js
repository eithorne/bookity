import { EleventyRenderPlugin } from "@11ty/eleventy";
import path from "node:path";
import glob from "fast-glob";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const configFile = path.basename(__filename);
import { createLibrary } from "./_11ty/collections/createLibrary.js";

const rootPath = process.cwd();
const inputFolderName = "input";
const outputFolderName = "_output";
const libraryFolderPath = "/library";

export const config = {
  dir: {
    input: inputFolderName,
    data: "../_data",
    includes: "../_includes",
    layouts: "../_includes/layouts",
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
  eleventyConfig.setServerOptions({ watch: ["_output/assets/**/*.css"] });
  // Copy these folders and their contents to the corresponding directory in _output
  eleventyConfig.addPassthroughCopy("input/assets");

  // Copy files with these extensions from _input to the corresponding directory in _output
  eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.jpg");

  // Node modules
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fortawesome/fontawesome-free/webfonts": "/assets/fonts",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/js-cookie/src/js.cookie.js": "assets/js/js.cookie.js",
  });

  // Plugins
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Custom Shortcodes
  const shortcodes = [];
  const shortCodesGlob = path
    .join(`${rootPath}/_11ty/shortcodes/*.js`)
    .replaceAll("\\", "/");

  const importedShortcodeFiles = await importFiles(shortCodesGlob);
  // console.log("Imported shortcode files: ", importedShortcodeFiles);
  importedShortcodeFiles.forEach((file) => {
    for (const [name, shortcode] of Object.entries(file)) {
      eleventyConfig.addShortcode(name, shortcode);
      shortcodes.push(name);
    }
  });
  // console.log("shortcodes: ", shortcodes);

  const blockcodes = [];
  const blocksGlob = path
    .join(`${rootPath}/_11ty/blockcodes/*.js`)
    .replaceAll("\\", "/");
  const importedBlockcodeFiles = await importFiles(blocksGlob);
  // console.log("imported blockcode files: ", importedBlockcodeFiles);
  importedBlockcodeFiles.forEach((file) => {
    for (const [name, blockcode] of Object.entries(file)) {
      eleventyConfig.addPairedShortcode(name, blockcode);
      blockcodes.push(name);
    }
  });

  // Custom Filters
  function sortByOrder(collections, orderKey = "order") {
    let collectionsClone = [...collections];
    collectionsClone.forEach(
      (collection) =>
        (collection.order =
          collection.data[orderKey] ?? collection.data.page[orderKey])
    );
    collectionsClone.sort((a, b) => {
      // if order is not set, we'll send it to the end, maintaining the default order
      const maxValue = Infinity;
      const orderA = a.order ?? maxValue - collectionsClone.indexOf(a);
      const orderB = b.order ?? maxValue - collectionsClone.indexOf(b);
      return Math.sign(orderA - orderB);
    });
    // collectionsClone.forEach(collection => console.log(collection.permalink))
    return collectionsClone;
  }

  eleventyConfig.addFilter("sortByOrder", sortByOrder);

  // Create Library
  createLibrary(eleventyConfig, config.dir.library);
}

async function importFiles(pathGlob) {
  try {
    const absoluteFilePaths = await glob.async(pathGlob);
    const relativeFilePaths = absoluteFilePaths.map(
      (file) => "./" + path.relative(".", file).replaceAll("\\", "/")
    );
    return await Promise.all(relativeFilePaths.map((file) => import(file)));
  } catch (err) {
    console.log(err);
  }
}
