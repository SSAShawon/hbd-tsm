import React from 'react';
import { SceneArtwork } from './Artwork';
import { Icon } from './Icons';

export function LoadingScreen() {
  return (
    <main className="loading-screen">
      <div className="loading-glow" />
      <div className="loading-mark"><span /><span /><span /></div>
      <div className="loading-copy">
        <span className="eyebrow">A STORY FOR TSM</span>
        <h1>Preparing your story<span>…</span></h1>
        <p>Gathering the little moments.</p>
      </div>
      <div className="loading-line"><span /></div>
    </main>
  );
}

export function HomeScreen({ hasStarted, completed, onStart, onRestart, onOpenArchive, onOpenLetters, soundEnabled, onToggleSound }) {
  return (
    <main className="home-screen">
      <div className="home-art" aria-hidden="true"><SceneArtwork art="home" /></div>
      <div className="home-shade" aria-hidden="true" />
      <header className="home-top safe-top">
        <div className="home-edition"><span className="edition-dot" /> A PERSONAL FILM</div>
        <button className={`round-control home-sound${soundEnabled ? ' is-active' : ''}`} type="button" onClick={onToggleSound} aria-label={soundEnabled ? 'Turn sound off' : 'Turn sound on'}>
          <Icon name={soundEnabled ? 'sound' : 'mute'} size={18} />
        </button>
      </header>
      <div className="home-center">
        <div className="home-pretitle">FOR TSM <span>·</span> MADE WITH LOVE</div>
        <div className="home-hairline" />
        <h1>A story<br /><em>for Tasneem.</em></h1>
        <p className="home-intro">Some stories begin quietly.<br />This one began with a message.</p>
        <div className="home-meta">
          <span>10 CHAPTERS</span><i />
          <span>43 SCENES</span><i />
          <span>2018 — 2026</span>
        </div>
        <button className="home-primary" type="button" data-sound="notification" onClick={onStart}>
          <span className="home-primary-icon"><Icon name="play" size={15} /></span>
          <span>{completed ? 'Watch the story again' : hasStarted ? 'Continue the story' : 'Begin the story'}</span>
          <Icon name="arrow" size={17} />
        </button>
        {hasStarted && !completed && (
          <button className="home-restart" type="button" data-sound="notification" onClick={onRestart}>Begin again from the first message</button>
        )}
      </div>
      <footer className="home-footer safe-bottom">
        <button className="home-library-link" type="button" data-sound="open" onClick={onOpenArchive}><Icon name="book" size={17} /><span>MEMORY BOOK</span></button>
        <span className="home-footer-divider" />
        <button className="home-library-link" type="button" data-sound="open" onClick={onOpenLetters}><Icon name="letter" size={17} /><span>LETTER BOOK</span></button>
        <p>14 JULY 2018 <span>—</span> 8 OCTOBER 2026</p>
      </footer>
      <div className="home-film-grain" aria-hidden="true" />
    </main>
  );
}

export function ChapterEnd({ chapter, chapterIndex, nextChapter, onContinue, onBack, onOpenArchive, onOpenLetters, discoveredCount }) {
  const final = chapterIndex === 9;
  return (
    <main className="chapter-end">
      <div className="chapter-end-art" aria-hidden="true"><SceneArtwork art={chapter.scenes[chapter.scenes.length - 1]?.art || 'still-here'} /></div>
      <div className="chapter-end-shade" aria-hidden="true" />
      <header className="chapter-end-top safe-top">
        <button className="round-control" type="button" onClick={onBack} aria-label="Return to the last scene"><Icon name="back" size={19} /></button>
        <span>CHAPTER {String(chapterIndex + 1).padStart(2, '0')} COMPLETE</span>
        <span className="end-stamp">{discoveredCount} FOUND</span>
      </header>
      <section className="chapter-end-copy">
        <div className="chapter-end-rule" />
        <span className="eyebrow">{chapter.date}</span>
        <h1>{chapter.title}</h1>
        <div className="chapter-outro">
          {chapter.outro.map((line, index) => <p key={index}>{line}</p>)}
        </div>
        <div className="chapter-end-next-label">{final ? 'THE LAST PAGE' : `UP NEXT · ${nextChapter?.title?.toUpperCase()}`}</div>
        <button className="home-primary end-primary" type="button" data-sound="chapter" onClick={onContinue}>
          <span>{final ? 'Return to the ending' : `Continue to chapter ${String(chapterIndex + 2).padStart(2, '0')}`}</span>
          <Icon name="arrow" size={17} />
        </button>
        <div className="end-secondary-links">
          <button type="button" data-sound="open" onClick={onOpenArchive}><Icon name="book" size={16} />Memory book</button>
          <button type="button" data-sound="open" onClick={onOpenLetters}><Icon name="letter" size={16} />Letter book</button>
        </div>
      </section>
      <div className="chapter-end-footer safe-bottom">A STORY FOR TSM <span>·</span> {String(chapterIndex + 1).padStart(2, '0')} / 10</div>
    </main>
  );
}

export function MemoryCardScreen({ memory, memoryNumber, isCustom = false, chapterTitle, onClose }) {
  if (!memory) return null;
  return (
    <main className="memory-card-screen">
      <div className="memory-card-art" aria-hidden="true"><SceneArtwork art={memory.art || 'first-page'} /></div>
      <div className="memory-card-overlay" aria-hidden="true" />
      <header className="overlay-top safe-top">
        <button className="round-control" type="button" onClick={onClose} aria-label="Close memory"><Icon name="close" size={18} /></button>
        <span>{isCustom ? 'YOUR PAGE' : 'MEMORY ARCHIVE'}</span>
        <span className="memory-counter">{String(memoryNumber).padStart(2, '0')} / 50</span>
      </header>
      <article className="memory-paper">
        <div className="memory-paper-top">
          <span>{isCustom ? 'A MEMORY, IN YOUR WORDS' : `MEMORY #${String(memoryNumber).padStart(3, '0')}`}</span>
          <span className="memory-stamp"><Icon name="sparkle" size={16} /></span>
        </div>
        <div className="memory-paper-rule" />
        {memory.date && <p className="memory-date">{memory.date}</p>}
        <h1>{memory.title}</h1>
        {chapterTitle && <p className="memory-chapter-name">{chapterTitle.toUpperCase()}</p>}
        <p className="memory-body">{memory.body}</p>
        <div className="memory-paper-footer"><span>FOR TSM</span><span>✦</span><span>KEPT WITH CARE</span></div>
      </article>
      <div className="memory-card-close safe-bottom">
        <button className="quiet-cta" type="button" onClick={onClose}>Return to the story <Icon name="arrow" size={16} /></button>
      </div>
    </main>
  );
}
