import { BunFile } from "bun";

type FileReader = {
  delimiter?: string;
  skipRows?: number;
  skipColumns?: number;
  skipEndRows?: number;
};

export default async function FileReader(
  file: BunFile,
  options: FileReader = {},
) {
  const { delimiter = '\t', skipRows = 0, skipColumns = 0 } = options;

  const text = await file.text();
  const lines = text.split(/\r\n|\n/);

  const data = lines
    .slice(skipRows)
    .map((line) => line.split(delimiter).slice(skipColumns));

  return data
}
