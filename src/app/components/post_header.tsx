import Button from "./button";

export interface PostHeaderProps {
    title: string,
}

export default function PostHeader(props: PostHeaderProps) {
    return (
        <div className="pl-4 pb-2 pt-0 border-b-1 flex flex-row items-end gap-2 ">
            <Button className="w-[2rem] h-[2rem] hover:invert hover:bg-white hover:border-white" href="/">
                <img src='/logo-transparent.svg' />
            </Button>
            <div className="w-[1px] h-[2rem] bg-black"></div>
            <h1 className='text-[1.5rem] leading-[1.333] font-bold font-mono'>{ props.title }</h1>

            <span className="flex-1 text-end font-mono font-light text-xs cursor-default select-none">© 2025</span>
        </div>
    )
}