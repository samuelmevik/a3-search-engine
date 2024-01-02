class Page {
  private _words: number[] = [];
  public pageRank = 1.0;
  constructor(readonly _name: string, readonly category: string, readonly _links: Set<string>) { }

  addWord(word: number) {
    this._words.push(word)
  }

  hasWord(word: number) {
    return this._words.includes(word)
  }

  hasLinkTo(page: Page) {
    return this._links.has("/wiki/" + page.Name)
  }

  get Name() {
    return this._name;
  }

  get Words() {
    return this._words;
  }

  get Links() {
    return this._links;
  }
}

export default Page