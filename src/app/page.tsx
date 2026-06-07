"use client";

import { useEffect } from "react";
import { HomeExperience } from "@/components/home-experience";

export default function Home() {

  useEffect(() => {

    const audio = new Audio("/sounds/music.mp3");

    audio.loop = true;
    audio.volume = 0.2;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.log(err);
      }
    };

    document.addEventListener("click", playAudio);

    return () => {
      document.removeEventListener("click", playAudio);
    };

  }, []);

  return <HomeExperience />;
}