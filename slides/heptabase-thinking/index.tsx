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
    style={{
      margin: 0,
      color: palette.ink2,
      fontSize: 'var(--osd-size-body)',
      lineHeight: 1.45,
      maxWidth: 760,
      ...style,
    }}
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

const Cover: Page = () => (
  <Shell label="opening">
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

const BeforeQuestion: Page = () => (
  <Shell label="before">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow color={palette.coral}>以前</Eyebrow>
      <Title size={112} style={{ marginTop: 30, maxWidth: 1340 }}>
        在寫之前，我常常先被迫做一個決定。
      </Title>
      <Body style={{ marginTop: 48, maxWidth: 900, fontSize: 38 }}>第一個問題不是「我要寫什麼？」</Body>
    </div>
  </Shell>
);

const CategoryQuestion: Page = () => (
  <Shell label="category first">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '710px 1fr', gap: 92, alignItems: 'center' }}>
      <div>
        <Eyebrow color={palette.coral}>而是</Eyebrow>
        <Title size={126} style={{ marginTop: 30 }}>
          這是什麼類別？
        </Title>
        <Body style={{ marginTop: 42 }}>它應該放在哪裡？要不要再開一個新的分類？</Body>
      </div>
      <div style={{ position: 'relative', height: 620 }}>
        <KnowledgeCard title="新想法" note="先記下來？等一下。" x={120} y={250} w={290} tone="paper" rotate={-3} delay={80} />
        <Folder label="Work" x={650} y={62} />
        <Folder label="Learning" x={730} y={202} />
        <Folder label="Personal" x={610} y={342} />
        <Folder label="Projects" x={760} y={482} />
        <Line x1={410} y1={304} x2={650} y2={104} color={palette.coral} delay={260} />
        <Line x1={410} y1={304} x2={730} y2={244} color={palette.coral} delay={380} />
        <Line x1={410} y1={304} x2={610} y2={384} color={palette.coral} delay={500} />
        <Line x1={410} y1={304} x2={760} y2={524} color={palette.coral} delay={620} />
      </div>
    </div>
  </Shell>
);

const FolderTree: Page = () => (
  <Shell label="folder tree">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '640px 1fr', gap: 90, alignItems: 'center' }}>
      <div>
        <Eyebrow>傳統資料夾感</Eyebrow>
        <Title size={94} style={{ marginTop: 28 }}>
          先建立分類，再把內容放進去。
        </Title>
      </div>
      <div style={{ position: 'relative', height: 620 }}>
        <div style={{ position: 'absolute', left: 80, top: 38, fontFamily: font.mono, fontSize: 34, lineHeight: 1.85, color: palette.ink2 }}>
          <div>Folder</div>
          <div style={{ marginLeft: 54 }}>├── Work</div>
          <div style={{ marginLeft: 54 }}>├── Learning</div>
          <div style={{ marginLeft: 54 }}>├── Personal</div>
          <div style={{ marginLeft: 54 }}>└── Projects</div>
        </div>
        <KnowledgeCard title="新的內容" x={760} y={250} w={300} tone="amber" rotate={2} delay={120} />
        <div className="ht-grow" style={{ position: 'absolute', left: 620, top: 292, width: 115, height: 3, background: palette.coral }} />
        <div style={{ position: 'absolute', left: 735, top: 281, width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: `18px solid ${palette.coral}` }} />
      </div>
    </div>
  </Shell>
);

const DecisionFlow: Page = () => (
  <Shell label="decision friction">
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 62 }}>
      <div>
        <Eyebrow color={palette.coral}>每次建立內容之前</Eyebrow>
        <Title size={88} style={{ marginTop: 24, maxWidth: 1280 }}>
          我還沒開始想內容，就先在決定它應該放哪裡。
        </Title>
      </div>
      <div style={{ position: 'relative', height: 590 }}>
        <DecisionStep text="新想法出現" x={30} y={215} tone="paper" delay={80} />
        <DecisionStep text="這是什麼？" x={400} y={215} tone="coral" delay={180} />
        <DecisionStep text="屬於哪類？" x={770} y={215} tone="coral" delay={280} />
        <DecisionStep text="放哪個 folder？" x={1140} y={215} tone="coral" delay={380} />
        <DecisionStep text="最後才開始寫" x={590} y={430} tone="blue" delay={540} />
        <Line x1={360} y1={275} x2={400} y2={275} color={palette.coral} delay={240} />
        <Line x1={730} y1={275} x2={770} y2={275} color={palette.coral} delay={340} />
        <Line x1={1100} y1={275} x2={1140} y2={275} color={palette.coral} delay={440} />
        <Line x1={1305} y1={333} x2={920} y2={430} color={palette.accent} delay={620} />
      </div>
    </div>
  </Shell>
);

