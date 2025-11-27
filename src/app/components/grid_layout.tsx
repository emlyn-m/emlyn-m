import { ReactElement } from "react";

export interface GridLayoutProps {
    children: ReactElement[],
    className: string,

}

export default function GridLayout(props: GridLayoutProps) {

    const LAYOUT_SPACING = [[3,1],[2,2],[1,2],[3,3]];

    return (
        <div className={`${props.className} grid landscape:grid-cols-3 landscape:grid-rows-6 portrait:grid-cols-1 portrait:grid-rows-6`}>
            {props.children.map((child, i) => { return (
                <div key={`grid-entry-${i}`}
                    className="w-full portrait:col-span-1! "
                    style={{gridRow: `span ${LAYOUT_SPACING[i][0]}`, gridColumn: `span ${LAYOUT_SPACING[i][1]}`}}
                    >

                    {child}
                </div>
            )})}
        </div>
    )
}