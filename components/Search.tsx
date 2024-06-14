import { SearchQuery, Source } from "@/types";
import { IconArrowRight, IconBolt, IconLayersIntersect, IconSearch } from "@tabler/icons-react";
import endent from "endent";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";

interface SearchProps {
  onSearch: (searchResult: SearchQuery) => void;
  onAnswerUpdate: (answer: string) => void;
  onDone: (done: boolean) => void;
}

export const Search: FC<SearchProps> = ({ onSearch, onAnswerUpdate, onDone }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string>("");
  // const [apiKey, setApiKey] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a query");
      return;
    }

    let result: any = null;

    const getAdsPromise = new Promise<void>(resolve => {
      // @ts-ignore
      window.stratos.queue.push(function() {
        // @ts-ignore
        window.stratos.getAds(query, true).then(res => {
          result = res;
          resolve();
        });
      });
    });

    setLoading(true);

    const sources = await fetchSources();
    await handleStream(sources);

    await getAdsPromise;

    // @ts-ignore
    window.stratos.queue.push(function() {
      setTimeout(() => {
        if (result?.succeeded) {
          // @ts-ignore
          window.stratos.renderAds();
        } else {
          let copy = 'An error occurred while serving the ad';
          if (result?.lowRelevance) {
            copy = '<p>The user\'s prompt wasn\'t commercially relevant to our advertisers.</p><p>In cases like this, run a house ad for your own product, or a static ad based on your audience.</p>';
          } else if (result?.usOnly) {
            copy = 'We currently only serve ads to US users.';
          } else if (result?.noMatchedAdvertiser) {
            copy = 'No advertiser was found';
          } else if (result?.moderation) {
            copy = 'The user\'s prompt was flagged by OpenAds.ai\'s moderation system.';
          }
          document.getElementById('demo-chat-ad')!.innerHTML = `
          <div>
            <h2 class="text-lg font-bold">No Demo Ad</h2>
            <div>${copy}</div>
          </div>
          `;
        }
      }, 0);
    });
  };

  const fetchSources = async () => {
    const response = await fetch("/api/sources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    const { sources }: { sources: Source[] } = await response.json();

    return sources;
  };

  const handleStream = async (sources: Source[]) => {
    try {
      const prompt = endent`Provide a 2-3 sentence answer to the query based on the following sources. Be original, concise, accurate, and helpful. Cite sources as [1] or [2] or [3] after each sentence (not just the very end) to back up your answer (Ex: Correct: [1], Correct: [2][3], Incorrect: [1, 2]).

      ${sources.map((source, idx) => `Source [${idx + 1}]:\n${source.text}`).join("\n\n")}
      `;

      const response = await fetch("/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error(response.statusText);
      }

      setLoading(false);
      onSearch({ query, sourceLinks: sources.map((source) => source.url) });

      const data = response.body;

      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        onAnswerUpdate(chunkValue);
      }

      onDone(true);
    } catch (err) {
      onAnswerUpdate("Error");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // const handleSave = () => {
  //   if (apiKey.length !== 51) {
  //     alert("Please enter a valid API key.");
  //     return;
  //   }

  //   localStorage.setItem("CLARITY_KEY", apiKey);

  //   setShowSettings(false);
  //   inputRef.current?.focus();
  // };

  // const handleClear = () => {
  //   localStorage.removeItem("CLARITY_KEY");

  //   setApiKey("");
  // };

  useEffect(() => {
    // const CLARITY_KEY = localStorage.getItem("CLARITY_KEY");

    // if (CLARITY_KEY) {
    //   setApiKey(CLARITY_KEY);
    // } else {
    //   setShowSettings(true);
    // }

    inputRef.current?.focus();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center pt-64 sm:pt-72 flex-col">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <div className="mt-8 text-2xl">Getting answer...</div>
        </div>
      ) : (
        <div className="mx-auto flex h-full w-full max-w-[750px] flex-col items-center space-y-6 px-3 pt-32 sm:pt-64">
          <div className="flex items-center">
            {/* <IconLayersIntersect size={48}
              strokeWidth={.5}
              color={'#fdbb74'} /> */}
            <div className="ml-1 text-center text-4xl font-mono">OpenAds.ai Demo Search Engine</div>
          </div>

          <div className="relative w-full">
            <IconSearch color={'#333'} className="text=[#D4D4D8] absolute top-3 w-10 left-1 h-6 rounded-full opacity-50 sm:left-3 sm:top-4 sm:h-8" />

            <input
              ref={inputRef}
              className="h-12 w-full border bg-[#FFFFFF] text-[#333] pr-12 pl-11 focus:border-zinc-100 focus:bg-[#FFFFFD] focus:outline-none focus:ring-2 focus:ring-zinc-100 sm:h-16 sm:py-2 sm:pr-16 sm:pl-16 sm:text-lg"
              type="text"
              placeholder="Enter a test query."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button>
                <IconArrowRight
                color={'white'}
                onClick={handleSearch}
                className="absolute right-2 top-2.5 h-7 w-7 rounded-full bg-blue-400 p-1 hover:cursor-pointer hover:bg-blue-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10"
              />
            </button>
          </div>

          {/* <button
            className="flex cursor-pointer items-center space-x-2 rounded-full border border-zinc-600 px-3 py-1 text-sm text-[#D4D4D8] hover:text-white"
            onClick={() => setShowSettings(!showSettings)}
          >
            {showSettings ? "Hide" : "Show"} Settings
          </button> */}

          {/* {showSettings && (
            <>
              <input
                type="password"
                className="max-w-[400px] block w-full rounded-md border border-gray-300 p-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);

                  if (e.target.value.length !== 51) {
                    setShowSettings(true);
                  }
                }}
              />

              <div className="flex space-x-2">
                <div
                  className="flex cursor-pointer items-center space-x-2 rounded-full border border-zinc-600 bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  onClick={handleSave}
                >
                  Save
                </div>

                <div
                  className="flex cursor-pointer items-center space-x-2 rounded-full border border-zinc-600 bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                  onClick={handleClear}
                >
                  Clear
                </div>
              </div>
            </>
          )} */}
        </div>
      )}
    </>
  );
};
