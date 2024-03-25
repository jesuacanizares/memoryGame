import {useEffect, useRef, useState} from "react";
import {getImages} from "../helpers/getImages.js";
import {splitImage} from "../helpers/utils.js";

import confetti from 'canvas-confetti'

let size = 3;
let clicks = 0;
export const Cards = () => {
    const [images, setImages] = useState(getImages(size));
    const [selected, setSelected] = useState([])
    const [opened, setOpened] = useState([])

    const score = useRef(0)

    const handleClick = (item) => {
        clicks++;
        // console.log("imagen", item)
        if (selected.length < 2) setSelected(selected => selected.concat(item));
        // console.log("imagenes seleccionadas", selected.length, selected.concat(item))
    }

    useEffect(() => {
        if (selected.length === 2){
            const img1 = splitImage(selected[0])
            const img2 = splitImage(selected[1])
            if(img1 === img2) setOpened(opened => opened.concat(selected));
            setTimeout(() => setSelected([]), 500)
        }
    }, [selected]);

    //Pasar de nivel
    useEffect(() => {
        if (opened.length === images.length){
            size = size + 2;
            clearArrays()
            calculateScore()
            setImages(getImages(size))

            confetti({
                particleCount: 200,
                startVelocity: 30,
                spread: 300,
                gravity: 1.5,
                origin: {y: 0}
            })

        }
    }, [images.length, opened]);

    const clearArrays = () => {
        setSelected([])
        setOpened([])
    }
    const calculateScore = () => {
        const passLevel = size * 10;
        let total = score.current;
        const cards = size * 2;
        if (clicks === cards) {
            total = total + (cards*2) + passLevel
        } else if(clicks > cards && clicks < cards+5){
            total = total + cards + passLevel
        } else if(clicks > cards+5 && clicks < cards+10) {
            total = total + cards/2 + passLevel
        } else {
            total = total + Math.round(cards/3) + passLevel
        }
        clicks = 0;
        score.current = total;
    }
    
    let include = false
    return (
        <div className="cards">
            <h2>Score: {score.current}</h2>
            <ul>
                {
                    images.map((item, index) =>(
                        <li key={index} onClick={() => handleClick(item)}>
                            <div className="content">
                                {include = selected.includes(item) || opened.includes(item)}
                                <div className={`front ${include?'flip-front':''}`}>
                                    <img src="/question.png" alt="icon"/>
                                </div>
                                <div className={`back ${include?'flip-back':''}`}>
                                    <img src={include?item.split('|')[1]:'/question.png'} alt="icon" />
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}



