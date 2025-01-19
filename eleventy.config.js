import { EleventyRenderPlugin } from "@11ty/eleventy";
import path from "node:path";
import glob from "fast-glob";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const configFile = path.basename(__filename);
import { createLibrary } from "./_input/_11ty/collections/createLibrary.js";

const rootPath = import.meta.dirname + "/";
const inputFolderName = "_input";
const outputFolderName = "_output";
const libraryFolderPath = "/library";

const inputFolderPath =
  rootPath + "/" + inputFolderName.replace("//", "/").replace("\\", "/");

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
  const shortcodesDirectory = path.join(
    `${inputFolderPath}/_11ty/shortcodes/*.js`
  );
  const shortcodeFiles = await glob(shortcodesDirectory);
  const importedShortcodeFiles = await Promise.all(
    shortcodeFiles.map((file) => import(file))
  );
  // console.log("Imported shortcode files: ", importedShortcodeFiles);
  importedShortcodeFiles.forEach((file) => {
    for (const [name, shortcode] of Object.entries(file)) {
      eleventyConfig.addShortcode(name, shortcode);
      shortcodes.push(name);
    }
  });
  // console.log("shortcodes: ", shortcodes);

  const blockcodes = [];
  const blockcodesDirectory = path.join(
    `${inputFolderPath}/_11ty/blockcodes/*.js`
  );
  const blockcodeFiles = await glob(blockcodesDirectory);
  const importedBlockcodeFiles = await Promise.all(
    blockcodeFiles.map((file) => import(file))
  );
  // console.log("imported blockcode files: ", importedBlockcodeFiles);
  importedBlockcodeFiles.forEach((file) => {
    for (const [name, blockcode] of Object.entries(file)) {
      eleventyConfig.addPairedShortcode(name, blockcode);
      blockcodes.push(name);
    }
  });
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
  // {{book | forEach(dropdownLinks, '{url: item.page.url, label: "Chapter" + loop.index}')}}

  // Create Library
  createLibrary(eleventyConfig, config.dir.library);
}
