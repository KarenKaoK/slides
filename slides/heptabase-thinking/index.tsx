import { useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: {
    bg: '#f6f2e9',
    text: '#171412',
    accent: '#4d63ff',
  },
  fonts: {
    display:
      '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "Inter", system-ui, -apple-system, sans-serif',
    body:
      '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "Inter", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 146,
    body: 34,
  },
  radius: 16,
};

const palette = {
  bg: design.palette.bg,
  text: design.palette.text,
  accent: design.palette.accent,
  paper: '#fffaf0',
  softPaper: '#fbf6ec',
  ink2: '#3b3732',
  muted: '#827b70',
  faint: '#d8d0c2',
  blue: '#4d63ff',
  blueSoft: '#dfe5ff',
  green: '#227258',
  greenSoft: '#dbeade',
  amber: '#c9802a',
  amberSoft: '#f0dcc2',
  coral: '#d65f47',
  coralSoft: '#f4d7cd',
  violet: '#7b61c9',
  violetSoft: '#e5ddf7',
};

const font = {
  mono: '"SF Mono", "JetBrains Mono", ui-monospace, Menlo, monospace',
};

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
};

const styles = `
  @keyframes ht-fade-up {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes ht-drift {
    0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
    50% { transform: translateY(-10px) rotate(var(--r, 0deg)); }
  }
  @keyframes ht-draw {
    from { stroke-dashoffset: 1; opacity: 0; }
    to { stroke-dashoffset: 0; opacity: 1; }
  }
  @keyframes ht-spread {
    from { opacity: 0; transform: translate(var(--from-x, 0), var(--from-y, 0)) scale(.92); }
    to { opacity: 1; transform: translate(0, 0) scale(1); }
  }
  @keyframes ht-settle {
    from { opacity: .52; transform: translate(var(--mess-x, 0), var(--mess-y, 0)) rotate(var(--mess-r, 0deg)); }
    to { opacity: 1; transform: translate(0, 0) rotate(0deg); }
  }
  @keyframes ht-grow {
    from { transform: scaleX(0); opacity: .2; }
    to { transform: scaleX(1); opacity: 1; }
  }
  .ht-fade-up { opacity: 0; animation: ht-fade-up .75s cubic-bezier(.2,.7,.2,1) forwards; }
  .ht-drift { animation: ht-drift 5.5s ease-in-out infinite; }
  .ht-spread { opacity: 0; animation: ht-spread .8s cubic-bezier(.2,.7,.2,1) forwards; }
  .ht-settle { animation: ht-settle 1.1s cubic-bezier(.2,.7,.2,1) forwards; }
  .ht-draw {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: ht-draw .9s cubic-bezier(.2,.7,.2,1) forwards;
  }
  .ht-grow { transform-origin: left center; animation: ht-grow .8s cubic-bezier(.2,.7,.2,1) forwards; }
`;

const Styles = () => <style>{styles}</style>;

export const transition: SlideTransition = {
  duration: 220,
  exit: {
    duration: 150,
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-5px)' },
    ],
  },
  enter: {
    duration: 220,
    delay: 70,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    keyframes: [
      { opacity: 0, transform: 'translateY(7px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const Shell = ({ children, label }: { children: ReactNode; label: string }) => (
  <section style={{ ...fill, padding: '94px 118px' }}>
    <Styles />
    <BoardTexture />
    <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>{children}</div>
    <Footer label={label} />
  </section>
);

const BoardTexture = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(90deg, rgba(23,20,18,.035) 1px, transparent 1px), linear-gradient(rgba(23,20,18,.035) 1px, transparent 1px)',
      backgroundSize: '88px 88px',
      maskImage: 'radial-gradient(circle at 44% 46%, rgba(0,0,0,.78), rgba(0,0,0,.12) 72%)',
      WebkitMaskImage: 'radial-gradient(circle at 44% 46%, rgba(0,0,0,.78), rgba(0,0,0,.12) 72%)',
    }}
  />
);

const Footer = ({ label }: { label: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 5,
        left: 118,
        right: 118,
        bottom: 42,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: palette.muted,
        fontFamily: font.mono,
        fontSize: 19,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      <span>{label}</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Eyebrow = ({ children, color = palette.accent }: { children: ReactNode; color?: string }) => (
  <div
    style={{
      color,
      fontFamily: font.mono,
      fontSize: 22,
      fontWeight: 760,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

const Title = ({ children, size = 84, style }: { children: ReactNode; size?: number; style?: CSSProperties }) => (
  <h1
    style={{
      margin: 0,
      color: 'var(--osd-text)',
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 880,
      lineHeight: 1.08,
      letterSpacing: 0,
      ...style,
    }}
  >
    {children}
  </h1>
);

const Body = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <p
    style={{ margin: 0, color: palette.ink2, fontSize: 'var(--osd-size-body)', lineHeight: '1.35', maxWidth: 760, ...style, letterSpacing: '0.7px' }}
  >
    {children}
  </p>
);

const KnowledgeCard = ({
  title,
  note,
  x,
  y,
  w = 300,
  h,
  tone = 'paper',
  rotate = 0,
  delay = 0,
  className = 'ht-fade-up',
  style,
}: {
  title: string;
  note?: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: 'paper' | 'blue' | 'green' | 'amber' | 'coral' | 'violet';
  rotate?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) => {
  const tones = {
    paper: [palette.paper, palette.faint, palette.text],
    blue: [palette.blueSoft, '#b9c5ff', palette.blue],
    green: [palette.greenSoft, '#b9d9c7', palette.green],
    amber: [palette.amberSoft, '#e4bd87', palette.amber],
    coral: [palette.coralSoft, '#e8afa0', palette.coral],
    violet: [palette.violetSoft, '#cbbbea', palette.violet],
  };
  const [background, border, color] = tones[tone];

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        minHeight: h ?? (note ? 150 : 108),
        padding: note ? '24px 26px' : '24px 24px',
        background,
        border: `2px solid ${border}`,
        borderRadius: 'var(--osd-radius)',
        boxShadow: '0 22px 54px rgba(23,20,18,.09)',
        transform: `rotate(${rotate}deg)`,
        animationDelay: `${delay}ms`,
        ['--r' as string]: `${rotate}deg`,
        ...style,
      }}
    >
      <div style={{ color, fontSize: 30, fontWeight: 820, lineHeight: 1.15 }}>{title}</div>
      {note ? <div style={{ marginTop: 16, color: palette.ink2, fontSize: 22, lineHeight: 1.35 }}>{note}</div> : null}
    </div>
  );
};

const Line = ({
  x1,
  y1,
  x2,
  y2,
  color = palette.faint,
  delay = 0,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  delay?: number;
}) => (
  <svg style={{ position: 'absolute', inset: 0, overflow: 'visible' }} width="100%" height="100%" viewBox="0 0 1684 892">
    <line
      className="ht-draw"
      pathLength={1}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      style={{ animationDelay: `${delay}ms` }}
    />
  </svg>
);

const Folder = ({ label, x, y, active = false }: { label: string; x: number; y: number; active?: boolean }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 320,
      height: 76,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 30,
      borderRadius: 12,
      border: `2px solid ${active ? palette.accent : palette.faint}`,
      background: active ? palette.blueSoft : palette.softPaper,
      color: active ? palette.accent : palette.ink2,
      fontSize: 30,
      fontWeight: 780,
    }}
  >
    {label}
  </div>
);

