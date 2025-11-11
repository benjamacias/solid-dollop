"use client";

const REDIRECT_URL = "https://newsbm-tech.com/";

export default function Home() {
  const handleRedirect = () => {
    window.location.href = REDIRECT_URL;
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-lg">Haz clic en el botón para visitar newsbm-tech.com.</p>
        <button
          type="button"
          onClick={handleRedirect}
          className="rounded bg-primary px-6 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Ir a newsbm-tech.com
        </button>
      </div>
    </main>
  );
}
