import fs from "node:fs";
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
export async function createLibrary(eleventyConfig, path) {
  try {
    console.log("Creating library for directory: " + path);
    const parentName = path.substring(path.lastIndexOf("/") + 1);
    const subDirectories = await getFolders(path);
    if (subDirectories.length > 0) {
      for (const folderName of subDirectories) {
        await eleventyConfig.addCollection(
          folderName,
          async function (collectionApi) {
            const glob = path + "/" + folderName + "/*.*";
            const folder = collectionApi.getFilteredByGlob(glob, "!**/_**");
            folder.forEach((file, i) => {
              file.settings = file.data;
              file.fileInfo = file.page;
              if ("tags" in file.settings) {
                file.settings.tags.push(folder);
              } else {
                file.settings.tags = [folder];
              }
              file.fileInfo.folder = folderName;
              file.fileInfo.index0 = i;
              file.fileInfo.index = i + 1;
            });
            return folder;
          }
        );
      }
      await eleventyConfig.addCollection(
        parentName,
        async function (collectionsApi) {
          const library = [];
          subDirectories.forEach((folder) => {
            const files = collectionsApi.getAll().filter((item) => {
              const file =
                item.page.inputPath.includes(path + "/" + folder) &&
                item.page.fileSlug !== folder;
              return file;
            });
            const folderObj = {};
            let collectionKey;
            if (parentName.toLowerCase() === "library") {
              collectionKey = "chapters";
            } else collectionKey = "files";
            folderObj[collectionKey] = files;
            folderObj.name = folder;
            const folderKeys = Object.keys(files[0].data).filter((key) =>
              key.includes(".")
            );
            folderKeys.forEach((key) => {
              const [parentKey, childKey] = key.split(".");
              folderObj[childKey] = files[0].data[key];
            });
            library.push(folderObj);
          });
          eleventyConfig[parentName] = library;
          return library;
        }
      );
    }
  } catch (error) {
    if (
      error.message === `ENOENT: no such file or directory, scandir '${path}'`
    ) {
      console.log(
        `Library does not exist. Did you move, rename, or delete the library folder? It should be located at \x1b[1m${path}\x1B[0m. If you want to move or rename the library folder, you will need to edit the path variables in \x1b[1m${config.dir.config}\x1B[0m`
      );
    }
    console.log(error.message);
  }
}