const SectionBox = ({
  title,
  x,
  y,
  w,
  h,
  color,
}: {
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      border: `3px solid ${color}`,
      borderRadius: 24,
      background: `${color}14`,
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: 26,
        top: -22,
        padding: '7px 18px',
        background: palette.bg,
        color,
        border: `2px solid ${color}`,
        borderRadius: 999,
        fontSize: 24,
        fontWeight: 820,
      }}
    >
      {title}
    </div>
  </div>
);

const DecisionStep = ({
  text,
  x,
  y,
  tone = 'paper',
  delay = 0,
}: {
  text: string;
  x: number;
  y: number;
  tone?: 'paper' | 'blue' | 'green' | 'amber' | 'coral' | 'violet';
  delay?: number;
}) => <KnowledgeCard title={text} x={x} y={y} w={330} h={112} tone={tone} rotate={0} delay={delay} />;

const TinyTool = ({ name, x }: { name: string; x: number }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: 470,
      width: 245,
      height: 112,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px solid ${palette.faint}`,
      borderRadius: 16,
      background: palette.paper,
      fontSize: 34,
      fontWeight: 820,
    }}
  >
    {name}
  </div>
);

const QuestionBubble = ({
  children,
  x,
  y,
  w = 310,
  delay = 0,
  style,
}: {
  children: ReactNode;
  x: number;
  y: number;
  w?: number;
  delay?: number;
  style?: CSSProperties;
}) => (
  <div
    className="ht-fade-up"
    style={{ position: 'absolute', left: x, top: y, width: w, padding: '18px 22px', border: `2px solid ${palette.coral}`, borderRadius: 999, background: palette.coralSoft, color: palette.coral, fontSize: '26px', fontWeight: 820, lineHeight: '1.45', boxShadow: '0 16px 36px rgba(214,95,71,.12)', animationDelay: `${delay}ms`, letterSpacing: '-0.6px', ...style }}
  >
    {children}
  </div>
);

const Cover: Page = () => (
  <Shell label="cover">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '760px 1fr', gap: 70, alignItems: 'center' }}>
      <div>
        <Eyebrow>Heptabase 分享會</Eyebrow>
        <Title size={126} style={{ marginTop: 34, maxWidth: 820 }}>
          讓知識長成你理解的樣子
        </Title>
        <Body style={{ marginTop: 38, fontSize: 38, maxWidth: 720 }}>從整理知識，到用知識思考。</Body>
      </div>
      <div style={{ position: 'relative', height: 650 }}>
        <Line x1={560} y1={248} x2={870} y2={180} delay={380} />
        <Line x1={650} y1={358} x2={980} y2={420} delay={520} />
        <Line x1={800} y1={230} x2={1050} y2={318} delay={650} />
        <KnowledgeCard title="公司背景" note="為什麼是這家公司？" x={440} y={160} w={300} tone="blue" rotate={-4} delay={80} className="ht-drift" />
        <KnowledgeCard title="面試題" note="題目背後在測什麼？" x={820} y={88} w={310} tone="amber" rotate={3} delay={140} className="ht-drift" />
        <KnowledgeCard title="還不懂的概念" note="先放著，之後回來補。" x={930} y={328} w={340} tone="green" rotate={-2} delay={210} className="ht-drift" />
        <KnowledgeCard title="我的理解" x={590} y={388} w={280} tone="paper" rotate={2} delay={260} className="ht-drift" />
      </div>
    </div>
  </Shell>
);

const StuckMoment: Page = () => (
  <Shell label="stuck moment">
    <div style={{ height: '100%', position: 'relative' }}>
      <div
        className="ht-drift"
        style={{ position: 'absolute', left: 52, top: 310, width: 285, height: 150, borderRadius: 999, background: palette.blueSoft, border: `2px solid ${palette.blue}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.blue, fontSize: '66px', fontWeight: 900, ['--r' as string]: '-2deg', lineHeight: '1.05' }}
      >
        idea
      </div>
      <div className="ht-grow" style={{ position: 'absolute', left: 350, top: 382, width: 185, height: 3, background: palette.blue }} />
      <div
        style={{
          position: 'absolute',
          left: 520,
          top: 118,
          width: 860,
          height: 610,
          borderRadius: 28,
          border: `2px solid ${palette.faint}`,
          background: palette.softPaper,
          overflow: 'hidden',
          boxShadow: '0 34px 90px rgba(23,20,18,.10)',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 260, borderRight: `2px solid ${palette.faint}`, background: '#f1eadf' }}>
          <div style={{ padding: '26px 26px', color: palette.muted, fontFamily: font.mono, fontSize: 16, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Notes</div>
          <div style={{ padding: '0 26px', fontSize: 22, lineHeight: 2.1, color: palette.ink2, fontWeight: 760 }}>
            <div>▾ Work</div>
            <div>▾ Learning</div>
            <div style={{ marginLeft: 24, color: palette.muted }}>• AI</div>
            <div>▸ Tools</div>
            <div>▸ Personal</div>
            <div>▾ Job Search</div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 316, top: 110, right: 64, height: 400, borderRadius: 22, border: `2px dashed ${palette.faint}`, background: palette.paper }}>
          <div style={{ position: 'absolute', left: 46, top: 42, width: 250, height: 28, borderRadius: 99, background: palette.faint }} />
          <div style={{ position: 'absolute', left: 46, top: 106, width: 440, height: 18, borderRadius: 99, background: palette.faint2 }} />
          <div style={{ position: 'absolute', left: 46, top: 152, width: 360, height: 18, borderRadius: 99, background: palette.faint2 }} />
          <div style={{ position: 'absolute', left: 46, top: 236, color: palette.muted, fontSize: 34, fontWeight: 760 }}>ready to write...</div>
        </div>
      </div>
      <QuestionBubble x={1100} y={86} w={210} delay={160}>Work?</QuestionBubble>
      <QuestionBubble x={1336} y={214} w={250} delay={230}>Learning?</QuestionBubble>
      <QuestionBubble x={414} y={196} w={205} delay={300} style={{ fontSize: '31px' }}>Tools?</QuestionBubble>
      <QuestionBubble x={1390} y={496} w={250} delay={370}>Job Search?</QuestionBubble>
      <QuestionBubble x={410} y={610} w={270} delay={440} style={{ fontSize: '35px' }}>New folder?</QuestionBubble>
      <QuestionBubble x={1090} y={662} w={430} delay={510} style={{ fontSize: '22px' }}>要放在哪個目錄結構下？<br />{'目錄結構要如何建立? '}<br />....</QuestionBubble>
      <Line x1={535} y1={384} x2={755} y2={384} color={palette.blue} delay={620} />
      <Line x1={620} y1={248} x2={755} y2={330} color={palette.coral} delay={650} />
      <Line x1={600} y1={674} x2={765} y2={492} color={palette.coral} delay={710} />
      <Line x1={1186} y1={154} x2={950} y2={330} color={palette.coral} delay={680} />
      <Line x1={1438} y1={272} x2={990} y2={350} color={palette.coral} delay={760} />
      <Line x1={1390} y1={566} x2={990} y2={410} color={palette.coral} delay={810} />
      <Line x1={1280} y1={690} x2={990} y2={430} color={palette.coral} delay={840} />
      <div style={{ position: 'absolute', left: 126, bottom: 110, color: palette.text, fontSize: 40, fontWeight: 900 }}>
        想記下來，卻先卡在分類。
      </div>
    </div>
  </Shell>
);

