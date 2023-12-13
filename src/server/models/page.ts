class Page {
  private _words: number[] = [];
  constructor(private readonly _url: string) {}

  get Url() {
    return this._url;
  }

  addWord(word: number) {
    this._words.push(word)
  }

  hasWord(word: number) {
    return this._words.includes(word)
  }
}

export default Page