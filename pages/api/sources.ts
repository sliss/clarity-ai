import { OpenAIModel, Source } from "@/types";
import { Readability } from "@mozilla/readability";
import * as cheerio from "cheerio";
import { JSDOM } from "jsdom";
import type { NextApiRequest, NextApiResponse } from "next";
import { cleanSourceText } from "../../utils/sources";

type Data = {
  sources: Source[];
};

const searchHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { query, model } = req.body as {
      query: string;
      model: OpenAIModel;
    };

    const sourceCount = 4;

    // GET LINKS
    console.log('sources Search query: ', query);
    const response = await fetch(`https://www.google.com/search?q=${query}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const linkTags = $("a");

    let links: string[] = [];

    linkTags.each((i, link) => {
      const href = $(link).attr("href");
      //console.log('raw link: ', link);
      console.log('link href: ', href);

      if (href && href.startsWith("/url?q=http")) {
        const cleanedHref = href.replace("/url?q=", "").split("&")[0];

        console.log('cleaned href: ', cleanedHref);

        if (!links.includes(cleanedHref)) {
          links.push(cleanedHref);
        }
      }
    });

    console.log('list of links pre-filtering: ', links);
    const filteredLinks = links.filter((link, idx) => {
      let domain: string = '';
      try {
        domain = new URL(link).hostname;
      } catch (err) {
        console.log('error filtering links: ', err);
        console.log('error-causing link before stripping down to hostname: ', link);
        return false;
      }

      const excludeList = ["google", "facebook", "twitter", "instagram", "youtube", "tiktok"];
      if (excludeList.some((site) => domain.includes(site))) return false;

      return links.findIndex((link) => {
        try {
          return new URL(link).hostname === domain;
        } catch (err) {
          return false;
        }
      }) === idx;
    });

    const finalLinks = filteredLinks.slice(0, sourceCount);

    // SCRAPE TEXT FROM LINKS
    console.log('scraping text from links');
    const sources = (await Promise.all(
      finalLinks.map(async (link) => {
        try {
          console.log('fetching link: ', link);
          const response = await fetch(link);
          const html = await response.text();
          const dom = new JSDOM(html);
          const doc = dom.window.document;
          const parsed = new Readability(doc).parse();

          if (parsed) {
            let sourceText = cleanSourceText(parsed.textContent);

            //console.log('sourceText from link: ', sourceText);

            return { url: link, text: sourceText };
          }
        } catch(err) {
          console.log('scraping link failed for: ', link);
          return;
        }
      })
    )) as Source[];

    //console.log('sources array: ', sources);
    // filter out undefined reuslts from failed scraping
    const filteredSources = sources.filter((source) => source !== undefined);

    for (const source of filteredSources) {
      source.text = source.text.slice(0, 1500);
    }

    res.status(200).json({ sources: filteredSources });
  } catch (err) {
    console.log(err);
    res.status(500).json({ sources: [] });
  }
};

export default searchHandler;