const OpeningFriction: Page = () => (
  <Shell label="before">
    <div style={{ height: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 930 }}>
        <Eyebrow color={palette.coral}>以前</Eyebrow>
        <Title size={78} style={{ marginTop: 22, maxWidth: 820, fontSize: '50px' }}>
          我還沒開始寫，就先卡在「它到底要放哪裡？」
        </Title>
        <Body style={{ marginTop: 22, maxWidth: 920, fontSize: 26, lineHeight: 1.5 }}>
          每次打開筆記軟體，我第一個問題常常不是「我要寫什麼」，而是「這是什麼類別？它該放在哪裡？」
        </Body>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 286,
          height: 500,
          border: `2px solid ${palette.faint}`,
          borderRadius: 26,
          background: palette.softPaper,
          boxShadow: '0 28px 80px rgba(23,20,18,.08)',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 355, borderRight: `2px solid ${palette.faint}`, background: '#f1eadf' }}>
          <div style={{ padding: '28px 30px', color: palette.muted, fontFamily: font.mono, fontSize: 18, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Workspace
          </div>
          <div style={{ padding: '0 30px', fontSize: 25, lineHeight: 2.08, color: palette.ink2, fontWeight: 760 }}>
            <div>▾ Job Search</div>
            <div style={{ marginLeft: 28, color: palette.muted }}>• Companies</div>
            <div style={{ marginLeft: 28, color: palette.muted }}>• Interview Notes</div>
            <div>▸ Learning</div>
            <div>▸ Tools</div>
            <div>▸ Personal</div>
            <div>▸ Projects</div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 355, top: 0, right: 0, bottom: 0 }}>
          <QuestionBubble x={70} y={50} w={260} delay={110}>這算 Learning 嗎？</QuestionBubble>
          <QuestionBubble x={645} y={44} w={220} delay={180}>還是 Tools？</QuestionBubble>
          <QuestionBubble x={845} y={190} w={330} delay={250}>要放在 Job Search 底下嗎？</QuestionBubble>
          <QuestionBubble x={80} y={335} w={390} delay={320}>要不要另外開一個新的分類？</QuestionBubble>
          <QuestionBubble x={610} y={385} w={390} delay={390}>如果它同時屬於兩個地方呢？</QuestionBubble>
          <KnowledgeCard
            title="新的筆記"
            note="游標還沒開始動，腦袋已經開始選路徑。"
            x={465}
            y={188}
            w={330}
            tone="paper"
            rotate={-1}
            delay={80}
          />
          <Line x1={820} y1={180} x2={615} y2={292} color={palette.coral} delay={520} />
          <Line x1={1045} y1={326} x2={785} y2={292} color={palette.coral} delay={620} />
          <Line x1={620} y1={462} x2={610} y2={338} color={palette.coral} delay={720} />
          <Line x1={200} y1={105} x2={465} y2={245} color={palette.coral} delay={780} />
          <Line x1={275} y1={390} x2={465} y2={325} color={palette.coral} delay={840} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 410,
            bottom: 26,
            color: palette.text,
            fontSize: 34,
            fontWeight: 880,
            lineHeight: 1.25,
          }}
        >
          分類本身，變成了開始記錄之前的一道門檻。
        </div>
      </div>
    </div>
  </Shell>
);

