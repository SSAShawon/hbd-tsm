import React, { useId } from 'react';

const palettes = {
  home: ['#0b1212', '#1d302d', '#9d7452'],
  'opening-dark': ['#070d10', '#10191a', '#26302b'],
  'phone-notification': ['#0d1717', '#22342f', '#b17d53'],
  'message-close': ['#101819', '#283b36', '#b98b63'],
  'first-page': ['#101817', '#2c3930', '#b6875c'],
  'date-reveal': ['#192a2b', '#75664f', '#d49a66'],
  anticipation: ['#172627', '#48594f', '#c99668'],
  'two-lights': ['#202b2a', '#6b6a53', '#dda16c'],
  'together-warm': ['#1e302d', '#686c53', '#d69a61'],
  classroom: ['#223a37', '#6c7864', '#d29b68'],
  'classroom-together': ['#263b37', '#737d68', '#d59e70'],
  'first-handshake': ['#1c3432', '#666e5c', '#d0a06d'],
  'hands-close': ['#253b36', '#6d705c', '#e5b578'],
  'two-directions': ['#172a34', '#4d6264', '#c28c63'],
  'uncertain-window': ['#1a2a32', '#4f6264', '#b68665'],
  'college-wait': ['#1b2b2b', '#5e695a', '#bd906a'],
  'college-reveal': ['#223731', '#727558', '#e0aa70'],
  'college-campus': ['#17302c', '#55745f', '#d99e68'],
  'pond-wide': ['#102724', '#42685d', '#d29a65'],
  'pond-together': ['#142b27', '#557468', '#dfa46d'],
  'pond-bench': ['#172c28', '#4c6d5f', '#d39864'],
  'pond-reflection': ['#112521', '#4b7067', '#dfaa75'],
  'warm-home': ['#2a2420', '#705543', '#d8a56f'],
  'three-silhouettes': ['#28231f', '#6c5344', '#d9a875'],
  'warm-table': ['#31251f', '#785d46', '#e2b47b'],
  'hsc-window': ['#282923', '#625d4c', '#cf9e6e'],
  'khulna-window': ['#1b2c31', '#526963', '#d09669'],
  'study-desk': ['#1d2d2d', '#52625a', '#c78e63'],
  'khulna-evening': ['#172b2f', '#526b66', '#d59b6c'],
  'two-windows': ['#1a2a2b', '#4d635d', '#c99366'],
  'blue-evening': ['#101a24', '#334653', '#83909a'],
  'separate-windows': ['#111d29', '#354653', '#71808b'],
  'distance-phone': ['#131e2a', '#3a4650', '#8e8d8a'],
  'goodbye-horizon': ['#111a26', '#303e4a', '#78848b'],
  'warm-return': ['#1d2b28', '#655d48', '#dda66f'],
  'family-lights': ['#252c26', '#6b664e', '#e4b77d'],
  'motifs-return': ['#1d2b28', '#5e6550', '#d9a16a'],
  'still-here': ['#1b2926', '#605b48', '#dbab75'],
  'flashback-montage': ['#121b1c', '#35433a', '#d8a06a'],
  'eight-years': ['#121b1d', '#374943', '#c9956d'],
  'unwritten-page': ['#171d1b', '#414b3d', '#e3b578'],
  'birthday-scene': ['#101817', '#4c4937', '#e8b878'],
  'birthday-party': ['#121817', '#5a4939', '#e0aa72'],
  'infinity-end': ['#080f12', '#182625', '#d6a570'],
};

function Figure({ x, y, scale = 1, kind = 'shawon', seated = false, turned = false }) {
  const colors = kind === 'tasneem'
    ? { skin: '#a96f52', hair: '#1d1b1a', clothes: '#8d6656', light: '#c09174' }
    : kind === 'mother'
      ? { skin: '#9d6c50', hair: '#2b211c', clothes: '#6f7561', light: '#c08a66' }
      : { skin: '#9f6c4e', hair: '#201d1b', clothes: '#44584f', light: '#b88b66' };
  return (
    <g
      className={`figure figure--${kind}${seated ? ' figure--seated' : ''}`}
      transform={`translate(${x} ${y - 145}) scale(${scale})${turned ? ' scale(-1 1)' : ''}`}
    >
      <ellipse cx="0" cy="-3" rx="41" ry="9" fill="#101614" opacity=".26" />
      {seated ? (
        <g>
          <path d="M-26-27 18-27 57 9 43 22 4-3-18 8-47 5Z" fill={colors.clothes} />
          <path d="M-26 0-56 41M6-2 39 37" fill="none" stroke="#202625" strokeWidth="14" strokeLinecap="round" />
          <path d="m-56 41-13 3m91-7 11 4" fill="none" stroke="#c1a788" strokeWidth="6" strokeLinecap="round" />
          <path d="M-26-27Q-40-14-36 1L-16 10Q-4-4 7-1L20-18 18-34Z" fill={colors.clothes} />
        </g>
      ) : (
        <g>
          <path d="M-36-14Q-41-46-32-77L-20-94 19-94 33-77Q41-41 35-14L28-4H-28Z" fill={colors.clothes} />
          <path d="m-12-88 12 27 12-27" fill="none" stroke={colors.light} strokeWidth="3" opacity=".62" />
          <path d="M-29-22-41 5m68-27L39 4" fill="none" stroke={colors.clothes} strokeWidth="11" strokeLinecap="round" />
          <path d="M-23-5-25 0m49-5 2 5" fill="none" stroke="#2b3531" strokeWidth="11" strokeLinecap="round" />
        </g>
      )}
      <g className="figure-head">
        <path d="M-8-103h16v18H-8z" fill={colors.skin} />
        <ellipse cx="0" cy="-124" rx="25" ry="30" fill={colors.skin} />
      {kind === 'tasneem' ? (
        <path d="M-25-128Q-33-158-8-160 18-166 27-141L31-91Q22-81 17-94L18-125Q8-137-8-136L-20-117-23-91-34-99Z" fill={colors.hair} />
      ) : kind === 'mother' ? (
        <path d="M-25-132Q-34-160-6-160 20-161 27-139L21-115Q10-137-8-136L-23-119Z" fill={colors.hair} />
      ) : (
        <path d="M-25-130Q-33-159-7-161 21-164 27-140L23-123 14-133-4-137-19-129-24-115Z" fill={colors.hair} />
      )}
      <g className="eyes-open" fill="#25221f">
        <ellipse cx="-8" cy="-124" rx="1.8" ry="2.4" />
        <ellipse cx="8" cy="-124" rx="1.8" ry="2.4" />
      </g>
      <g className="eyes-closed" fill="none" stroke="#30221e" strokeWidth="1.8" strokeLinecap="round">
        <path d="m-11-123 6 0m8 0 6 0" />
      </g>
        <path d="M-4-111q4 3 8 0" fill="none" stroke="#73493b" strokeWidth="1.5" strokeLinecap="round" opacity=".8" />
        <path d="M-5-86h10v9H-5z" fill={colors.skin} opacity=".9" />
      </g>
    </g>
  );
}

