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
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false);

  const exampleSearches = [
    "How do I train for a half marathon?",
    "What's the best Tuscan recipe for dinner parties?",
    "What should I pack for a trip to Japan?",
    "How can I improve my public speaking skills?",
    "What are the latest developments in renewable energy?"
  ];

  const handleExampleSearch = (example: string) => {
    setQuery(example);
    setTriggerSearch(true);
  };

  useEffect(() => {
    if (triggerSearch && query.trim()) {
      handleSearch();
      setTriggerSearch(false);
    }
  }, [query, triggerSearch]);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a query");
      return;
    }

    let result: any = null;

    // @ts-ignore
    window.stratos.queue.push(function() {
      // @ts-ignore
      window.stratos.getAds(query, true);
    });

    setLoading(true);

    const sources = await fetchSources();
    await handleStream(sources);

    // @ts-ignore
    window.stratos.queue.push(function() {
      // @ts-ignore
      window.stratos.renderAds();
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

  useEffect(() => {
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

            <button onClick={() => setTriggerSearch(true)}>
              <IconArrowRight
                color={'white'}
                className="absolute right-2 top-2.5 h-7 w-7 rounded-full bg-blue-400 p-1 hover:cursor-pointer hover:bg-blue-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10"
              />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {exampleSearches.map((example, index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                onClick={() => handleExampleSearch(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