const ForkedDecisions: Page = () => (
  <Shell label="where does it go">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '610px 1fr', gap: 86, alignItems: 'center' }}>
      <div>
        <Eyebrow color={palette.coral}>心理負擔</Eyebrow>
        <Title size={92} style={{ marginTop: 28 }}>
          這讓我覺得很累。
        </Title>
        <Body style={{ marginTop: 40 }}>一張筆記同時像工作、學習、寫作，也像職涯素材。</Body>
      </div>
      <div style={{ position: 'relative', height: 640 }}>
        <KnowledgeCard title="AI 學習筆記" note="到底要放哪？" x={410} y={250} w={330} tone="paper" rotate={-2} delay={80} />
        <KnowledgeCard title="工作" x={98} y={70} w={230} tone="coral" rotate={-3} delay={160} />
        <KnowledgeCard title="學習" x={790} y={98} w={230} tone="coral" rotate={4} delay={220} />
        <KnowledgeCard title="寫作" x={120} y={488} w={230} tone="coral" rotate={3} delay={280} />
        <KnowledgeCard title="職涯" x={826} y={470} w={230} tone="coral" rotate={-3} delay={340} />
        <Line x1={470} y1={284} x2={305} y2={126} color={palette.coral} delay={500} />
        <Line x1={710} y1={288} x2={810} y2={154} color={palette.coral} delay={600} />
        <Line x1={470} y1={380} x2={310} y2={518} color={palette.coral} delay={700} />
        <Line x1={710} y1={382} x2={840} y2={508} color={palette.coral} delay={800} />
      </div>
    </div>
  </Shell>
);

const FatigueStatement: Page = () => (
  <Shell label="friction">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow color={palette.coral}>真正的摩擦</Eyebrow>
      <Title size={118} style={{ marginTop: 30, maxWidth: 1380 }}>
        我還沒開始思考內容，就先花力氣決定它應該放在哪裡。
      </Title>
    </div>
  </Shell>
);

const NowHeptabase: Page = () => (
  <Shell label="now">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '620px 1fr', gap: 88, alignItems: 'center' }}>
      <div>
        <Eyebrow>現在</Eyebrow>
        <Title size={110} style={{ marginTop: 28 }}>
          我使用 Heptabase。
        </Title>
        <Body style={{ marginTop: 42 }}>有一個想法時，我不用先回答它屬於哪裡。</Body>
      </div>
      <div style={{ position: 'relative', height: 640 }}>
        <KnowledgeCard title="一個想法" x={170} y={230} w={300} tone="paper" rotate={-3} delay={80} />
        <div style={{ position: 'absolute', left: 555, top: 250, width: 280, height: 92, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, background: palette.blue, color: 'white', fontSize: 38, fontWeight: 900, boxShadow: '0 20px 46px rgba(77,99,255,.25)' }}>
          + Add Card
        </div>
        <KnowledgeCard title="直接開始寫" note="先把內容放出來。" x={930} y={218} w={340} tone="blue" rotate={2} delay={260} />
        <Line x1={470} y1={290} x2={555} y2={296} color={palette.blue} delay={420} />
        <Line x1={835} y1={296} x2={930} y2={292} color={palette.blue} delay={540} />
      </div>
    </div>
  </Shell>
);

