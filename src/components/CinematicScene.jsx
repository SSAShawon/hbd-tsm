import React, { useEffect, useRef, useState } from 'react';
import { SceneArtwork } from './Artwork';
import { Icon } from './Icons';
import { memoryArchive } from '../data/story';

export function CinematicScene({
  chapter,
  chapterIndex,
  scene,
  sceneIndex,
  sceneCount,
  beatIndex,
  onAdvance,
  onBack,
  onOpenMemory,
  onOpenArchive,
  onOpenLetters,
  soundEnabled,
  onToggleSound,
  onSceneMood,
  isFinal = false,
  onReplay,
}) {
  const [ready, setReady] = useState(false);
  const [partyBurst, setPartyBurst] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const burstTimerRef = useRef(null);
  const line = scene.beats[beatIndex] || '';
  const isBirthday = scene.id === 'birthday-reveal' || scene.id === 'birthday-party';
  const isFinalReveal = scene.id === 'infinity';
  const lineIsBirthdayHeadline = scene.id === 'birthday-reveal' && beatIndex === 0;
  const lineIsFinalDate = scene.id === 'birthday-reveal' && beatIndex === 1;
  const chapterProgress = Math.round(((sceneIndex + 1) / sceneCount) * 100);

  useEffect(() => {
    setReady(false);
    const timer = window.setTimeout(() => setReady(true), scene.mood === 'slow' ? 900 : 650);
    return () => window.clearTimeout(timer);
  }, [scene.id, chapter.id]);

  useEffect(() => {
    onSceneMood?.(scene.mood);
  }, [scene.id, scene.mood, onSceneMood]);

  useEffect(() => () => window.clearTimeout(burstTimerRef.current), []);

  const makeBirthdayWish = () => {
    setWishMade(true);
    setPartyBurst(true);
    window.clearTimeout(burstTimerRef.current);
    burstTimerRef.current = window.setTimeout(() => setPartyBurst(false), 2600);
  };

  const memoryTitle = (id) => memoryArchive.find((memory) => memory.id === id)?.title || 'A story memory';

  return (
    <main className={`cinema scene-mood--${scene.mood || 'quiet'}${isBirthday ? ' cinema--birthday' : ''}${isFinalReveal ? ' cinema--final' : ''}`}>
      <div className="scene-art-wrap" aria-hidden="true">
        <SceneArtwork art={scene.art} celebration={partyBurst} />
      </div>
      <div className="scene-vignette" aria-hidden="true" />
      <div className="scene-light-shift" aria-hidden="true" />
      <div className={`cinema-atmosphere cinema-atmosphere--${String(chapterIndex + 1).padStart(2, '0')} atmosphere-mood--${scene.mood || 'quiet'}`} aria-hidden="true">
        <span className="atmosphere-speck atmosphere-speck--one" />
        <span className="atmosphere-speck atmosphere-speck--two" />
        <span className="atmosphere-speck atmosphere-speck--three" />
        <span className="atmosphere-speck atmosphere-speck--four" />
      </div>

      <header className="player-top safe-top">
        <button className="round-control back-control" type="button" onClick={onBack} aria-label="Go back">
          <Icon name="back" size={19} />
        </button>
        <div className="chapter-status" aria-label={`Chapter ${chapterIndex + 1} of 10, scene ${sceneIndex + 1} of ${sceneCount}`}>
          <div className="chapter-status-line">
            <span className="chapter-number">{String(chapterIndex + 1).padStart(2, '0')} <i>/</i> 10</span>
            <span className="chapter-status-title">{chapter.title}</span>
          </div>
          <div className="progress-track"><span style={{ width: `${chapterProgress}%` }} /></div>
        </div>
        <button className={`round-control${soundEnabled ? ' is-active' : ''}`} type="button" onClick={onToggleSound} aria-label={soundEnabled ? 'Turn sound off' : 'Turn sound on'}>
          <Icon name={soundEnabled ? 'sound' : 'mute'} size={18} />
        </button>
        <button className="round-control library-control" type="button" data-sound="open" onClick={onOpenArchive} aria-label="Open memory book">
          <Icon name="book" size={18} />
        </button>
        <button className="round-control letter-control" type="button" data-sound="open" onClick={onOpenLetters} aria-label="Open letter book">
          <Icon name="letter" size={18} />
        </button>
      </header>

      {scene.hotspots?.length > 0 && ready && (
        <div className="scene-hotspots" aria-label="Optional story details">
          {scene.hotspots.map((spot, index) => (
            <button
              key={`${spot.memoryId}-${index}`}
              className="memory-hotspot"
              type="button"
              data-sound="memory"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              onClick={(event) => {
                event.stopPropagation();
                onOpenMemory(spot.memoryId);
              }}
              aria-label={`Discover memory: ${memoryTitle(spot.memoryId)}`}
              title="Open a memory"
            >
              <span className="hotspot-ring" />
              <span className="hotspot-core" />
            </button>
          ))}
        </div>
      )}

      <section className={`dialogue-area${ready ? ' is-ready' : ''}`} aria-live="polite">
        <div className="dialogue-kicker">
          <span>{chapterIndex === 9 ? 'A BIRTHDAY CHAPTER' : `CHAPTER ${String(chapterIndex + 1).padStart(2, '0')}`}</span>
          <span className="kicker-dot" />
          <span>{chapter.date}</span>
        </div>
        <button
          className={`dialogue-copy${lineIsBirthdayHeadline ? ' dialogue-copy--birthday' : ''}${lineIsFinalDate ? ' dialogue-copy--date' : ''}${isFinalReveal ? ' dialogue-copy--infinity' : ''}`}
          type="button"
          data-sound={lineIsBirthdayHeadline ? 'birthday' : isFinalReveal ? 'soft' : 'tap'}
          onClick={() => { if (ready && !isFinalReveal) onAdvance(); }}
          disabled={!ready || isFinalReveal}
          aria-label={isFinalReveal ? line : `${line} Tap to continue.`}
        >
          <span key={`${scene.id}-${beatIndex}`} className="dialogue-line">{line}</span>
        </button>

        {isFinalReveal ? (
          <div className="final-actions">
            <div className="final-caption">A story made for Tasneem</div>
            <div className="final-action-row">
              <button className="text-action" type="button" data-sound="open" onClick={onOpenArchive}><Icon name="book" size={17} /> Memory book</button>
              <button className="text-action" type="button" data-sound="open" onClick={onOpenLetters}><Icon name="letter" size={17} /> Letter book</button>
            </div>
            <button className="replay-link" type="button" data-sound="notification" onClick={onReplay}>Revisit the story</button>
          </div>
        ) : (
          <div className="dialogue-controls">
            {isBirthday ? (
              <button className={`birthday-wish${wishMade ? ' is-made' : ''}`} type="button" data-sound="birthday" onClick={makeBirthdayWish} disabled={!ready} aria-pressed={wishMade}>
                <Icon name={wishMade ? 'check' : 'sparkle'} size={15} />
                <span>{wishMade ? 'Wish sent' : 'Make a wish'}</span>
              </button>
            ) : (
              <span className={`tap-hint${ready ? '' : ' tap-hint--waiting'}`}>{ready ? 'TAP TO CONTINUE' : 'LET THE SCENE SETTLE'}</span>
            )}
            <button className="next-button" type="button" data-sound="page" onClick={onAdvance} disabled={!ready} aria-label="Tap to continue">
              <span>{ready ? 'Continue' : 'A moment'}</span>
              <Icon name="arrow" size={17} />
            </button>
          </div>
        )}
      </section>

      <div className="scene-bottom-mark" aria-hidden="true">
        <span className="bottom-mark-line" />
        <span>{String(sceneIndex + 1).padStart(2, '0')} / {String(sceneCount).padStart(2, '0')}</span>
      </div>
    </main>
  );
}
