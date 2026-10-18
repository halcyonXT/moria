import sentry from "./assets/sentry.gif"
import knight from "./assets/knight.gif"
import guard from "./assets/guard.gif"
import fs from "./assets/fateseeker.gif"
import gb from "./assets/gombrumm.gif"
import ss from "./assets/spearshot.gif"
import seer from "./assets/visionary.gif"
import bbiron from "./assets/bbiron.gif"
import abs from "./assets/absolon.gif"
import she from "./assets/sherrif.gif"
import ls from "./assets/lostsoul.gif"
import raziel from './assets/raziel.gif'
import magistrate from './assets/eidolon.gif'
import blaspheme from './assets/blaspheme.gif'
import rend from './assets/rend.gif'
import xix from './assets/xix.gif'
import wraith from './assets/wraith.gif'
import impaler from './assets/impaler.png'
import apparition from './assets/apparittion.gif'
import despot from './assets/despot.gif'
import excess from './assets/excess.png'
import penance from './assets/penance.gif'
import glutton from './assets/glutton.gif'
import forgemaster from './assets/forgemaster.gif'
import rattle from './assets/rattle.gif'
import deadweight from './assets/deadweightt.gif'
import elk from './assets/elk.gif'
import skeleton from './assets/skeleton.gif'
import owl from './assets/owl.gif'
import soullegendary from './assets/soullegendary.gif'
import prophet from './assets/prophet.gif'
import ozon from './assets/ozon.gif'
import jenstrinity from './assets/jenstrinity.gif'
import overascended from './assets/overascended.gif'
import hallowaythird from './assets/hallowaythird.gif'


