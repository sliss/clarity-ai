import dotenv from 'dotenv';
dotenv.config();
import { Answer } from "@/components/Answer";
import { Search } from "@/components/Search";
import { SearchQuery } from "@/types";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import Head from "next/head";
import Script from 'next/script'
import { useState } from "react";
import { useEffect } from 'react';

console.log(process.env);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({ query: "", sourceLinks: [] });
  const [answer, setAnswer] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    // @ts-ignore
    window.stratosSettings = {
      publisherId: '63e57237d78d35eeaab15162',
    };

    // @ts-ignore
    window.stratos = window.stratos || { queue: [] };
    // @ts-ignore
    window.stratos.queue.push(function() {
      console.log('Stratos initialized!')
    });
  }, []);

  return (
    <>
      <Script src='https://js.stratos.blue/stratos.js' />
      <Head>
        <title>Clarity AI</title>
        <meta
          name="description"
          content="AI-powered search."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.png"
        />
      </Head>
      <div className="h-screen overflow-auto bg-[#FBEEE7] text-[#363636]">
        {answer ? (
          <Answer
            searchQuery={searchQuery}
            answer={answer}
            done={done}
            onReset={() => {
              setAnswer("");
              setSearchQuery({ query: "", sourceLinks: [] });
              setDone(false);
            }}
          />
        ) : (
          <Search
            onSearch={setSearchQuery}
            onAnswerUpdate={(value) => setAnswer((prev) => prev + value)}
            onDone={setDone}
          />
        )}
      </div>
    </>
  );
}
