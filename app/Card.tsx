import { useState } from "react";
import "./customCards.css";
import Image from 'next/image';


import bug from '../public/static/bug.svg'
import dark from '../public/static/dark.svg'
import dragon from '../public/static/dragon.svg'
import electric from '../public/static/electric.svg'
import fairy from '../public/static/fairy.svg'
import fighting from '../public/static/fighting.svg'
import fire from '../public/static/fire.svg'
import flying from '../public/static/flying.svg'
import ghost from '../public/static/ghost.svg'
import grass from '../public/static/grass.svg'
import ground from '../public/static/ground.svg'
import ice from '../public/static/ice.svg'
import normal from '../public/static/normal.svg'
import poison from '../public/static/poison.svg'
import psychic from '../public/static/psychic.svg'
import rock from '../public/static/rock.svg'
import steel from '../public/static/steel.svg'
import water from '../public/static/water.svg'

export default function Card({cardInp, imageURLInp}:any){
  const typeImages: { [key: string]: string } = {
    "bug": bug,
    "dark": dark,
    "dragon": dragon,
    "electric": electric,
    "fairy": fairy,
    "fighting": fighting,
    "fire": fire,
    "flying": flying,
    "ghost": ghost,
    "grass": grass,
    "ground": ground,
    "ice": ice,
    "normal": normal,
    "poison": poison,
    "psychic": psychic,
    "rock": rock,
    "steel": steel,
    "water": water,
  };

  let card = cardInp;
  let cardTextColor = `rgb(${card["textColor"][0]}, ${card["textColor"][1]}, ${card["textColor"][2]})`;
  let cardBackgroundColor = `rgb(${card["accentColor"][0]}, ${card["accentColor"][1]}, ${card["accentColor"][2]})`;
  let imageURL = imageURLInp;
  let typeImage = typeImages[card["type"]];

  let mainImg = 320;
  let icon = 30;

  return (
    <div className="my-8 mx-8">
      <div 
        style={{ backgroundColor: cardBackgroundColor, color : cardTextColor}} 
        className="w-96 rounded-3xl p-6 text-gray-800 border-black border-4 justify-center noise"
      >
        
        <h1 className="text-sm">{card["level"]}</h1>

        <h1 className="text-2xl pb-2"> 
          {card["name"]} 
          <Image
            src={typeImage}
            width={icon}
            height={icon}
            style={{ float: "right"}}
            alt="Pokemon Type"
            className={card["type"]+" icon ml-3 rounded-2xl p-1"}
          />
          <span style={{ float: "right"}}>
            <span className="text-xs">hp</span>
            {card["healthPoints"]}
          </span>
        </h1>

        <Image
          src={imageURL}
          width={mainImg}
          height={mainImg}
          alt={card["name"]+" image art"}
          className="justify-center border-solid border-4 border-gray-50"
        />

        <p className="text-xs mt-2 mb-4">{card["description"]}</p>
        <h2 className="text-lg  mb-4">
          <span style={{ float: "left"}}>
            <Image
              src={typeImage}
              width={icon}
              height={icon}
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
              width={icon}
              height={icon}
              style={{ float: "right"}}
              alt="pokemon type"
              className={card["type"]+" icon ml-3 rounded-2xl p-1"}
            />
            <Image
              src={typeImage}
              width={icon}
              height={icon}
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
    </div>
  )
}