'use client';

import { ReactElement, RefObject, useEffect, useRef } from 'react';
import { IPost } from './posts';

function Code(props: { children: string }): ReactElement {
    return (
        <span className="border-1 p-[.1rem]">{ props.children }</span>
    )
}

function FitImg(props: {src: string, className?: string, fitTo: RefObject<HTMLDivElement|null>}): ReactElement {

    const imgRef = useRef(null);


    useEffect(() => {
        if (!props.fitTo.current) return;

        const resizeObserver = new ResizeObserver(() => {
            if (!imgRef.current) { return; }
        
            const targetHeight = (props.fitTo.current as HTMLImageElement).clientHeight;        
            
            if (window.innerHeight < window.innerWidth) {
                (imgRef.current as HTMLImageElement).style.height = `${targetHeight}px`;
            }
            (imgRef.current as HTMLImageElement).style.display = 'block';
        });
        resizeObserver.observe(props.fitTo.current);
        return () => resizeObserver.disconnect();

    }, [ props.fitTo ]);

    return (
        <img ref={imgRef} className={props.className} src={ props.src } style={{ display: 'none' }}/>
    )
}

function RenderCapstonePost(): ReactElement {

    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);

    return (
        <div className="flex flex-col gap-5">

            <div className="flex landscape:flex-row portrait:flex-col-reverse gap-5" ref={ section1Ref }>
                <div className="flex flex-col gap-5 flex-1">
                    <div className="flex landscape:flex-row portrait:flex-col-reverse gap-5">
                        <div className="border-1 p-2 font-mono flex-1 flex flex-col gap-2" >
                            <h2 className="font-bold">Background</h2>
                            <p className="text-s pl-4 pr-4 indent-4">
                                A requirement of my degree was the development of a non-trivial software project for an industry client.  For this, we chose to develop a control panel for TERRAINs vertical display screen (initially developed by <a href="https://trentcrawford.net" className="underline">Trent Cawford</a>).  This screen was initially designed to show the most recent videos uploaded to YouTube matching particular search parameters, however the  clients hoped that it could also be used as a general display screen for events and presentations.
                            </p>
                            <p className="text-s pl-4 pr-4 indent-4">
                                As an additional project, we were asked to develop a digital Community Noticeboard for the display screen. This needed to be able to 
                            </p>
                        </div>
                    </div>

                    <div className="border-1 p-2 font-mono landscape:wrap-none mobile:wrap bg-black">
                        <h2 className="font-bold text-white">Features:</h2>
                        <ul className="p-1 text-white">
                            <li>• Community Noticeboard</li>
                            <li>• Real-time control</li>
                            <li>• Automatic startup</li>
                            <li>• Automatic downloading/purging of YouTube videos</li>
                        </ul>
                    </div>

                </div>

                <FitImg fitTo={section1Ref} src="/assets-capstone/screen-real.webp" className='w-min h-min border-1 p-3 box-border' />
            </div>

            <div className="flex landscape:flex-row portrait:flex-col gap-5">
                <FitImg fitTo={section2Ref} src="/assets-capstone/noticeboard.webp" className='w-min h-min border-1 p-3 box-border portrait:w-full min-h-[200px]' />
                <div ref={ section2Ref } className="border-1 p-2 font-mono flex-1 flex flex-col gap-2">
                    <h2 className="font-bold">Community Noticeboard</h2>
                    <p className="text-s pl-4 pr-4 indent-4">
                        body-nb-1
                    </p>
                </div>
            </div>


            <div className="flex landscape:flex-row portrait:flex-col-reverse gap-5">
                <div ref={ section3Ref } className="border-1 p-2 font-mono flex-1 flex flex-col gap-2">
                    <h2 className="font-bold">External Websites</h2>
                    <p className="text-s pl-4 pr-4 indent-4">
                        While the display of uploaded files and YouTube videos was relatively simple, external websites were significantly more challenging. We needed to render them inside our website to allow for switching display modes, which meant using an iframe. Unfortunately, most websites send <Code>X-Frame-Options</Code> and <Code>CORS</Code> headers which restrict display in iframes (bummer!). 
                    </p>
                    <p className="text-s pl-4 pr-4 indent-4">
                        To work around these limitations, we developed a simple forward proxy to run locally. This proxy would receive the requested domain name as a subdomain on localhost (eg: google.com.localhost:3000/path), fetch it, and return the response (after stripping the relevant headers and rewriting any Set-Cookie headers). Supplying the target domain as a subdomain was necessary to ensure that relative paths worked correctly.
                    </p>
                </div>
                <FitImg fitTo={section3Ref} src="/assets-capstone/dashboard-full.webp" className='w-min h-min border-1 p-3 box-border' />
            </div>

        </div>
    )
}

export const CapstonePost: IPost = {
    title: 'Capstone Project',
    contents: RenderCapstonePost
}