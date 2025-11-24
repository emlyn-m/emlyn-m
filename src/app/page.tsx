import Header from "@/app/components/header";
import GridLayout from "./components/grid_layout";
import Button from "./components/button"

export default function Home() {

	return (
		<div className="p-10 min-h-full min-w-full flex flex-col justify-stretch">
			<Header></Header>
			<GridLayout className="gap-3 mt-10">
				<div className="h-full w-full border-1"></div>

				<div className="h-full w-full border-1 p-5">
					<div className="flex flex-row justify-between">
						<span className="text-xl font-mono border-b-1 border-black">about me</span>
						<div className="flex flex-row gap-2">
							<Button>cv</Button>
							<Button>email</Button>
							<Button>github</Button>
						</div>
					</div>
					<p className="font-mono text-sm p-3">Lorem ipsum dolor sit amet</p>
				</div>

				<div className="h-full w-full border-1 p-5">
					<span className="text-xl font-mono border-b-1 border-black">projects</span>
					<div className="flex flex-row m-3 justify-stretch gap-5 flex-wrap">
						<Button>boost-sms</Button>
						<Button>nzpvt</Button>
						<Button>pulsar</Button>

					</div>
				</div>

				<div className="h-full w-full border-1"></div>
			</GridLayout>
		</div>
	);
}
