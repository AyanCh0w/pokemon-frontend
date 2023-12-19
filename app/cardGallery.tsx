import Card from "./Card"
import { useEffect, useState } from "react";
import bug from "../public/static/fire.svg"
import { collection } from "firebase/firestore";
import app from "./firebase";
import { getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


export default function CardGallery(){
    const db = getFirestore(app);
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
            <div className="flex justify-center">
                <button onClick={get} className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded mt-4">
                    <p>Reload</p>
                </button>
            </div>
            <span className="grid justify-center 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {cards.map((card:any)=>(
                    <Card cardInp={card} imageURLInp={card["imageURL"]} className=""/>
                ))}
            </span>
        </>
    )
}