const BeforeNow: Page = () => (
  <Shell label="before now">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 78, alignItems: 'center' }}>
      <div style={{ position: 'relative', height: 610 }}>
        <Eyebrow color={palette.coral}>Before</Eyebrow>
        <Title size={70} style={{ marginTop: 22, maxWidth: 620 }}>先決定結構，才能創造內容。</Title>
        <DecisionStep text="Idea" x={20} y={270} tone="paper" delay={80} />
        <DecisionStep text="Category?" x={300} y={270} tone="coral" delay={160} />
        <DecisionStep text="Folder?" x={300} y={430} tone="coral" delay={240} />
        <Line x1={350} y1={324} x2={300} y2={324} color={palette.coral} delay={330} />
        <Line x1={465} y1={378} x2={465} y2={430} color={palette.coral} delay={430} />
      </div>
      <div style={{ position: 'relative', height: 610 }}>
        <Eyebrow color={palette.blue}>Now</Eyebrow>
        <Title size={70} style={{ marginTop: 22, maxWidth: 620 }}>先創造內容，再決定結構。</Title>
        <DecisionStep text="Idea" x={10} y={330} tone="paper" delay={160} />
        <div style={{ position: 'absolute', left: 300, top: 342, width: 250, height: 86, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, background: palette.blue, color: 'white', fontSize: 34, fontWeight: 900 }}>
          Add Card
        </div>
        <DecisionStep text="Write" x={610} y={330} tone="blue" delay={300} />
        <Line x1={340} y1={384} x2={300} y2={384} color={palette.blue} delay={440} />
        <Line x1={550} y1={384} x2={610} y2={384} color={palette.blue} delay={540} />
      </div>
    </div>
  </Shell>
);

const Framing: Page = () => (
  <Shell label="framing">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow>今天想分享的</Eyebrow>
      <Title size={100} style={{ marginTop: 34, maxWidth: 1500 }}>
        不是「怎麼操作 Heptabase」，
      </Title>
      <Title size={100} style={{ marginTop: 18, maxWidth: 1500, color: 'var(--osd-accent)' }}>
        而是我怎麼讓工具配合我的思考。
      </Title>
      <Body style={{ marginTop: 54, maxWidth: 920 }}>從整理資訊，到建立自己的思考環境。</Body>
    </div>
  </Shell>
);

const SpaceShift: Page = () => (
  <Shell label="shift">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '520px 1fr', gap: 72, alignItems: 'center' }}>
      <div>
        <Eyebrow>更大的轉變</Eyebrow>
        <Title size={92} style={{ marginTop: 28 }}>
          不是往裡找，是攤開來看。
        </Title>
        <Body style={{ marginTop: 38 }}>讓想法先出現在同一個空間，關係才有機會被看見。</Body>
      </div>
      <div style={{ position: 'relative', height: 650 }}>
        <div style={{ position: 'absolute', left: 20, top: 80, width: 360, height: 470, border: `2px solid ${palette.faint}`, borderRadius: 20, background: palette.softPaper }} />
        <Folder label="分類 A" x={54} y={130} />
        <Folder label="分類 B" x={54} y={240} />
        <Folder label="分類 C" x={54} y={350} />
        <div style={{ position: 'absolute', left: 460, top: 306, color: palette.muted, fontSize: 50, fontWeight: 820 }}>→</div>
        <KnowledgeCard title="概念" x={650} y={80} w={230} tone="blue" rotate={-3} delay={100} className="ht-spread" style={{ ['--from-x' as string]: '-180px', ['--from-y' as string]: '180px' }} />
        <KnowledgeCard title="例子" x={970} y={165} w={230} tone="green" rotate={3} delay={180} className="ht-spread" style={{ ['--from-x' as string]: '-300px', ['--from-y' as string]: '80px' }} />
        <KnowledgeCard title="問題" x={780} y={342} w={230} tone="amber" rotate={-1} delay={260} className="ht-spread" style={{ ['--from-x' as string]: '-180px', ['--from-y' as string]: '-80px' }} />
        <KnowledgeCard title="之後再看" x={1120} y={430} w={270} tone="paper" rotate={2} delay={340} className="ht-spread" style={{ ['--from-x' as string]: '-360px', ['--from-y' as string]: '-120px' }} />
        <Line x1={800} y1={160} x2={1010} y2={228} color={palette.blue} delay={580} />
        <Line x1={892} y1={402} x2={1044} y2={228} color={palette.green} delay={720} />
      </div>
    </div>
  </Shell>
);

