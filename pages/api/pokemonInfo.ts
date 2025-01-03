import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

async function pokeMaker(pokemonType: string) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant designed to output JSON. Include, name (string), level (string) Basic or Mega , healthPoints (int), attackName1 (string), attackDamage1 (int), attackName2 (string), attackDamage2 (int), description (1 sentence string), backstory (short 2 sentences string), imageGen (detailed description to generate image string) accentColor (list of rgb values), textColor (list of rgb values), type (string) either bug dark dragon electric fairy fighting fire flying ghost grass ground ice normal poison psychic rock steel water all in lowercase",
        },
        {
          role: "user",
          content: `Generate a unique pokemon card themed from ${pokemonType}`,
        },
      ],
      model: "gpt-4o",
      response_format: { type: "json_object" },
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error("No content received from the completion response");
    }

    const output = JSON.parse(completion.choices[0].message.content);
    return output;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create completion");
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (typeof req.query.type !== "string") {
      return res.status(400).json({ error: "Bad request" });
    }

    const result = await pokeMaker(req.query.type);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    console.log(process.env.OPENAI_API_KEY);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
