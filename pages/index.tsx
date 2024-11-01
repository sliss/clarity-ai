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
      // publisherId: '6660be5c4e70d17b07751c91', // prod
      publisherId: '63e57237d78d35eeaab15162', //sliss-dev
      adSlots: [
        {
          // adUnitCode: 'clarity-demo-chat-ad',
          adUnitCode: 'demo-clarity-chat-ad-infeed',
          adFormat: 'chat',
          size: 'fluid',
        }
      ],
      cssOverrides:
        `:root {
        --background: #f5efdd;
        --text: #000;
        --header: #ffffff4c;
        --header-background: #ffffff10;
        --title: #000;
        --highlight: #c8ddff;
        --action-button: #3b82f6;
        --question-bubble: #FFF;
        --radius: 5px;
        --user-chat: #0061ff;
        --system-chat: #e0e0e0;
      }
      #visit-site-link {
        color: #FFF;
      }
      .ad-questions li:hover {
        color: #000;
      }`
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
      <div className="h-screen overflow-auto bg-[#f5f3ed] text-[#333]">
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
