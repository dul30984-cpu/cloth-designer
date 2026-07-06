import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  DownloadSimple,
  EnvelopeSimple,
  Eye,
  InstagramLogo,
  Phone,
  Sparkle,
  WechatLogo,
} from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import GlassSurface from "./components/GlassSurface";
import Silk from "./components/Silk";
import { designerProfile, projects } from "./data/siteData";

const sectionLabels = {
  inspiration: ["灵感来源", "Inspiration"],
  sketches: ["设计手稿", "Sketches"],
  fabric: ["面料与细节", "Fabric & Detail"],
  process: ["打版 / 成衣过程", "Pattern & Garment"],
  final: ["最终大片", "Final Editorial"],
};

const processSteps = [
  {
    number: "01",
    zh: "灵感来源",
    en: "Inspiration",
    image: "/assets/sections/inspiration.svg",
    text: "可放情绪板、趋势参考、色卡、生活方式场景、竞品款式和系列关键词。后期你可以直接替换为多张 moodboard 或拼贴图。",
  },
  {
    number: "02",
    zh: "设计手稿",
    en: "Sketch Development",
    image: "/assets/sections/sketch.svg",
    text: "可放手绘扫描、款式线稿、局部结构推导和系列款式矩阵，用来说明你从灵感到款式的设计判断。",
  },
  {
    number: "03",
    zh: "面料与细节",
    en: "Fabric & Detail",
    image: "/assets/sections/fabric.svg",
    text: "可放面料实拍、肌理特写、辅料、纽扣、缝线、压褶、洗水效果和工艺细节。",
  },
  {
    number: "04",
    zh: "打版 / 试衣",
    en: "Pattern & Fitting",
    image: "/assets/sections/process.svg",
    text: "可放纸样、白坯、试衣过程、版型调整记录，突出你不是只会画图，而是能把系列落地。",
  },
  {
    number: "05",
    zh: "最终大片",
    en: "Final Lookbook",
    image: "/assets/sections/final.svg",
    text: "可放模特图、走秀图、棚拍图、街拍感 lookbook，让客户快速感受到完整系列的商业气质。",
  },
];

const profileProof = [
  {
    zh: "工作经历",
    en: "Experience",
    text: "曾参与女装系列企划、款式开发、面料调研、流行趋势整理与成衣落地。这里后期可替换为完整工作履历、品牌经历、岗位职责和代表项目。",
    image: "/assets/projects/soft-commute/cover.svg",
  },
  {
    zh: "参赛 / 获奖",
    en: "Awards",
    text: "可展示设计比赛、院校项目、行业奖项、入围记录或媒体报道。这里预留了较长文字区，也可以放证书扫描图。",
    image: "/assets/projects/light-structure/cover.svg",
  },
  {
    zh: "走秀 / 展览",
    en: "Runway & Exhibition",
    text: "可展示秀场、静态展、毕业展、品牌发布会或橱窗陈列照片，强调作品被真实呈现过。",
    image: "/assets/projects/quiet-resort/cover.svg",
  },
  {
    zh: "商业项目",
    en: "Commercial Projects",
    text: "可展示品牌合作、买手企划、胶囊系列、季度企划案和商品开发案例，方便品牌方判断合作价值。",
    image: "/assets/projects/urban-ease/cover.svg",
  },
];

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return hash;
}

function assetStyle(src) {
  return { "--asset": `url("${src}")` };
}

