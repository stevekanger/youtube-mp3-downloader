import { SearchSuggestion } from "../_types/search";

/**
 * Gets search suggestions for youtube
 *
 * @param query - The current query string
 */
export async function getSearchSuggestions(
  query: string,
): Promise<SearchSuggestion[]> {
  const callbackName = `cb_${Date.now()}`;

  return new Promise<SearchSuggestion[]>((resolve) => {
    (window as any)[callbackName] = (data: any) => {
      resolve(
        data[1].map((item: any, index: number) => ({
          id: index,
          value: item[0],
        })),
      );

      delete (window as any)[callbackName];
      document.getElementById(callbackName)?.remove();
    };

    const script = document.createElement("script");
    script.id = callbackName;
    script.src = `https://suggestqueries.google.com/complete/search?client=youtube&q=${encodeURIComponent(query)}&callback=${callbackName}`;
    document.body.appendChild(script);
  });
}
