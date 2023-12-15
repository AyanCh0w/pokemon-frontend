"use client";
import { useState, useEffect } from "react";
import Card from "./Card";
import Image from "next/image";
import bug from '../public/static/bug.svg'
import { doc, setDoc } from "firebase/firestore"; 
import db from "./firebase";

export default function Home() {

  const [inp, setInp] = useState("");
  const [status, setStatus] = useState("Generate a card");
  const [imageURL, setImageURL] = useState(bug);
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
        200,
        215,
        230
    ],
    "imageGen": "some fancey image gen prompt",
    "textColor": [
      0,
      0,
      0
    ],
  });

  async function getCard(type : string){
    if (type != ""){
      setStatus("Generating Info (~3 seconds)");
      console.log("Generating card off of: " + type)

      const responseInfo = await fetch(`http://localhost:3001/pokemonInfo?type="${type}"`);
      const card = await responseInfo.json();
      setCard(card);

      console.log("Making image")
      setStatus("Generating Image (~15 seconds)");
      const imageResponse = await fetch(`http://localhost:3001/pokemonImage?prompt=${card["imageGen"]}`);
      const image = await imageResponse.text();
      setImageURL(image);

      setStatus("Done Generating, Make a new one?");
      uploadCard(card);
      setInp("");
    } else {
      console.log("NO INPUT, pls dont spam me")
    }
  }

  async function uploadCard(card:any){
    await setDoc(doc(db, "cardData", card["name"]), {
      card
    });
  async function getCard(type : string){
    setStatus("Generating Info (~3 seconds)");

    const responseInfo = await fetch(`https://pokebackend-durj.onrender.com/pokemonInfo?type="${type}"`);
    const card = await responseInfo.json();

    setStatus("Generating Image (~15 seconds)");
    const imageResponse = await fetch(`https://pokebackend-durj.onrender.com/pokemonImage?prompt=${card["imageGen"]}`);
    const image = await imageResponse.text();
    setImageURL(image);

    setStatus("Done Generating, Make a new one?");
    return card;
  }

  return (
    <div className="">

      <span className="m-auto justify-center flex">
        <Card 
          cardInp={card} 
          imageURLInp={imageURL}
        />
      </span>

      <div className="flex justify-center">
        <input 
          onChange={(e)=>{
            setInp(e.target.value);
          }} 
          className="border-black border-2 w-96 h-8 rounded-lg p-5">
        </input>
        <br />

        <button 
          onClick={async ()=>{
            await getCard(inp)
          }} 
          className="border-black border-2 rounded-lg w-36 h-10 ml-2"
        >Generate Card</button>
      </div>

      <span className="justify-center flex">
        <h4 className="w-72 mt-2">{status}</h4>
      </span>

      <h2 className="text-3xl">Already Generated Cards</h2>
        
      <span className="grid grid-cols-3 justify-center">
        <Card cardInp={card} imageURLInp={imageURL}/>
      </span>
    </div>
  )
}