const AddCardNow: Page = () => (
  <Shell label="now">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '560px 1fr', gap: 84, alignItems: 'center' }}>
      <div>
        <Eyebrow>現在，我先把想法放出來</Eyebrow>
        <Title size={92} style={{ marginTop: 28, maxWidth: 560 }}>
          現在，我先把想法放出來。
        </Title>
        <Body style={{ marginTop: 36, maxWidth: 520 }}>先讓內容出現，分類和結構可以晚一點再決定。</Body>
        <div style={{ marginTop: 64, color: palette.muted, fontSize: 30, fontWeight: 760 }}>結構，可以晚一點再決定。</div>
        <div style={{ marginTop: 34, paddingTop: 24, borderTop: `2px solid ${palette.faint}`, color: palette.muted, fontSize: 25, lineHeight: 1.35, maxWidth: 500 }}>
          這不只是一個操作習慣，而是一個思考選擇。
        </div>
      </div>
      <div style={{ position: 'relative', height: 690 }}>
        <div style={{ position: 'absolute', left: 40, top: 22, width: 1020, height: 625, border: `2px solid ${palette.faint}`, borderRadius: 28, background: palette.softPaper, boxShadow: '0 30px 86px rgba(23,20,18,.08)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(23,20,18,.09) 1px, transparent 1px)', backgroundSize: '44px 44px', opacity: 0.42 }} />
          <div style={{ position: 'absolute', left: 52, top: 44, color: palette.muted, fontFamily: font.mono, fontSize: 18, letterSpacing: '0.12em', textTransform: 'uppercase' }}>whiteboard</div>
        </div>
        <DecisionStep text="Idea" x={118} y={118} tone="paper" delay={80} />
        <div style={{ position: 'absolute', left: 472, top: 132, width: 270, height: 88, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, background: palette.blue, color: 'white', fontSize: 36, fontWeight: 900, boxShadow: '0 20px 46px rgba(77,99,255,.25)' }}>
          + Add Card
        </div>
        <DecisionStep text="Write" x={875} y={118} tone="blue" delay={260} />
        <Line x1={448} y1={174} x2={472} y2={174} color={palette.blue} delay={420} />
        <Line x1={742} y1={174} x2={875} y2={174} color={palette.blue} delay={520} />
        <KnowledgeCard title="一句突然想到的話" x={210} y={342} w={300} tone="paper" rotate={-4} delay={420} className="ht-spread" style={{ ['--from-x' as string]: '420px', ['--from-y' as string]: '-190px' }} />
        <KnowledgeCard title="一個面試問題" x={625} y={300} w={285} tone="amber" rotate={3} delay={520} className="ht-spread" style={{ ['--from-x' as string]: '140px', ['--from-y' as string]: '-160px' }} />
        <KnowledgeCard title="還沒想清楚" x={418} y={492} w={285} tone="violet" rotate={2} delay={620} className="ht-spread" style={{ ['--from-x' as string]: '260px', ['--from-y' as string]: '-300px' }} />
        <KnowledgeCard title="先放著" x={812} y={480} w={250} tone="green" rotate={-3} delay={720} className="ht-spread" style={{ ['--from-x' as string]: '-60px', ['--from-y' as string]: '-270px' }} />
        <div
          className="ht-fade-up"
          style={{
            position: 'absolute',
            right: 18,
            bottom: 18,
            width: 610,
            padding: '18px 22px',
            borderLeft: `3px solid ${palette.faint}`,
            color: palette.muted,
            fontSize: 19,
            lineHeight: 1.35,
            animationDelay: '900ms',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: palette.ink2, fontFamily: font.mono, fontWeight: 760 }}>Capture → Organize</span>
          <span style={{ marginLeft: 18 }}>Building a Second Brain — Tiago Forte</span>
        </div>
      </div>
    </div>
  </Shell>
);

const Framing: Page = () => (
  <Shell label="framing">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow>今天想分享的</Eyebrow>
      <Title size={92} style={{ marginTop: 34, maxWidth: 1300 }}>
        今天我想分享的，就是這個選擇。
      </Title>
      <Title size={100} style={{ marginTop: 34, maxWidth: 1500 }}>
        不是「怎麼操作 Heptabase」，
      </Title>
      <Title size={100} style={{ marginTop: 18, maxWidth: 1500, color: 'var(--osd-accent)' }}>
        而是我怎麼讓工具配合我的思考。
      </Title>
      <Body style={{ marginTop: 46, maxWidth: 1040 }}>
        我更想分享我為什麼這樣使用它，以及這種使用方式如何影響我的思考與整理方式。
      </Body>
    </div>
  </Shell>
);

const TwoThings: Page = () => (
  <Shell label="card + whiteboard">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '660px 1fr', gap: 88, alignItems: 'center' }}>
      <div>
        <Eyebrow>接下來我只講兩件事</Eyebrow>
        <Title size={94} style={{ marginTop: 28 }}>
          我其實最常用的，就只有兩個功能。
        </Title>
        <Body style={{ marginTop: 36, maxWidth: 600 }}>
          我不是想介紹 Heptabase 的所有功能，而是分享這兩個功能怎麼進入我的思考流程。
        </Body>
      </div>
      <div style={{ position: 'relative', height: 610 }}>
        <div
          className="ht-fade-up"
          style={{
            position: 'absolute',
            left: 28,
            top: 170,
            width: 330,
            height: 240,
            border: `3px solid ${palette.blue}`,
            borderRadius: 24,
            background: palette.blueSoft,
            padding: 38,
            boxShadow: '0 24px 48px rgba(77,99,255,.14)',
          }}
        >
          <div style={{ fontFamily: font.mono, color: palette.blue, fontSize: 24, fontWeight: 820 }}>01</div>
          <div style={{ marginTop: 56, fontSize: 74, fontWeight: 900 }}>Card</div>
        </div>
        <div style={{ position: 'absolute', left: 360, top: 245, color: palette.muted, fontSize: 78, fontWeight: 700 }}>+</div>
        <div
          className="ht-fade-up"
          style={{
            position: 'absolute',
            left: 450,
            top: 90,
            width: 390,
            height: 400,
            border: `3px solid ${palette.green}`,
            borderRadius: 34,
            background: palette.greenSoft,
            padding: 38,
            animationDelay: '160ms',
            boxShadow: '0 24px 56px rgba(34,114,88,.13)',
          }}
        >
          <div style={{ fontFamily: font.mono, color: palette.green, fontSize: 24, fontWeight: 820 }}>02</div>
          <KnowledgeCard title="想法" x={44} y={108} w={150} tone="paper" rotate={-3} delay={250} />
          <KnowledgeCard title="問題" x={202} y={158} w={150} tone="amber" rotate={3} delay={330} />
          <KnowledgeCard title="例子" x={132} y={256} w={150} tone="blue" rotate={-1} delay={410} />
          <div style={{ position: 'absolute', right: 30, bottom: 34, fontSize: 50, fontWeight: 900 }}>Whiteboard</div>
        </div>
      </div>
    </div>
  </Shell>
);

