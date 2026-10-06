import React, { useEffect, useMemo, useState } from 'react';
import { chapters, letters, memoryArchive } from './data/story';
import { CinematicScene } from './components/CinematicScene';
import { ChapterEnd, HomeScreen, LoadingScreen, MemoryCardScreen } from './components/Screens';
import { MemoryBook, MemoryEditor } from './components/MemoryBook';
import { LetterBook, LetterModal } from './components/LetterBook';
import { useAmbientAudio } from './components/useAmbientAudio';

const STORAGE_KEY = 'for-tsm-story-v1';

function emptyProgress() {
  return {
    chapterIndex: 0,
    sceneIndex: 0,
    beatIndex: 0,
    discovered: [],
    customMemories: [],
    hasStarted: false,
    completed: false,
    phase: 'movie',
  };
}

function readProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const saved = JSON.parse(raw);
    const validChapter = Math.min(Math.max(0, Number(saved.chapterIndex) || 0), chapters.length - 1);
    const scenes = chapters[validChapter].scenes;
    const validScene = Math.min(Math.max(0, Number(saved.sceneIndex) || 0), scenes.length - 1);
    const beats = scenes[validScene].beats;
    const validBeat = Math.min(Math.max(0, Number(saved.beatIndex) || 0), beats.length - 1);
    return {
      ...emptyProgress(),
      ...saved,
      chapterIndex: validChapter,
      sceneIndex: validScene,
      beatIndex: validBeat,
      discovered: Array.isArray(saved.discovered) ? saved.discovered.filter((id) => memoryArchive.some((item) => item.id === id)) : [],
      customMemories: Array.isArray(saved.customMemories) ? saved.customMemories.slice(0, 37) : [],
      hasStarted: Boolean(saved.hasStarted),
      completed: Boolean(saved.completed),
      phase: saved.phase === 'chapterEnd' ? 'chapterEnd' : 'movie',
    };
  } catch {
    return emptyProgress();
  }
}

