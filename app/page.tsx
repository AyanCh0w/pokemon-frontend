"use client";
import { useState, useEffect } from "react";
import { doc, setDoc, getFirestore} from "firebase/firestore"; 
import { getStorage, ref, uploadBytes} from "firebase/storage";

import Card from "./Card";
import bug from '../public/static/bug.svg'
import CardGallery from "./cardGallery";
import loading from "../public/static/loading.gif"
import app from "./firebase";
import firebase from "firebase/compat/app";


export default function Home() {
  const db = getFirestore(app);
  const storage =  getStorage();
  const storageRef = ref(storage, 'some-child');
  const [inp, setInp] = useState("");
  const [status, setStatus] = useState("Generate a card");
  const [imageURL, setImageURL] = useState(bug);
  const [statusBar, setStatusBar] = useState(0);
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
    "textColor": [
      0,
      0,
      0
    ],
    "imageGen": "some fancy image gen prompt",
    "imageURL": ""
  });

  async function getCard(type : string){
    if (type != ""){
      setStatusBar(10);
      setStatus("Generating Info (~3 seconds)");
      console.log("Generating card off of: " + type)
      setStatusBar(20);

      

      const responseInfo = await fetch(`/api/pokemonInfo?type=${type}`);
      const card = await responseInfo.json();
      setCard(card);
      setStatusBar(50);

      console.log("Making image")
      setStatus("Generating Image (~15 seconds)");
      const imageResponse = await fetch(`/api/pokemonImage?prompt=${card["imageGen"]}`);
      const image = await imageResponse.text();

      setImageURL(image);
      console.log(imageURL)
      setStatusBar(90);

      setStatus("Done Generating, Make a new one?");
      card["imageURL"] = image;

      console.log(card)
      setCard(card)
      uploadCard(card);
      setInp("");
      setStatusBar(100);
    } else {
      console.log("NO INPUT, pls don't spam me")
    }
}

  async function uploadCard(card:any){
    await setDoc(doc(db, "cardData", card["name"]), {
      card
    });
  }

  return (
    <div className="inline">
      <style jsx>{`
          .status {
            width: ${statusBar}%
          }
      `}</style> 

      <span className="m-auto justify-center flex">
        <Card 
          cardInp={card} 
          imageURLInp={imageURL}
        />
      </span>

      <div className="flex justify-center">

        <div className="w-96 mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-blue-700">{status}</span>
            <span className="text-sm font-medium text-blue-700">{statusBar}%</span>
          </div>
          <div className=" bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full status"></div>
          </div>
        </div>

      </div>
        
      <div className="flex justify-center">
        <input 
          onChange={(e)=>{ setInp(e.target.value) }} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-96 p-2.5">
        </input>

        <button 
          onClick={async ()=>{
            await getCard(inp)
          }} 
          className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2"
        >Generate Card</button>
      </div>
        
      <CardGallery/>
    </div>
  )
}
