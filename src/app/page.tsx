import Header from "@/app/components/header";
import GridLayout from "./components/grid_layout";
import Button from "./components/button";
import Wireframe from './components/wireframe';

import { LiaEnvelope, LiaGithub, LiaFilePdf, LiaLinkedinIn } from 'react-icons/lia';

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
				<div className="h-full w-full border-1">
					<Wireframe />
				</div>

				<div className="h-full w-full border-1 p-5">
					<div className="flex flex-row justify-between flex-wrap gap-5 items-start">
						<span className="text-xl font-mono border-b-1 border-black pl-[.5rem] pr-[.5rem] h-[1.8rem]">about me</span>
						<div className="flex flex-row gap-2">
							<Button href="./cv.txt" target="_blank">
								<div> 
									<span>CV</span>
									<LiaFilePdf className="size-[1.6rem] inline" />
								</div>
							</Button>
							<Button href="mailto:contact@emlyn.xyz"><LiaEnvelope className="w-[1.6rem] h-[1.6rem]"/></Button>
							<Button href="linkedin"><LiaLinkedinIn className="w-[1.6rem] h-[1.6rem]" /></Button>
							<Button href="https://github.com/emlyn-m" target="_blank"><LiaGithub className="w-[1.6rem] h-[1.6rem]" /></Button>
						</div>
					</div>
					<div className="font-mono text-sm p-3">
						<p className="font-bold">Emlyn Matheson (she/her) | Melbourne</p><br />
						<p>· Software dev</p>
						<p>· Recent Graduate</p>
						<p>· Hiring? Let's chat!</p>
					</div>
				</div>

				<div className="h-full w-full border-1">
					<div className="w-full h-full p-3">
						<div className="w-full h-full border-1 m-1">
							<div className="w-full h-full m-[-5] bg-black"></div>
						</div>
					</div>
				</div>

				<div className="h-full w-full border-1 p-5 flex flex-col gap-5">
					<span className="text-xl font-mono border-b-1 border-black w-min pl-[.5rem] pr-[.5rem]">projects</span>
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
