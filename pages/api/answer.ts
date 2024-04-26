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
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
    console.log('OPENAI_API_KEY: ', OPENAI_API_KEY);
    const stream = await OpenAIStream(prompt, OPENAI_API_KEY);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
