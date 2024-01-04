import { Dirent } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import FileReader from "./reader";

const base = 'src/server/data-set';

async function getPaths(dir: string) {
  return await readdir(dir, { withFileTypes: true });
}

function direntsToPaths(dir: string, dirents: Dirent[]) {
  return dirents.map((dirent) => join(dir, dirent.name));
}

function toFileNames(path: string) {
  return path.split('/').pop();
}

const categoriesPath = await getPaths(`${base}/Words`);
const categoriesNames = categoriesPath.map(path => path.name);

const data = await Promise.all(categoriesNames.map(async category => {
  const wordDirs = direntsToPaths(`${base}/Words/${category}`, await getPaths(`${base}/Words/${category}`));
  const linkDirs = direntsToPaths(`${base}/Links/${category}`, await getPaths(`${base}/Links/${category}`));
  return { wordDirs, linkDirs, category }
}))

const dataSet = data.flatMap(({ wordDirs, linkDirs, category }) =>
  wordDirs.map((wordDir, i) => (
    {
      wordDir,
      linkDir: linkDirs[i],
      category,
      name: toFileNames(wordDir)!
    }
  )
  )
)

export type ProcessedData = {
  name: string;
  category: string;
  words: string[];
  links: string[];
}

async function processLinks(links: string) {
  const file = Bun.file(links);
  const content = (await FileReader(file)).flat()
  return content.splice(0, content.length - 1)
}

async function processWords(links: string) {
  const file = Bun.file(links);
  return (await FileReader(file, { delimiter: ' ' })).flat()
}

const processedData: ProcessedData[] = await Promise.all(dataSet.map(async ({ name, category, wordDir, linkDir }) => ({
  name,
  category,
  words: await processWords(wordDir),
  links: await processLinks(linkDir)
})))



export default processedData;
