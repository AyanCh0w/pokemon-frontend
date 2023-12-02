"use client";
import { useState } from "react";
import Image from 'next/image';
import "./customCards.css";

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

    const responseInfo = await fetch(`https://pokebackend-durj.onrender.com/pokemonInfo?type="${type}"`);
    const card = await responseInfo.json();
    console.log(card);

    setStatus("Generating Image (~15 seconds)");
    const imageResponse = await fetch(`https://pokebackend-durj.onrender.com/pokemonImage?prompt=${card["imageGen"]}`);
    const image = await imageResponse.text();
    setImageURL(image);
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