function Tree({ x, y, scale = 1, dark = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 0q10-60 0-115" fill="none" stroke={dark ? '#172621' : '#29382e'} strokeWidth="12" strokeLinecap="round" />
      <path d="M1-57q-28-22-43-42m41 25q29-25 43-52M0-79q-4-39-2-63" fill="none" stroke={dark ? '#172621' : '#29382e'} strokeWidth="7" strokeLinecap="round" />
      <ellipse className="tree-leaves tree-leaves--one" cx="-31" cy="-143" rx="36" ry="43" fill={dark ? '#172923' : '#304739'} opacity=".86" />
      <ellipse className="tree-leaves tree-leaves--two" cx="29" cy="-152" rx="42" ry="51" fill={dark ? '#192d25' : '#3c5741'} opacity=".9" />
      <ellipse className="tree-leaves tree-leaves--three" cx="-2" cy="-180" rx="34" ry="42" fill={dark ? '#1d332a' : '#4c6045'} opacity=".84" />
    </g>
  );
}

function Phone({ close = false }) {
  return (
    <g className="phone-illustration" transform={close ? 'translate(225 425) rotate(-2) scale(1.17)' : 'translate(225 457) rotate(-4)'}>
      <ellipse className="phone-shadow" cx="0" cy="154" rx="110" ry="21" fill="#080d0c" opacity=".42" />
      <rect x="-77" y="-151" width="154" height="294" rx="25" fill="#0a0e10" stroke="#6a7468" strokeWidth="2" />
      <rect x="-68" y="-141" width="136" height="273" rx="19" fill="#16221f" />
      <rect x="-22" y="-136" width="44" height="7" rx="3.5" fill="#070d0f" />
      <circle cx="0" cy="-109" r="23" fill="#ddad7b" opacity=".1" />
      <circle cx="0" cy="-109" r="12" fill="#d6aa78" opacity=".72" />
      <text x="0" y="-74" textAnchor="middle" fill="#ead9bd" fontSize="9" fontFamily="sans-serif" letterSpacing="1.8">14 JULY 2018</text>
      <rect x="-53" y="-56" width="106" height="1" fill="#c6b391" opacity=".18" />
      <rect className="chat-bubble chat-bubble--one" x="-50" y="-39" width="84" height="25" rx="11" fill="#3d554b" />
      <rect className="chat-bubble chat-bubble--two" x="-50" y="-4" width="97" height="25" rx="11" fill="#293a35" />
      <rect className="chat-bubble chat-bubble--three" x="-50" y="31" width="71" height="25" rx="11" fill="#3d554b" />
      <text x="0" y="87" textAnchor="middle" fill="#c9ad86" fontSize="8" fontFamily="sans-serif" letterSpacing="1.5">MATH EXAM</text>
      <rect x="-39" y="103" width="78" height="15" rx="7.5" fill="#40554b" opacity=".78" />
      <circle cx="0" cy="127" r="2" fill="#9d997f" />
    </g>
  );
}

