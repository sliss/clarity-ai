import { OpenAIStream } from "@/utils/answer";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { prompt } = (await req.json()) as {
      prompt: string;
      // apiKey: string;
    };
    const OPENAI_KEY = process.env.OPENAI_KEY || '';
    console.log('OPENAI KEY: ', OPENAI_KEY);
    const stream = await OpenAIStream(prompt, OPENAI_KEY);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
