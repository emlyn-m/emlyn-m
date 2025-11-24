import Header from "@/app/components/header";
import GridLayout from "./components/grid_layout";
import Button from "./components/button"

export default function Home() {

	const ProjectInfoConfig = [
		{ name: "boost-sms", description: "Matrix proxy layer over TLS (Transport-Layer SMS)", link: "https://github.com/emlyn-m/boost" },
		{ name: "nzpvt", description: "", link: "" },
		{ name: "pulsar", description: "Custom server monitoring app for Android with communication over XMPP", link: "" }
	]

	return (
		<div className="p-10 min-h-full min-w-full flex flex-col justify-stretch">
			<Header></Header>
			<GridLayout className="gap-3 mt-10 flex-1">
				<div className="h-full w-full border-1"></div>

				<div className="h-full w-full border-1 p-5">
					<div className="flex flex-row justify-between">
						<span className="text-xl font-mono border-b-1 border-black">about me</span>
						<div className="flex flex-row gap-2">
							<Button href="./cv.txt" target="_blank">CV</Button>
							<Button href="mailto:contact@emlyn.xyz">email</Button>
							<Button href="https://github.com/emlyn-m" target="_blank">github</Button>
						</div>
					</div>
					<p className="font-mono text-sm p-3">hi!</p>
				</div>

				<div className="h-full w-full border-1">
					<div className="w-full h-full p-3">
						<div className="w-full h-full border-1 m-1">
							<div className="w-full h-full m-[-5] bg-black"></div>
						</div>
					</div>
				</div>

				<div className="h-full w-full border-1 p-5 flex flex-col gap-5">
					<span className="text-xl font-mono border-b-1 border-black w-min">projects</span>
					<div className="flex flex-row m-3 portrait:flex-col landscape:flex-row gap-10 flex-wrap flex-1 row-wrap">
						{ ProjectInfoConfig.map((proj, i) => (
							<div className="flex flex-col flex-1 justify-between border-1 p-5" key={`proj-${i}`}>
								<p className="font-mono p-3 text-s">{ proj.description }</p>
								<Button className="self-end p-2" href={ proj.link }>{ proj.name }</Button>
							</div>
						
						)) }
					</div>
				</div>

			</GridLayout>
		</div>
	);
}