export function SceneArtwork({ art = 'opening-dark', className = '', celebration = false }) {
  const unique = useId().replace(/:/g, '');
  const palette = palettes[art] || palettes['opening-dark'];
  const phoneScene = art === 'phone-notification' || art === 'message-close' || art === 'home';
  const pondScene = art.startsWith('pond');
  const classroomScene = ['classroom', 'classroom-together', 'first-handshake', 'hands-close'].includes(art);
  const coolScene = ['blue-evening', 'separate-windows', 'distance-phone', 'goodbye-horizon'].includes(art);
  const homeScene = ['warm-home', 'three-silhouettes', 'warm-table', 'hsc-window'].includes(art);
  const khulnaScene = ['khulna-window', 'study-desk', 'khulna-evening', 'two-windows'].includes(art);
  const warmScene = ['date-reveal', 'anticipation', 'two-lights', 'together-warm', 'warm-return', 'family-lights', 'motifs-return', 'still-here'].includes(art);
  const isBirthday = art === 'birthday-scene' || art === 'birthday-party';
  const isBirthdayParty = art === 'birthday-party';
  const isInfinity = art === 'infinity-end';

  return (
    <svg className={`scene-artwork scene-artwork--${art}${celebration ? ' is-celebrating' : ''} ${className}`} viewBox="0 0 450 800" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A softly illustrated cinematic scene">
      <defs>
        <linearGradient id={`${unique}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette[0]} />
          <stop offset=".58" stopColor={palette[1]} />
          <stop offset="1" stopColor={palette[2]} />
        </linearGradient>
        <radialGradient id={`${unique}-glow`}>
          <stop offset="0" stopColor="#f4cb8e" stopOpacity=".82" />
          <stop offset=".35" stopColor="#dfa36b" stopOpacity=".36" />
          <stop offset="1" stopColor="#dfa36b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${unique}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#627c6d" stopOpacity=".92" />
          <stop offset="1" stopColor="#172d2b" stopOpacity=".98" />
        </linearGradient>
        <linearGradient id={`${unique}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9c59f" stopOpacity=".18" />
          <stop offset="1" stopColor="#c0b38d" stopOpacity=".02" />
        </linearGradient>
      </defs>
      <g className="artwork-pan">
        <rect width="450" height="800" fill={`url(#${unique}-sky)`} />
        <circle cx="312" cy="267" r="204" fill={`url(#${unique}-glow)`} opacity={coolScene ? '.28' : '.68'} />
        <circle cx="327" cy="250" r="35" fill="#f0c486" opacity={coolScene ? '.12' : '.18'} />
        {!phoneScene && !coolScene && art !== 'opening-dark' && art !== 'infinity-end' && (
          <g className="ambient-clouds" fill="#f2d5a9" opacity=".085">
            <path d="M-40 267q45-28 91 0 44-37 91 0 37-20 77 5H-40Zm177 52q42-23 81 0 35-31 73-1 39-23 83 8H137Z" />
            <path d="M-34 349q33-17 69 1 35-24 73 0 32-20 66 4H-34Zm252-113q28-18 58 0 28-24 58 0 31-15 54 2h-170Z" opacity=".62" />
          </g>
        )}

        {(art === 'opening-dark' || art === 'infinity-end' || art === 'flashback-montage') && (
          <g fill="#f0dab8" opacity=".45">
            <circle cx="54" cy="101" r="1.5"/><circle cx="350" cy="110" r="1"/><circle cx="288" cy="174" r="1.2"/>
            <circle cx="102" cy="236" r="1"/><circle cx="391" cy="313" r="1.4"/><circle cx="32" cy="358" r="1"/>
            <circle cx="151" cy="144" r=".8"/><circle cx="340" cy="393" r=".8"/>
          </g>
        )}

        {art === 'opening-dark' && (
          <g opacity=".28">
            <path d="M0 650Q113 597 223 654T450 634V800H0Z" fill="#0a1010" />
            <path d="M36 0v800M413 0v800" stroke="#d2c0a0" strokeOpacity=".05" />
          </g>
        )}

        {art === 'first-page' && (
          <g>
            <path d="M0 550q110-44 225 0t225-5v255H0Z" fill="#222a23" opacity=".82" />
            <ellipse cx="225" cy="507" rx="174" ry="154" fill={`url(#${unique}-glow)`} opacity=".36" />
            <g className="open-book-pages" transform="translate(225 515) rotate(-3)">
              <path d="M-142-93q67-16 142 9 73-25 142-9v208q-69-13-142 13-75-26-142-13Z" fill="#e7dcc6" opacity=".94" />
              <path d="M0-84V132" stroke="#9d8d70" strokeOpacity=".35" strokeWidth="2" />
              <path d="M-116-51h78m-78 21h62m-62 21h76m-76 21h56M39-51h78M39-30h66M39-9h81M39 12h63" stroke="#637064" strokeOpacity=".23" strokeWidth="2" />
              <path d="M-35 68q35-26 70 0" fill="none" stroke="#a9835d" strokeOpacity=".48" strokeWidth="2" />
            </g>
            <path d="M350 629q25-12 41 0l-56 90-17-9Z" fill="#765b41" opacity=".66" />
          </g>
        )}

        {phoneScene && (
          <g>
            <rect x="0" y="142" width="450" height="336" fill="#12201f" opacity=".42" />
            <path d="M26 155h145v246H26zM279 155h145v246H279z" fill={`url(#${unique}-glass)`} stroke="#b9ad8a" strokeOpacity=".17" strokeWidth="3" />
            <path d="M98 155v246M352 155v246M26 273h145M279 273h145" stroke="#c8b998" strokeOpacity=".18" strokeWidth="4" />
            <path d="M0 479h450v321H0z" fill="#1a211e" opacity=".55" />
            <path d="M0 595q150-29 450-2v207H0Z" fill="#302d26" opacity=".74" />
            <ellipse cx="225" cy="667" rx="153" ry="26" fill="#090d0d" opacity=".35" />
            <Phone close={art === 'message-close'} />
            {art === 'phone-notification' && (
              <g className="notification-glow" transform="translate(225 277)">
                <rect x="-98" y="-24" width="196" height="49" rx="14" fill="#e4d5b7" opacity=".94" />
                <circle cx="-76" cy="0" r="10" fill="#718276" />
                <circle cx="-76" cy="0" r="3" fill="#eee4d1" />
                <rect x="-58" y="-8" width="84" height="4" rx="2" fill="#354039" opacity=".77" />
                <rect x="-58" y="2" width="115" height="3" rx="1.5" fill="#687166" opacity=".48" />
                <text x="79" y="-7" textAnchor="end" fill="#596259" fontSize="6" fontFamily="sans-serif" letterSpacing=".7">NOW</text>
              </g>
            )}
          </g>
        )}

        {(art === 'date-reveal' || art === 'anticipation' || art === 'two-lights' || art === 'together-warm') && (
          <g>
            <path d="M0 488Q92 397 190 456T450 421V800H0Z" fill="#29372e" opacity=".57" />
            <path d="M0 571Q125 497 235 547T450 504V800H0Z" fill="#1a2b27" opacity=".72" />
            <path d="M0 690Q140 611 270 671T450 642V800H0Z" fill="#141e1c" opacity=".83" />
            <circle cx="225" cy="410" r="37" fill="#e1ac74" opacity=".65" />
            <path d="M74 528v-72m0 0q-22 11-14 29 13 7 27-2m-13-27q10-14 23-17" fill="none" stroke="#23352d" strokeWidth="9" strokeLinecap="round" />
            <path d="M373 525v-86m0 0q-23 9-17 28 14 8 30-3m-13-25q12-15 25-17" fill="none" stroke="#23352d" strokeWidth="10" strokeLinecap="round" />
            {art === 'date-reveal' && (
              <g className="date-card" transform="translate(225 455)">
                <rect x="-100" y="-47" width="200" height="94" rx="4" fill="#eee2ca" opacity=".93" />
                <path d="M-74-20h148" stroke="#9b8666" strokeOpacity=".38" />
                <text x="0" y="12" textAnchor="middle" fill="#3c4840" fontFamily="Georgia,serif" fontSize="20" letterSpacing="1.2">1 SEP 2018</text>
                <text x="0" y="32" textAnchor="middle" fill="#7b775f" fontFamily="sans-serif" fontSize="7" letterSpacing="2.4">THE DAY WE BECAME US</text>
              </g>
            )}
            {art === 'anticipation' && <><Figure x={147} y={718} scale={.74} kind="shawon"/><Figure x={295} y={718} scale={.74} kind="tasneem"/></>}
            {art === 'two-lights' && <g><circle className="story-light story-light--left" cx="184" cy="547" r="7" fill="#f2c48c"/><circle className="story-light story-light--right" cx="266" cy="547" r="7" fill="#f2c48c"/><path d="M184 547q41-51 82 0" fill="none" stroke="#f2c48c" strokeWidth="1" opacity=".3"/></g>}
            {art === 'together-warm' && <><Figure x={181} y={724} scale={.83} kind="shawon"/><Figure x={270} y={724} scale={.83} kind="tasneem"/></>}
          </g>
        )}

        {classroomScene && (
          <g>
            <path d="M24 169h160v242H24z" fill="#d4c5a3" opacity=".17" stroke="#e1d2ad" strokeOpacity=".35" strokeWidth="4" />
            <path d="M104 169v242M24 290h160" stroke="#c9ba98" strokeOpacity=".3" strokeWidth="4" />
            <path d="M266 192h148v155H266z" fill="#172723" stroke="#a78d69" strokeOpacity=".3" strokeWidth="5" />
            <path d="M289 221h90m-90 25h66m-66 25h82" stroke="#d4c39f" strokeOpacity=".15" strokeWidth="3" />
            <path d="M0 510h450v290H0z" fill="#3c3228" opacity=".5" />
            <path d="M0 612q180-46 450 3v185H0Z" fill="#232a25" opacity=".75" />
            <path d="M76 589h144v72H76z" fill="#594737" opacity=".9" />
            <path d="M91 580h119v13H91z" fill="#8b704f" />
            <path d="M280 606h103v18H280z" fill="#766148" />
            <path d="M305 602v-22m24 22v-17m24 17v-25" stroke="#b9a17a" strokeOpacity=".53" strokeWidth="3" />
            {art === 'classroom-together' && <><Figure x={171} y={720} scale={.8} kind="shawon" seated/><Figure x={282} y={720} scale={.8} kind="tasneem" seated/></>}
            {(art === 'first-handshake' || art === 'hands-close') && (
              <g className="handshake-art" transform="translate(0 -75)">
                <ellipse cx="225" cy="563" rx="108" ry="103" fill={`url(#${unique}-glow)`} opacity=".7" />
                <path className="handshake-arm handshake-arm--left" d="M56 581q74-27 128-15l33 21q9 9 1 18-8 9-21 2l-29-16q-32 0-80 25Z" fill="#a16d50" />
                <path className="handshake-arm handshake-arm--right" d="M394 581q-74-27-128-15l-33 21q-9 9-1 18 8 9 21 2l29-16q32 0 80 25Z" fill="#ae7959" />
                <path d="M137 601q30 8 54 17l24 13q10 6 15-2 4-7-5-13l-18-13m47-2q-20 8-38 17l-24 13q-10 6-15-2-4-7 5-13l18-13" fill="none" stroke="#ba8867" strokeWidth="12" strokeLinecap="round" />
                <path className="handshake-arm handshake-arm--left" d="M51 574q40-3 74 16l-19 38q-33-18-64-22Z" fill={art === 'hands-close' ? '#8c6854' : '#496056'} />
                <path className="handshake-arm handshake-arm--right" d="M399 574q-40-3-74 16l19 38q33-18 64-22Z" fill="#765950" />
                {art === 'first-handshake' && <><Figure x={138} y={608} scale={.57} kind="shawon"/><Figure x={312} y={608} scale={.57} kind="tasneem"/></>}
              </g>
            )}
          </g>
        )}

        {(art === 'two-directions' || art === 'uncertain-window' || art === 'college-wait' || art === 'college-reveal') && (
          <g>
            <path d="M0 484Q100 435 220 482T450 456V800H0Z" fill="#182827" opacity=".6" />
            {art === 'two-directions' && (
              <g>
                <path d="M225 800q7-133-58-243m58 243q-7-133 67-243" fill="none" stroke="#c1a17b" strokeOpacity=".42" strokeWidth="8" />
                <path d="M49 472h106m-106 0 17-13m-17 13 17 13M295 472h107m0 0-17-13m17 13-17 13" fill="none" stroke="#d9c5a2" strokeOpacity=".68" strokeWidth="2" />
                <text x="101" y="450" textAnchor="middle" fill="#e2cfad" fontSize="11" fontFamily="sans-serif" letterSpacing="2">SATKHIRA</text>
                <text x="350" y="450" textAnchor="middle" fill="#e2cfad" fontSize="11" fontFamily="sans-serif" letterSpacing="2">DHAKA</text>
                <circle cx="225" cy="554" r="5" fill="#dca96e" />
              </g>
            )}
            {art === 'uncertain-window' && (
              <g>
                <rect x="73" y="190" width="304" height="300" rx="3" fill={`url(#${unique}-glass)`} stroke="#c4b995" strokeOpacity=".38" strokeWidth="5" />
                <path d="M225 190v300M73 343h304" stroke="#c4b995" strokeOpacity=".28" strokeWidth="5" />
                <path d="M95 220 150 360m70-124 33 105m49-117-40 133" stroke="#d0d0bc" strokeOpacity=".16" strokeWidth="2" />
                <Figure x={180} y={720} scale={.7} kind="shawon"/>
              </g>
            )}
            {art === 'college-wait' && (
              <g transform="translate(225 515) rotate(-3)">
                <rect x="-120" y="-158" width="240" height="316" rx="4" fill="#ebdfc7" opacity=".94" />
                <path d="M-83-102h166m-166 27h141m-141 27h157m-157 66h154m-154 26h123" stroke="#8d806b" strokeOpacity=".31" strokeWidth="3" />
                <circle cx="0" cy="17" r="38" fill="none" stroke="#b07d55" strokeOpacity=".73" strokeWidth="2" />
                <path d="M0-3v23l17 8" fill="none" stroke="#9b6849" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}
            {art === 'college-reveal' && (
              <g className="college-result-card" transform="translate(225 465) rotate(-2)">
                <rect x="-128" y="-150" width="256" height="302" rx="4" fill="#f1e5ce" opacity=".97" />
                <path d="M-93-111h186" stroke="#a58a67" strokeOpacity=".55" />
                <text x="0" y="-80" textAnchor="middle" fill="#65705e" fontSize="10" fontFamily="sans-serif" letterSpacing="3">COLLEGE SELECTION</text>
                <path d="M-84-52h168m-168 23h148" stroke="#a99b80" strokeOpacity=".35" strokeWidth="3" />
                <circle cx="0" cy="34" r="45" fill="#647666" opacity=".14" />
                <path d="m-18 35 12 13 27-33" fill="none" stroke="#69775f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="0" y="105" textAnchor="middle" fill="#48584b" fontFamily="Georgia,serif" fontSize="17">The same college</text>
              </g>
            )}
          </g>
        )}

        {art === 'college-campus' && (
          <g>
            <path d="M51 386 225 287l174 99v29H51Z" fill="#425147" />
            <path d="M77 414h296v193H77z" fill="#586755" opacity=".76" />
            <path d="M102 422h37v184h-37zm72 0h37v184h-37zm72 0h37v184h-37zm72 0h23v184h-23z" fill="#b89a6c" opacity=".43" />
            <path d="M0 640q94-46 176-2t274-13v175H0Z" fill="#1a302a" />
            <Tree x={55} y={675} scale={1.15}/><Tree x={395} y={680} scale={1.27}/>
            <path d="M118 689q108-44 219 0" fill="none" stroke="#c29767" strokeWidth="2" opacity=".38" />
            <Figure x={195} y={714} scale={.76} kind="shawon" seated/><Figure x={282} y={714} scale={.76} kind="tasneem" seated/>
          </g>
        )}

        {pondScene && (
          <g>
            <path d="M0 344q63-111 153-70 82-111 161-23 66-69 136 0v306H0Z" fill="#1c342b" />
            <Tree x={54} y={479} scale={1.45} dark/><Tree x={391} y={474} scale={1.35} dark/>
            <path d="M0 451q125-53 225 1t225-5v353H0Z" fill={`url(#${unique}-water)`} />
            <path d="M0 473q119-27 225 9t225-13M0 512q98-21 196 7t254-4M40 569q79-15 153 4t184-5M-20 624q110-25 222 4t270-6" fill="none" stroke="#d4c29b" strokeOpacity=".28" strokeWidth="2" />
            <path d="M151 456q74-35 151 2-74 43-151-2Z" fill="#e0af76" opacity=".12" />
            <g fill="none" stroke="#ebc18c" strokeOpacity=".48">
              <ellipse className="water-ripple ripple-one" cx="236" cy="543" rx="34" ry="8" strokeWidth="1.5" />
              <ellipse className="water-ripple ripple-two" cx="236" cy="543" rx="57" ry="13" strokeWidth="1" />
              <path className="birds-flight" d="M43 395q15-15 28 0m7-15q12-12 23 0" strokeWidth="2" />
            </g>
            {(art === 'pond-together' || art === 'pond-bench' || art === 'pond-wide') && (
              <g>
                <path d="M147 649h166m-153 0v33m140-33v33M144 626h171v19H144z" fill="#4c4032" stroke="#8f7555" strokeWidth="3" />
                <Figure x={195} y={632} scale={.7} kind="shawon" seated/>
                <Figure x={271} y={632} scale={.7} kind="tasneem" seated/>
              </g>
            )}
            {art === 'pond-reflection' && <g><circle cx="230" cy="429" r="34" fill="#e2b578" opacity=".39"/><path d="M183 471q49 17 96 0m-79 15q32 9 63 0" stroke="#f0c187" strokeOpacity=".44" strokeWidth="3" fill="none"/></g>}
            <path d="M0 727q70-29 139 0t150-1 161 0v74H0Z" fill="#172923" />
            <path d="M17 719q14-28 19 1m14-7q17-25 20 9m319-15q17-30 22-3m13-8q18-26 24 4" fill="none" stroke="#667c59" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {homeScene && (
          <g>
            <rect x="49" y="154" width="352" height="318" fill={`url(#${unique}-glass)`} stroke="#d0bd96" strokeOpacity=".22" strokeWidth="5" />
            <path d="M223 154v318M49 310h352" stroke="#d0bd96" strokeOpacity=".19" strokeWidth="5" />
            <path d="M0 511h450v289H0Z" fill="#32291f" opacity=".7" />
            <ellipse className="home-lamp-glow" cx="223" cy="500" rx="82" ry="107" fill={`url(#${unique}-glow)`} opacity=".55" />
            <path d="M187 513h76v12h-76zm8-18q30-41 59 0" fill="#c69b68" />
            <path d="M0 651q105-47 222-9t228-6v164H0Z" fill="#211f1b" />
            {art === 'warm-table' && <><path d="M58 626h335v25H58zM89 651v85m276-85v85" fill="#675341"/><Figure x={163} y={650} scale={.67} kind="shawon"/><Figure x={281} y={650} scale={.67} kind="tasneem"/></>}
            {art === 'warm-home' && <><Figure x={164} y={695} scale={.79} kind="shawon"/><Figure x={281} y={695} scale={.79} kind="mother"/><Figure x={346} y={700} scale={.63} kind="tasneem"/></>}
            {art === 'three-silhouettes' && <><Figure x={134} y={703} scale={.78} kind="shawon"/><Figure x={225} y={703} scale={.8} kind="mother"/><Figure x={315} y={703} scale={.75} kind="tasneem"/></>}
            {art === 'hsc-window' && <><Figure x={174} y={722} scale={.7} kind="shawon"/><Figure x={280} y={722} scale={.7} kind="tasneem"/></>}
          </g>
        )}

        {khulnaScene && (
          <g>
            <path d="M30 168h390v334H30z" fill={`url(#${unique}-glass)`} stroke="#d0c09b" strokeOpacity=".25" strokeWidth="5" />
            <path d="M225 168v334M30 335h390" stroke="#d0c09b" strokeOpacity=".19" strokeWidth="5" />
            <path d="M33 468h385" stroke="#e2be8c" strokeOpacity=".34" strokeWidth="2" />
            <path d="M51 466v-63h37v63m18 0v-98h45v98m22 0v-71h43v71m103 0v-115h46v115m19 0v-73h30v73" fill="#1b302c" opacity=".89" />
            <text x="228" y="220" textAnchor="middle" fill="#e6d3b0" opacity=".48" fontFamily="sans-serif" fontSize="11" letterSpacing="4">KHULNA</text>
            <path d="M0 552h450v248H0Z" fill="#292b24" opacity=".78" />
            <path d="M81 608h288v32H81zM102 639v97m244-97v97" fill="#66513d" />
            <path d="M122 588h79v18h-79zm94-13h81v31h-81zm-78-17h51v17h-51" fill="#c4a373" opacity=".72" />
            {art === 'study-desk' && <><Figure x={160} y={725} scale={.75} kind="shawon" seated/><Figure x={283} y={725} scale={.75} kind="tasneem" seated/></>}
            {(art === 'khulna-evening' || art === 'two-windows') && <><Figure x={181} y={735} scale={.73} kind="shawon"/><Figure x={273} y={735} scale={.73} kind="tasneem"/></>}
          </g>
        )}

        {coolScene && (
          <g>
            <rect x="47" y="145" width="356" height="363" fill={`url(#${unique}-glass)`} stroke="#b7c0b8" strokeOpacity=".2" strokeWidth="5" />
            <path d="M225 145v363M47 325h356" stroke="#abb7b4" strokeOpacity=".19" strokeWidth="5" />
            <path d="M0 546h450v254H0Z" fill="#17212a" opacity=".86" />
            <path d="M47 594q99-37 172 0t184-13v219H47Z" fill="#1a2630" />
            <path d="M86 695q72-44 128 0m29-1q67-43 122 0" fill="none" stroke="#9d9d96" strokeOpacity=".28" strokeWidth="2" />
            <path className="rain-lines" d="M104 185 138 301m25-96 29 106m67-92-19 95m77-110-28 119" stroke="#bec5c4" strokeOpacity=".13" strokeWidth="2" />
            {art === 'separate-windows' && <><Figure x={148} y={736} scale={.74} kind="shawon"/><Figure x={301} y={736} scale={.74} kind="tasneem"/></>}
            {art === 'distance-phone' && (
              <g transform="translate(225 450) rotate(-4)">
                <rect x="-43" y="-84" width="86" height="154" rx="14" fill="#101718" stroke="#82908a" strokeOpacity=".6" strokeWidth="2" />
                <rect x="-36" y="-74" width="72" height="132" rx="9" fill="#283530" />
                <circle className="distance-screen-glow" cx="0" cy="-31" r="10" fill="#dbb17b" opacity=".45" />
                <path d="M-24-4h42m-42 14h30m-30 14h37" stroke="#c6c3ae" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}
            {art === 'goodbye-horizon' && <><path d="M0 535q120-62 225 0t225-5v265H0Z" fill="#293847" opacity=".76"/><path d="M225 546q-27 99 2 248" fill="none" stroke="#c2ab8a" strokeOpacity=".25" strokeWidth="1.5"/><Figure x={149} y={736} scale={.69} kind="shawon"/><Figure x={303} y={736} scale={.69} kind="tasneem"/></>}
          </g>
        )}

        {(art === 'warm-return' || art === 'family-lights' || art === 'motifs-return' || art === 'still-here') && (
          <g>
            <path d="M0 515q101-59 222-3t228-10v298H0Z" fill="#29362c" opacity=".77" />
            <path d="M0 663q121-49 225 1t225-3v139H0Z" fill="#1b2924" opacity=".75" />
            <path d="M78 533q73-93 146 0m2 0q74-91 147 0" fill="none" stroke="#e1b375" strokeOpacity=".42" strokeWidth="1.5" />
            {[[102,503],[164,467],[224,506],[287,464],[348,508]].map(([x,y],i)=><g key={i}><circle className="soft-lantern" cx={x} cy={y} r={i===2?12:8} fill="#e8bc7d" opacity=".67"/><circle cx={x} cy={y} r="23" fill="#e4ad6d" opacity=".11"/></g>)}
            {art === 'family-lights' && <><Figure x={150} y={726} scale={.72} kind="shawon"/><Figure x={225} y={726} scale={.72} kind="mother"/><Figure x={300} y={726} scale={.72} kind="tasneem"/></>}
            {(art === 'warm-return' || art === 'still-here') && <><Figure x={184} y={731} scale={.79} kind="shawon"/><Figure x={270} y={731} scale={.79} kind="tasneem"/></>}
            {art === 'motifs-return' && <g opacity=".23"><rect x="74" y="578" width="86" height="116" rx="3" fill="#dbc39b"/><rect x="182" y="551" width="86" height="143" rx="3" fill="#dfb989"/><rect x="290" y="578" width="86" height="116" rx="3" fill="#bd9272"/><path d="M93 612h47m-47 11h38m-38 11h44M201 586h48m-48 11h36m-36 11h43M310 612h47m-47 11h39" stroke="#27352f" strokeWidth="3"/></g>}
          </g>
        )}

        {art === 'flashback-montage' && (
          <g>
            <path d="M0 520q113-58 225 0t225-2v282H0Z" fill="#192824" />
            <g className="flashback-cards" transform="translate(225 461) rotate(-2)">
              <rect x="-166" y="-181" width="132" height="170" rx="3" fill="#263c37" stroke="#c6a778" strokeOpacity=".45" />
              <rect x="-65" y="-221" width="132" height="171" rx="3" fill="#64533e" stroke="#d2b17b" strokeOpacity=".53" />
              <rect x="38" y="-175" width="132" height="166" rx="3" fill="#263b34" stroke="#c8a87a" strokeOpacity=".45" />
              <path d="M-145-113h88m-88 15h67M-41-145h84m-84 15h67M60-109h87m-87 15h67" stroke="#eee0c6" strokeOpacity=".36" strokeWidth="3" />
              <circle cx="-100" cy="-151" r="21" fill="#d3a36e" opacity=".43" />
              <circle cx="3" cy="-182" r="21" fill="#d3a36e" opacity=".52" />
              <circle cx="104" cy="-147" r="21" fill="#d3a36e" opacity=".43" />
              <path d="M-163 29q63-32 127 0m40 0q63-32 127 0m39 0q63-32 127 0" fill="none" stroke="#ddbd8d" strokeOpacity=".29" strokeWidth="2" />
            </g>
            <Figure x={188} y={744} scale={.7} kind="shawon"/><Figure x={264} y={744} scale={.7} kind="tasneem"/>
          </g>
        )}

        {art === 'eight-years' && (
          <g>
            <path d="M0 571q130-43 225 0t225-4v233H0Z" fill="#1b2925" />
            <g transform="translate(225 428)">
              <circle r="130" fill="none" stroke="#d5a875" strokeOpacity=".16" strokeWidth="1" />
              <circle r="105" fill="none" stroke="#e1bd8d" strokeOpacity=".23" strokeWidth="1" />
              <circle r="80" fill="none" stroke="#e3bd88" strokeOpacity=".22" strokeWidth="1" />
              <circle r="53" fill="none" stroke="#dca770" strokeOpacity=".25" strokeWidth="1" />
              <circle r="20" fill="#dca770" opacity=".13" />
              <path d="M-129 0h258M0-129v258" stroke="#e4c99f" strokeOpacity=".13" />
            </g>
            <Figure x={182} y={741} scale={.74} kind="shawon"/><Figure x={274} y={741} scale={.74} kind="tasneem"/>
          </g>
        )}

        {art === 'unwritten-page' && (
          <g transform="translate(225 455) rotate(-3)">
            <path d="M-154-165Q-72-182 0-147 72-182 154-165V180Q70 163 0 198-73 163-154 180Z" fill="#e9dec9" opacity=".96" />
            <path d="M0-147v345" stroke="#9f8c6d" strokeOpacity=".33" strokeWidth="2" />
            <path d="M-124-106h85m-85 22h67m-67 22h77M39-106h83m-83 22h76m-76 22h58" stroke="#6f725f" strokeOpacity=".23" strokeWidth="2" />
            <path d="M-97 14q37-46 73-5m55 2q31-37 68-7" fill="none" stroke="#ae8156" strokeOpacity=".4" strokeWidth="2" />
            <path d="M-34 81q34-41 68 0" fill="none" stroke="#9b7453" strokeOpacity=".28" strokeWidth="2" />
            <circle cx="0" cy="-2" r="224" fill={`url(#${unique}-glow)`} opacity=".29" />
          </g>
        )}

        {isBirthday && (
          <g>
            {isBirthdayParty && (
              <g className="party-light-string">
                <path d="M0 230q95 74 225 11t225 9" fill="none" stroke="#d6b17a" strokeOpacity=".44" strokeWidth="2" />
                {[[25,246],[79,270],[137,278],[194,268],[250,254],[306,251],[362,259],[420,249]].map(([x,y],index) => (
                  <circle className="party-light" key={index} cx={x} cy={y} r={index % 3 === 1 ? 5 : 4} fill={index % 2 ? '#e7c58d' : '#f0d7af'} />
                ))}
              </g>
            )}
            <g className="party-balloons">
              <g className="birthday-balloon balloon--sage" transform="translate(62 365)">
                <ellipse cx="0" cy="0" rx="25" ry="34" fill="#718276" opacity=".92" />
                <path d="m-4 31 4 7 4-7M0 38q-11 16 3 29" fill="none" stroke="#c5b18b" strokeWidth="1.2" />
                <ellipse cx="-8" cy="-11" rx="4" ry="10" fill="#ddd8c2" opacity=".18" />
              </g>
              <g className="birthday-balloon balloon--rose" transform="translate(388 326)">
                <ellipse cx="0" cy="0" rx="24" ry="33" fill="#a97970" opacity=".92" />
                <path d="m-4 30 4 7 4-7M0 37q12 18-4 30" fill="none" stroke="#d1b38c" strokeWidth="1.2" />
                <ellipse cx="-7" cy="-10" rx="4" ry="9" fill="#f0d8c3" opacity=".2" />
              </g>
              <g className="birthday-balloon balloon--gold" transform="translate(112 454)">
                <ellipse cx="0" cy="0" rx="17" ry="25" fill="#c49a66" opacity=".88" />
                <path d="m-3 22 3 6 3-6M0 28q-8 13 2 23" fill="none" stroke="#d0b68f" strokeWidth="1" />
              </g>
            </g>
            <g className="party-confetti">
              <circle className="confetti confetti--one" cx="42" cy="228" r="4" fill="#dfb77c" style={{ '--dx': '28px', '--dy': '-88px', '--spin': '90deg' }} />
              <rect className="confetti confetti--two" x="105" y="188" width="7" height="13" rx="2" fill="#8d9b83" style={{ '--dx': '-34px', '--dy': '-72px', '--spin': '-125deg' }} />
              <circle className="confetti confetti--three" cx="182" cy="247" r="3" fill="#d8a09a" style={{ '--dx': '42px', '--dy': '-101px', '--spin': '160deg' }} />
              <rect className="confetti confetti--four" x="258" y="174" width="6" height="14" rx="2" fill="#e1c997" style={{ '--dx': '25px', '--dy': '-82px', '--spin': '115deg' }} />
              <circle className="confetti confetti--five" cx="351" cy="228" r="4" fill="#8d9b83" style={{ '--dx': '-48px', '--dy': '-96px', '--spin': '-80deg' }} />
              <rect className="confetti confetti--six" x="399" y="395" width="7" height="12" rx="2" fill="#d8a09a" style={{ '--dx': '-38px', '--dy': '-68px', '--spin': '125deg' }} />
              <circle className="confetti confetti--seven" cx="65" cy="437" r="3" fill="#e1c997" style={{ '--dx': '31px', '--dy': '-99px', '--spin': '-100deg' }} />
              <rect className="confetti confetti--eight" x="328" y="456" width="6" height="13" rx="2" fill="#dfb77c" style={{ '--dx': '34px', '--dy': '-84px', '--spin': '145deg' }} />
              <circle className="confetti confetti--nine" cx="133" cy="330" r="3" fill="#c2a987" style={{ '--dx': '-36px', '--dy': '-81px', '--spin': '100deg' }} />
              <circle className="confetti confetti--ten" cx="303" cy="305" r="4" fill="#d8a09a" style={{ '--dx': '45px', '--dy': '-92px', '--spin': '-135deg' }} />
              <rect className="confetti confetti--eleven" x="30" y="328" width="6" height="11" rx="2" fill="#91a08b" style={{ '--dx': '34px', '--dy': '-75px', '--spin': '110deg' }} />
              <circle className="confetti confetti--twelve" cx="372" cy="512" r="3" fill="#e3c994" style={{ '--dx': '-27px', '--dy': '-84px', '--spin': '-75deg' }} />
            </g>
            <g className="birthday-sparkles" fill="#f0cf96">
              <path d="m221 162 4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" />
              <path d="m83 288 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" />
              <path d="m359 271 2.5 7 7 2.5-7 2.5-2.5 7-2.5-7-7-2.5 7-2.5Z" />
            </g>
            <g className="birthday-cake" transform="translate(0 -190)">
              <path d="M0 743q104-35 225 3t225-5v59H0Z" fill="#101715" />
              <ellipse className="cake-halo" cx="225" cy="538" rx="172" ry="154" fill={`url(#${unique}-glow)`} opacity=".67" />
              <g className="birthday-gift gift--left" transform="translate(72 574)">
                <rect x="0" y="10" width="48" height="50" rx="3" fill="#64776c" />
                <path d="M0 24h48M21 10v50" stroke="#d8c39c" strokeWidth="5" />
                <path d="M23 11q-19-23-21-4 6 10 21 4 17-18 20-3-4 10-20 3Z" fill="#cfaa76" />
              </g>
              <g className="birthday-gift gift--right" transform="translate(330 585)">
                <rect x="0" y="8" width="48" height="45" rx="3" fill="#9b6e67" />
                <path d="M0 21h48M23 8v45" stroke="#e3cca1" strokeWidth="5" />
                <path d="M24 9q-16-19-20-5 5 10 20 5 17-16 20-4-4 9-20 4Z" fill="#d2ae78" />
              </g>
              <ellipse cx="225" cy="651" rx="132" ry="20" fill="#0a1110" opacity=".42" />
              <rect x="131" y="558" width="188" height="91" rx="10" fill="#a8795c" />
              <path d="M131 577q20 11 38 0t38 0 38 0 38 0 36 0v20q-19 10-37 0t-38 0-38 0-38 0-37 0Z" fill="#dab98a" opacity=".9" />
              <rect x="148" y="507" width="154" height="66" rx="9" fill="#d8b887" />
              <path d="M148 520q18 14 34 0t35 0 34 0 34 0 17 0v15q-17 11-34 0t-34 0-35 0-34 0-17 0Z" fill="#f1e3cc" />
              <ellipse className="cake-glaze" cx="225" cy="507" rx="77" ry="15" fill="#f4ead7" />
              <path d="M153 625q8 11 16 0m20 0q8 11 16 0m20 0q8 11 16 0m20 0q8 11 16 0m20 0q8 11 16 0" fill="none" stroke="#f2d7aa" strokeWidth="3" strokeLinecap="round" opacity=".8" />
              <circle cx="177" cy="544" r="3" fill="#9c6b50"/><circle cx="204" cy="548" r="3" fill="#718276"/><circle cx="240" cy="546" r="3" fill="#a97970"/><circle cx="272" cy="542" r="3" fill="#9c6b50"/>
              <path d="M179 505v-46m46 45v-54m46 54v-45" stroke="#d0aa70" strokeWidth="6" strokeLinecap="round" />
              <path className="birthday-flames" d="M179 459q-8-12 0-21 8 9 0 21m46-22q-9-13 0-23 9 10 0 23m46 23q-8-12 0-21 8 9 0 21" fill="#f2c27f" />
              <circle cx="179" cy="445" r="25" fill="#e4ad70" opacity=".18"/><circle cx="225" cy="434" r="28" fill="#e4ad70" opacity=".19"/><circle cx="271" cy="445" r="25" fill="#e4ad70" opacity=".18"/>
            </g>
          </g>
        )}

        {isInfinity && (
          <g>
            <circle cx="225" cy="407" r="158" fill={`url(#${unique}-glow)`} opacity=".43" />
            <path className="infinity-thread" d="M225 405c-60-89-132-80-133 1-1 78 75 87 133 0 58 87 134 78 133 0-1-81-73-90-133-1Z" fill="none" stroke="#e6c38e" strokeWidth="5" opacity=".83" />
            <path d="M0 611q112-59 225-7t225-1v197H0Z" fill="#111b18" opacity=".87" />
            <Figure x={184} y={744} scale={.69} kind="shawon"/><Figure x={267} y={744} scale={.69} kind="tasneem"/>
          </g>
        )}

        <rect width="450" height="800" fill="none" stroke="#0b1010" strokeOpacity=".18" strokeWidth="12" />
      </g>
    </svg>
  );
}
