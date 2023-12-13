import Page from "./page";

class PageDB {
  private wordToId = new Map<string, number>();
  private pages: Page[] = [];

  getIdForWord(word: string) {
    if (this.wordToId.has(word)) {
      return this.wordToId.get(word)!;
    }
    const id = this.wordToId.size;
    this.wordToId.set(word, id);
    return id;
  }

  get Pages() {
    return this.pages;
  }
}

export default PageDB;