const CardWay: Page = () => (
  <Shell label="card">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '560px 1fr', gap: 88, alignItems: 'center' }}>
      <div>
        <Eyebrow color={palette.blue}>Card</Eyebrow>
        <Title size={92} style={{ marginTop: 28 }}>
          我不先替想法命名。
        </Title>
        <Body style={{ marginTop: 34, maxWidth: 560 }}>
          先把內容寫出來，標題晚一點再決定。
        </Body>
        <div style={{ marginTop: 42, color: palette.muted, fontFamily: font.mono, fontSize: 23 }}>
          Content first, label later.
        </div>
      </div>
      <div style={{ position: 'relative', height: 620 }}>
        <div style={{ position: 'absolute', left: 76, top: 78, width: 570, height: 420, borderRadius: 28, border: `3px solid ${palette.faint}`, background: palette.paper, padding: 38, boxShadow: '0 26px 70px rgba(23,20,18,.08)' }}>
          <div style={{ display: 'inline-flex', padding: '10px 16px', borderRadius: 999, background: palette.coralSoft, color: palette.coral, fontFamily: font.mono, fontSize: 20, fontWeight: 760 }}>
            title: not yet
          </div>
          <div style={{ marginTop: 42, fontSize: 32, lineHeight: 1.42, color: palette.ink2 }}>
            我先把想到的內容寫下來。
            <br />
            可能還很粗糙，也還不知道它到底在說什麼。
            <br />
            但內容先存在，才有機會被我看見。
          </div>
        </div>
        <Line x1={650} y1={290} x2={720} y2={290} color={palette.faint} delay={420} />
        <div
          className="ht-fade-up"
          style={{
            position: 'absolute',
            left: 690,
            top: 88,
            width: 280,
            padding: '22px 28px',
            border: `2px solid ${palette.green}`,
            borderRadius: 999,
            background: palette.greenSoft,
            color: palette.green,
            fontSize: 28,
            fontWeight: 820,
            animationDelay: '480ms',
          }}
        >
          寫完後，理解更清楚
        </div>
        <div
          className="ht-fade-up"
          style={{
            position: 'absolute',
            left: 660,
            top: 280,
            width: 300,
            padding: '30px 34px',
            border: `2px solid ${palette.violet}`,
            borderRadius: 22,
            background: palette.violetSoft,
            color: palette.violet,
            fontSize: 46,
            lineHeight: 1.1,
            fontWeight: 900,
            animationDelay: '620ms',
          }}
        >
          標題稍後才出現
        </div>
        <div style={{ position: 'absolute', left: 124, bottom: 42, color: palette.muted, fontFamily: font.mono, fontSize: 23 }}>
          想法 → 先寫內容 → 還不知道標題 → 理解 → 命名
        </div>
      </div>
    </div>
  </Shell>
);

const CardExampleUnitTest: Page = () => (
  <Shell label="card example">
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 54 }}>
      <div style={{ maxWidth: 1220 }}>
        <Eyebrow color={palette.blue}>例子 1 / Unit Test</Eyebrow>
        <Title size={76} style={{ marginTop: 24 }}>
          先寫行為，標題才慢慢變清楚。
        </Title>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 80, top: 36, width: 640, height: 492, borderRadius: 28, border: `3px solid ${palette.blue}`, background: palette.paper, padding: 34, boxShadow: '0 26px 70px rgba(23,20,18,.08)' }}>
          <div style={{ display: 'inline-flex', padding: '10px 16px', borderRadius: 999, background: palette.coralSoft, color: palette.coral, fontFamily: font.mono, fontSize: 20, fontWeight: 760 }}>title: undecided</div>
          <div style={{ marginTop: 34, fontSize: 30, lineHeight: 1.42, color: palette.ink2 }}>
            Unit test 可以從行為開始想。
            <br />
            Arrange：準備 manifest、dataset、測試資料。
            <br />
            Act：呼叫 <span style={{ fontFamily: font.mono }}>__len__()</span> 或 <span style={{ fontFamily: font.mono }}>__getitem__()</span>。
            <br />
            Assert：確認 sample 數量，以及 image / label 是否正確回來。
          </div>
          <div style={{ position: 'absolute', left: 34, bottom: 30, color: palette.muted, fontSize: 24, lineHeight: 1.35 }}>
            GTSRBDataset 的測試目標，來自 class 的責任。
          </div>
        </div>
        <Line x1={720} y1={282} x2={905} y2={282} color={palette.faint} delay={420} />
        <div style={{ position: 'absolute', left: 928, top: 92, width: 470, color: palette.muted, fontSize: 29, lineHeight: 1.42 }}>
          內容先描述「我要測什麼行為」，
          <br />
          標題才收斂成一個概念。
        </div>
        <div
          className="ht-fade-up"
          style={{ position: 'absolute', left: 900, top: 272, width: 560, padding: '30px 34px', borderRadius: 24, background: palette.blueSoft, border: `3px solid ${palette.blue}`, color: palette.blue, boxShadow: '0 22px 50px rgba(77,99,255,.13)', animationDelay: '600ms' }}
        >
          <div style={{ fontFamily: font.mono, fontSize: 21, fontWeight: 760 }}>later title</div>
          <div style={{ marginTop: 18, fontSize: 50, fontWeight: 900, lineHeight: 1.12 }}>Unit Test 的核心是 Arrange, Act, Assert</div>
        </div>
        <div style={{ position: 'absolute', left: 928, bottom: 18, color: palette.muted, fontSize: 25, fontStyle: 'italic' }}>
          “The goal of a unit test can come from behavior.”
        </div>
      </div>
    </div>
  </Shell>
);

