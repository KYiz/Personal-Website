import type { Language } from './data'

export const copy = {
  downloadPortfolio: ['Download portfolio', '下载作品集'],
  downloadResume: ['Download résumé', '下载简历'],
  nav: { home: ['Home', '首页'], about: ['About', '关于'], projects: ['Projects', '项目'], experience: ['Experience', '经历'], awards: ['Awards', '奖项'], portfolio: ['Portfolio', '作品集'], contact: ['Contact', '联系'] },
  selectedWork: ['Selected work', '精选项目'],
  workIntro: ['Five projects connecting AI engineering, agent systems, product design, and model research.', '五个项目，连接 AI 工程、Agent 系统、产品设计与模型研究。'],
  viewCase: ['View case study', '查看项目详情'],
  capabilities: ['Skills that connect the system', '连接系统的核心能力'],
  aboutTitle: ['Engineer the system. Shape the product.', '懂工程实现，也懂产品如何运转。'],
  aboutText: ['With a background in AI, statistics, and finance, I connect model development with service workflows. My work spans enterprise RAG integration, multimodal prototypes, agent product architecture, and controlled NLP experiments.', '拥有人工智能、统计与金融背景，我关注模型如何进入真实服务流程。实践覆盖企业 RAG 集成、多模态原型、Agent 产品架构与 NLP 受控实验，连接技术实现与业务理解。'],
  education: ['Education', '教育背景'],
  experience: ['Experience & collaboration', '经历与合作'],
  awards: ['Awards & recognition', '奖项与认可'],
  awardsNote: ['Recognition across AI model development and growth strategy.', '在 AI 模型开发与增长策略竞赛中获得认可。'],
  portfolioTitle: ['The complete portfolio', '完整作品集'],
  contactTitle: ["Let's turn AI into something people use.", '一起把 AI 做成可用的产品。'],
  contactText: ['Open to AI Agent developer, applied AI engineer, and AI product roles. Let’s talk about your team’s next challenge.', '关注 AI Agent 开发工程师、AI 应用工程师与 AI 产品经理机会，期待参与团队的下一个挑战。'],
  back: ['Back to projects', '返回项目列表'],
  overview: ['The project', '项目概览'], challenge: ['The challenge', '核心挑战'], responsibility: ['My contribution', '我的贡献'], architecture: ['System architecture', '系统架构'], process: ['How I worked', '推进过程'], outcomes: ['What we delivered', '成果与交付'], reflection: ['What I learned', '技术复盘'],
  nextProject: ['Next project', '下一个项目'],
  footer: ['AI engineering · Agent systems · Product thinking', 'AI 工程 · Agent 系统 · 产品思考'],
  portraitAlt: ['Portrait of Yixiang Zou', '邹逸翔的肖像照片'],
  missing: ['Page not found', '页面不存在'],
} as const

export function tr(value: readonly [string, string], lang: Language) { return value[lang === 'en' ? 0 : 1] }
