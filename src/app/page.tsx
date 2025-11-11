"use client";

import { useEffect } from "react";

const REDIRECT_URL = "https://newsbm-tech.com/";

export default function Home() {
  useEffect(() => {
    window.location.replace(REDIRECT_URL);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <p className="text-lg">
        Redirigiendo a <a className="underline" href={REDIRECT_URL}>newsbm-tech.com</a>...
      </p>
    </main>
  );
}