const CardExampleCnn: Page = () => (
  <Shell label="card example">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '520px 1fr', gap: 86, alignItems: 'center' }}>
      <div>
        <Eyebrow color={palette.green}>例子 2 / CNN</Eyebrow>
        <Title size={82} style={{ marginTop: 28 }}>
          有些標題，是推理寫到一半才出現的。
        </Title>
      </div>
      <div style={{ position: 'relative', height: 650 }}>
        <div style={{ position: 'absolute', left: 44, top: 60, width: 570, height: 420, borderRadius: 28, border: `3px solid ${palette.green}`, background: palette.paper, padding: 34, boxShadow: '0 26px 70px rgba(23,20,18,.08)' }}>
          <div style={{ display: 'inline-flex', padding: '10px 16px', borderRadius: 999, background: palette.coralSoft, color: palette.coral, fontFamily: font.mono, fontSize: 20, fontWeight: 760 }}>rough note</div>
          <div style={{ marginTop: 34, fontSize: 30, lineHeight: 1.46, color: palette.ink2 }}>
            影像不是一串獨立數字。
            <br />
            空間結構很重要，local pattern 也很重要。
            <br />
            同一種 pattern 可能出現在不同位置。
            <br />
            所以 CNN 用 local receptive fields 和 parameter sharing。
          </div>
        </div>
        <div style={{ position: 'absolute', left: 690, top: 90, width: 260, height: 260, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          <div style={{ background: palette.greenSoft, border: `2px solid ${palette.green}` }} />
          <div style={{ background: palette.softPaper, border: `2px solid ${palette.faint}` }} />
          <div style={{ background: palette.softPaper, border: `2px solid ${palette.faint}` }} />
          <div style={{ background: palette.softPaper, border: `2px solid ${palette.faint}` }} />
          <div style={{ background: palette.greenSoft, border: `2px solid ${palette.green}` }} />
          <div style={{ background: palette.greenSoft, border: `2px solid ${palette.green}` }} />
          <div style={{ background: palette.softPaper, border: `2px solid ${palette.faint}` }} />
          <div style={{ background: palette.softPaper, border: `2px solid ${palette.faint}` }} />
          <div style={{ background: palette.softPaper, border: `2px solid ${palette.faint}` }} />
          <div style={{ background: palette.greenSoft, border: `2px solid ${palette.green}` }} />
          <div style={{ background: palette.greenSoft, border: `2px solid ${palette.green}` }} />
          <div style={{ background: palette.softPaper, border: `2px solid ${palette.faint}` }} />
          <div style={{ background: palette.softPaper, border: `2px solid ${palette.faint}` }} />
          <div style={{ background: palette.softPaper, border: `2px solid ${palette.faint}` }} />
          <div style={{ background: palette.softPaper, border: `2px solid ${palette.faint}` }} />
          <div style={{ background: palette.greenSoft, border: `2px solid ${palette.green}` }} />
        </div>
        <Line x1={614} y1={270} x2={690} y2={220} color={palette.green} delay={380} />
        <div
          className="ht-fade-up"
          style={{ position: 'absolute', left: 520, top: 406, width: 470, padding: '30px 34px', borderRadius: 24, background: palette.greenSoft, border: `3px solid ${palette.green}`, color: palette.green, animationDelay: '560ms', boxShadow: '0 22px 50px rgba(34,114,88,.13)' }}
        >
          <div style={{ fontFamily: font.mono, fontSize: 21, fontWeight: 760 }}>later title</div>
          <div style={{ marginTop: 18, fontSize: 36, fontWeight: 900, lineHeight: 1.16 }}>
            為什麼影像辨識更適合用 CNN，而不是直接 flatten 後接 fully connected network？
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

const CardExampleReflection: Page = () => (
  <Shell label="card example">
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 54 }}>
      <div style={{ maxWidth: 1260 }}>
        <Eyebrow color={palette.violet}>例子 3 / 反思型筆記</Eyebrow>
        <Title size={76} style={{ marginTop: 24 }}>
          不只技術筆記，反思也是先寫出來才有形狀。
        </Title>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 110, top: 58, width: 560, minHeight: 390, borderRadius: 28, border: `3px solid ${palette.violet}`, background: palette.paper, padding: 38, boxShadow: '0 26px 70px rgba(23,20,18,.08)' }}>
          <div style={{ color: palette.muted, fontFamily: font.mono, fontSize: 21, fontWeight: 760 }}>raw reflection</div>
          <div style={{ marginTop: 36, fontSize: 42, lineHeight: 1.3, fontWeight: 850, color: palette.ink2 }}>
            不要把人神化，<br />
            也不要把人魔化。
          </div>
          <div style={{ marginTop: 34, fontSize: 28, lineHeight: 1.46, color: palette.ink2 }}>
            標籤會讓我們以為可能性只屬於少數人。
            但如果撕掉標籤，也許重點是：每個人都可以飛行。
          </div>
        </div>
        <Line x1={670} y1={275} x2={850} y2={275} color={palette.faint} delay={420} />
        <div
          className="ht-fade-up"
          style={{
            position: 'absolute',
            left: 845,
            top: 145,
            width: 590,
            padding: '38px 44px',
            borderRadius: 28,
            background: palette.violetSoft,
            border: `3px solid ${palette.violet}`,
            color: palette.violet,
            animationDelay: '600ms',
            boxShadow: '0 22px 50px rgba(123,97,201,.14)',
          }}
        >
          <div style={{ fontFamily: font.mono, fontSize: 21, fontWeight: 760 }}>later title</div>
          <div style={{ marginTop: 24, fontSize: 48, fontWeight: 900, lineHeight: 1.18 }}>
            拒絕神化／魔化，撕掉標籤，回歸每個人都可以飛行
          </div>
        </div>
        <div style={{ position: 'absolute', left: 112, bottom: 38, color: palette.muted, fontSize: 28 }}>
          同一個 pattern：先把感覺寫成內容，再讓標題承接理解。
        </div>
      </div>
    </div>
  </Shell>
);

const WhiteboardBirth: Page = () => (
  <Shell label="whiteboard starts">
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 44 }}>
      <div>
        <Eyebrow color={palette.green}>Whiteboard</Eyebrow>
        <Title size={82} style={{ marginTop: 24 }}>
          一張 whiteboard，通常有兩種誕生方式。
        </Title>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 70, top: 50, color: palette.blue, fontFamily: font.mono, fontSize: 23, fontWeight: 760 }}>Pattern A / Topic-first</div>
        <div style={{ position: 'absolute', left: 70, top: 96, width: 620, height: 390, border: `3px solid ${palette.blue}`, borderRadius: 30, background: palette.blueSoft, padding: 34 }}>
          <div style={{ fontSize: 48, fontWeight: 900 }}>先有問題空間</div>
          <div style={{ marginTop: 26, fontSize: 28, lineHeight: 1.45, color: palette.ink2 }}>
            想研究某個主題
            <br />
            → 開 Whiteboard
            <br />
            → 在上面建立 Cards
          </div>
          <KnowledgeCard title="問題" x={250} y={205} w={150} tone="paper" rotate={-3} delay={200} />
          <KnowledgeCard title="資料" x={410} y={252} w={150} tone="paper" rotate={2} delay={280} />
        </div>
        <div style={{ position: 'absolute', left: 850, top: 50, color: palette.green, fontFamily: font.mono, fontSize: 23, fontWeight: 760 }}>Pattern B / Cards-first</div>
        <div style={{ position: 'absolute', left: 850, top: 96, width: 690, height: 390 }}>
          <KnowledgeCard title="卡片 A" x={10} y={50} w={160} tone="paper" rotate={-5} delay={90} />
          <KnowledgeCard title="卡片 B" x={160} y={178} w={160} tone="amber" rotate={3} delay={140} />
          <KnowledgeCard title="卡片 C" x={74} y={280} w={160} tone="blue" rotate={-2} delay={190} />
          <div style={{ position: 'absolute', left: 338, top: 205, color: palette.muted, fontSize: 42, fontWeight: 820 }}>→</div>
          <div style={{ position: 'absolute', left: 430, top: 48, width: 250, height: 274, border: `3px solid ${palette.green}`, borderRadius: 26, background: palette.greenSoft, padding: 24 }}>
            <div style={{ fontSize: 30, fontWeight: 880, color: palette.green }}>關係開始可見</div>
            <div style={{ marginTop: 24, fontSize: 24, lineHeight: 1.45, color: palette.ink2 }}>
              search
              <br />
              bring together
              <br />
              arrange
            </div>
          </div>
          <div style={{ position: 'absolute', left: 14, bottom: 12, fontSize: 30, fontWeight: 820, color: palette.green }}>
            結構從內容裡浮現。
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

