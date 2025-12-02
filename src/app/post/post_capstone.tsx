'use client';

import { ReactElement, useRef } from 'react';
import { IPost } from './posts';
import { FitImg } from '@/app/components/fit_img';

function Code(props: { children: string }): ReactElement {
    return (
        <span className="border-1 p-[.1rem]">{ props.children }</span>
    )
}

function RenderCapstonePost(): ReactElement {

    const bgFeatRef = useRef(null);
    const noticeboardRef = useRef(null);
    const webRef = useRef(null);

    return (
        <div className="flex flex-col gap-5">

            <div className="flex landscape:flex-row portrait:flex-col-reverse gap-5">
                <div className="flex flex-col gap-5 flex-1" ref={ bgFeatRef }>
                    <div className="flex landscape:flex-row portrait:flex-col-reverse gap-5">
                        <div className="border-1 p-2 font-mono flex-1 flex flex-col gap-2" >
                            <h2 className="font-bold">Background</h2>
                            <p className="text-s pl-4 pr-4 indent-4">
                                A requirement of my degree was the development of a non-trivial software project for an industry client.  For this, we chose to develop a control panel for TERRAINs vertical display screen (initially developed by <a href="https://trentcrawford.net" className="underline">Trent Cawford</a>).  This screen was initially designed to show the most recent videos uploaded to YouTube matching particular search parameters, however the  clients hoped that it could also be used as a general display screen for events and presentations.
                            </p>
                            <p className="text-s pl-4 pr-4 indent-4">
                                As an additional project, we were asked to develop a digital Community Noticeboard for the display screen. This needed to be able to receive submissions from the general public and display them on the screen, with minimal intervention from TERRAIN staff.
                            </p>
                        </div>
                    </div>

                    <div className="border-1 p-2 font-mono landscape:wrap-none mobile:wrap bg-black">
                        <h2 className="font-bold text-white">Features:</h2>
                        <ul className="p-1 text-white">
                            <li>• Community Noticeboard</li>
                            <li>• Real-time control via SSE</li>
                            <li>• Automatic startup</li>
                            <li>• Automatic downloading/purging of YouTube videos</li>
                            <li>• Access Control</li>
                        </ul>
                    </div>

                </div>
                <FitImg fitTo={ bgFeatRef } src="/assets-capstone/screen-real.png" className='w-min h-min border-1 p-3 box-border' />
            </div>

            <div className="flex landscape:flex-row portrait:flex-col gap-5">
                <FitImg fitTo={ noticeboardRef } src="/assets-capstone/noticeboard.png" className='w-min h-min border-1 p-3 box-border portrait:w-full min-h-[200px]' />
                <div ref={ noticeboardRef } className="border-1 p-2 font-mono flex-1 flex flex-col gap-2">
                    <h2 className="font-bold">Community Noticeboard</h2>
                    <p className="text-s pl-4 pr-4 indent-4">
                        Submission to the noticeboard was done via a simple Google Form. The posts themselves were hosted on a MongoDB Atlas instance, with a script running to periodically fetch results from the Google Form and insert them into the database. These posts would then go into a queue to be reviewed, and if they were approved, they would then be added to the screen. By default, posts will be archived after a week, however a custom one can be specified during the submission process.
                    </p>

                    <p className="text-s pl-4 pr-4 indent-4">
                        The noticeboard display, when running, loops through all posts that are flagged to be shown, and an admin is able to archive or redisplay posts at any time.
                    </p>

                </div>
            </div>


            <div className="flex landscape:flex-row portrait:flex-col-reverse gap-5">
                <div className="flex flex-col gap-5" ref={ webRef }>
                    <div className="border-1 p-2 font-mono flex-1 flex flex-col gap-2">
                        <h2 className="font-bold">External Websites</h2>
                        <p className="text-s pl-4 pr-4 indent-4">
                            While the display of uploaded files and YouTube videos was relatively simple, external websites were significantly more challenging. We needed to render them inside our website to allow for switching display modes, which meant using an iframe. Unfortunately, most websites send <Code>X-Frame-Options</Code> and <Code>CORS</Code> headers which restrict display in iframes (bummer!). 
                        </p>
                        <p className="text-s pl-4 pr-4 indent-4">
                            To work around these limitations, we developed a simple forward proxy to run locally. This proxy would receive the requested domain name as a subdomain on localhost (eg: <Code>google.com.localhost:3000/path</Code>), fetch it, and return the response (after stripping the relevant headers and rewriting any <Code>Set-Cookie</Code> headers). Supplying the target domain as a subdomain was necessary to ensure that relative paths worked correctly.
                        </p>
                    </div>

                    <div className="border-1 p-2 font-mono flex-1 flex flex-col gap-2">
                        <h2 className="font-bold">Security</h2>
                        <p className="text-s pl-4 pr-4 indent-4">
                            As this screen is prominently displayed in store, avoiding unauthorized access was a key concern. The Raspberry Pi running the system was on a network that should remain unavailable to customers, but we wanted a second layer of defense. While setup for SSL (with DNS-backed certificates and an NGINX reverse proxy) was completed, this couldn't be deployed as we did not have access to DNS records at the time. This forced us to switch from OAuth/Google to HTTP basic authentication, however we still felt this was strong enough when combined with the network isolation.
                        </p>
                    </div>
                </div>
                <FitImg fitTo={ webRef } src="/assets-capstone/dashboard.png" className='w-min h-min border-1 p-3 box-border' />
            </div>


        </div>
    )
}

export const CapstonePost: IPost = {
    title: 'Capstone Project',
    contents: RenderCapstonePost
}