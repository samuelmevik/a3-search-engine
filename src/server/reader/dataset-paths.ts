import { readdir } from "node:fs/promises";
import { join } from "node:path";

async function getPaths(dir: string) {
  const dirents = await readdir(dir, { withFileTypes: true });
  return dirents.map((dirent) => join(dir, dirent.name));
}

const base = 'src/server/data-set';
//games: await getPaths(`${base}/Links/Games`),
//programming: await getPaths(`${base}/Links/Programming`),
const datasetPaths = {
  links: [...await getPaths(`${base}/Links/Games`), ...await getPaths(`${base}/Links/Programming`)],
  words: [...await getPaths(`${base}/Words/Games`), ...await getPaths(`${base}/Words/Programming`)],
}

Object.freeze(datasetPaths);

export default datasetPaths;