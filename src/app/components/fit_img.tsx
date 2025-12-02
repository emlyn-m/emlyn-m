import { useEffect, useRef, RefObject, ReactElement } from "react";

export function FitImg(props: {src: string, className?: string, fitTo: RefObject<HTMLDivElement|null>}): ReactElement {

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