function FadeIn({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <GlassSurface
        width="100%"
        height={64}
        borderRadius={999}
        brightness={72}
        opacity={0.82}
        blur={12}
        displace={0.3}
        backgroundOpacity={0.2}
        saturation={1.45}
        distortionScale={-95}
        redOffset={2}
        greenOffset={8}
        blueOffset={14}
        mixBlendMode="screen"
        className="nav-glass mx-auto max-w-7xl text-[0.72rem] text-ink"
      >
        <nav className="flex h-full w-full items-center justify-between px-4 sm:px-6">
          <a href="#/" className="font-medium">
            LIU SIBING
          </a>
          <div className="hidden items-center gap-7 text-muted md:flex">
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#profile">Profile</a>
            <a href="#contact">Contact</a>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-white transition hover:bg-stone-700 active:translate-y-px"
          >
            <EnvelopeSimple size={15} weight="regular" />
            Contact
          </a>
        </nav>
      </GlassSurface>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.24], [0, reduceMotion ? 0 : 130]);
  const imageScale = useTransform(scrollYProgress, [0, 0.18], [1, reduceMotion ? 1 : 1.08]);
  const titleX = useTransform(scrollYProgress, [0, 0.18], [0, reduceMotion ? 0 : -56]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.55]);
  const sketchOpacity = useTransform(scrollYProgress, [0, 0.12, 0.24], [0.55, 1, 0.2]);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-mist px-4 pt-24 sm:px-6">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="hero-runway" />
        <div className="hero-editorial-strips" aria-hidden="true">
          <motion.span style={{ x: useTransform(scrollYProgress, [0, 0.2], [0, -80]) }} />
          <motion.span style={{ x: useTransform(scrollYProgress, [0, 0.2], [0, 110]) }} />
          <motion.span style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, -70]) }} />
        </div>
        <motion.div style={{ opacity: sketchOpacity }} className="hero-sketch">
          <svg viewBox="0 0 900 680" role="img" aria-label="Animated garment sketch lines">
            <motion.path
              d="M442 82 C392 148 362 232 354 328 C346 444 296 518 254 602 M459 84 C510 150 540 232 549 328 C560 444 608 518 650 602 M402 164 C452 188 500 188 548 164 M374 318 C434 350 482 350 535 318 M318 512 C414 548 505 548 594 512"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-6rem)] max-w-7xl items-end gap-8 pb-8 md:grid-cols-[0.92fr_1.08fr] md:pb-14">
        <motion.div style={{ x: titleX, opacity: titleOpacity }} className="pb-8">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-5 text-xs uppercase text-muted"
          >
            Seoul-Tokyo inspired womenswear
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="max-w-[10ch] text-7xl font-medium leading-[0.84] text-ink sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem]"
          >
            LIU SIBING
          </motion.h1>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.98 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="hero-look"
        >
          <motion.div
            style={{ ...assetStyle("/assets/projects/soft-commute/hero.svg"), scale: imageScale }}
            className="look-image"
          />
          <motion.div
            className="hero-floating-card hero-floating-card-a"
            style={{ y: useTransform(scrollYProgress, [0, 0.22], [0, -90]) }}
          >
            Moodboard
          </motion.div>
          <motion.div
            className="hero-floating-card hero-floating-card-b"
            style={{ y: useTransform(scrollYProgress, [0, 0.22], [0, 72]) }}
          >
            Fabric 05
          </motion.div>
          <div className="look-caption">
            <span>01</span>
            <span>Sketch to garment transition</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="statement-silk-section px-4 py-24 sm:px-6 md:py-32">
      <div className="statement-silk-bg" aria-hidden="true">
        <Silk speed={9.1} scale={0.9} color="#94a3b8" noiseIntensity={0.9} rotation={0.29} />
      </div>
      <FadeIn className="relative z-10 mx-auto max-w-5xl">
        <p className="mb-6 text-sm text-muted">品牌定位 / Design Position</p>
        <h2 className="text-balance text-4xl font-medium leading-[0.98] text-ink sm:text-5xl md:text-7xl lg:text-8xl">
          {designerProfile.tagline}
        </h2>
        <div className="mt-12 grid gap-8 text-base leading-8 text-muted md:grid-cols-2">
          <p>{designerProfile.introZh}</p>
          <p>{designerProfile.introEn}</p>
        </div>
      </FadeIn>
    </section>
  );
}

