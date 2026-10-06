import React from 'react';
import { Icon } from './Icons';

export function LetterBook({ letters, onClose, onOpenLetter }) {
  return (
    <main className="book-screen letter-book-screen">
      <header className="book-top safe-top">
        <button className="round-control" type="button" onClick={onClose} aria-label="Close letter book"><Icon name="back" size={19} /></button>
        <div className="book-top-label">A SMALL BOOK OF WORDS</div>
        <span className="book-count">10 LETTERS</span>
      </header>
      <div className="book-scroll">
        <section className="book-intro letter-intro">
          <div className="book-kicker"><Icon name="letter" size={15} /> LETTER BOOK</div>
          <h1>For the days<br /><em>in between.</em></h1>
          <p>Ten small letters for different moments. Open one when it feels right; close it whenever you like.</p>
          <div className="letter-book-rule"><span /><span /><span /></div>
        </section>
        <section className="letter-list" aria-label="Letters">
          {letters.map((letter) => (
            <button className="letter-list-item" key={letter.id} type="button" data-sound="letter" onClick={() => onOpenLetter(letter)}>
              <span className="letter-seal">{letter.seal}</span>
              <span className="letter-list-copy"><span>{letter.eyebrow}</span><strong>{letter.title}</strong></span>
              <span className="letter-list-arrow"><Icon name="arrow" size={17} /></span>
            </button>
          ))}
        </section>
        <footer className="book-footer safe-bottom">OPEN A LETTER <span>·</span> WHENEVER YOU NEED ONE</footer>
      </div>
    </main>
  );
}

export function LetterModal({ letter, onClose }) {
  if (!letter) return null;
  return (
    <main className="letter-modal-screen">
      <div className="letter-modal-glow" />
      <header className="overlay-top safe-top letter-modal-top">
        <button className="round-control" type="button" onClick={onClose} aria-label="Close letter"><Icon name="close" size={18} /></button>
        <span>LETTER BOOK</span>
        <span className="letter-number">{letter.seal} / 10</span>
      </header>
      <div className="letter-envelope-back" aria-hidden="true"><span /></div>
      <article className="letter-paper">
        <div className="letter-paper-head"><span>{letter.eyebrow}</span><span className="letter-seal-stamp">{letter.seal}</span></div>
        <div className="letter-paper-line" />
        <h1>{letter.title.replace(/^Open /, '')}</h1>
        <p className="letter-paper-body">{letter.body}</p>
        <div className="letter-signoff"><span>WITH CARE</span><i>✦</i></div>
      </article>
      <footer className="letter-close-row safe-bottom">
        <button className="quiet-cta" type="button" onClick={onClose}>Fold the letter <Icon name="arrow" size={16} /></button>
      </footer>
    </main>
  );
}
