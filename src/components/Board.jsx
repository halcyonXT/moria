import React from 'react'
import './Board.css'
import Tile from './Tile'
import { useGame } from '../context/GameContext';


function Board() {
    const ctx = useGame();

    return (
        <>
            <div className='board'>
                {
                    Array.from({ length: ctx.boardSize * ctx.boardSize }, (_, i) => {
                        return <Tile 
                            key={i} 
                            size={ctx.boardSize} 
                            index={i+1} 
                        />
                    })
                }
            </div>
        </>
    )
}

export default Board
