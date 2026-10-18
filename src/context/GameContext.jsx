import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { CARDS, getRandomCard } from '../cards';
import SUNDER from '../assets/sunder.mp3'
import SUNDER_GIF from '../assets/sundernew.gif'
import SACRIFICE from "../assets/sacrifice.mp3"
import SACRIFICE_GIF from "../assets/sacrifice.gif"

// 1. Create the context
const GameContext = createContext(null);

const DRAWN_DEFAULT = {
    index: null,
    id: null,
    traits: null, //...
    afflictions: [],
    key: null,
    side: null,
    stats: {}
}

const getUID = () => Math.random().toString(36).slice(2);

const boardSize = 8;
const isOutOfRange = (n) => !((n > 0) && (n <= (boardSize * boardSize)));
const TURN_DEFAULT = {
    drawMax: 9999,
    drawn: 0,
    side: "blue"
};

const addUnique = (arr, el) => arr.includes(el) ? arr : [...arr, el];

let disableInteraction = [];
const enableInteraction = (ind) => {
    disableInteraction = disableInteraction.filter((v) => v !== ind)
}
const BLOOD_KARMA_IMPACT = 10;
const SOUL_KARMA_IMPACT = 20;

export function GameProvider({ children }) {

    const [turn, setTurn] = useState({...TURN_DEFAULT});

    const [hand, setHand] = useState([]);
    const [enemyHand, setEnemyHand] = useState([]);

    const [board, setBoard] = useState({});
    const [boardAvailable, setBoardAvailable] = useState({});

    const [selected, setSelected] = useState({
        id: "none",
    });
    const [enemySelected, setEnemySelected] = useState({
        id: "none",
    });

    const [soul, setSoul] = useState(0);
    const [blood, setBlood] = useState(0);
    const [karma, setKarma] = useState(100);

    const playerResources = useMemo(() => ({
        set: {
            soul: setSoul,
            blood: setBlood,
            karma: setKarma
        },
        value: {
            soul: soul,
            blood: blood,
            karma: karma
        },
        soul: {
            value: soul,
            set(...a) {return playerResources.set.soul(...a)}
        },
        blood: {
            value: blood,
            set(...a) {return playerResources.set.blood(...a)}
        },
        karma: {
            value: karma,
            set(...a) {return playerResources.set.karma(...a)}
        }
    }), [soul, blood, karma]);

    /** impacts karma */ 
    const addSoul = (n) => {
        
        let m = soul;
        let k = karma;
        k -= SOUL_KARMA_IMPACT;
        if (k < 0) return false;
        m += n;
        if (m < 0) return false;
        if (m > 10) {
            playerResources.soul.set(10);
            return true;
        }
        playerResources.soul.set(m);
        playerResources.karma.set(k);
        return true;
    }
    const addBlood = (n) => {
        
        let m = blood;
        let k = karma;
        k -= BLOOD_KARMA_IMPACT;
        if (k < 0) return false;
        m += n;
        if (m < 0) return false;
        if (m > 10) {
            playerResources.blood.set(10);
            return true;
        }
        playerResources.blood.set(m);
        playerResources.karma.set(k);
        return true;
    }


    const sacrifice = () => {
        if (karma < BLOOD_KARMA_IMPACT) return;
        //if (disableInteraction) return;
        if (selected.id === "none") return;
        if (!selected.index) return;
        let subject = document.querySelector(`#tile-${selected.index}`);
        let doc = document.querySelector('.main');
        if (!subject) return;
        let index = selected.index;
        const img = document.createElement('img')
        img.src = `${SACRIFICE_GIF}?t=${Date.now()}`;
        img.className = 'sacrifice';
        subject.prepend(img);
        let wrapper = subject.querySelector('.card-wrapper');
        let anim2 = subject.animate([
            {border: "var(--au) solid transparent"},
            {border: "var(--au) solid transparent"},
        ], {
            duration: 1,
            fill: 'forwards'
        })
        let anim1 = wrapper.animate([
            {opacity: 1},
            {opacity: 0}
        ], {
            duration: 500,
            easing: "ease-out",
            fill: 'forwards'
        });
        doc.animate([
            { transform: 'translate(0, 0)' },
            { transform: 'translate(-6px, 3px)' },
            { transform: 'translate(5px, -4px)' },
            { transform: 'translate(-4px, 4px)' },
            { transform: 'translate(3px, -3px)' },
            { transform: 'translate(-2px, 2px)' },
            { transform: 'translate(0, 0)' }
        ], {
            duration: 350,
            delay: 750,
            easing: 'ease-out'
        })
        const playSacrificeSfx = () => {
            const sfx = new Audio(SACRIFICE)
            sfx.play()
            sfx.addEventListener('ended', () => {
                _finishSacrifice(index, [anim1, anim2]);
                sfx.remove?.();
            })
        };
        addBlood(selected.stats.blood);
        playSacrificeSfx();
        setSelected({id: "none"});
        setBoardAvailable({});
        disableInteraction.push(index);
    };

    const _finishSacrifice = (index, anims = []) => {
        setBoard(prev => {
            let outp = {...prev};
            delete outp[index];
            return outp;
        });

        let realElement = document.querySelector(`#tile-${index}`);
        realElement.children[0].remove();
        let a = realElement.animate([
            {filter: "grayscale(0) blur(40px) sepia(1) saturate(10) hue-rotate(180deg)", opacity: 0, transform: "scale(1.65) rotate(5deg)"},
            {filter: "grayscale(0) blur(0px) sepia(0) saturate(1) hue-rotate(0deg)", opacity: 1, transform: "scale(1) rotate(0deg)"}
        ], {
            duration: 500
        })

        a.finished.then(() => {
            a.cancel();
        });

        for (let anim of anims) {
            anim?.cancel();
        }

        enableInteraction(index);
    }


    const sunder = () => {
        if (karma < SOUL_KARMA_IMPACT) return;
        //if (disableInteraction) return;
        if (selected.id === "none") return;
        if (!selected.index) return;
        let subject = document.querySelector(`#tile-${selected.index}`);
        let doc = document.querySelector('.main');
        if (!subject) return;
        let index = selected.index;
        let anim3 = subject.animate([
            { transform: 'translate(0, 0) scale(1)' },
            { transform: 'translate(-4px, 2px) scale(1.03)' },
            { transform: 'translate(3.5px, -3px) scale(1.06)' },
            { transform: 'translate(-4.5px, -2.5px) scale(1.09)' },
            { transform: 'translate(3px, 3.5px) scale(1.12)' },
            { transform: 'translate(-3.5px, -3px) scale(1.15)' },
            { transform: 'translate(4px, 2.5px) scale(1.17)' },
            { transform: 'translate(-3px, -4px) scale(1.19)' },
            { transform: 'translate(2.5px, 3px) scale(1.21)' },
            { transform: 'translate(-2px, -2.5px) scale(1.23)' },
            { transform: 'translate(2px, 2px) scale(1.25)' },
            { transform: 'translate(-1.5px, -1.5px) scale(1.27)' },
            { transform: 'translate(1px, 1px) scale(1.29)' },
            { transform: 'translate(0, 0) scale(1.3)' }
        ], {
            duration: 750,
            delay: 0,
            easing: 'linear'
        });
        const img = document.createElement('img');
        img.src = `${SUNDER_GIF}?t=${Date.now()}`;
        img.className = 'sunder';
        img.style.border = "0px solid transparent !important";
        img.style.outline = "0px solid transparent !important";
        subject.prepend(img);
        let wrapper = subject.querySelector('.card-wrapper');
        let anim6 = wrapper.animate([
            {opacity: 1},
            {opacity: 0}
        ], {
            duration: 500,
            easing: "ease-out",
            fill: 'forwards'
        });
        let anim4 = subject.animate([
            {border: "0px solid transparent"},
            {border: "0px solid transparent"},
        ], {
            duration: 1,
            fill: 'forwards'
        });
        //subject.style.border = "var(--au) solid transparent !important"
        let anim = subject.animate([
            {filter: "grayscale(0) sepia(0) invert(0) contrast(1.5) saturate(1) hue-rotate(0deg)", position: "relative", zIndex: "9"},
            {filter: "grayscale(0) sepia(1) invert(1) contrast(2) saturate(1) hue-rotate(720deg)", position: "relative", zIndex: "9"}
        ], {
            duration: 750,
            easing: "ease-out"
        });
        anim.finished.then(() => {
            subject.children[0].remove();
        });
        let anim2 = subject.animate([
            {filter: "grayscale(0) blur(0px) sepia(1) invert(1) contrast(2) saturate(5) hue-rotate(0deg)",position: "relative", zIndex: "9", opacity: 1, transform: "scale(1.3) rotate(0deg)"},
            {filter: "grayscale(0) blur(40px) sepia(1) invert(1) contrast(2) saturate(5) hue-rotate(0deg)",position: "relative", zIndex: "9", opacity: 0, transform: "scale(2.65) rotate(5deg)"}
        ], {
            duration: 150,
            delay: 750,
            fill: 'forwards',
            easing: "ease-out"
        });
        doc.animate([
            { transform: 'translate(0, 0)' },
            { transform: 'translate(-6px, 3px)' },
            { transform: 'translate(5px, -4px)' },
            { transform: 'translate(-4px, 4px)' },
            { transform: 'translate(3px, -3px)' },
            { transform: 'translate(-2px, 2px)' },
            { transform: 'translate(0, 0)' }
        ], {
            duration: 350,
            delay: 750,
            easing: 'ease-out'
        })
        const playSunderSfx = () => {
            const sfx = new Audio(SUNDER)
            sfx.play()
            sfx.addEventListener('ended', () => {
                _finishSunder(index, [anim, anim2, anim3, anim4, anim6]);
                sfx.remove?.();
            })
        };
        addSoul(selected.stats.soul);
        playSunderSfx();
        setSelected({id: "none"});
        setBoardAvailable({});
        disableInteraction.push(index);
    };

    const _executeSunderEffects = () => {

    };

    const _finishSunder = (index, anims) => {
        setBoard(prev => {
            let outp = {...prev};
            delete outp[index];
            return outp;
        });

        setTimeout(() => {
            let realElement = document.querySelector(`#tile-${index}`)
            let m = realElement.animate([
                {filter: "grayscale(0) blur(40px) sepia(1) saturate(10) hue-rotate(180deg)", opacity: 0, transform: "scale(1.65) rotate(5deg)"},
                {filter: "grayscale(0) blur(0px) sepia(0) saturate(1) hue-rotate(0deg)", opacity: 1, transform: "scale(1) rotate(0deg)"}
            ], {
                duration: 500,
            });
            m.finished.then(() => {
                for (let anim of anims) {
                    anim.cancel();
                }
                m.cancel();
            })
            enableInteraction(index);
        }, 100);
    }

    const addEffect = (key = "afflictions", value = "exhausted") => {

    }

    const setAvailableForMovement = (card) => {
        let ind = card.index;
        let range = card.stats.range;
        let available = {};
        let operations = [
            [boardSize, -1],
            [0, -1],
            [-boardSize, -1],
            [-boardSize, 0],
            [boardSize, 0],
            [-boardSize, 1],
            [0, 1],
            [boardSize, 1],
        ];
        let diags = [0, 2, 7, 5]; // indexes of operations from operations arary that are diagonals
        let left = [1, 9, 17, 25, 33, 41, 49, 57];
        let right = [8, 16, 24, 32, 40, 48, 56, 64];
        let criticalPoints = [
            ...left,
            ...right
        ]
        let ops = [];
        let isStandingCritically = false;
        for (let i = 0; i < operations.length; i++) ops.push((Number(operations[i][0]) + Number(operations[i][1])));
        if (criticalPoints.includes(ind)) {
            isStandingCritically = true;
            if (left.includes(ind)) {
                ops.shift();
                ops.shift();
                ops.shift();
                diags = [4, 2];
            } else {
                ops.pop();
                ops.pop();
                ops.pop();
                diags = [0, 2];
            }
        }
        for (let i = 0, care = false; i < ops.length; i++) {
            care = diags.includes(i);
            let current = ind;
            let hasReachedCriticalPoint = false;
            for (let j = 0; j < (range - ((care && (range > 1)) ? 1 : 0)); j++) { // - 0 used to be - care
                current += ops[i];
                if (isOutOfRange(current)) break;
                if (!isStandingCritically && criticalPoints.includes(current)) hasReachedCriticalPoint = true;
                if (board[current]) break;
                available[current] = true;
                if (hasReachedCriticalPoint) break;
            }
        }
        setBoardAvailable(available);
    }

    const setAvailableForPlacement = (card) => {
        let selected = card;
        const tileNum = boardSize * boardSize;
        const available = {};
        for (let i = tileNum; i > (tileNum - (boardSize * selected.stats.range)); i--) {
            if (board[i]) continue;
            let notInFront = true;
            let oor = false;

                let current = i + boardSize;
                const moveBack = (cur) => {
                    let check = cur;
                    current += boardSize;
                    oor = isOutOfRange(check);
                    if (!oor) {
                        if (board[check] && (board[check].side == "red")) {
                            notInFront = false;
                            current = Infinity;
                        }
                        moveBack(current);
                    }
                }
                moveBack(current + boardSize);

            available[i] = true;
        }
        setBoardAvailable(available);
    };

    const determineAndSetAvailable = (card) => {
        let selected = card;
        if (selected?.id === "none") return setBoardAvailable({});
        if (selected?.afflictions.includes("exhausted")) return setBoardAvailable({});
        if (selected?.index) return setAvailableForMovement(card);
        return setAvailableForPlacement(card);
    }
    
    

    useEffect(() => {
        // ...
    }, [selected]);

    const select = (index, body) => {
        if (disableInteraction.includes(index)) return;
        let empty = {id: "none"};
        if (!body) {
            if (selected.id !== "none") {
                if (!boardAvailable[index]) return;
                
                place(index, selected);
                determineAndSetAvailable(empty);
                setSelected(empty);
                return;
            }
            return;
        };
        if (selected?.id == body?.id) {
            determineAndSetAvailable(empty);
            setSelected(empty);
        } else {
            determineAndSetAvailable(body);
            setSelected(body);
        }
    }

    const place = (ind, card) => { // handled in the select function
        let wasFromSpiel = !card.index;
        if (wasFromSpiel) {
            setHand(prev => prev.filter(item => item.id !== card.id));
            setBoard(prev => {
                const outp = {...prev};
                outp[ind] = card;
                outp[ind].index = ind;
                return outp;
            })
        } else {
            setBoard(prev => {
                const oldind = card.index;
                const outp = {...prev};
                outp[ind] = {...card};
                //console.log(outp[ind]);
                //outp[ind].afflictions = [...addUnique(outp[ind].afflictions, "exhausted")]
                outp[ind].index = ind;
                delete outp[oldind];
                return outp;
            })
        }
    }

    const draw = (isEnemy = false) => {
        if (turn.drawn === turn.drawMax) return;
        const key = getRandomCard();
        const drawn = {
            ...DRAWN_DEFAULT,
            id: getUID(),
            key: key,
            stats: {...CARDS[key]}
        };
        setTurn(prev => {
            let outp = {...prev};
            outp.drawn++;
            return outp;
        })
        if (!isEnemy) {
            drawn.side = "blue";
            setHand(prev => [{...drawn}, ...prev]);
        } else {
            drawn.side = "red";
            setEnemyHand(prev => [...prev]);
        }
    }

    const endTurn = () => {
        setTurn(prev => {
            let p = {...TURN_DEFAULT};
            p["side"] = (prev.side === "blue") ? "red" : "blue";
            return p;
        });
    }

    const value = {
        // state
        boardSize,
        hand,
        setHand,
        board,
        selected,
        boardAvailable,
        select,
        place,
        sunder,
        sacrifice,
        endTurn,
        turn,
        blood,
        soul,
        karma,
        draw
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

// 3. Custom hook
export function useGame() {
    const ctx = useContext(GameContext)
    if (!ctx) {
        throw new Error('useGame must be used inside a <GameProvider>')
    }
    return ctx
}