const DigitalDesk: Page = () => (
  <Shell label="digital desk">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '560px 1fr', gap: 86, alignItems: 'center' }}>
      <div>
        <Eyebrow color={palette.green}>對我來說</Eyebrow>
        <Title size={88} style={{ marginTop: 28 }}>
          Whiteboard 是一張數位桌面。
        </Title>
        <Body style={{ marginTop: 34, maxWidth: 560 }}>
          我不是在存放知識，而是在把正在思考的東西攤在桌上。
        </Body>
      </div>
      <div style={{ position: 'relative', height: 650 }}>
        <div style={{ position: 'absolute', left: 36, top: 70, width: 1040, height: 500, border: `3px solid ${palette.faint}`, borderRadius: 34, background: 'rgba(255,250,240,.72)' }} />
        <div style={{ position: 'absolute', left: 92, top: 118, width: 210, height: 270, borderRadius: 18, background: palette.blueSoft, border: `2px solid ${palette.blue}`, padding: 24, transform: 'rotate(-4deg)' }}>
          <div style={{ fontSize: 28, fontWeight: 880 }}>一本書</div>
          <div style={{ marginTop: 70, height: 8, background: palette.blue, opacity: .38 }} />
          <div style={{ marginTop: 18, height: 8, background: palette.blue, opacity: .26 }} />
        </div>
        <KnowledgeCard title="草稿" x={360} y={130} w={230} tone="paper" rotate={3} delay={100} />
        <KnowledgeCard title="問題" x={620} y={250} w={210} tone="amber" rotate={-2} delay={170} />
        <KnowledgeCard title="例子" x={812} y={142} w={220} tone="green" rotate={4} delay={240} />
        <KnowledgeCard title="等等比較" x={470} y={390} w={260} tone="violet" rotate={-3} delay={310} />
        <Line x1={590} y1={190} x2={812} y2={210} color={palette.green} delay={520} />
        <Line x1={716} y1={310} x2={560} y2={448} color={palette.violet} delay={640} />
        <div style={{ position: 'absolute', right: 42, bottom: 22, color: palette.muted, fontSize: 28 }}>
          Whiteboard 不是知識的終點，而是思考發生的地方。
        </div>
      </div>
    </div>
  </Shell>
);

const StructureAsTrace: Page = () => (
  <Shell label="understanding">
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 44 }}>
      <div style={{ maxWidth: 1320 }}>
        <Eyebrow color={palette.amber}>理解形成後</Eyebrow>
        <Title size={80} style={{ marginTop: 24 }}>
          Section 和顏色不是裝飾，而是理解留下的痕跡。
        </Title>
      </div>
      <div style={{ position: 'relative' }}>
        <KnowledgeCard title="概念" x={90} y={104} w={210} tone="paper" rotate={-8} delay={70} className="ht-settle" style={{ ['--mess-x' as string]: '360px', ['--mess-y' as string]: '180px', ['--mess-r' as string]: '8deg' }} />
        <KnowledgeCard title="例子" x={260} y={290} w={210} tone="paper" rotate={6} delay={120} className="ht-settle" style={{ ['--mess-x' as string]: '500px', ['--mess-y' as string]: '-90px', ['--mess-r' as string]: '-5deg' }} />
        <KnowledgeCard title="問題" x={505} y={160} w={210} tone="paper" rotate={-2} delay={170} className="ht-settle" style={{ ['--mess-x' as string]: '-210px', ['--mess-y' as string]: '190px', ['--mess-r' as string]: '7deg' }} />
        <div style={{ position: 'absolute', left: 760, top: 252, color: palette.muted, fontSize: 48, fontWeight: 820 }}>→</div>
        <SectionBox title="Concepts" x={900} y={70} w={310} h={210} color={palette.blue} />
        <SectionBox title="Examples" x={1198} y={250} w={310} h={210} color={palette.green} />
        <SectionBox title="Questions" x={860} y={350} w={300} h={190} color={palette.amber} />
        <KnowledgeCard title="概念" x={952} y={138} w={170} tone="blue" delay={300} />
        <KnowledgeCard title="例子" x={1250} y={318} w={170} tone="green" delay={360} />
        <KnowledgeCard title="問題" x={922} y={414} w={170} tone="amber" delay={420} />
        <Line x1={1122} y1={192} x2={1250} y2={372} color={palette.green} delay={660} />
        <div style={{ position: 'absolute', left: 96, bottom: 18, color: palette.muted, fontSize: 28 }}>
          先亂一點沒關係。重點是：我能不能回來，讓關係慢慢變清楚。
        </div>
      </div>
    </div>
  </Shell>
);

const JobSearchSurface: Page = () => (
  <Shell label="job search">
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 46 }}>
      <div>
        <Eyebrow color={palette.green}>實際例子 / Job Search</Eyebrow>
        <Title size={82} style={{ marginTop: 24 }}>
          求職時，一家公司 = 一個 Whiteboard。
        </Title>
      </div>
      <div style={{ position: 'relative' }}>
        <SectionBox title="Company Background" x={70} y={82} w={390} h={230} color={palette.blue} />
        <SectionBox title="JD" x={560} y={70} w={290} h={190} color={palette.green} />
        <SectionBox title="Resume Adjustment" x={1000} y={82} w={450} h={220} color={palette.violet} />
        <SectionBox title="Interview Questions" x={210} y={390} w={440} h={220} color={palette.amber} />
        <SectionBox title="Things I Need to Learn" x={850} y={398} w={520} h={220} color={palette.coral} />
        <KnowledgeCard title="某家公司" note="我對它的理解中心" x={650} y={274} w={300} tone="paper" delay={80} />
        <KnowledgeCard title="產品方向" x={140} y={164} w={210} tone="blue" delay={130} />
        <KnowledgeCard title="關鍵能力" x={602} y={136} w={210} tone="green" delay={180} />
        <KnowledgeCard title="STAR 故事" x={1100} y={168} w={230} tone="violet" delay={230} />
        <KnowledgeCard title="系統設計題" x={298} y={470} w={250} tone="amber" delay={280} />
        <KnowledgeCard title="補強概念" x={1016} y={480} w={260} tone="coral" delay={330} />
        <Line x1={350} y1={208} x2={650} y2={326} color={palette.blue} delay={520} />
        <Line x1={812} y1={192} x2={790} y2={274} color={palette.green} delay={620} />
        <Line x1={950} y1={326} x2={1100} y2={220} color={palette.violet} delay={720} />
        <Line x1={548} y1={524} x2={650} y2={386} color={palette.amber} delay={820} />
        <Line x1={950} y1={386} x2={1016} y2={528} color={palette.coral} delay={920} />
      </div>
    </div>
  </Shell>
);