const CARDS = {
    "rupture": {
        id: 'card_001',
        name: "Tom Rupture",
        attack: 4,
        defense: 2,
        soul: 1,
        blood: 7,
        range: 3,
        image: hallowaythird,
        rarity: 166,
    },
    "hallowaythird": {
        id: 'card_001',
        name: "Rasp Ozel",
        attack: 4,
        defense: 2,
        soul: 1,
        blood: 7,
        range: 3,
        image: hallowaythird,
        rarity: 166,
    },
    "overascended": {
        id: 'card_001',
        name: "Maw Burgeon",
        attack: 7,
        defense: 10,
        soul: 0,
        blood: 11,
        range: 1,
        image: overascended,
        rarity: 166,
    },
    "jenstrinity": {
        id: 'card_001',
        name: "Jen's Trinity",
        attack: 9,
        defense: 9,
        soul: 9,
        blood: 0,
        range: 1,
        image: jenstrinity,
        rarity: 166,
    },
    "prophet": {
        id: 'card_001',
        name: "First Prophet",
        attack: 4,
        defense: 5,
        soul: 0,
        blood: 6,
        range: 4,
        image: prophet,
        rarity: 166,
    },
    "halloway": {
        id: 'card_001',
        name: "Halloway Second",
        attack: 4,
        defense: 10,
        soul: 6,
        blood: 4,
        range: 2,
        image: soullegendary,
        rarity: 166,
    },
    "owl": {
        id: 'card_001',
        name: "Owl",
        attack: 0,
        defense: 1,
        soul: 0,
        blood: 0,
        range: 3,
        image: owl,
        rarity: 166,
    },
    "elk": {
        id: 'card_001',
        name: "Elk",
        attack: 1,
        defense: 3,
        soul: 3,
        blood: 1,
        range: 2,
        image: elk,
        rarity: 126,
    },
    "skeleton": {
        id: 'card_001',
        name: "Skeleon",
        attack: 2,
        defense: 1,
        soul: 0,
        blood: 0,
        range: 1,
        image: skeleton,
        rarity: 126,
    },
    "dead": {
        id: 'card_001',
        name: "Deadweight",
        attack: 1,
        defense: 10,
        soul: 0,
        blood: 6,
        range: 1,
        image: deadweight,
        rarity: 126,
    },
    // "rattle": {
    //     id: 'card_001',
    //     name: "9 Life Bishop",
    //     attack: 2,
    //     defense: 5,
    //     soul: 2,
    //     blood: 4,
    //     range: 2,
    //     image: rattle,
    //     rarity: 126,
    // },
    "forgemaster": {
        id: 'card_001',
        name: "Forgemaster",
        attack: 4,
        defense: 5,
        soul: 2,
        blood: 4,
        range: 2,
        image: forgemaster,
        rarity: 126,
    },
    "glutton": {
        id: 'card_001',
        name: "Glutton",
        attack: 0,
        defense: 3,
        soul: 1,
        blood: 3,
        range: 1,
        image: glutton,
        rarity: 126,
    },
    "penance": {
        id: 'card_001',
        name: "Penance",
        attack: 6,
        defense: 2,
        soul: 0,
        blood: 0,
        range: 2,
        image: penance,
        rarity: 126,
    },
    "excess": {
        id: 'card_001',
        name: "Excess",
        attack: 0,
        defense: 12,
        soul: 0,
        blood: 0,
        range: 4,
        image: excess,
        rarity: 126,
    },
    "despot": {
        id: 'card_001',
        name: "Despot",
        attack: 2,
        defense: 4,
        soul: 0,
        blood: 0,
        range: 3,
        image: despot,
        rarity: 126,
    },
    "apparition": {
        id: 'card_001',
        name: "Apparition",
        attack: 1,
        defense: 1,
        soul: 0,
        blood: 0,
        range: 4,
        image: apparition,
        rarity: 126,
    },
    "wraith": {
        id: 'card_001',
        name: "Ashkarai Neo",
        attack: 4,
        defense: 4,
        soul: 7,
        blood: 0,
        range: 3,
        image: wraith,
        rarity: 126,
    },
    "xix": {
        id: 'card_001',
        name: "XIX Reborn",
        attack: 2,
        defense: 3,
        soul: 8,
        blood: 0,
        range: 4,
        image: xix,
        rarity: 96,
    },
    "sever": {
        id: 'card_001',
        name: "Brother Sever",
        attack: 6,
        defense: 4,
        soul: 1,
        blood: 6,
        range: 2,
        image: rend,
        rarity: 96,
    },
    "blaspheme": {
        id: 'card_001',
        name: "Wretched Azar",
        attack: 6,
        defense: 5,
        soul: 1,
        blood: 5,
        range: 1,
        image: impaler,
        rarity: 126,
    },
    "magistrate": {
        id: 'card_001',
        name: "Primarch Pike",
        attack: 7,
        defense: 10,
        soul: 10,
        blood: 0,
        range: 2,
        image: magistrate,
        rarity: 180,
    },
    "raziel": {
        id: 'card_001',
        name: "Father Raziel",
        attack: 10,
        defense: 10,
        soul: 0,
        blood: 10,
        range: 1,
        image: raziel,
        rarity: 180,
    },
    "lostsoul": {
        id: 'card_001',
        name: "Lost Soul",
        attack: 0,
        defense: 1,
        soul: 1,
        blood: 0,
        range: 3,
        image: ls,
        rarity: 20,
    },
    "sherrif": {
        id: 'card_001',
        name: "Sherrif",
        attack: 3,
        defense: 1,
        soul: 1,
        blood: 2,
        range: 1,
        image: she,
        rarity: 70,
    },
    "absolon": {
        id: 'card_001',
        name: "Absolon Vane",
        attack: 6,
        defense: 5,
        soul: 7,
        blood: 0,
        range: 2,
        image: abs,
        rarity: 156,
    },
    "bbiron": {
        id: 'card_001',
        name: "Brother Iron",
        attack: 4,
        defense: 10,
        soul: 0,
        blood: 6,
        range: 1,
        image: bbiron,
        rarity: 156,
    },
    "spearshot": {
        id: 'card_001',
        name: "Spearshot",
        attack: 1,
        defense: 1,
        soul: 1,
        blood: 1,
        range: 3,
        image: ss,
        rarity: 35,
    },
    "gombrumm": {
        id: 'card_001',
        name: "Gombrumm",
        attack: 0,
        defense: 12,
        soul: 4,
        blood: 0,
        range: 1,
        image: gb,
        rarity: 15,
    },
    "fateseeker": {
        id: 'card_001',
        name: "Fateseeker",
        attack: 4,
        defense: 2,
        soul: 3,
        blood: 1,
        range: 2,
        image: fs,
        rarity: 20,
    },
    "sentry": {
        id: 'card_001',
        name: "Sentry",
        attack: 1,
        defense: 4,
        soul: 2,
        blood: 1,
        range: 1,
        image: sentry,
        rarity: 80,
    },
    "guard": {
        id: 'card_02301',
        name: "Guard",
        attack: 3,
        defense: 2,
        soul: 1,
        blood: 2,
        range: 1,
        image: guard,
        rarity: 80,
    },
    "philosopher": {
        id: 'card12454125345_001',
        name: "Seer",
        attack: 1,
        defense: 1,
        soul: 3,
        blood: 1,
        range: 1,
        image: seer,
        rarity: 40,
    },
    "knight": {
        id: 'card_6441q23001',
        name: "Paladin",
        attack: 4,
        defense: 4,
        soul: 3,
        blood: 4,
        range: 2,
        image: knight,
        rarity: 30,
    },
    // ...
};

let cardPool = [];
const keys = Object.keys(CARDS);

for (let i = 0; i < keys.length; i++) {
    cardPool = [...cardPool, ...Array(CARDS[keys[i]].rarity).fill(keys[i])];
}

const getRandomCard = () => cardPool[~~(Math.random() * cardPool.length)];

export {
    CARDS,
    getRandomCard
}