import { ProcessedData } from "../reader/dataset-paths";
import Page from "./page";

class PageDB {

  private wordToId = new Map<string, number>();
  private pages: Page[] = [];

  constructor(data: ProcessedData[]) {
    data.forEach(data => this.constructPage(data))
  }

  private constructPage({ name, category, words, links }: ProcessedData) {
    const page = new Page(name, category, new Set(links));
    //page.addWord(this.getIdForWordOrInsert(name)!)
    words.forEach(word => { page.addWord(this.getIdForWordOrInsert(word)!) })
    this.pages.push(page);
  }

  public getId(word: string) {
    return this.wordToId.get(word);
  }

  public getIdsForWords(words: string[]) {
    return words.map(word => this.getId(word));
  }

  private getIdForWordOrInsert(word: string) {
    if (this.wordToId.has(word)) {
      return this.wordToId.get(word);
    }
    return this.wordToId.set(word, this.wordToId.size).get(word);
  }

  public Pages() {
    return this.pages;
  }
}

export default PageDB;