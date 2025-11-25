import { ReactElement } from "react";

export interface ButtonProps {
    className?: string,
    children?: string|ReactElement,
    href?: string,
    target?: string,
}
export default function Button(props: ButtonProps) {
    return (
        <div className={`${props.className} border-1 hover:border-black hover:bg-black hover:text-white p-1 cursor-pointer font-mono transition-all duration-200 relative`}>
            <a target={ props.target } className="absolute t-0 l-0 w-full h-full opacity-0 m-[-8]" href={props.href}></a>
            { props.children }
        </div>
    )

}