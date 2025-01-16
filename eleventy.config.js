import { EleventyRenderPlugin } from "@11ty/eleventy";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const configFile = basename(__filename);
import fs from "node:fs";

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
  async function getFolders(directory) {
    const directoryContents = await fs.promises.readdir(directory, {
      encoding: "utf8",
      withFileTypes: true,
    });
    const folders = [];
    for (const item of directoryContents) {
      if (item.isDirectory()) {
        folders.push(item.name);
      }
    }
    return folders;
  }
  async function createLibrary() {
    try {
      const libraryPath = config.dir.library;
      const books = await getFolders(libraryPath);
      if (books.length > 0) {
        for (const folder of books) {
          await eleventyConfig.addCollection(
            folder,
            async function (collectionApi) {
              const glob = config.dir.library + "/" + folder + "/*";
              const book = collectionApi.getFilteredByGlob(glob);
              book.forEach((chapter, i) => {
                chapter.settings = chapter.data;
                chapter.fileInfo = chapter.page;
                if ("tags" in chapter.settings) {
                  chapter.settings.tags.push(folder);
                } else {
                  chapter.settings.tags = [folder];
                }
                chapter.fileInfo.book = folder;
                chapter.fileInfo.index0 = i;
                chapter.fileInfo.index = i + 1;
              });
              return book;
            }
          );
        }
        await eleventyConfig.addCollection(
          "library",
          async function (collectionsApi) {
            const library = [];
            books.forEach((book) => {
              const chapters = collectionsApi.getAll().filter((item) => {
                const chapter =
                  item.page.inputPath.includes(
                    config.dir.library + "/" + book
                  ) && item.page.fileSlug !== "library";
                return chapter;
              });
              const bookObj = {};
              bookObj.chapters = chapters;
              bookObj.name = book;
              const bookKeys = Object.keys(chapters[0].data).filter((key) =>
                key.startsWith("book.")
              );
              bookKeys.forEach(
                (key) => (bookObj[key.substring(5)] = chapters[0].data[key])
              );
              library.push(bookObj);
            });
            return library;
          }
        );
      }
    } catch (error) {
      if (
        error.message ===
        `ENOENT: no such file or directory, scandir '${config.dir.library}'`
      ) {
        console.log(
          `Library does not exist. Did you move, rename, or delete the library folder? It should be located at \x1b[1m${config.dir.library}\x1B[0m. If you want to move or rename the library folder, you will need to edit the path variables in \x1b[1m${config.dir.config}\x1B[0m`
        );
      }
      console.log(error.message);
    }
  }
  createLibrary();
}
