import { ReactElement } from "react";

export interface ButtonProps {
    className?: string,
    children?: string,
}
export default function Button(props: ButtonProps) {
    return (
        <div className={`${props.className} border-1 hover:bg-black hover:text-white p-1 cursor-pointer font-mono transition-all duration-200`}>
            { props.children }
        </div>
    )

}