'use client';

import { useEffect, useRef, useState } from "react"

const INIT_LAYOUT = [
    0b001101100,
    0b010010010,
    0b100000001,
    0b100000001,
    0b010000010,
    0b001000100,
    0b000101000,
    0b000010000,0
]
const INIT_MOD = [0,0,0,0,0,0,0,0]

function heartGlitch(): number[] {
    const GLITCH_PROB = 0.05;

    let res = INIT_MOD.map((x) => x)
    for (var i=0; i < 8; i++) {
        for (var j=0; j < 9; j++) {
            if (Math.random() <= GLITCH_PROB) { res[i] ^= (1<<j); }
        }
    }

    return res;
}

export default function GridHeart() {
    
    let divRef = useRef<HTMLDivElement>(null);
    let modPattern = useRef<number[]>(INIT_MOD);
    let [ truePattern, setTruePattern ] = useState<number[]>(INIT_LAYOUT);
    
    // useEffect(() => {
    //     let glitchInterval = setInterval(() => {
    //         modPattern.current = heartGlitch();
    //         setTruePattern(INIT_LAYOUT.map((x,i) => (x ^ modPattern.current[i])))
    //     }, 500);

    //     return () => clearInterval(glitchInterval);
    // }, []);

    return (<div ref={divRef} className="grid grid-rows-9 grid-cols-9 w-[50px] h-[50px] bg-red-100">
        {truePattern.map((row,j) => {return [... Array(9).keys()].map((i) => (
                <div key={`gh-${j}-${i}`} className="w-full h-full" style={{background: (row & (1<<(8-i))) ? 'black' : 'white'}}>
                </div>
            ))}
        )}
    </div>)

}