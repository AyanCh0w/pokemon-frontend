import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: "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",//process.env.OPENAI_API_KEY!,
});

async function pokeImage(imagePrompt: string) {
    const response = await openai.images.generate({
        prompt: imagePrompt + " NO TEXT, cartoon",
        model: "dall-e-3"
    });

    return response["data"][0]["url"];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const imageInfo = await pokeImage(req.query.prompt as string);
        res.setHeader('Content-Type', 'application/json'); // Explicitly set response content type to JSON
        res.status(200).json(imageInfo); // Ensure we return a JSON response
    } catch (err: unknown) {
        console.error(err);
        const errMsg = (err as Error).message;
        res.setHeader('Content-Type', 'application/json'); // Explicitly set response content type to JSON
        res.status(500).json({ statusCode: 500, message: errMsg });
    }
}