const Whiteboard: Page = () => (
  <Shell label="whiteboard">
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 52 }}>
      <div style={{ maxWidth: 1120 }}>
        <Eyebrow>Heptabase 對我有用的地方</Eyebrow>
        <Title size={88} style={{ marginTop: 24 }}>
          Whiteboard 是我的思考桌面。
        </Title>
        <Body style={{ marginTop: 28, maxWidth: 920 }}>不是展示成果，而是讓還沒成形的想法先有地方站著。</Body>
      </div>
      <div style={{ position: 'relative' }}>
        <KnowledgeCard title="書裡的一句話" x={150} y={118} w={260} tone="paper" rotate={-2} delay={100} />
        <KnowledgeCard title="自己的疑問" x={470} y={210} w={260} tone="blue" rotate={3} delay={180} />
        <KnowledgeCard title="面試經驗" x={860} y={140} w={285} tone="amber" rotate={-3} delay={260} />
        <KnowledgeCard title="暫時不知道" x={1260} y={360} w={300} tone="violet" rotate={2} delay={340} />
        <Line x1={410} y1={190} x2={470} y2={260} color={palette.faint} delay={520} />
        <Line x1={730} y1={268} x2={860} y2={200} color={palette.faint} delay={650} />
      </div>
    </div>
  </Shell>
);

const MovingCards: Page = () => (
  <Shell label="moving">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '650px 1fr', gap: 80, alignItems: 'center' }}>
      <div>
        <Eyebrow color={palette.green}>移動不是排版</Eyebrow>
        <Title size={88} style={{ marginTop: 28 }}>
          移動卡片，就是在測試理解。
        </Title>
      </div>
      <div style={{ position: 'relative', height: 620 }}>
        <SectionBox title="可能相關" x={80} y={70} w={430} h={210} color={palette.faint} />
        <SectionBox title="概念群" x={680} y={260} w={520} h={260} color={palette.green} />
        <KnowledgeCard title="先放著" x={160} y={136} w={230} tone="paper" rotate={-2} delay={60} />
        <KnowledgeCard title="學習理論" x={748} y={330} w={240} tone="green" rotate={1} delay={140} />
        <KnowledgeCard title="輸出練習" x={930} y={410} w={240} tone="green" rotate={-2} delay={220} />
        <KnowledgeCard
          title="AI 筆記"
          x={468}
          y={236}
          w={230}
          tone="blue"
          rotate={2}
          delay={360}
          className="ht-spread"
          style={{ ['--from-x' as string]: '-280px', ['--from-y' as string]: '-110px' }}
        />
        <Line x1={588} y1={292} x2={792} y2={368} color={palette.green} delay={650} />
      </div>
    </div>
  </Shell>
);

const Messy: Page = () => (
  <Shell label="exploration">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '610px 1fr', gap: 82, alignItems: 'center' }}>
      <div>
        <Eyebrow color={palette.amber}>探索階段</Eyebrow>
        <Title size={92} style={{ marginTop: 28 }}>
          白板亂，是正常的。
        </Title>
        <Body style={{ marginTop: 36 }}>有時候那不是失敗，而是材料還在桌面上，關係還在形成。</Body>
      </div>
      <div style={{ position: 'relative', height: 640 }}>
        <KnowledgeCard title="還不確定" x={170} y={60} w={260} tone="amber" rotate={-8} delay={80} />
        <KnowledgeCard title="可能有關" x={590} y={110} w={250} tone="paper" rotate={5} delay={120} />
        <KnowledgeCard title="問題" x={400} y={250} w={210} tone="coral" rotate={-2} delay={170} />
        <KnowledgeCard title="之後再看" x={750} y={325} w={260} tone="violet" rotate={8} delay={220} />
        <KnowledgeCard title="概念碎片" x={220} y={420} w={300} tone="blue" rotate={4} delay={270} />
        <KnowledgeCard title="例子" x={610} y={500} w={220} tone="green" rotate={-5} delay={320} />
        <Line x1={420} y1={156} x2={602} y2={160} color={palette.faint} delay={580} />
        <Line x1={502} y1={304} x2={710} y2={376} color={palette.faint} delay={700} />
      </div>
    </div>
  </Shell>
);

const CoreLine: Page = () => (
  <Shell label="core line">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow color={palette.amber}>判準</Eyebrow>
      <Title size={120} style={{ marginTop: 30, maxWidth: 1500 }}>
        整齊不等於有用，
      </Title>
      <Title size={120} style={{ marginTop: 16, maxWidth: 1500, color: palette.amber }}>
        混亂也不等於沒有思考。
      </Title>
    </div>
  </Shell>
);

