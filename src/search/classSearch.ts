import { SearchResult, pages } from "../data/pages";

class SearchEngine {
  async search(query: string): Promise<SearchResult[]> {
    const results = pages.filter((page) =>
      new RegExp(query, "i").test(page.content)
    );
    return results;
  }
}

export { SearchEngine };
