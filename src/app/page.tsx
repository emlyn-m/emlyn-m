import Header from "@/app/components/header";
import GridLayout from "./components/grid_layout";
import Button from "./components/button";
import Wireframe from './components/wireframe';
import { ModelConfig, PersonalInfoConfig, ProjectInfoConfig } from './data';

import { LiaEnvelope, LiaGithub, LiaFilePdf, LiaLinkedinIn } from 'react-icons/lia';

export default function Home() {


	return (
		<div className="p-10 min-h-full min-w-full flex flex-col justify-stretch">
			<Header></Header>
			<GridLayout className="gap-5 mt-10 flex-1">
				<div className="h-full w-full relative border-1">
					<Wireframe className="absolute" scale={ ModelConfig.scale } pos={ ModelConfig.pos } objPath={ ModelConfig.path } />
					<div className="self-right absolute bottom-3 right-3">
						<Button className="p-3 text-xs" href={ ModelConfig.authorLink }><p>model + animation: <b>{ ModelConfig.author }</b></p></Button>
					</div>
				</div>

				<div className="h-full w-full border-1 p-5">
					<div className="flex flex-row justify-between flex-wrap gap-5 items-start">
						<span className="text-xl font-mono border-b-1 border-black pl-[.5rem] pr-[.5rem] h-[1.8rem]">about me</span>
						<div className="flex flex-row gap-2">
							<Button href={PersonalInfoConfig.links.cv} target="_blank">
								<div className="flex flex-row items-center"> 
									<span className="font-mono font-bold">CV</span>
									<LiaFilePdf className="size-[1.6rem]" />
								</div>
							</Button>
							<Button href={PersonalInfoConfig.links.email}><LiaEnvelope className="w-[1.6rem] h-[1.6rem]"/></Button>
							<Button href={PersonalInfoConfig.links.linkedin}><LiaLinkedinIn className="w-[1.6rem] h-[1.6rem]" /></Button>
							<Button href={PersonalInfoConfig.links.github} target="_blank"><LiaGithub className="w-[1.6rem] h-[1.6rem]" /></Button>
						</div>
					</div>
					<div className="font-mono text-sm p-3">
						<p className="font-bold">{PersonalInfoConfig.title}</p><br />
						{ PersonalInfoConfig.bullets.map((x,i) => (<p key={`personal-bullet-${i}`}>• {x}</p>)) }
					</div>
				</div>

				<div className="h-full w-full border-1">
					<div className="w-full h-full p-3">
						<div className="w-full h-full border-1 m-1">
							<div className="w-full h-full m-[-5] bg-black"></div>
						</div>
					</div>
				</div>

				<div className="h-full w-full border-1 p-5 flex flex-col gap-4">
					<span className="text-xl font-mono border-b-1 border-black w-min pl-[.5rem] pr-[.5rem]">projects</span>
					<div className="m-3 gap-5 landscape:grid landscape:grid-cols-3 landscape:grid-rows-1 portrait:flex portrait:flex-col h-full"
						style={{gridTemplateColumns: `repeat(${ProjectInfoConfig.projectCols}, 1fr)`, gridTemplateRows: `repeat(${ProjectInfoConfig.projectRows}, 1fr`}} >
						{ ProjectInfoConfig.projects.map((proj, i) => (
							<Button className="p-2 flex-1" href={ proj.link } key={`proj-${i}`}>
								<div className="flex flex-col p-3">
									<p className="font-bold"> { proj.name } </p>
									<pre className="font-mono text-[.9rem] p-2 text-wrap">{ proj.description }</pre>
								</div>
							</Button>
						
						)) }
					</div>
				</div>

			</GridLayout>
		</div>
	);
}
