import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

async function pokeImage(imagePrompt: string) {
    const response = await openai.images.generate({
        prompt: imagePrompt + " NO TEXT, cartoon, pokemon artwork",
        model: "dall-e-3"
    });

    return response["data"][0]["url"];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const imageInfo = await pokeImage(req.query.prompt as string);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(imageInfo);
    } catch (err: unknown) {
        console.error(err);
        const errMsg = (err as Error).message;
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ statusCode: 500, message: errMsg });
    }
}