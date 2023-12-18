// import { SearchResult, pages } from "../data/pages";

interface SearchResult {
  content: string;
}

const pages: SearchResult[] = [
  {
    content: "something1",
  },
  {
    content: "something2",
  },
  {
    content: "something3",
  },
];

class SearchEngine {
  async search(query: string): Promise<SearchResult[]> {
    const results = pages.filter((page) => {
      new RegExp(query, "i").test(page.content);
    });

    return results;
  }
}
