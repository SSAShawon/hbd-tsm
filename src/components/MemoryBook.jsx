import React from 'react';
import { chapters, memoryArchive } from '../data/story';
import { Icon } from './Icons';

function getChapterTitle(id) {
  return chapters.find((chapter) => chapter.id === id)?.title || 'A personal page';
}

export function MemoryBook({ discovered, customMemories, onClose, onOpenMemory, onAddMemory, onFindMemory }) {
  const discoveredSet = new Set(discovered);
  const filledCount = discoveredSet.size + customMemories.length;
  const canAdd = memoryArchive.length + customMemories.length < 50;
  const blankCount = Math.max(0, 50 - memoryArchive.length - customMemories.length);

  return (
    <main className="book-screen memory-book-screen">
      <header className="book-top safe-top">
        <button className="round-control" type="button" onClick={onClose} aria-label="Close memory book"><Icon name="back" size={19} /></button>
        <div className="book-top-label">THE STORY ARCHIVE</div>
        <span className="book-count">{String(filledCount).padStart(2, '0')} / 50</span>
      </header>
      <div className="book-scroll">
        <section className="book-intro">
          <div className="book-kicker"><Icon name="book" size={15} /> A SCRAPBOOK OF US</div>
          <h1>The memory<br /><em>book.</em></h1>
          <p>Some pages hold the moments shared in this story. The blank pages are left for the details only you can add—nothing has been invented for you.</p>
          <div className="archive-progress-row"><span>{filledCount} of 50 pages filled</span><span>{memoryArchive.length + customMemories.length} pages in the book</span></div>
          <div className="archive-progress"><span style={{ width: `${Math.min(100, (filledCount / 50) * 100)}%` }} /></div>
        </section>

        <section className="archive-section">
          <div className="section-heading">
            <div><span className="section-overline">THE FILM</span><h2>Moments in the story</h2></div>
            <span className="section-count">{discoveredSet.size} / {memoryArchive.length}</span>
          </div>
          <div className="memory-grid">
            {memoryArchive.map((memory) => {
              const isDiscovered = discoveredSet.has(memory.id);
              const chapter = getChapterTitle(memory.chapterId);
              return (
                <button
                  className={`archive-memory${isDiscovered ? ' is-discovered' : ' is-locked'}`}
                  key={memory.id}
                  type="button"
                  data-sound={isDiscovered ? 'memory' : 'page'}
                  onClick={() => isDiscovered ? onOpenMemory(memory) : onFindMemory(memory)}
                  aria-label={isDiscovered ? `Open memory ${memory.number}: ${memory.title}` : `Find a locked memory in chapter ${chapter}`}
                >
                  <div className={`archive-thumb archive-thumb--${memory.art}`}>
                    <span className="archive-thumb-number">{String(memory.number).padStart(3, '0')}</span>
                    {isDiscovered ? <Icon name="sparkle" size={17} /> : <span className="lock-medallion"><Icon name="lock" size={15} /></span>}
                    <span className="thumb-wash" />
                  </div>
                  <div className="archive-card-copy">
                    <span className="archive-card-chapter">{chapter.toUpperCase()}</span>
                    <strong>{isDiscovered ? memory.title : 'A page waiting to be found'}</strong>
                    <span className="archive-card-state">{isDiscovered ? memory.date : 'Uncover it in the film'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="archive-section personal-pages-section">
          <div className="section-heading">
            <div><span className="section-overline">ONLY YOU KNOW</span><h2>Your pages</h2></div>
            <span className="section-count">{customMemories.length} ADDED</span>
          </div>
          <p className="personal-pages-note">Thirty-seven pages were intentionally left open. Add a memory in your own words, or leave every page blank.</p>
          <div className="memory-grid personal-memory-grid">
            {customMemories.map((memory, index) => (
              <button className="archive-memory is-discovered personal-memory-card" key={memory.id} type="button" data-sound="memory" onClick={() => onOpenMemory(memory, index)} aria-label={`Open your memory: ${memory.title}`}>
                <div className="archive-thumb archive-thumb--personal"><span className="archive-thumb-number">{String(memory.number || memoryArchive.length + index + 1).padStart(3, '0')}</span><Icon name="sparkle" size={17} /><span className="thumb-wash" /></div>
                <div className="archive-card-copy">
                  <span className="archive-card-chapter">{getChapterTitle(memory.chapterId)}</span>
                  <strong>{memory.title}</strong>
                  <span className="archive-card-state">{memory.date || 'A page in your words'}</span>
                </div>
              </button>
            ))}
            {Array.from({ length: blankCount }).map((_, index) => {
              const number = memoryArchive.length + customMemories.length + index + 1;
              return (
                <button className="archive-memory archive-memory--blank" key={`blank-${number}`} type="button" data-sound="open" onClick={onAddMemory} aria-label={`Add your own memory on page ${number}`} disabled={!canAdd}>
                  <div className="archive-thumb archive-thumb--blank"><span className="archive-thumb-number">{String(number).padStart(3, '0')}</span><Icon name="plus" size={19} /><span className="thumb-wash" /></div>
                  <div className="archive-card-copy">
                    <span className="archive-card-chapter">OPEN PAGE</span>
                    <strong>A memory only you can add</strong>
                    <span className="archive-card-state">Tap to write your own</span>
                  </div>
                </button>
              );
            })}
          </div>
          {!blankCount && <p className="archive-limit-note">All 50 pages are in use. You can still reopen every saved memory above.</p>}
        </section>
        <footer className="book-footer safe-bottom">FOR TSM <span>·</span> KEPT WITH CARE</footer>
      </div>
    </main>
  );
}

export function MemoryEditor({ onClose, onSave }) {
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [date, setDate] = React.useState('');
  const [chapterId, setChapterId] = React.useState(chapters[0].id);
  const ready = title.trim().length > 0 && body.trim().length > 0;

  return (
    <main className="editor-screen">
      <header className="book-top safe-top">
        <button className="round-control" type="button" onClick={onClose} aria-label="Close editor"><Icon name="close" size={18} /></button>
        <div className="book-top-label">A PAGE OF YOUR OWN</div>
        <span className="book-count">50 PAGES</span>
      </header>
      <section className="editor-wrap">
        <div className="book-kicker"><Icon name="sparkle" size={15} /> YOUR WORDS, YOUR MEMORY</div>
        <h1>Write a page<br /><em>only you can.</em></h1>
        <p className="editor-intro">The story leaves its unshared details to you. Add only what you want to remember; this page stays on this device.</p>
        <form onSubmit={(event) => { event.preventDefault(); if (ready) onSave({ title: title.trim(), body: body.trim(), date: date.trim(), chapterId }); }}>
          <label className="field-label" htmlFor="memory-title">TITLE</label>
          <input id="memory-title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={48} required autoComplete="off" />
          <div className="field-row">
            <div className="field-column">
              <label className="field-label" htmlFor="memory-date">DATE, IF KNOWN</label>
              <input id="memory-date" value={date} onChange={(event) => setDate(event.target.value)} maxLength={32} autoComplete="off" />
            </div>
            <div className="field-column">
              <label className="field-label" htmlFor="memory-chapter">CHAPTER</label>
              <select id="memory-chapter" value={chapterId} onChange={(event) => setChapterId(event.target.value)}>
                {chapters.map((chapter) => <option value={chapter.id} key={chapter.id}>{chapter.title}</option>)}
              </select>
            </div>
          </div>
          <label className="field-label" htmlFor="memory-body">THE MEMORY</label>
          <textarea id="memory-body" value={body} onChange={(event) => setBody(event.target.value)} maxLength={420} required rows={5} />
          <div className="editor-char-count">{body.length} / 420</div>
          <button className="home-primary editor-save" type="submit" data-sound="memory" disabled={!ready}><span>Save this page</span><Icon name="arrow" size={17} /></button>
        </form>
        <p className="editor-privacy">Saved privately in this browser. No memory is sent anywhere.</p>
      </section>
    </main>
  );
}
