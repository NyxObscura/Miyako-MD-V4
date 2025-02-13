import axios from "axios";

const website = axios.create({
  baseURL: "https://app.yoursearch.ai",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Scraper By QanyPaw
 * Forbidden to sell and delete my wm, respect the creator
 */

const yousearch = async (searchTerm) => {
  const requestData = {
    searchTerm: searchTerm,
    promptTemplate: `Search term: "${searchTerm}"

Make your language less formal and use emoticons.
I want you to always use Indonesian slang from Jakarta where the words "you" and "anda" are replaced with "lu" and the word I is replaced with "gw".
Create a summary of the search results in three paragraphs with reference numbers, which you then list numbered at the bottom.
Include emojis in the summary.
Be sure to include the reference numbers in the summary.
Both in the text of the summary and in the reference list, the reference numbers should look like this: "(1)".
Formulate simple sentences.
Include blank lines between the paragraphs.
Do not reply with an introduction, but start directly with the summary.
Include emojis in the summary.
At the end write a hint text where I can find search results as comparison with the above search term with a link to Google search in this format \`See Google results: \` and append the link.
Below write a tip how I can optimize the search results for my search query.
I show you in which format this should be structured:

\`\`\`
<Summary of search results with reference numbers>

Sources:
(1) <URL of the first reference>
(2) <URL of the second reference>

<Hint text for further search results with Google link>
<Tip>
\`\`\`

Here are the search results:
{searchResults}`,
    searchParameters: "{}",
    searchResultTemplate: `[{order}] "{snippet}"
URL: {link}`,
  };

  try {
    const response = await website.post("/api", requestData);
    return response.data.response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default yousearch;
