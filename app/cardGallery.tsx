import Card from "./Card"
import { useEffect, useState } from "react";
import bug from "../public/static/fire.svg"
import { collection } from "firebase/firestore";
import db from "./firebase";
import { getDocs } from "firebase/firestore";

export default function CardGallery(){
    const cardDataRef = collection(db, "cardData");

    const [cards, setCards] = useState([]);
    const [imageURL, setImageURL] = useState([bug]);

    async function get(){
        var out:any = []
        const querySnapshot = await getDocs(cardDataRef);
        const cards = await Promise.all(
            querySnapshot.docs.map(async (doc) => ({
              data: await doc.data(),
            }))
        );
        for (const card of cards) {
            out.push(card.data.card)
        }
        setCards(out)
        return out;
    }

    useEffect(()=>{
        get()
    }, [])

    return (
        <>
            <button onClick={get}>Reload</button>
            <span className="grid justify-center xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
                {cards.map((card:any)=>(
                    <Card cardInp={card} imageURLInp={card["imageURL"]} className=""/>
                ))}
            </span>
        </>
    )
}