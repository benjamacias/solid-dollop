import LandingPage from "./components/LandingPage";

const NEWSBM_TECH_URL = "https://newsbm-tech.com/";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 bg-neutral-950/90 px-4 py-6">
        <div className="mx-auto flex max-w-7xl justify-center">
          <a
            href={NEWSBM_TECH_URL}
            className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 font-semibold text-black shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
          >
            Visitar newsbm-tech.com
          </a>
        </div>
      </header>
      <LandingPage />
    </div>
  );
}