const UsefulMess: Page = () => (
  <Shell label="judgment">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 86, alignItems: 'center' }}>
      <div>
        <Eyebrow color={palette.green}>有用的混亂</Eyebrow>
        <Title size={76} style={{ marginTop: 28 }}>
          我還願意回來，還看得出線索。
        </Title>
        <div style={{ position: 'relative', height: 360, marginTop: 58 }}>
          <KnowledgeCard title="問題" x={20} y={30} w={200} tone="amber" rotate={-3} delay={60} />
          <KnowledgeCard title="例子" x={230} y={110} w={200} tone="green" rotate={2} delay={110} />
          <KnowledgeCard title="概念" x={420} y={42} w={220} tone="blue" rotate={-1} delay={160} />
          <Line x1={214} y1={96} x2={430} y2={108} color={palette.green} delay={360} />
        </div>
      </div>
      <div>
        <Eyebrow color={palette.coral}>死掉的混亂</Eyebrow>
        <Title size={76} style={{ marginTop: 28 }}>
          我不想打開，也不知道下一步。
        </Title>
        <div style={{ position: 'relative', height: 360, marginTop: 58, opacity: 0.72 }}>
          <KnowledgeCard title="未整理" x={40} y={42} w={230} tone="paper" rotate={-6} delay={120} />
          <KnowledgeCard title="未整理" x={120} y={84} w={230} tone="paper" rotate={4} delay={150} />
          <KnowledgeCard title="未整理" x={200} y={126} w={230} tone="paper" rotate={-2} delay={180} />
          <KnowledgeCard title="未整理" x={280} y={168} w={230} tone="paper" rotate={5} delay={210} />
        </div>
      </div>
    </div>
  </Shell>
);

const StructureEmerges: Page = () => (
  <Shell label="structure">
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 50 }}>
      <div style={{ maxWidth: 1140 }}>
        <Eyebrow>理解形成後</Eyebrow>
        <Title size={84} style={{ marginTop: 24 }}>
          結構才自然長出來。
        </Title>
      </div>
      <div style={{ position: 'relative' }}>
        <SectionBox title="概念" x={80} y={85} w={390} h={250} color={palette.blue} />
        <SectionBox title="例子" x={600} y={210} w={390} h={250} color={palette.green} />
        <SectionBox title="待釐清" x={1110} y={90} w={390} h={250} color={palette.amber} />
        <KnowledgeCard title="概念 A" x={130} y={150} w={210} tone="blue" delay={50} className="ht-settle" style={{ ['--mess-x' as string]: '280px', ['--mess-y' as string]: '210px', ['--mess-r' as string]: '-7deg' }} />
        <KnowledgeCard title="概念 B" x={230} y={230} w={210} tone="blue" delay={120} className="ht-settle" style={{ ['--mess-x' as string]: '390px', ['--mess-y' as string]: '90px', ['--mess-r' as string]: '5deg' }} />
        <KnowledgeCard title="案例" x={660} y={288} w={210} tone="green" delay={190} className="ht-settle" style={{ ['--mess-x' as string]: '-140px', ['--mess-y' as string]: '-90px', ['--mess-r' as string]: '8deg' }} />
        <KnowledgeCard title="故事" x={770} y={360} w={210} tone="green" delay={260} className="ht-settle" style={{ ['--mess-x' as string]: '100px', ['--mess-y' as string]: '-170px', ['--mess-r' as string]: '-6deg' }} />
        <KnowledgeCard title="問題" x={1170} y={155} w={210} tone="amber" delay={330} className="ht-settle" style={{ ['--mess-x' as string]: '-420px', ['--mess-y' as string]: '250px', ['--mess-r' as string]: '6deg' }} />
        <KnowledgeCard title="下一步" x={1280} y={235} w={210} tone="amber" delay={400} className="ht-settle" style={{ ['--mess-x' as string]: '-360px', ['--mess-y' as string]: '-20px', ['--mess-r' as string]: '-4deg' }} />
      </div>
    </div>
  </Shell>
);

