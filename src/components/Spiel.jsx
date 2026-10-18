import React from 'react'
import "./Spiel.css"
import Tile from './Tile.jsx';
import { useGame } from '../context/GameContext.jsx'
import bloodbar0 from "../assets/FRAME FRAME/0.png"
import bloodbar1 from "../assets/FRAME FRAME/1.png"
import bloodbar2 from "../assets/FRAME FRAME/2.png"
import bloodbar3 from "../assets/FRAME FRAME/3.png"
import bloodbar4 from "../assets/FRAME FRAME/4.png"
import bloodbar5 from "../assets/FRAME FRAME/5.png"
import bloodbar6 from "../assets/FRAME FRAME/6.png"
import bloodbar7 from "../assets/FRAME FRAME/7.png"
import bloodbar8 from "../assets/FRAME FRAME/8.png"
import bloodbar9 from "../assets/FRAME FRAME/9.png"
import bloodbar10 from "../assets/FRAME FRAME/10.png"
import soulbar0 from "../assets/FRAME FRAME SOUL/0.png"
import soulbar1 from "../assets/FRAME FRAME SOUL/1.png"
import soulbar2 from "../assets/FRAME FRAME SOUL/2.png"
import soulbar3 from "../assets/FRAME FRAME SOUL/3.png"
import soulbar4 from "../assets/FRAME FRAME SOUL/4.png"
import soulbar5 from "../assets/FRAME FRAME SOUL/5.png"
import soulbar6 from "../assets/FRAME FRAME SOUL/6.png"
import soulbar7 from "../assets/FRAME FRAME SOUL/7.png"
import soulbar8 from "../assets/FRAME FRAME SOUL/8.png"
import soulbar9 from "../assets/FRAME FRAME SOUL/9.png"
import soulbar10 from "../assets/FRAME FRAME SOUL/10.png"
import karmabar0 from "../assets/FRAME FRAME KARMA/0.png"
import karmabar1 from "../assets/FRAME FRAME KARMA/1.png"
import karmabar2 from "../assets/FRAME FRAME KARMA/2.png"
import karmabar3 from "../assets/FRAME FRAME KARMA/3.png"
import karmabar4 from "../assets/FRAME FRAME KARMA/4.png"
import karmabar5 from "../assets/FRAME FRAME KARMA/5.png"
import karmabar6 from "../assets/FRAME FRAME KARMA/6.png"
import karmabar7 from "../assets/FRAME FRAME KARMA/7.png"
import karmabar8 from "../assets/FRAME FRAME KARMA/8.png"
import karmabar9 from "../assets/FRAME FRAME KARMA/9.png"
import karmabar10 from "../assets/FRAME FRAME KARMA/10.png"
import tempkarma from "../assets/FRAME FRAME KARMA/new/1.png"
import tempkarmaoff from "../assets/FRAME FRAME KARMA/new/0.png"
import soultemp from "../assets/tempsoul1.png"

let BLOOD_BARS = {
    0: bloodbar0,
    1: bloodbar1,
    2: bloodbar2,
    3: bloodbar3,
    4: bloodbar4,
    5: bloodbar5,
    6: bloodbar6,
    7: bloodbar7,
    8: bloodbar8,
    9: bloodbar9,
    10: bloodbar10,
}
let SOUL_BARS = {
    0: soulbar0,
    1: soulbar1,
    2: soulbar2,
    3: soulbar3,
    4: soulbar4,
    5: soulbar5,
    6: soulbar6,
    7: soulbar7,
    8: soulbar8,
    9: soulbar9,
    10: soulbar10,
}
let KARMA_BARS = {
    0: karmabar0,
    1: karmabar1,
    2: karmabar2,
    3: karmabar3,
    4: karmabar4,
    5: karmabar5,
    6: karmabar6,
    7: karmabar7,
    8: karmabar8,
    9: karmabar9,
    10: karmabar10,
}
let KARMA_NAMES = {
    10: "BLESSED",
    9: "BLESSED",
    8: "FAVORED",
    7: "LUCKY",
    6: "CHARMED",
    5: "STEADY",
    4: "WANING",
    3: "UNLUCKY",
    2: "FORSAKEN",
    1: "CURSED",
    0: "CURSED",
}

let animated_pool = {};

function Spiel(props) {
    const game = useGame();

    const drawCardHandler = () => {
        game.draw();
    }

    return (
        <>
            <div className='spiel'>
                
                {
                    game.hand.map(((v, i) => <Tile 
                            animate={i === 0}
                            key={v.id} 
                            size={8} 
                            card={v}
                            styleOverride={{height: "calc(var(--au) * 68)", width: "calc(var(--au) * 68)", margin: "calc(var(--au) * 3)"}}
                        />))
                }
            </div>
            <br/>
            <div className="spiel-under">
                <button className="spiel-actions top-actions" style={{opacity: (game.turn.drawn === game.turn.drawMax) ? 0.5 : 1}} onClick={drawCardHandler}>Draw</button>
                <button className="spiel-actions top-actions" onClick={game.endTurn}>End Turn</button>
                <button className="spiel-actions action-sunder" onClick={game.sunder}>Sunder</button>
                <button className="spiel-actions action-sacrifice" onClick={game.sacrifice}>Sacrifice</button>
                <div className='rbar bar-blood'>
                    <div className='border-blood-under'></div>
                    <div className='border-blood' style={{backgroundImage: `url(${BLOOD_BARS[game.blood]})`}}></div>
                    <div className='innerbar inner-blood' style={{width: `${(game.blood / 10) * 100}%`}}></div>
                    <div className="innertext innertext-blood">{game.blood == 10 ? "ENGORGED" : ""}</div>
                </div>
                <div className='rbar bar-soul'>
                    <div className='border-blood-under soul-under'></div>
                    <div className='border-blood' style={{backgroundImage: `url(${SOUL_BARS[game.soul]})`}}></div>
                    <div className='innerbar inner-soul' style={{width: `${(game.soul / 10) * 100}%`}}></div>
                    <div className="innertext innertext-soul">{game.soul == 10 ? "CHARGED" : ""}</div>
                </div>
                <div className='rbar bar-soul'>
                    <div className='border-blood' style={{backgroundImage: `url(${game.karma == 100 ? tempkarma : tempkarmaoff})`}}></div>
                    <div className='border-blood-under karma-under'></div>
                    <div className="count-karma">{game.karma === 100 ? "" : game.karma}</div>
                    <div className='innerbar inner-karma' style={{width: `${(game.karma / 100) * 100}%`}}></div>
                    <div className="innertext innertext-karma">{KARMA_NAMES[Math.ceil(game.karma / 10)]}</div>
                </div>
            </div>
        </>
    )
}

export default Spiel
