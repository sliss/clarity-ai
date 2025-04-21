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
      publisherId: '6660be5c4e70d17b07751c91', // prod
      //publisherId: '67eccb065b9d76931e445efa', // liner
      //publisherId: '63e57237d78d35eeaab15162', // sliss-dev
      //publisherId: '66393bf0c2ae100e268f0373', // michael@openads.ai demo account
      disableInitialLoad: true,
      adSlots: [
        {
          // adUnitCode: 'clarity-demo-chat-ad',
          adUnitCode: 'demo-clarity-chat-ad-infeed',
          adFormat: 'chat',
          size: ['970', '250']
        }
      ],
      apiEndpoint: '/api/proxy-ads',
      cssOverrides: ` :root {
        --background: #ffffff;
        --text: #303030;
        --header: #666666;
        --header-background: #f5f5f5;
        --title: #000000;
        --question-bubble: #f5f5f5;
        --highlight: #4058FF;
        --action-button: #4058FF;
        --user-chat: #4058FF;
        --system-chat: #f5f5f5;
        --bubble-dot-color: #4b4b4b;
        --radius: 6px;
      }
      #visit-site-link {
        border-radius: 6px;
        text-align: center;
        background-color: #4058FF;
        color: #ffffff;
        font-weight: 500;
        padding: 12px 20px;
      }
      .ad-input button {
        color: #303030;
        background-color: #f5f5f5;
        border-radius: 6px;
      }
      .ad-input input {
        background-color: #f5f5f5;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
      }
      .ad-input-container {
        background-color: #ffffff;
      }
      .ad-questions {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        gap: 5px;
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
