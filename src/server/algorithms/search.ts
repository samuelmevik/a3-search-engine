import Page from "../models/page";
import PageDB from "../models/pageDB";
import processedData from "../reader/dataset-paths";

const pageDB = new PageDB(processedData)

const NOT_FOUND = 100_000
const NOT_FOUND_SCORE = 0.001
const RANK_ITER = 20

function intoWords(q: string) {
  return q.split(' ').filter(word => word.length > 0);
}

function wordFrequencyMetric(query: (number | undefined)[], page: Page) {
  return page.Words.filter(pageWord => query.includes(pageWord)).length
}

function documentLocationMetric(query: (number | undefined)[], page: Page) {
  return query
    .map(word => locationScore(word!, page.Words))
    .reduce((a, b) => a + b, 0)
}

function locationScore<T>(word: number, words: T[]) {
  for (let i = 0; i < words.length; i++) {
    if (words[i] === word) {
      return i + 1
    }
  }
  return NOT_FOUND
}

function pageRankMetric(pages: Page[]) {
  for (let i = 0; i < RANK_ITER; i++) {
    pages.forEach(page => page.pageRank = iteratePageRank(page, pages))
  }
}

function iteratePageRank(page: Page, pages: Page[]) {
  let rank = 0
  for (const otherPage of pages) {
    if (otherPage.hasLinkTo(page)) {
      rank += otherPage.pageRank / otherPage.Links.size
    }
  }
  return 0.85 * rank + 0.15
}

/*
function wordDistanceMetric(query: (number | undefined)[], page: Page) {
  let score = 0
  for (let i = 0; i < query.length - 1; i++) {
    const locA = locationScore(query[i]!, page.Words)
    const locB = locationScore(query[i + 1]!, page.Words)
    if (locA === MAX_DISTANCE || locB === MAX_DISTANCE) {
      score += MAX_DISTANCE
    } else {
      score += Math.abs(locA - locB)
    }
  }
  return score
}*/


function adjustedScores(pages: Page[], frequency: number[], location: number[], prank: number[]) {
  return pages.map((page, i) => {
    const content = frequency[i]
    const loc = location[i] * 0.8
    const rank = prank[i] * 0.5
    return {
      page,
      score: content + loc + rank,
      content: content,
      location: loc,
      pageRank: rank
    }
  })
}

function normalize(scores: number[], smallIsBetter: boolean) {
  if (smallIsBetter) {
    const min = Math.min(...scores)
    console.log(min)
    return scores.map(score => min / Math.max(score, NOT_FOUND_SCORE))
  }
  const max = Math.max(...scores, NOT_FOUND_SCORE)
  return scores.map(score => score / max)
}

pageRankMetric(pageDB.Pages())
const pageRanks = normalize(pageDB.Pages().map(page => page.pageRank), true)

export function test(q: string) {
  const words = pageDB.getIdsForWords(intoWords(q));
  const pages = pageDB.Pages();
  return pages.map(page => ({
    pageName : page.Name,
    links : [...page.Links.values()]
  }))
}


export function search(q: string) {
  const words = pageDB.getIdsForWords(intoWords(q));
  const pages = pageDB.Pages();

  const content = [], location = [];
  for (const page of pages) {
    content.push(wordFrequencyMetric(words, page))
    location.push(documentLocationMetric(words, page))
  }

  const frequencyScore = normalize(content, false)
  const locationScore = normalize(location, true)

  return adjustedScores(pages, frequencyScore, locationScore, pageRanks)
    .filter(entry => entry.score > NOT_FOUND_SCORE)
    .sort((a, b) => b.score - a.score)
}
