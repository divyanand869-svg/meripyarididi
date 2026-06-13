'use client';

import { useState } from 'react';
import IntroScreen from '@/components/IntroScreen';
import CustomCursor from '@/components/CustomCursor';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import MusicController from '@/components/MusicController';
import Hero from '@/components/Hero';
import Resume from '@/components/Resume';
import Timeline from '@/components/Timeline';
import Observations from '@/components/Observations';
import RoastArchive from '@/components/RoastArchive';
import ChatArchive from '@/components/ChatArchive';
import OpenWhen from '@/components/OpenWhen';
import AchievementWall from '@/components/AchievementWall';
import MemoryVault from '@/components/MemoryVault';
import TheLetter from '@/components/TheLetter';
import FuturePredictions from '@/components/FuturePredictions';
import FinalSection from '@/components/FinalSection';

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <IntroScreen onEnter={() => setEntered(true)} />

      {entered && (
        <main className="bg-ink-950 bg-radial-fade">
          <Hero />
          <Resume />
          <Timeline />
          <Observations />
          <RoastArchive />
          <ChatArchive />
          <OpenWhen />
          <AchievementWall />
          <MemoryVault />
          <TheLetter />
          <FuturePredictions />
          <FinalSection />
          <MusicController />
        </main>
      )}
    </SmoothScrollProvider>
  );
}
