export default function Header() {
    return (
        <div className="flex flex-row p-5 pt-0 border-b-1 border-black justify-between">
            <h1 className="font-mono font-bold text-lg cursor-default">emlyn.</h1>
            <div className="flex flex-row gap-10">
                <p className="font-mono cursor-default">test1</p>
                <p className="font-mono cursor-default">test2</p>
            </div>
        </div>
    )
}