const LearningResearch: Page = () => (
  <Shell label="learning">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '500px 1fr', gap: 86, alignItems: 'center' }}>
      <div>
        <Eyebrow color={palette.violet}>實際例子 / Learning</Eyebrow>
        <Title size={82} style={{ marginTop: 28 }}>
          學習主題也會慢慢長出自己的形狀。
        </Title>
        <Body style={{ marginTop: 34, maxWidth: 500 }}>
          一開始只是散落的概念；後來才看出哪些是概念、技術、例子、問題。
        </Body>
      </div>
      <div style={{ position: 'relative', height: 660 }}>
        <SectionBox title="Concepts" x={78} y={74} w={420} h={230} color={palette.blue} />
        <SectionBox title="Technologies" x={618} y={124} w={440} h={230} color={palette.green} />
        <SectionBox title="Questions" x={210} y={390} w={430} h={210} color={palette.amber} />
        <SectionBox title="Examples" x={760} y={420} w={360} h={170} color={palette.violet} />
        <KnowledgeCard title="Ontology" x={130} y={142} w={210} tone="blue" rotate={-2} delay={70} />
        <KnowledgeCard title="Semantic Model" x={246} y={220} w={260} tone="blue" rotate={2} delay={130} />
        <KnowledgeCard title="RDF" x={675} y={205} w={180} tone="green" rotate={-3} delay={190} />
        <KnowledgeCard title="Neo4j" x={878} y={246} w={190} tone="green" rotate={2} delay={250} />
        <KnowledgeCard title="Property Graph" x={690} y={338} w={250} tone="green" rotate={-1} delay={310} />
        <KnowledgeCard title="到底差在哪？" x={278} y={468} w={250} tone="amber" rotate={1} delay={370} />
        <KnowledgeCard title="知識圖譜案例" x={806} y={488} w={260} tone="violet" rotate={-2} delay={430} />
        <Line x1={506} y1={250} x2={675} y2={258} color={palette.green} delay={620} />
        <Line x1={898} y1={420} x2={806} y2={518} color={palette.violet} delay={720} />
      </div>
    </div>
  </Shell>
);

const WhiteboardLifecycle: Page = () => (
  <Shell label="lifecycle">
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 48 }}>
      <div>
        <Eyebrow color={palette.violet}>最後回到結構</Eyebrow>
        <Title size={86} style={{ marginTop: 24 }}>
          Whiteboard 有生命週期嗎？
        </Title>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 96, top: 82, width: 1350, height: 340, border: `3px solid ${palette.faint}`, borderRadius: 999, background: 'rgba(255,250,240,.58)' }} />
        <DecisionStep text="誕生" x={120} y={220} tone="blue" />
        <DecisionStep text="探索" x={310} y={120} tone="green" />
        <DecisionStep text="混亂" x={520} y={220} tone="amber" />
        <DecisionStep text="找到 pattern" x={730} y={120} tone="violet" />
        <DecisionStep text="形成結構" x={950} y={220} tone="green" />
        <DecisionStep text="長大" x={1180} y={120} tone="blue" />
        <div style={{ position: 'absolute', left: 1228, top: 430, display: 'flex', gap: 18, alignItems: 'center' }}>
          <div style={{ padding: '18px 24px', borderRadius: 999, background: palette.violetSoft, color: palette.violet, fontSize: 26, fontWeight: 820 }}>section</div>
          <div style={{ padding: '18px 24px', borderRadius: 999, background: palette.blueSoft, color: palette.blue, fontSize: 26, fontWeight: 820 }}>sub-whiteboard</div>
        </div>
        <div style={{ position: 'absolute', left: 138, bottom: 44, fontSize: 54, fontWeight: 900, lineHeight: 1.22, maxWidth: 1040 }}>
          結構不是一開始設計好的，<br />
          <span style={{ color: 'var(--osd-accent)' }}>它是思考過程的結果。</span>
        </div>
      </div>
    </div>
  </Shell>
);

const NotTool: Page = () => (
  <Shell label="not the tool">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '680px 1fr', gap: 72, alignItems: 'center' }}>
      <div>
        <Eyebrow>不是工具信仰</Eyebrow>
        <Title size={88} style={{ marginTop: 28 }}>
          Heptabase 對我有用，不代表每個人都該用。
        </Title>
      </div>
      <div style={{ position: 'relative', height: 620 }}>
        <TinyTool name="Notion" x={60} />
        <TinyTool name="Heptabase" x={360} />
        <TinyTool name="紙筆" x={690} />
        <TinyTool name="其他工具" x={990} />
        <div style={{ position: 'absolute', left: 182, top: 180, width: 820, textAlign: 'center', fontSize: 60, fontWeight: 900, lineHeight: 1.18 }}>
          它有沒有<br />幫助我思考？
        </div>
        <div style={{ position: 'absolute', left: 220, top: 386, width: 700, height: 2, background: palette.faint }} />
      </div>
    </div>
  </Shell>
);

const Closing: Page = () => (
  <Shell label="closing">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow>最後</Eyebrow>
      <Title size={112} style={{ marginTop: 30, maxWidth: 1380 }}>
        不要只是建立一個漂亮的知識庫。
      </Title>
      <Title size={112} style={{ marginTop: 22, maxWidth: 1450, color: 'var(--osd-accent)' }}>
        建立一個能幫助自己思考的環境。
      </Title>
      <Body style={{ marginTop: 60, maxWidth: 1040 }}>讓知識長成你理解的樣子，而不是長成別人覺得整齊的樣子。</Body>
    </div>
  </Shell>
);

export const meta: SlideMeta = {
  title: '讓知識長成你理解的樣子',
  createdAt: '2026-09-11T11:46:29.039Z',
};

export default [
  Cover,
  StuckMoment,
  OpeningFriction,
  AddCardNow,
  Framing,
  TwoThings,
  CardWay,
  CardExampleUnitTest,
  CardExampleCnn,
  CardExampleReflection,
  WhiteboardBirth,
  DigitalDesk,
  StructureAsTrace,
  JobSearchSurface,
  LearningResearch,
  WhiteboardLifecycle,
  NotTool,
  Closing,
] satisfies Page[];
