/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, ArrowRight, Code2, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import avatarImg from './assets/images/avatar_student_1779113991589.png';
import simulatorImg from './assets/images/gallery_simulator_1779114019833.png';
import portImg from './assets/images/gallery_port_1779114035752.png';
import chartImg from './assets/images/gallery_chart_1779114052802.png';
import weatherImg from './assets/images/gallery_weather_1779114071301.png';

const TABS = [
  { id: 'about', label: '1. 自介 About' },
  { id: 'skills', label: '2. 能力 Skills' },
  { id: 'portfolio', label: '3. 作品集 Portfolio' }
];

// MOCK DATA: Users can easily update these strings
const PERSONAL_INFO = {
  name: "力信屹",
  role: "航海科 學生",
  avatar: "https://lh3.googleusercontent.com/d/19TjHoSxLm4sMGnQD7q9bk9wRjV7seNK2",
  bio: "目前就讀於國立高雄科技大學航海科。對船舶操作、航海技術與海事工程充滿熱忱，喜歡探索廣闊的海洋與學習實務航海知識。希望能將課堂所學結合海上實務經驗，成為一名優秀的航路領航員。",
  email: "a111182122@nkust.edu.tw",
  phone: "+886 912 345 678",
  location: "高雄市, 台灣",
  socials: [
    { icon: <Linkedin size={20} />, url: "#", label: "LinkedIn" },
    { icon: <Github size={20} />, url: "#", label: "GitHub" },
  ]
};

// MOCK DATA: 航海科系能力圖資料
const SKILL_MAP = [
  {
    domain: "航海專業 Navigation",
    accent: "text-emerald-600",
    bgClass: "bg-emerald-50",
    barColor: "bg-emerald-500",
    skills: [
      { name: "航海學與地文航海", level: 85 },
      { name: "船舶操作與操船", level: 80 },
      { name: "天文航海", level: 75 },
    ]
  },
  {
    domain: "海事工程 Marine Eng.",
    accent: "text-teal-600",
    bgClass: "bg-teal-50",
    barColor: "bg-teal-500",
    skills: [
      { name: "船舶構造與穩定性", level: 80 },
      { name: "貨物裝卸與配載", level: 75 },
      { name: "雷達與導航儀器", level: 85 },
    ]
  },
  {
    domain: "通訊與法規 Communication",
    accent: "text-cyan-600",
    bgClass: "bg-cyan-50",
    barColor: "bg-cyan-500",
    skills: [
      { name: "海事英文", level: 85 },
      { name: "國際海事法規 (STCW)", level: 80 },
      { name: "GMDSS 通訊", level: 70 },
    ]
  },
  {
    domain: "基礎與實務 Fundamentals",
    accent: "text-amber-600",
    bgClass: "bg-amber-50",
    barColor: "bg-amber-500",
    skills: [
      { name: "海上求生與急救", level: 90 },
      { name: "團隊合作與領導", level: 85 },
      { name: "氣象觀測", level: 75 }
    ]
  },
  {
    domain: "語言能力 Languages",
    accent: "text-indigo-600",
    bgClass: "bg-indigo-50",
    barColor: "bg-indigo-500",
    skills: [
      { name: "中文 Chinese", level: 100 },
      { name: "英文 English (含多益檢定)", level: 80 }
    ]
  }
];

// MOCK DATA: 作品集資料 (Academic/Student projects)
const PORTFOLIO_PROJECTS = [
  {
    title: "2026 澎湖仲春之行 提案簡報",
    description: "四天三夜澎湖深度旅遊企劃，包含地質、海味、古蹟行程規劃、預算拆解分析與行前準備注意事項等完整提案。",
    tags: ["專題報告", "簡報", "行程企劃"],
    githubUrl: "",
    demoUrl: "",
    pdfUrl: "./penghu_trip.pdf"
  },
  {
    title: "製作個人3D公仔",
    description: "透過 3D 建模技術製作個人形象公仔，呈現專屬的航海員造型，結合數位設計與海洋實務背景，展現創意與技術結合的成果。",
    tags: ["3D建模", "數位設計", "創意專案"],
    githubUrl: "",
    demoUrl: "https://studio.tripo3d.ai/3d-model/e0d4620f-6a04-4902-a3fe-2b255a97dbcc?invite_code=K7RWRT",
    imageUrls: ["./pic1.jpg", "./pic2.jpg"]
  },
  {
    title: "航海與實務活動紀錄",
    description: "參與各項實務活動的影音紀錄片段，包含 AI 影片生成與航事實作相關影像。",
    tags: ["影音紀錄", "生活點滴", "實務活動"],
    githubUrl: "",
    demoUrl: "",
    videoUrls: [
      "https://drive.google.com/file/d/1knGvPl1E7NptjGREsB-sZKjfcQ9G4pia/preview", 
      "https://drive.google.com/file/d/1L9xK8JOqy0wOzufzOX5Gglc3ubYLd9lY/preview", 
      "https://drive.google.com/file/d/1p1kR6mn7-7xRPBVuQzXFqvId-M0Dyx8I/preview"
    ]
  }
];

