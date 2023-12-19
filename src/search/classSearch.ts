// import { SearchResult, pages } from "../data/pages";

interface SearchResult {
  content: string;
}

const pages: SearchResult[] = [
  {
    content: "Today is a very good day",
  },
  {
    content: "Today is a very bad day",
  },
  {
    content: "Today is an amazing day",
  },
];

class SearchEngine {
  async search(query: string): Promise<SearchResult[]> {
    console.log(query);
    const results = pages.filter((page) =>
      new RegExp(query, "i").test(page.content)
    );

    console.log(" results from search :", results);
    return results;
  }
}

export { SearchEngine };
