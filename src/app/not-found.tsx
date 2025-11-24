import Button from './components/button';

export default function NotFound() {

    return (<div className="w-full h-full p-5 flex flex-row">
        <div className="border-1 flex-1 flex flex-col items-center justify-center gap-2">
            <div className="border-1 p-3 w-[50%]">
                <p className="text-2xl font-mono font-bold">Error 404</p>
                <p className="text-xs font-mono font-light">err: the requested url was not found on the server</p>
            </div>
            <Button href="/" className="flex w-[50%] font-mono text-s p-3 font-light" >Home</Button>
        </div>
    </div>)
}