export default function App() {
  const [story, setStory] = useState(readProgress);
  const [view, setView] = useState('loading');
  const [returnView, setReturnView] = useState('home');
  const [libraryReturnView, setLibraryReturnView] = useState('home');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const audio = useAmbientAudio();

  const chapter = chapters[story.chapterIndex] || chapters[0];
  const scene = chapter.scenes[story.sceneIndex] || chapter.scenes[0];
  const discoveredSet = useMemo(() => new Set(story.discovered), [story.discovered]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
      setView('home');
    }, 760);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(story)); } catch { /* Progress saving is best-effort. */ }
  }, [story]);

  useEffect(() => {
    if (
      story.hasStarted && story.chapterIndex === chapters.length - 1 &&
      story.sceneIndex === chapters[chapters.length - 1].scenes.length - 1 && !story.completed
    ) {
      setStory((current) => ({ ...current, completed: true, phase: 'movie' }));
    }
  }, [story.hasStarted, story.chapterIndex, story.sceneIndex, story.completed]);

  const handleClickSound = (event) => {
    const button = event.target?.closest?.('button');
    if (!button || button.disabled || button.dataset.sound === 'none') return;
    audio.playCue(button.dataset.sound || 'tap');
  };

  const openLibrary = (target) => {
    setLibraryReturnView(view);
    setView(target);
  };

  const startFresh = () => {
    setStory({ ...emptyProgress(), hasStarted: true, phase: 'movie' });
    setView('movie');
  };

  const handleHomeStart = () => {
    if (story.completed) {
      handleReplay();
      return;
    }
    if (story.hasStarted) {
      setView(story.phase === 'chapterEnd' ? 'chapterEnd' : 'movie');
      return;
    }
    startFresh();
  };

  const handleAdvance = () => {
    const activeChapter = chapters[story.chapterIndex];
    const activeScene = activeChapter.scenes[story.sceneIndex];
    if (story.beatIndex < activeScene.beats.length - 1) {
      setStory((current) => ({ ...current, beatIndex: current.beatIndex + 1, phase: 'movie' }));
      return;
    }
    if (story.sceneIndex < activeChapter.scenes.length - 1) {
      setStory((current) => ({ ...current, sceneIndex: current.sceneIndex + 1, beatIndex: 0, phase: 'movie' }));
      return;
    }
    if (story.chapterIndex < chapters.length - 1) {
      setStory((current) => ({ ...current, phase: 'chapterEnd' }));
      setView('chapterEnd');
    }
  };

  const handleBack = () => {
    if (view === 'chapterEnd') {
      const activeChapter = chapters[story.chapterIndex];
      setStory((current) => ({
        ...current,
        phase: 'movie',
        sceneIndex: activeChapter.scenes.length - 1,
        beatIndex: activeChapter.scenes[activeChapter.scenes.length - 1].beats.length - 1,
      }));
      setView('movie');
      return;
    }
    if (story.beatIndex > 0) {
      setStory((current) => ({ ...current, beatIndex: current.beatIndex - 1, phase: 'movie' }));
      return;
    }
    if (story.sceneIndex > 0) {
      const previousScene = chapters[story.chapterIndex].scenes[story.sceneIndex - 1];
      setStory((current) => ({ ...current, sceneIndex: current.sceneIndex - 1, beatIndex: previousScene.beats.length - 1, phase: 'movie' }));
      return;
    }
    if (story.chapterIndex > 0) {
      const previousChapter = chapters[story.chapterIndex - 1];
      const previousScene = previousChapter.scenes[previousChapter.scenes.length - 1];
      setStory((current) => ({
        ...current,
        chapterIndex: current.chapterIndex - 1,
        sceneIndex: previousChapter.scenes.length - 1,
        beatIndex: previousScene.beats.length - 1,
        phase: 'movie',
      }));
      return;
    }
    setView('home');
  };

  const continueFromChapterEnd = () => {
    if (story.chapterIndex >= chapters.length - 1) {
      setView('movie');
      return;
    }
    setStory((current) => ({ ...current, chapterIndex: current.chapterIndex + 1, sceneIndex: 0, beatIndex: 0, phase: 'movie' }));
    setView('movie');
  };

  const openStoryMemory = (memoryId) => {
    const memory = memoryArchive.find((item) => item.id === memoryId);
    if (!memory) return;
    setStory((current) => ({
      ...current,
      discovered: current.discovered.includes(memoryId) ? current.discovered : [...current.discovered, memoryId],
    }));
    const memoryChapter = chapters.find((item) => item.id === memory.chapterId);
    setSelectedMemory({ memory, number: memory.number, isCustom: false, chapterTitle: memoryChapter?.title || '' });
    setReturnView(view);
    setView('memoryCard');
  };

  const openArchiveMemory = (memory, index = 0) => {
    const known = memoryArchive.find((item) => item.id === memory.id);
    const memoryChapter = chapters.find((item) => item.id === memory.chapterId);
    setSelectedMemory({
      memory,
      number: known?.number || memory.number || memoryArchive.length + index + 1,
      isCustom: !known,
      chapterTitle: memoryChapter?.title || '',
    });
    setReturnView('archive');
    setView('memoryCard');
  };

  const findMemoryInMovie = (memory) => {
    const chapterIndex = chapters.findIndex((item) => item.id === memory.chapterId);
    const targetChapter = chapters[chapterIndex];
    const sceneIndex = targetChapter?.scenes.findIndex((item) => item.hotspots?.some((spot) => spot.memoryId === memory.id)) ?? -1;
    if (chapterIndex < 0 || sceneIndex < 0) return;
    setStory((current) => ({
      ...current,
      chapterIndex,
      sceneIndex,
      beatIndex: 0,
      hasStarted: true,
      completed: false,
      phase: 'movie',
    }));
    setView('movie');
  };

  const addPersonalMemory = (fields) => {
    const number = memoryArchive.length + story.customMemories.length + 1;
    const memory = {
      ...fields,
      id: `personal-${Date.now()}`,
      number,
      art: 'first-page',
      custom: true,
    };
    setStory((current) => ({ ...current, customMemories: [...current.customMemories, memory] }));
    const memoryChapter = chapters.find((item) => item.id === memory.chapterId);
    setSelectedMemory({ memory, number, isCustom: true, chapterTitle: memoryChapter?.title || '' });
    setReturnView('archive');
    setView('memoryCard');
  };

  const openLetter = (letter) => {
    setSelectedLetter(letter);
    setReturnView('letters');
    setView('letter');
  };

  const handleReplay = () => {
    setStory((current) => ({
      ...current,
      chapterIndex: 0,
      sceneIndex: 0,
      beatIndex: 0,
      hasStarted: true,
      completed: false,
      phase: 'movie',
    }));
    setView('movie');
  };

  if (loading) return <div className="app-shell"><div className="phone-stage"><LoadingScreen /></div></div>;

  const activeView = view === 'loading' ? 'home' : view;

  return (
    <div className="app-shell" onClickCapture={handleClickSound}>
      <div className="phone-stage">
        {activeView === 'home' && (
          <HomeScreen
            hasStarted={story.hasStarted}
            completed={story.completed}
            onStart={handleHomeStart}
            onRestart={handleReplay}
            onOpenArchive={() => openLibrary('archive')}
            onOpenLetters={() => openLibrary('letters')}
            soundEnabled={audio.enabled}
            onToggleSound={audio.toggle}
          />
        )}

        {activeView === 'movie' && (
          <CinematicScene
            key={`${chapter.id}-${scene.id}`}
            chapter={chapter}
            chapterIndex={story.chapterIndex}
            scene={scene}
            sceneIndex={story.sceneIndex}
            sceneCount={chapter.scenes.length}
            beatIndex={story.beatIndex}
            onAdvance={handleAdvance}
            onBack={handleBack}
            onOpenMemory={openStoryMemory}
            onOpenArchive={() => openLibrary('archive')}
            onOpenLetters={() => openLibrary('letters')}
            soundEnabled={audio.enabled}
            onToggleSound={audio.toggle}
            onSceneMood={audio.setMood}
            isFinal={scene.id === 'infinity'}
            onReplay={handleReplay}
          />
        )}

        {activeView === 'chapterEnd' && (
          <ChapterEnd
            chapter={chapter}
            chapterIndex={story.chapterIndex}
            nextChapter={chapters[story.chapterIndex + 1]}
            onContinue={continueFromChapterEnd}
            onBack={handleBack}
            onOpenArchive={() => openLibrary('archive')}
            onOpenLetters={() => openLibrary('letters')}
            discoveredCount={story.discovered.length}
          />
        )}

        {activeView === 'archive' && (
          <MemoryBook
            discovered={story.discovered}
            customMemories={story.customMemories}
            onClose={() => setView(libraryReturnView)}
            onOpenMemory={openArchiveMemory}
            onAddMemory={() => { setReturnView('archive'); setView('memoryEditor'); }}
            onFindMemory={findMemoryInMovie}
          />
        )}

        {activeView === 'memoryEditor' && (
          <MemoryEditor
            onClose={() => setView('archive')}
            onSave={addPersonalMemory}
          />
        )}

        {activeView === 'memoryCard' && (
          <MemoryCardScreen
            memory={selectedMemory?.memory}
            memoryNumber={selectedMemory?.number || 1}
            isCustom={selectedMemory?.isCustom}
            chapterTitle={selectedMemory?.chapterTitle}
            onClose={() => setView(returnView)}
          />
        )}

        {activeView === 'letters' && (
          <LetterBook
            letters={letters}
            onClose={() => setView(libraryReturnView)}
            onOpenLetter={openLetter}
          />
        )}

        {activeView === 'letter' && <LetterModal letter={selectedLetter} onClose={() => setView(returnView)} />}
      </div>
      <div className="orientation-overlay" role="status">
        <div className="orientation-phone" />
        <p>Please turn your phone upright<br /><span>This story is made for portrait.</span></p>
      </div>
    </div>
  );
}
