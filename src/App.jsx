import React from 'react'
import './App.css'
import Board from './components/Board.jsx'
import Spiel from './components/Spiel.jsx'
import maintrack from './assets/maintrack.mp3'
import { preloadAssets } from "./preloadAssets";



const Filter = (
  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
    <defs>
      <filter id="chromatic" x="-10%" y="-10%" width="120%" height="120%">
        <feColorMatrix in="SourceGraphic" type="matrix"
          values="1 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 1 0"
          result="red" />
        <feOffset in="red" dx="-1" dy="0" result="redOffset" />

        <feColorMatrix in="SourceGraphic" type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 1 0 0
                  0 0 0 1 0"
          result="blue" />
        <feOffset in="blue" dx="1" dy="0" result="blueOffset" />

        <feColorMatrix in="SourceGraphic" type="matrix"
          values="0 0 0 0 0
                  0 1 0 0 0
                  0 0 0 0 0
                  0 0 0 1 0"
          result="green" />

        <feBlend in="redOffset" in2="green" mode="screen" result="rg" />
        <feBlend in="rg" in2="blueOffset" mode="screen" result="split" />

        <feComponentTransfer in="split" result="bright">
          <feFuncR type="linear" slope="3" intercept="-0.4" />
          <feFuncG type="linear" slope="3" intercept="-0.4" />
          <feFuncB type="linear" slope="3" intercept="-0.4" />
        </feComponentTransfer>

        {/* bigger blur */}
        <feGaussianBlur in="bright" stdDeviation="4" result="glowRaw" />

        {/* weaker glow: scale the alpha down */}
        <feComponentTransfer in="glowRaw" result="glow">
          <feFuncA type="linear" slope="0.4" />
        </feComponentTransfer>

        <feBlend in="split" in2="glow" mode="screen" />
      </filter>
    </defs>
  </svg>
);
/**
 * OLD FILTER
const Filter = <svg style={{ position: 'absolute', width: 0, height: 0 }}>
    <defs>
        <filter id="chromatic" x="-10%" y="-10%" width="120%" height="120%">
            <feColorMatrix in="SourceGraphic" type="matrix"
                values="1 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0"
                result="red" />
            <feOffset in="red" dx="-1" dy="0" result="redOffset" />

            <feColorMatrix in="SourceGraphic" type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 1 0 0
                        0 0 0 1 0"
                result="blue" />
            <feOffset in="blue" dx="1" dy="0" result="blueOffset" />

            <feColorMatrix in="SourceGraphic" type="matrix"
                values="0 0 0 0 0
                        0 1 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0"
                result="green" />

            <feBlend in="redOffset" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blueOffset" mode="screen" result="split" />

            <feComponentTransfer in="split" result="bright">
                <feFuncR type="linear" slope="3" intercept="-0.4" />
                <feFuncG type="linear" slope="3" intercept="-0.4" />
                <feFuncB type="linear" slope="3" intercept="-0.4" />
            </feComponentTransfer>
            <feGaussianBlur in="bright" stdDeviation="2" result="glow" />
            <feBlend in="split" in2="glow" mode="screen" />
        </filter>
    </defs>
</svg>
 */



function App(props) {
    const audioRef = React.useRef(null);

    const [ready, setReady] = React.useState(false)
    const [progress, setProgress] = React.useState(0)


    React.useEffect(() => {
        preloadAssets((loaded, total, percentage) => {
            setProgress(percentage);
        }).then(() => {
            setReady(true);
        });

        const playOnInteract = () => {
            let did = audioRef.current?.play()
            if (did) {
                window.removeEventListener('click', playOnInteract)
            }
        }
        window.addEventListener('click', playOnInteract)

        return () => window.removeEventListener('click', playOnInteract);
    }, []);

    if (!ready) {
        return <div className="loading-screen" style={{color: "white"}}>Loading... {Math.round(progress * 100)}%</div>
    }


    return (
        <>
            <audio ref={audioRef} src={maintrack} loop />
            {Filter}
            {
                !props.pseudo
                &&
                <div className='scanlines'></div>
            }
            <div class="noise-overlay"></div>
            <div className={`
                main
                ${props.pseudo ? "pseudo" : ""}
                ${props.pseudo ? props.pseudo : ""}
            `}>
                <div className='sidebar'>
                    <Spiel />
                </div>
                <div className="center">
                    <div className="divider"></div>
                    <Board />
                </div>
            </div>
        </>
    )
}

export default App