// MOCK DATA: 專業證照 (Professional Certifications)
const CERTIFICATIONS = [
  { name: "一等航行員及格證", issueDate: "2024", issuer: "交通部航港局" },
  { name: "GMDSS 通用值機員", issueDate: "2023", issuer: "交通部" },
  { name: "STCW 基本安全訓練", issueDate: "2023", issuer: "中華航業人員訓練中心" },
  { name: "多益 (TOEIC) 英文檢定", issueDate: "2024", issuer: "ETS" },
  { name: "救生艇筏及救難艇操縱", issueDate: "2023", issuer: "中華航業人員訓練中心" },
  { name: "進階滅火訓練", issueDate: "2024", issuer: "中華航業人員訓練中心" },
  { name: "醫療急救訓練", issueDate: "2024", issuer: "中華航業人員訓練中心" },
];

// MOCK DATA: 照片集 / 生活紀錄
const PHOTO_GALLERY = [
  {
    url: simulatorImg,
    caption: "實務操船模擬演練"
  },
  {
    url: portImg,
    caption: "港口實地考察與研究"
  },
  {
    url: chartImg,
    caption: "航海技術課程實作"
  },
  {
    url: weatherImg,
    caption: "海上氣象觀測紀錄"
  }
];

function PDFViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfWidth, setPdfWidth] = useState(600);

  useEffect(() => {
    // Basic responsive width computation
    const updateWidth = () => {
      const containerWidth = Math.min(window.innerWidth - 80, 1200);
      setPdfWidth(containerWidth);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="flex flex-col items-center bg-[#F4FBF7] rounded-xl p-2 sm:p-6 border border-emerald-100 overflow-hidden w-full">
      <div className="w-full flex justify-center">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          className="max-w-full flex justify-center"
          loading={<div className="h-[300px] flex items-center justify-center text-emerald-700">Loading PDF...</div>}
        >
          <Page 
            pageNumber={pageNumber} 
            renderTextLayer={false} 
            renderAnnotationLayer={false} 
            width={pdfWidth}
            className="rounded shadow-sm border border-emerald-200 overflow-hidden"
          />
        </Document>
      </div>
      {numPages && (
        <div className="flex items-center gap-6 mt-6">
          <button 
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(p => p - 1)}
            className="p-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-full disabled:opacity-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-emerald-800 text-sm font-mono font-bold tracking-widest">
            {pageNumber} / {numPages}
          </span>
          <button 
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(p => p + 1)}
            className="p-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-full disabled:opacity-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen bg-[#F4FBF7] text-emerald-950 font-sans selection:bg-emerald-200 selection:text-emerald-900 pb-32">
      {/* Organic Green Gradients & Grid Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-emerald-200/30 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[60%] rounded-full bg-teal-100/40 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-green-200/30 blur-[120px]" />
      </div>
      <div className="fixed inset-0 pointer-events-none opacity-[0.2] bg-dot-grid" />
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-emerald-100/50 px-6 py-4 md:px-12 flex justify-between items-center shadow-sm">
        <div className="font-mono text-sm font-bold tracking-widest uppercase flex items-center gap-2 text-emerald-900">
          <Code2 size={18} className="text-emerald-600"/>
          {PERSONAL_INFO.name.split(' ')[0]} PORTFOLIO
        </div>
        <div className="flex gap-4">
          {PERSONAL_INFO.socials.map((social, index) => (
            <a 
              key={index} 
              href={social.url}
              className="text-emerald-700/60 hover:text-emerald-600 transition-colors"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
          <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-700/60 hover:text-emerald-600 transition-colors ml-2">
            <Mail size={20} />
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-48 relative">
        
        {/* HERO SECTION */}
        <section className="mb-32 md:mb-48">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-12 lg:gap-24">
              <div className="flex-1">
                <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter mb-6 leading-[0.9] uppercase text-emerald-950">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-xl md:text-3xl font-medium text-emerald-600 mb-8 max-w-2xl text-balance">
                  {PERSONAL_INFO.role}
                </p>
                <div className="flex flex-col md:flex-row gap-6 text-sm font-mono text-emerald-700/80">
                  <span className="flex items-center gap-2 border border-emerald-100 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full w-fit shadow-sm">
                    <MapPin size={14} className="text-emerald-500" /> {PERSONAL_INFO.location}
                  </span>
                  <span className="flex items-center gap-2 border border-emerald-100 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full w-fit shadow-sm">
                    <Phone size={14} className="text-emerald-500" /> {PERSONAL_INFO.phone}
                  </span>
                </div>
              </div>
              <div className="w-64 h-80 md:w-80 md:h-[400px] lg:w-96 lg:h-[480px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl shrink-0 bg-emerald-100 rotate-2 hover:rotate-0 transition-all duration-500">
                <img 
                  src={PERSONAL_INFO.avatar} 
                  alt="avatar" 
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* TABS NAVIGATION */}
        <div className="flex overflow-x-auto hide-scrollbar gap-6 md:gap-10 border-b border-emerald-200/50 mb-16">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm md:text-base font-bold tracking-widest uppercase relative whitespace-nowrap transition-colors ${
                activeTab === tab.id ? 'text-emerald-700' : 'text-emerald-900/40 hover:text-emerald-600'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500" />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          {activeTab === 'about' && (
            <motion.div
               key="about"
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -20, opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="space-y-24"
            >
          {/* ABOUT SECTION */}
          <section className="pt-4">
            <h2 className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-emerald-600/60 mb-12 flex items-center gap-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              About Me
            </h2>
            <div className="text-2xl md:text-3xl font-light leading-snug lg:leading-tight text-emerald-900 max-w-4xl text-balance">
              <span className="font-medium text-emerald-600">「探索廣闊的海洋，相信紮實的實務經驗與航海知識是成為優秀航海員的最佳捷徑。」</span>
              <br/><br/>
              <span className="text-lg md:text-xl text-emerald-800/70">
                哈囉！我是一名目前就讀於國立高雄科技大學航海科的學生。我對船舶操作與航海技術充滿熱忱，喜歡研究各項海事設施並將課堂知識轉化為專業實踐。
                <br/><br/>
                在校期間，我積極參與各項航事實務課程與技能競賽。目前正在積極尋求上船實習機會，希望能將所學結合海上實務，持續精進自己的專業能力。
              </span>
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section className="border-t border-emerald-200/50 pt-16">
            <h2 className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-emerald-600/60 mb-12 flex items-center gap-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Experience & Activities
            </h2>
            
            <div className="space-y-0 relative border-l-2 border-emerald-200/50 ml-2 md:ml-4">
              {/* Job 2 */}
              <div className="relative pl-8 md:pl-12 pb-16">
                <div className="absolute left-[-6px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-300 ring-4 ring-emerald-50"></div>
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                  <h3 className="text-xl md:text-2xl font-bold text-emerald-950 mb-2 md:mb-0">航海實務技能競賽 參賽者</h3>
                  <span className="text-xs text-emerald-700/70 font-mono tracking-widest uppercase border border-emerald-100 px-3 py-1 rounded-full w-fit">2023 - 2023</span>
                </div>
                <p className="text-emerald-800/70 font-normal leading-relaxed mt-4 max-w-2xl">
                  與同學們組隊參加全國航路規劃與船舶操作實務技能競賽，擔任路線計算與安全評估角色，最終獲得「特優獎」。
                </p>
              </div>
              
              {/* Edu 1 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute left-[-6px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-300 ring-4 ring-emerald-50"></div>
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-emerald-900 mb-2 md:mb-0">國立高雄科技大學<span className="text-base font-normal text-emerald-700/60 ml-3">航海科 學士</span></h3>
                  <span className="text-xs text-emerald-700/70 font-mono tracking-widest uppercase border border-emerald-100 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">2022 - EXPECTED 2026</span>
                </div>
              </div>

            </div>
          </section>

          {/* PHOTO GALLERY SECTION */}
          <section className="border-t border-emerald-200/50 pt-16">
            <h2 className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-emerald-600/60 mb-12 flex items-center gap-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Life & Moments
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {PHOTO_GALLERY.map((photo, idx) => (
                <div key={idx} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-emerald-100/50">
                  <img 
                    src={photo.url} 
                    alt={photo.caption} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Gradient Overlay & Caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end">
                    <span className="text-white font-medium tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {photo.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-emerald-700/50 mt-6 text-right uppercase tracking-widest">
              AI-generated Demo Photos
            </p>
          </section>

            </motion.div>
          )}

          {activeTab === 'portfolio' && (
            <motion.div
               key="portfolio"
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -20, opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="space-y-24"
            >
          {/* PROJECT / PORTFOLIO SECTION */}
          <section className="pt-4">
            <h2 className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-emerald-600/60 mb-12 flex items-center gap-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Select Works
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {PORTFOLIO_PROJECTS.map((project, idx) => {
                // @ts-ignore
                const isFullWidth = project.pdfUrl || project.title === '製作個人3D公仔' || (project.videoUrls && project.videoUrls.length > 0);
                return (
                <div key={idx} className={`group relative p-8 bg-white/70 backdrop-blur-sm border border-emerald-100 hover:border-emerald-300 rounded-2xl transition-all duration-300 overflow-hidden flex flex-col min-h-[300px] shadow-sm hover:shadow-lg ${isFullWidth ? 'lg:col-span-2' : ''}`}>
                  <h3 className="text-2xl font-bold mb-4 text-emerald-950 group-hover:text-emerald-600 transition-colors">{project.title}</h3>
                  <p className="text-emerald-800/70 font-normal leading-relaxed mb-8 flex-grow text-sm md:text-base">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-100/50 px-2.5 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.pdfUrl && (
                    <div className="mb-8 w-full overflow-hidden">
                      <PDFViewer url={project.pdfUrl} />
                    </div>
                  )}

                  {project.imageUrls && project.imageUrls.length > 0 && (
                    <div className={`mb-8 grid gap-6 ${project.imageUrls.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                      {project.imageUrls.map((imgUrl, imgIdx) => (
                        <div key={imgIdx} className={`rounded-xl overflow-hidden border border-emerald-100 shadow-sm bg-emerald-50/30 flex items-center justify-center ${project.title === '製作個人3D公仔' ? 'p-2' : ''}`}>
                          <img 
                            src={imgUrl} 
                            alt={`${project.title} - Image ${imgIdx + 1}`} 
                            className={`w-full h-auto hover:scale-105 transition-transform duration-500 ${project.title === '製作個人3D公仔' ? 'object-contain max-h-[600px] rounded-lg' : 'object-cover aspect-video'}`} 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/600x400/e6f4ea/047857?text=Image+Pending+Upload";
                            }} 
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* @ts-ignore - Ignore type error if videoUrls is missing from some objects */}
                  {project.videoUrls && project.videoUrls.length > 0 && (
                    <div className={`mb-8 grid gap-6 ${project.videoUrls.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                      {project.videoUrls.map((videoUrl, vIdx) => (
                        <div key={vIdx} className="rounded-xl overflow-hidden border border-emerald-100 shadow-sm bg-black flex items-center justify-center">
                          {videoUrl.includes('drive.google.com') ? (
                            <iframe 
                              src={videoUrl} 
                              className="w-full aspect-video border-0 max-h-[300px]" 
                              allow="autoplay; encrypted-media" 
                              allowFullScreen 
                            />
                          ) : (
                            <video 
                              src={videoUrl} 
                              controls 
                              className="w-full h-auto max-h-[300px] object-contain"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-6 mt-auto border-t border-emerald-100/50 pt-6">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-emerald-700/70 hover:text-emerald-600 transition-colors"
                      >
                        <Github size={16} /> GitHub <ArrowRight size={14} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-emerald-700/70 hover:text-emerald-600 transition-colors ml-auto"
                      >
                        <ExternalLink size={16} /> {project.title === '製作個人3D公仔' ? '查看 3D 模型' : 'Live Demo'}
                      </a>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          </section>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
               key="skills"
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -20, opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="space-y-24"
            >
          {/* SKILLS SECTION (Light Mode Restyle) */}
          <section className="pt-4">
            <h2 className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-emerald-600/60 mb-12 flex items-center gap-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Expertise & Skills
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SKILL_MAP.map((category, idx) => (
                <div key={idx} className="p-8 bg-white/70 backdrop-blur-sm border border-emerald-100 hover:border-emerald-200 rounded-2xl relative overflow-hidden group shadow-sm transition-shadow hover:shadow-md">
                  
                  <div className={`inline-block px-4 py-1.5 mb-8 rounded-full text-[11px] font-bold tracking-widest uppercase ${category.bgClass} ${category.accent}`}>
                    {category.domain}
                  </div>
                  
                  <div className="space-y-6">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx}>
                        <div className="flex justify-between items-end mb-2">
                          <span className="font-medium text-sm text-emerald-950">{skill.name}</span>
                          <span className="font-mono text-[10px] text-emerald-700/60 font-semibold">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-emerald-100/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.1 * sIdx, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className={`h-full rounded-full ${category.barColor}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CERTIFICATIONS SECTION */}
          <section className="border-t border-emerald-200/50 pt-16 mt-16">
            <h2 className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-emerald-600/60 mb-12 flex items-center gap-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Certifications & Licenses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-5 bg-white/70 backdrop-blur-sm border border-emerald-100 hover:border-emerald-300 rounded-xl flex flex-col justify-between shadow-sm transition-colors">
                  <div>
                    <h3 className="font-bold text-emerald-950 text-lg mb-1">{cert.name}</h3>
                    <p className="text-emerald-800/70 text-sm">{cert.issuer}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs font-mono text-emerald-600/80 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Issued {cert.issueDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
            </motion.div>
          )}
        </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