const TooLarge: Page = () => (
  <Shell label="scale">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '560px 1fr', gap: 90, alignItems: 'center' }}>
      <div>
        <Eyebrow color={palette.violet}>變大之後</Eyebrow>
        <Title size={86} style={{ marginTop: 28 }}>
          不硬塞，切出新的空間。
        </Title>
        <Body style={{ marginTop: 36 }}>section 保留大圖；子白板讓某個主題可以深入展開。</Body>
      </div>
      <div style={{ position: 'relative', height: 640 }}>
        <div style={{ position: 'absolute', left: 40, top: 70, width: 690, height: 430, border: `3px solid ${palette.faint}`, borderRadius: 28, background: palette.softPaper }} />
        <SectionBox title="大圖" x={90} y={130} w={250} h={150} color={palette.blue} />
        <SectionBox title="案例" x={410} y={160} w={250} h={150} color={palette.green} />
        <SectionBox title="練習" x={250} y={320} w={250} h={130} color={palette.amber} />
        <div className="ht-grow" style={{ position: 'absolute', left: 730, top: 292, width: 180, height: 3, background: palette.violet }} />
        <div style={{ position: 'absolute', left: 920, top: 165, width: 410, height: 300, border: `4px solid ${palette.violet}`, borderRadius: 32, background: palette.violetSoft, padding: 34 }}>
          <div style={{ color: palette.violet, fontSize: 28, fontWeight: 820 }}>子白板</div>
          <div style={{ marginTop: 40, fontSize: 54, fontWeight: 880, lineHeight: 1.08 }}>把一塊主題<br />拉出去想清楚</div>
        </div>
      </div>
    </div>
  </Shell>
);

const JobSearch: Page = () => (
  <Shell label="example">
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 52 }}>
      <div>
        <Eyebrow color={palette.green}>實際例子</Eyebrow>
        <Title size={84} style={{ marginTop: 24 }}>
          求職時，一間公司就是一個 whiteboard。
        </Title>
      </div>
      <div style={{ position: 'relative' }}>
        <KnowledgeCard title="某家公司" note="我對它的理解中心" x={650} y={235} w={300} tone="paper" delay={80} />
        <KnowledgeCard title="公司背景" x={160} y={100} w={260} tone="blue" delay={140} />
        <KnowledgeCard title="產品 / 商業模式" x={1070} y={90} w={320} tone="green" delay={200} />
        <KnowledgeCard title="面試題" x={190} y={430} w={260} tone="amber" delay={260} />
        <KnowledgeCard title="要補的概念" x={1030} y={440} w={330} tone="violet" delay={320} />
        <Line x1={420} y1={168} x2={650} y2={292} color={palette.blue} delay={520} />
        <Line x1={950} y1={292} x2={1070} y2={164} color={palette.green} delay={640} />
        <Line x1={450} y1={486} x2={650} y2={340} color={palette.amber} delay={760} />
        <Line x1={950} y1={340} x2={1030} y2={500} color={palette.violet} delay={880} />
      </div>
    </div>
  </Shell>
);

const JobLinks: Page = () => (
  <Shell label="job links">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '610px 1fr', gap: 86, alignItems: 'center' }}>
      <div>
        <Eyebrow color={palette.green}>求職準備真正有用的地方</Eyebrow>
        <Title size={82} style={{ marginTop: 28 }}>
          不是資料完整，而是關係看得見。
        </Title>
      </div>
      <div style={{ position: 'relative', height: 640 }}>
        <KnowledgeCard title="公司背景" note="它在乎什麼？" x={220} y={90} w={300} tone="blue" delay={80} />
        <KnowledgeCard title="面試題" note="它想確認什麼？" x={620} y={258} w={300} tone="amber" delay={180} />
        <KnowledgeCard title="要補的概念" note="我還缺哪塊理解？" x={980} y={430} w={330} tone="violet" delay={280} />
        <Line x1={520} y1={170} x2={620} y2={316} color={palette.blue} delay={460} />
        <Line x1={920} y1={336} x2={980} y2={490} color={palette.violet} delay={620} />
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
  BeforeQuestion,
  CategoryQuestion,
  FolderTree,
  DecisionFlow,
  ForkedDecisions,
  FatigueStatement,
  NowHeptabase,
  BeforeNow,
  Framing,
  SpaceShift,
  Whiteboard,
  MovingCards,
  Messy,
  CoreLine,
  UsefulMess,
  StructureEmerges,
  TooLarge,
  JobSearch,
  JobLinks,
  NotTool,
  Closing,
] satisfies Page[];