function TransformationSection() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sketchOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.55], [1, 0.8, 0]);
  const fabricOpacity = useTransform(scrollYProgress, [0.28, 0.48, 0.68], [0, 1, 0.15]);
  const garmentOpacity = useTransform(scrollYProgress, [0.5, 0.72, 0.9], [0, 1, 1]);
  const stageScale = useTransform(scrollYProgress, [0.2, 0.8], [0.92, reduceMotion ? 0.92 : 1.08]);
  const railX = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-28%"]);

  return (
    <section ref={ref} className="transformation-section">
      <div className="transformation-sticky">
        <div className="transformation-copy">
          <p>滚动叙事 / Scroll Atelier</p>
          <h2>Sketch, fabric, silhouette, final look.</h2>
          <span>
            这一段是给网站增加“前端炫技”的核心章节：用户往下滑时，画面会从手稿、面料、版型慢慢过渡到成衣。后期可以把这些占位图替换成你的真实手稿和模特图。
          </span>
        </div>

        <motion.div style={{ scale: stageScale }} className="transformation-stage">
          <motion.div
            className="transformation-layer"
            style={{ ...assetStyle("/assets/sections/sketch.svg"), opacity: sketchOpacity }}
          />
          <motion.div
            className="transformation-layer"
            style={{ ...assetStyle("/assets/sections/fabric.svg"), opacity: fabricOpacity }}
          />
          <motion.div
            className="transformation-layer"
            style={{ ...assetStyle("/assets/projects/quiet-resort/hero.svg"), opacity: garmentOpacity }}
          />
          <motion.div style={{ x: railX }} className="transformation-film">
            {projects.map((project) => (
              <span key={project.slug} style={assetStyle(project.cover)} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SelectedProjects() {
  return (
    <section id="work" className="overflow-hidden bg-white px-4 py-10 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm text-muted">精选系列 / Selected Work</p>
            <h2 className="max-w-3xl text-4xl font-medium leading-tight text-ink md:text-6xl">
              Magazine scale outside, portfolio logic inside.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted">
            首页保持大片感，详情页呈现灵感、手稿、面料、打版和最终成衣。
          </p>
        </FadeIn>

        <div className="project-rail" aria-label="Selected projects">
          {projects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.05} className="project-card">
              <a href={`#/project/${project.slug}`} aria-label={`Open ${project.titleEn}`}>
                <div className="project-cover" style={assetStyle(project.cover)} />
                <div className="mt-5 flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs text-muted">{project.year} / {project.category}</p>
                    <h3 className="mt-2 text-2xl font-medium text-ink">{project.titleEn}</h3>
                    <p className="mt-1 text-sm text-muted">{project.titleZh}</p>
                  </div>
                  <span className="mt-1 inline-flex size-10 items-center justify-center rounded-full border border-ink/12 bg-white text-ink">
                    <ArrowRight size={18} />
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="bg-silk px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.78fr_1.22fr]">
        <FadeIn className="sticky top-28 h-fit">
          <p className="mb-4 text-sm text-muted">设计过程 / Process</p>
          <h2 className="text-4xl font-medium leading-tight text-ink md:text-6xl">
            A process wall built for real portfolio images.
          </h2>
          <p className="mt-8 max-w-md text-base leading-8 text-muted">
            这里不再只是几行文字，而是给后期图片准备好的资料墙。每个步骤都能放图片、扫描件、面料特写或过程图。
          </p>
        </FadeIn>

        <div className="process-gallery">
          {processSteps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.04} className="process-card">
              <div className="process-media" style={assetStyle(step.image)} />
              <div className="process-card-copy">
                <span>{step.number}</span>
                <div>
                  <h3>{step.zh}</h3>
                  <p>{step.en}</p>
                </div>
                <p>{step.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section id="profile" className="bg-white px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="profile-intro">
            <p className="mb-4 text-sm text-muted">履历背书 / Profile</p>
            <h2 className="text-4xl font-medium leading-tight text-ink md:text-6xl">
              Proof points with space for documents, shows and projects.
            </h2>
            <p>
              这里后期可以替换成真实简历、证书、秀场照片、品牌项目截图、工作室照片或媒体报道。现在先用足够完整的占位内容，让你看到页面能承载多少资料。
            </p>
          </div>

          <div className="profile-proof-grid">
            {profileProof.map((item, index) => (
              <article key={item.en} className={index === 0 ? "profile-proof profile-proof-large" : "profile-proof"}>
                <div className="profile-proof-image" style={assetStyle(item.image)} />
                <div className="profile-proof-copy">
                  <p>{item.en}</p>
                  <h3>{item.zh}</h3>
                  <span>{item.text}</span>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ContactSection() {
  const [revealed, setRevealed] = useState({ wechat: false, phone: false });

  return (
    <section id="contact" className="bg-ink px-4 py-20 text-white sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1fr] md:items-end">
        <FadeIn>
          <p className="mb-5 text-sm text-white/60">联系合作 / Contact</p>
          <h2 className="max-w-3xl text-5xl font-medium leading-none md:text-7xl">
            Let the next collection begin with a clear point of view.
          </h2>
        </FadeIn>
        <FadeIn className="contact-panel" delay={0.08}>
          <a href={`mailto:${designerProfile.contacts.email}`} className="contact-line">
            <EnvelopeSimple size={21} />
            {designerProfile.contacts.email}
          </a>
          <a href={designerProfile.contacts.xiaohongshu} target="_blank" rel="noreferrer" className="contact-line">
            <Sparkle size={21} />
            小红书 / Xiaohongshu
          </a>
          <a href={designerProfile.contacts.instagram} target="_blank" rel="noreferrer" className="contact-line">
            <InstagramLogo size={21} />
            Instagram
          </a>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="reveal-button"
              onClick={() => setRevealed((current) => ({ ...current, wechat: !current.wechat }))}
            >
              <WechatLogo size={19} />
              {revealed.wechat ? designerProfile.contacts.wechat : "显示微信"}
            </button>
            <button
              type="button"
              className="reveal-button"
              onClick={() => setRevealed((current) => ({ ...current, phone: !current.phone }))}
            >
              <Phone size={19} />
              {revealed.phone ? designerProfile.contacts.phone : "显示电话"}
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a href={designerProfile.downloads.portfolio} className="download-button">
              <DownloadSimple size={19} />
              Portfolio PDF
            </a>
            <a href={designerProfile.downloads.resume} className="download-button">
              <DownloadSimple size={19} />
              Resume PDF
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Statement />
        <TransformationSection />
        <SelectedProjects />
        <ProcessSection />
        <Credentials />
        <ContactSection />
      </main>
    </>
  );
}

function ProjectPage({ project }) {
  const related = useMemo(() => projects.filter((item) => item.slug !== project.slug).slice(0, 2), [project.slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [project.slug]);

  return (
    <>
      <Navigation />
      <main className="bg-white pt-24">
        <section className="px-4 pb-12 pt-12 sm:px-6 md:pb-20">
          <div className="mx-auto max-w-7xl">
            <a href="#/" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink">
              <ArrowLeft size={17} />
              Back to home
            </a>

            <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <FadeIn>
                <p className="mb-5 text-sm text-muted">{project.year} / {project.category}</p>
                <h1 className="text-7xl font-medium leading-[0.84] text-ink sm:text-8xl md:text-9xl lg:text-[10rem]">
                  {project.titleEn}
                </h1>
                <p className="mt-5 text-2xl text-muted">{project.titleZh}</p>
              </FadeIn>
              <FadeIn delay={0.06}>
                <div className="project-hero-image" style={assetStyle(project.hero)} />
              </FadeIn>
            </div>

            <div className="mt-12 grid gap-8 border-y border-ink/10 py-8 md:grid-cols-[1fr_1fr_1fr]">
              <p className="text-base leading-8 text-ink">{project.summaryZh}</p>
              <p className="text-base leading-8 text-muted">{project.summaryEn}</p>
              <div className="flex flex-wrap content-start gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {Object.entries(sectionLabels).map(([key, [zh, en]], index) => (
          <ProjectNarrative key={key} titleZh={zh} titleEn={en} assets={project.sections[key]} index={index} />
        ))}

        <section className="bg-silk px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <FadeIn className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-sm text-muted">更多系列 / More Work</p>
                <h2 className="text-4xl font-medium text-ink">Continue the portfolio</h2>
              </div>
              <a href="#/" className="hidden rounded-full bg-ink px-5 py-3 text-sm text-white md:inline-flex">
                Home
              </a>
            </FadeIn>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <a key={item.slug} href={`#/project/${item.slug}`} className="related-card">
                  <div className="related-image" style={assetStyle(item.cover)} />
                  <div>
                    <p>{item.year} / {item.titleZh}</p>
                    <h3>{item.titleEn}</h3>
                  </div>
                  <ArrowRight size={20} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ProjectNarrative({ titleZh, titleEn, assets, index }) {
  const isAlt = index % 2 === 1;

  return (
    <section className={`px-4 py-20 sm:px-6 md:py-28 ${isAlt ? "bg-silk" : "bg-white"}`}>
      <div className={`mx-auto grid max-w-7xl gap-10 ${isAlt ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"}`}>
        <FadeIn className={`h-fit ${isAlt ? "lg:order-2" : ""}`}>
          <p className="mb-4 text-sm text-muted">{titleEn}</p>
          <h2 className="text-4xl font-medium leading-tight text-ink md:text-6xl">{titleZh}</h2>
        </FadeIn>
        <div className="grid gap-6">
          {assets.map((asset) => (
            <FadeIn key={asset.src} className="narrative-asset">
              <img src={asset.src} alt={`${asset.altZh} / ${asset.altEn}`} loading="lazy" />
              <div>
                <p>{asset.captionZh}</p>
                <span>{asset.captionEn}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return <motion.div className="progress-line" style={{ scaleX }} />;
}

export default function App() {
  const hash = useHashRoute();
  const slug = hash.startsWith("#/project/") ? hash.replace("#/project/", "") : null;
  const project = projects.find((item) => item.slug === slug);

  return (
    <>
      <ProgressBar />
      <AnimatePresence mode="wait">
        {project ? <ProjectPage key={project.slug} project={project} /> : <HomePage key="home" />}
      </AnimatePresence>
    </>
  );
}
