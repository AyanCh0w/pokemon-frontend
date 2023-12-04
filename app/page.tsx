"use client";
import { useState } from "react";
import Image from 'next/image';
import OpenAI from "openai";
require('dotenv').config()
import "./customCards.css";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

import bug from '../public/bug.svg'
import dark from '../public/dark.svg'
import dragon from '../public/dragon.svg'
import electric from '../public/electric.svg'
import fairy from '../public/fairy.svg'
import fighting from '../public/fighting.svg'
import fire from '../public/fire.svg'
import flying from '../public/flying.svg'
import ghost from '../public/ghost.svg'
import grass from '../public/grass.svg'
import ground from '../public/ground.svg'
import ice from '../public/ice.svg'
import normal from '../public/normal.svg'
import poison from '../public/poison.svg'
import psychic from '../public/psychic.svg'
import rock from '../public/rock.svg'
import steel from '../public/steel.svg'
import water from '../public/water.svg'

export default function Home() {

  const [inp, setInp] = useState("");
  const [card, setCard] = useState({
    "name": "Example",
    "level": "Basic",
    "type":"normal",
    "healthPoints": 200,
    "attackName1": "Example Attack",
    "attackDamage1": 50,
    "attackName2": "Example Attack",
    "attackDamage2": 100,
    "description": "This pokemon is doing something",
    "backstory": "Small backstory on the pokemon",
    "accentColor": [
        215,
        215,
        215
    ],
    "imageGen": ""
  });
  const [cardBackgroundColor, setCardBackgroundColor] = useState("");
  const [cardTextColor, setCardTextColor] = useState("");
  const [status, setStatus] = useState("Generate a card");
  const [typeImage, setTypeImage] = useState(normal);
  const [imageURL, setImageURL] = useState("./ghost.svg");

  async function pokeMaker(pokemonType:string){
    const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant designed to output JSON. Include, name (string), leve (string) Basic or Mega , healthPoints (int), attackName1 (string), attackDamage1 (int), attackName2 (string), attackDamage2 (int), description (1 sentence string), backstory (short 2 sentences string), imageGen (detailed description to generate image string) accentColor (list of rgb values), textColor (list of rgb values), type (string) either bug dark dragon electric fairy fighting fire flying ghost grass ground ice normal poison psychic rock steel water",
          },
          { role: "user", content: "Generate a uniqe pokemon card themed from "+ pokemonType },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
    });
    let output = JSON.parse(completion.choices[0].message.content!)
    console.log("Info Output: " + output);
    return output;
  } 



  async function pokeImage(imagePrompt:string){
    const image = await openai.images.generate({
        prompt: imagePrompt + " NO TEXT, cartoon",
        model: "dall-e-3"
    });
    console.log("Image: " + image["data"][0]["url"]);
    return image["data"][0]["url"];
  }

  async function getTypeImage(type: string) {
    if (type === "bug") {
      setTypeImage(bug);
    } else if (type === "dark") {
      setTypeImage(dark);
    } else if (type === "dragon") {
      setTypeImage(dragon);
    } else if (type === "electric") {
      setTypeImage(electric);
    } else if (type === "fairy") {
      setTypeImage(fairy);
    } else if (type === "fighting") {
      setTypeImage(fighting);
    } else if (type === "fire") {
      setTypeImage(fire);
    } else if (type === "flying") {
      setTypeImage(flying);
    } else if (type === "ghost") {
      setTypeImage(ghost);
    } else if (type === "grass") {
      setTypeImage(grass);
    } else if (type === "ground") {
      setTypeImage(ground);
    } else if (type === "ice") {
      setTypeImage(ice);
    } else if (type === "normal") {
      setTypeImage(normal);
    } else if (type === "poison") {
      setTypeImage(poison);
    } else if (type === "psychic") {
      setTypeImage(psychic);
    } else if (type === "rock") {
      setTypeImage(rock);
    } else if (type === "steel") {
      setTypeImage(steel);
    } else if (type === "water") {
      setTypeImage(water);
    } else {
      setTypeImage(fire);
    }
  }

  async function getCard(type : string){
    setStatus("Generating Info (~3 seconds)");
    console.log("Input: "+type);

    const responseInfo = await pokeMaker(type);
    const card = await responseInfo.json();
    console.log(card);

    setStatus("Generating Image (~15 seconds)");
    const imageResponse = await pokeImage(card["imageGen"]);
    let image;
    if (imageResponse){
      const image = await imageResponse;
      setImageURL(image);
    } else {
      setImageURL("data:image/jpeg;base64,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");
    }
    
    console.log("ImgURL: "+image);

    setCardBackgroundColor(`rgb(${card["accentColor"][0]}, ${card["accentColor"][1]}, ${card["accentColor"][2]})`);
    setCardTextColor(`rgb(${card["textColor"][0]}, ${card["textColor"][1]}, ${card["textColor"][2]})`);
    getTypeImage(card["type"]);

    setStatus("Done Generating, Make a new one?");
    return card;
  }

  return (
    <body>
      <main className="my-8">
        <div>
          <h1 className="text-5xl justify-center flex mb-2 fun font-bold">Pokemon Maker</h1>
          <h1 className="text-xl justify-center flex mb-8 fun">Type an idea and get fighting! *first time loading may take ~2mins to boot up</h1>
        </div>
        <div style={{ backgroundColor: cardBackgroundColor, color : cardTextColor}} className="w-96 rounded-3xl p-6 m-auto text-gray-800 border-black border-4 justify-center noise">
          <h1 className="text-sm">{card["level"]}</h1>

          <h1 className="text-2xl pb-2"> 
            {card["name"]} 
            <Image
              src={typeImage}
              width={30}
              height={30}
              style={{ float: "right"}}
              alt="pokemon type"
              className={card["type"]+" icon ml-3 rounded-2xl p-1"}
            />
            <span style={{ float: "right"}}>
              <span className="text-xs">hp</span>
              {card["healthPoints"]}
            </span>
          </h1>

          <Image
              src={imageURL}
              width={1000}
              height={1000}
              alt={card["name"]+" image art"}
              className="justify-center border-solid border-4 border-gray-50"
          />

          <p className="text-xs mt-2 mb-4">{card["description"]}</p>
          <h2 className="text-lg  mb-4">
            <span style={{ float: "left"}}>
              <Image
                src={typeImage}
                width={30}
                height={30}
                style={{ float: "right"}}
                alt="pokemon type"
                className={card["type"]+" icon ml-3 rounded-xl p-1"}
              />
            </span>
            &emsp;&emsp; {card["attackName1"]} 
            <span style={{ float: "right"}}>
              {card["attackDamage1"]}
            </span>
          </h2>

          <h2 className="text-lg  mb-4">
            <span style={{ float: "left"}}>
              <Image
                src={typeImage}
                width={30}
                height={30}
                style={{ float: "right"}}
                alt="pokemon type"
                className={card["type"]+" icon ml-3 rounded-2xl p-1"}
              />
              <Image
                src={typeImage}
                width={30}
                height={30}
                style={{ float: "right"}}
                alt="pokemon type"
                className={card["type"]+" icon ml-3 rounded-2xl p-1"}
              />
            </span>
            &emsp;&emsp; {card["attackName2"]} 
            <span style={{ float: "right"}}>
              {card["attackDamage2"]}
            </span>
          </h2>
          <h4 className="text-xs">{card["backstory"]}</h4>
        </div>
      </main>

      <div className="justify-center flex">
        <button>Coming Soon</button>
        <input onChange={(e)=>{setInp(e.target.value);}} className="border-black border-2 w-96 h-8 rounded-lg p-5" placeholder="space and all power"></input>
        <br />
        <button onClick={async ()=>{
          setCard(await getCard(inp));
        }} className="border-black border-2 rounded-lg w-36 ml-2">Generate Card</button>
      </div>
      <h4 className="justify-center flex mt-10">{status}</h4>
    </body>
  )
}