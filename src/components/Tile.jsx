import React from 'react'
import in1 from "../assets/newinner1.png"
import in2 from "../assets/newinner2.png"
import in3 from "../assets/newinner3.png"
import ov1 from "../assets/over1.png"
import ov2 from "../assets/over2.png"
import ov3 from "../assets/over3.png"
import ov4 from "../assets/over4.png"
import bactive from "../assets/thinborder.png"
import binactive from "../assets/thinborder-in.png"
import { CARDS } from '../cards'
import { useGame } from '../context/GameContext'
import { AFFLICTIONS } from '../effects'

const inners = {
    0: in1,
    1: in2,
    2: in3,
}
const overs = {
    0: ov1,
    1: ov2,
    2: ov3,
    3: ov4
}

const gap = "2.55%";
const size = "calc(2 * var(--au))";

function Tile(props) {
    const ctx = useGame();
    const [hasAnimated, setHasAnimated] = React.useState(false);
    const [bg, setBg] = React.useState(inners[~~(Math.random() * (Object.keys(inners)).length)]);
    const [bg1, setBg1] = React.useState(overs[~~(Math.random() * 4)]);
    const [body, setBody] = React.useState(!ctx.board[props.index] ? (props.card ? props.card : null) : ctx.board[props.index]);

    React.useEffect(() => {
        if (props.animate) {
            setTimeout(() => {
                setHasAnimated(true);
            }, 255)
        }
    }, [])

    React.useEffect(() => {
        if (!body && ctx.board[props.index]) {
            setBody(ctx.board[props.index]);
        }
        if (body && !ctx.board[props.index] && !props.card) {
            setBody(null);
        }
    }, [ctx.board]);

    const afflictionsElement = (() => {
        if (!body) return <></>;
        if (body.afflictions.length === 0) return <></>;
        return <div className="card-bot-left card-bot-bot">{body.afflictions.map(v => AFFLICTIONS[v].symbol + " ")}</div>
    })();

    const traitsElement = (() => {
        if (!body) return <></>
        
    })();

    return (
        <>
            <div id={`tile-${props.index}`} className={`tile 
                ${ctx.selected?.id == body?.id ? 'selected' : ''} 
                ${(props.animate && !hasAnimated) ? 'animate' : ''}
                ${ctx.boardAvailable[props.index] ? 'available' : ''}
            `
            } 
            onClick={
                () => ctx.select(props.index, body)
            }
            style={{
                width: `calc(100% / ${props.size} - ${gap}`, 
                marginBottom: `${gap}`, 
                marginRight: `${gap}`, 
                height: `calc(100% / ${props.size} - ${gap}`, 
                borderImageSource: body ? ((ctx.turn.side === "blue") ? `url("${bactive}")` : `url("${binactive}")`) : `url("${binactive}")`, // is there a character on this field or not
                ...props.styleOverride
            }}>
                {
                    body
                    ?
                    <>
                        {
                            <img className='tile-inner' src={bg1} style={{position: 'absolute', pointerEvents: 'none', zIndex: '9', mixBlendMode: 'lighten', filter: 'brightness(2)'}}/>
                        }
                        <div className='card-wrapper'>
                            <div className="card-top">
                                <img src={CARDS[body.key].image} className="card-top-inner" />
                            </div>
                            <div className="card-mid">
                                {CARDS[body.key].name}
                            </div>
                            <div className="card-essence">
                                <span className='blood'>{CARDS[body.key].blood}</span>
                                <span className="soul">{CARDS[body.key].soul}</span>
                            </div>
                            <div className="card-bot">
                                <span className='attack'>{CARDS[body.key].attack}</span>
                                <span className="defend">{CARDS[body.key].defense}</span>
                            </div>
                            {
                                afflictionsElement
                            }
                            {
                                traitsElement
                            }
                        </div>
                    </>
                    :
                    <>
                        <img className='tile-inner' src={bg}/>
                    </>
                }
            </div>
        </>
    )
}

export default Tile
