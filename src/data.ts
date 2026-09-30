export type Language = 'en' | 'zh'
export type Localized = { en: string; zh: string }
export const t = (value: Localized, language: Language) => value[language]

export const profile = {
  name: 'Yixiang Zou',
  chineseName: '邹逸翔',
  email: 'Yixiangzou2012@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kelvin-zou-211yxz/',
  github: 'https://github.com/KYiz',
  resume: './docs/Yixiang_Zou_Resume.pdf',
  portfolio: './docs/Yixiang_Zou_AI_Agent_Product_Portfolio.pdf',
  location: { en: 'Auckland, New Zealand', zh: '新西兰 · 奥克兰' },
  headline: {
    en: 'Connecting AI models to products and real workflows.',
    zh: '把 AI 模型连接到产品与真实工作流。',
  },
  introduction: {
    en: 'AI engineering, agent systems, and product thinking. I build retrieval workflows, develop vision models, and translate complex service needs into agent architectures.',
    zh: '以 AI 工程为基础，连接 Agent 系统与产品设计。从企业检索工作流、视觉模型开发，到复杂服务场景的 Agent 架构，把技术能力转化为具体的解决方案。',
  },
}

export const skills = [
  { label: 'AI / Agent', title: { en: 'AI / Agent', zh: 'AI / Agent' }, items: ['RAG', 'Prompt design', 'Agent workflows', 'Human review', 'Evaluation'] },
  { label: 'Engineering', title: { en: 'Engineering', zh: '工程开发' }, items: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'REST APIs', 'Docker'] },
  { label: 'Data / ML', title: { en: 'Data / ML', zh: '数据与机器学习' }, items: ['pgvector', 'MongoDB', 'PyTorch', 'Computer vision', 'NLP'] },
  { label: 'Product', title: { en: 'Product', zh: '产品设计' }, items: ['Requirements', 'Workflow design', 'Acceptance criteria', 'Metrics', 'Prototyping'] },
]

export type Project = {
  slug: string
  index: string
  category: Localized
  title: Localized
  subtitle: Localized
  period: Localized
  role: Localized
  tags: string[]
  status: Localized
  overview: Localized
  challenge: Localized
  responsibility: Localized[]
  architecture: Localized[]
  process: Localized[]
  outcomes: Localized[]
  reflection: Localized
  note?: Localized
}

export const projects: Project[] = [
  {
    slug: 'allied-medical-rag', index: '01',
    category: { en: 'Enterprise AI · Internship', zh: '企业 AI · 实习' },
    title: { en: 'Multimodal RAG for Medical Parts', zh: '医疗零部件多模态 RAG 系统' },
    subtitle: { en: 'Connect fragmented product knowledge to the service team’s daily workflow.', zh: '连接分散的产品知识与客服日常工作流。' },
    period: { en: 'Mar – Jul 2026', zh: '2026.03 – 07' },
    role: { en: 'AI Engineering Intern · Allied Medical Limited', zh: 'AI 工程实习生 · Allied Medical Limited' },
    tags: ['Java', 'Spring AI', 'GPT-4o', 'pgvector', 'MongoDB', 'Front API'],
    status: { en: 'Internship delivery', zh: '实习项目交付' },
    overview: { en: 'Extended an existing Java / Spring Boot prototype into a connected service workflow. I worked across source ingestion, knowledge refresh, retrieval evidence, and Front integration, turning partial descriptions, images, manuals, and ERP records into actionable parts suggestions for staff.', zh: '在已有 Java / Spring Boot 原型上，推进从资料摄入、知识刷新、检索证据到 Front 集成的完整链路，将不完整描述、图片、手册和 ERP 记录整理为员工可直接审核的零件建议。' },
    challenge: { en: 'More than 50,000 stock records, technical diagrams, and mixed file formats made finding the right replacement part difficult. The engineering challenge was to keep this knowledge current and return useful evidence inside the existing service tools.', zh: '50,000 多条库存记录、技术图纸与多种格式资料，让替换零件定位变得复杂。工程重点是保持知识及时更新，并在现有客服工具中返回可用的候选与依据。' },
    responsibility: [
      { en: 'Developed and maintained source keyed ingestion and refresh for ERP exports, spreadsheets, PDFs, manuals, diagrams, and reference images.', zh: '开发并维护 ERP、表格、PDF、手册、图纸及图片的资料摄入、来源标识与刷新流程。' },
      { en: 'Refined parts suggestions, supporting evidence, and follow up questions for staff review.', zh: '优化候选零件、支撑证据与补充追问的输出，服务员工审核与后续沟通。' },
      { en: 'Connected tagged Front conversations to asynchronous analysis and editable internal comments.', zh: '将 Front 标签触发的会话接入异步分析，并生成可编辑的内部评论。' },
    ],
    architecture: [
      { en: 'Source files → chunking and GPT-4o image descriptions → embeddings and pgvector retrieval.', zh: '源文件 → 文本分块与 GPT-4o 图像描述 → 嵌入与 pgvector 检索。' },
      { en: 'Spring Boot / Spring AI orchestrated retrieval and analysis; MongoDB held supporting workflow data.', zh: 'Spring Boot / Spring AI 编排检索和分析，MongoDB 支持工作流数据。' },
      { en: 'Front API posted suggestions as internal comments for human editing.', zh: 'Front API 将建议发布为内部评论，供员工编辑。' },
    ],
    process: [
      { en: 'Tracked source identity so updated files could replace stale embeddings.', zh: '追踪文件来源，让更新后的文件替换旧向量。' },
      { en: 'Connected Front webhooks to an HTTP 202 acknowledgement and background analysis, with internal-comment delivery and a conversation-ID recovery path.', zh: '将 Front Webhook 接入 HTTP 202 快速确认与后台分析，支持内部评论输出及基于会话 ID 的恢复路径。' },
    ],
    outcomes: [
      { en: 'Connected source refresh, multimodal retrieval, and Front internal comments into the service workflow.', zh: '打通资料刷新、多模态检索与 Front 内部评论的客服工作链路。' },
      { en: 'Gave staff editable parts suggestions with evidence and next questions, preserving their control of the customer conversation.', zh: '为员工提供可编辑的零件建议、依据与后续追问，并将客户沟通决策留在审核环节。' },
    ],
    reflection: { en: 'An enterprise AI workflow succeeds when knowledge freshness, useful evidence, and delivery into existing tools work together. Treating staff review as part of the architecture made the output fit the service process.', zh: '企业 AI 的价值来自知识时效、有效证据与现有工具集成的共同作用。把员工审核作为架构的一部分，才能让模型输出真正进入服务流程。' },
    note: { en: 'Public case study omits customer messages, ERP records, credentials, and internal configuration.', zh: '公开案例不展示客户消息、ERP 数据、密钥或内部配置。' },
  },
  {
    slug: 'caretrip-ops', index: '02',
    category: { en: 'Agent product · Service design', zh: 'Agent 产品 · 服务设计' },
    title: { en: 'CareTrip Ops', zh: 'CareTrip Ops 旅伴办' },
    subtitle: { en: 'Design a coordinated agent service from a travel request to verified ticketing.', zh: '从一句出游需求，到可核验的服务闭环。' },
    period: { en: '2026 · GOAI Agent Infra preliminary round', zh: '2026 · GOAI Agent Infra 初赛' },
    role: { en: 'Agent product and system design', zh: 'Agent 产品与系统方案设计' },
    tags: ['AgentTeams', 'Skills', 'MCP contracts', 'HITL', 'Product design'],
    status: { en: 'Agent product / solution design', zh: 'Agent 产品与解决方案设计' },
    overview: { en: 'CareTrip Ops designs an agent assisted service for travel agencies and OTAs. It translates phone and WeChat requests into explicit constraints, comparable options, traveller confirmation, payment handoff, and ticket verification, with coordinated roles across the full journey.', zh: 'CareTrip Ops 面向旅行社与 OTA 设计 Agent 协同服务，将电话和微信中的出游需求转为明确约束、方案比较、本人确认、支付交接与出票核验，贯通银发出行的服务链路。' },
    challenge: { en: 'A travel request involves the traveller, family members, service staff, and external suppliers. The product challenge was to coordinate these roles while keeping preferences, permissions, transaction status, and service evidence consistent.', zh: '一条出游需求涉及老人、家属、客服与外部供应商。产品重点是协调多方角色，让偏好、权限、交易状态与服务证据保持一致。' },
    responsibility: [
      { en: 'Designed the product journey from request intake and clarification to option comparison, transaction checks, and after sales handling.', zh: '拆解用户旅程，设计从需求受理、澄清、方案比较到交易核验与售后处理的产品流程。' },
      { en: 'Specified agent identities, Skill contracts, state transitions, exception branches, and acceptance criteria with the team.', zh: '与团队制定 Agent Identity、Skill 契约、状态流转、异常分支和验收条件。' },
      { en: 'Designed confirmation, staff handoff, and evidence review around payment and other sensitive decisions.', zh: '围绕支付等关键决策，设计本人确认、人工接管与证据审核机制。' },
    ],
    architecture: [
      { en: '1 Manager + 5 Workers coordinate the service journey, with independent evidence review and recommendation conflict arbitration.', zh: '1 个 Manager + 5 个 Workers 协调服务旅程，并设置独立证据核验与推荐冲突仲裁。' },
      { en: 'The architecture specifies 27 layered Skills (8 general, 5 scenario, 14 integration) and 4 planned MCP service types. A companion inventory details 16 core Skills.', zh: '架构规划 27 项分层 Skills（8 通用、5 场景、14 集成）与 4 类 MCP 服务；配套清单细化 16 项核心 Skills。' },
      { en: 'MCP / Adapter contracts connect proposed external systems; deterministic services handle pricing, permissions, and payment checks.', zh: 'MCP / Adapter 契约规划外部系统连接；价格、权限和支付核验交由确定性服务。' },
    ],
    process: [
      { en: 'Mapped an older traveller’s voice request into missing fields, hard constraints, and preferences.', zh: '将银发用户的语音需求拆解为缺失字段、硬约束和偏好。' },
      { en: 'Designed evidence grades, fallback paths, checkpoints, idempotency, and a staff review path.', zh: '设计证据分级、降级路径、检查点、幂等和人工审核。' },
      { en: 'Planned mock data, demo scenarios, and target metrics to make the design testable.', zh: '规划模拟数据、Demo 场景与目标指标，让产品方案具备明确的验证路径。' },
    ],
    outcomes: [
      { en: 'Produced the preliminary product proposal, agent architecture, Skill contracts, state machine, and acceptance criteria.', zh: '形成初赛产品方案、Agent 架构、Skill 契约、状态机与验收标准。' },
      { en: 'Defined a complete service loop and evaluation plan covering normal requests, exceptions, and staff intervention.', zh: '完成覆盖常规需求、异常分支与人工介入的服务闭环及评估规划。' },
    ],
    reflection: { en: 'Agent product design requires precise responsibilities, recoverable states, and testable contracts. These choices turn a broad service idea into a concrete architecture and a practical implementation plan.', zh: 'Agent 产品设计需要明确职责、可恢复状态与可验证契约。这些设计把宽泛的服务构想转为具体架构与可执行的开发规划。' },
  },
  {
    slug: 'uav-advisory-agent', index: '03',
    category: { en: 'LLM application · Internship', zh: '大模型应用 · 实习' },
    title: { en: 'UAV Export Advisory Agent', zh: '无人机出口管制咨询 Agent' },
    subtitle: { en: 'Turn regulatory documents into a structured, five stage advisory workflow.', zh: '将复杂法规材料转为结构化五阶段咨询流程。' },
    period: { en: 'Mar – Jul 2025', zh: '2025.03 – 07' },
    role: { en: 'LLM application and agent design · New Zealand Customs', zh: '大模型应用与智能体设计 · 新西兰海关' },
    tags: ['IBM watsonx', 'RAG', 'LangGraph', 'ReAct', 'NZSGL', 'Prompt Lab'],
    status: { en: 'Internship project · advisory agent PoC', zh: '实习项目 · 咨询 Agent PoC' },
    overview: { en: 'For a New Zealand Customs advisory scenario, I developed a UAV export-controls Agent in IBM watsonx. The work connected regulatory knowledge, LangGraph / ReAct reasoning, five-stage decisions, and human review into a structured consultation workflow.', zh: '面向新西兰海关无人机出口管制咨询场景，在 IBM watsonx 环境中开发 Agent，将法规知识库、LangGraph / ReAct 推理、五阶段判断与人工复核连接成结构化咨询工作流。' },
    challenge: { en: 'Threshold values, incomplete descriptions, and dual use scenarios require more than a plausible answer. The agent needed to explain its grounds consistently across classification, controls, exemptions, and final advice.', zh: '阈值判断、不完整描述与军民两用场景需要清晰的推理过程。Agent 必须在清单分类、管制、豁免与最终建议之间保持依据和结论的一致性。' },
    responsibility: [
      { en: 'Organised NZSGL rules, UAV terminology, and public regulatory material into a retrieval-ready knowledge base.', zh: '整理 NZSGL 规则、UAV 术语与公开法规资料，构建可检索的知识库。' },
      { en: 'Designed the five-stage Agent workflow with state transitions, conditional branches, structured outputs, and human review.', zh: '设计五阶段 Agent 工作流，串联状态流转、条件分支、结构化输出与人工复核。' },
      { en: 'Used zero- and few-shot prompting to test more than 15 ambiguous, threshold, and dual-use scenarios.', zh: '运用零样本与少样本提示，测试 15 个以上模糊、临界及军民两用边界场景。' },
    ],
    architecture: [
      { en: 'Natural language case → IBM watsonx / LangGraph + ReAct → RAG retrieval from NZSGL and UAV terminology → staged reasoning → human review.', zh: '自然语言案例 → IBM watsonx / LangGraph + ReAct → NZSGL 与 UAV 术语 RAG 检索 → 分阶段推理 → 人工复核。' },
      { en: 'The five stages cover listing, initial conclusion, catch all control, exemption, and final conclusion.', zh: '五阶段包括清单判断、初步结论、兜底管制、豁免和最终结论。' },
    ],
    process: [
      { en: 'Built a 15+ case evaluation set covering ambiguous, borderline, and dual-use export-control questions.', zh: '构建 15 个以上案例的评测集，覆盖模糊、临界和军民两用出口管制问题。' },
      { en: 'Compared candidate model behaviour and selected LLaMA-3-70B-Instruct for the structured advisory output.', zh: '比较候选模型表现，选择 LLaMA-3-70B-Instruct 生成结构化咨询输出。' },
    ],
    outcomes: [
      { en: 'Built a five-stage advisory Agent PoC with regulatory retrieval, state-based branching, and auditable structured output.', zh: '形成五阶段咨询 Agent PoC，涵盖法规检索、基于状态的条件分支与可复核的结构化输出。' },
      { en: 'Established output rules and a 15+ edge-case evaluation set for consistent regulatory explanations.', zh: '形成输出规则与 15 个以上边界案例的评测集，支撑一致的法规解释。' },
    ],
    reflection: { en: 'Good prompts define the path from retrieved material to conclusions. Separating listing, controls, exemptions, and final advice makes inconsistencies easier to detect and gives reviewers a clear point of intervention.', zh: '好的提示工程要定义从检索材料到结论的路径。分离清单、管制、豁免与最终建议，便于定位推理不一致，也为人工审核提供明确入口。' },
    note: { en: 'Public case study uses sandbox scenarios and public regulatory material; application and partner data are excluded.', zh: '公开案例使用沙箱场景与公开法规材料，不展示申请或合作方内部数据。' },
  },
  {
    slug: 'meet-ta', index: '04',
    category: { en: 'Multimodal AI · Team prototype', zh: '多模态 AI · 团队原型' },
    title: { en: 'Meet-ta', zh: 'Meet-ta 情绪感知对话系统' },
    subtitle: { en: 'Give conversational AI a visual emotion signal and a multimodal interaction loop.', zh: '让对话 AI 感知视觉情绪，连接多模态交互。' },
    period: { en: 'Mar – Jul 2026', zh: '2026.03 – 07' },
    role: { en: 'Vision model development and multimodal integration', zh: '视觉模型开发与多模态集成' },
    tags: ['YOLOv8n-face', 'ConvNeXtV2', 'FastAPI', 'FasterWhisper', 'SQLite'],
    status: { en: 'Working team prototype', zh: '团队可运行原型' },
    overview: { en: 'Meet-ta combines webcam, text, and voice with LLM responses and session memory for companionship and communication practice. I developed the visual emotion pipeline, from data and model selection to training, evaluation, and integration with the team’s browser prototype.', zh: 'Meet-ta 将摄像头、文本、语音与 LLM 回复及会话记忆结合，服务陪伴与沟通练习场景。我推进视觉情绪链路，从数据处理、模型选型到训练评估，再与团队浏览器原型集成。' },
    challenge: { en: 'An offline emotion model is only useful in this product when its inference, timing, and confidence can be integrated into the interaction loop.', zh: '离线情绪模型只有与交互链路中的推理、时间信息和置信度结合，才能对产品有用。' },
    responsibility: [
      { en: 'Researched emotion categories, cleaned data, compared detection and classification models, and evaluated vision results.', zh: '研究情绪类别、清洗数据、比较检测与分类模型，并评估视觉结果。' },
      { en: 'Trained and assessed the selected ConvNeXtV2 model using curves and a confusion matrix.', zh: '训练并通过曲线和混淆矩阵评估选定的 ConvNeXtV2 模型。' },
      { en: 'Integrated vision outputs with teammates’ voice, frontend, and avatar modules.', zh: '与队友的语音、前端和虚拟角色模块协作，完成视觉结果的系统集成。' },
    ],
    architecture: [
      { en: 'Webcam → YOLOv8n face detection → ConvNeXtV2 emotion classification.', zh: '摄像头 → YOLOv8n 人脸检测 → ConvNeXtV2 情绪分类。' },
      { en: 'Text / voice transcript + emotion timeline + persona and SQLite memory → FastAPI orchestration → LLM response.', zh: '文本 / 语音转写 + 情绪时间线 + 角色设定与 SQLite 记忆 → FastAPI 编排 → LLM 回复。' },
    ],
    process: [
      { en: 'Compared five visual classifiers, using validation curves and confusion matrices to select ConvNeXtV2-Huge.', zh: '比较五种视觉分类模型，通过验证曲线和混淆矩阵选定 ConvNeXtV2-Huge。' },
      { en: 'Connected the selected model to a turn level, late fusion conversation flow.', zh: '将选定模型接入按对话轮次进行后期融合的交互链路。' },
    ],
    outcomes: [
      { en: 'The selected model achieved 75.69% validation accuracy and 75.34% test accuracy.', zh: '选定模型取得 75.69% 验证准确率与 75.34% 测试准确率。' },
      { en: 'A browser based multimodal interaction prototype was completed by the team.', zh: '团队完成浏览器端多模态交互原型。' },
    ],
    reflection: { en: 'A vision model adds product value when its outputs fit the interaction loop. Turn level fusion connects emotion timing and confidence to conversation context while leaving room for text and voice signals.', zh: '视觉模型的产品价值来自与交互链路的衔接。按轮次融合，让情绪的时间与置信度进入对话上下文，同时结合文本和语音信号。' },
  },
  {
    slug: 'discourse-research', index: '05',
    category: { en: 'NLP · Experimental research', zh: 'NLP · 实验研究' },
    title: { en: 'Implicit Discourse Relation Research', zh: '隐式篇章关系分类研究' },
    subtitle: { en: 'Test how positional and structural signals affect discourse classification.', zh: '用受控实验检验位置与结构信号的分类价值。' },
    period: { en: 'Jun – Nov 2025', zh: '2025.06 – 11' },
    role: { en: 'Data processing, model tuning, and experiments', zh: '数据处理、模型调参与实验执行' },
    tags: ['TED-MDB', 'MiniLM', 'PyTorch', 'spaCy', 'Ablation'],
    status: { en: 'Completed research project', zh: '已完成研究项目' },
    overview: { en: 'The project tested whether positional and structural cues improve explicit versus implicit discourse relation classification with a fixed MiniLM backbone.', zh: '项目在固定 MiniLM 骨干上，检验位置与结构提示能否改进显式与隐式篇章关系分类。' },
    challenge: { en: 'With limited annotated data, the challenge was to separate cue effects from training variation. Reproducible splits, a fixed backbone, and multi seed experiments made the comparison meaningful.', zh: '在有限标注数据上，需要区分提示效果与训练波动。通过可复现划分、固定模型骨干与多随机种子实验，让模型比较具备解释力。' },
    responsibility: [
      { en: 'Processed TED-MDB annotations and extracted Arg1 / Arg2 span pairs.', zh: '处理 TED-MDB 标注并提取 Arg1 / Arg2 片段对。' },
      { en: 'Ran model tuning and 8 cue configurations across 5 random seeds, with metric and loss visualization.', zh: '执行模型调参、8 组提示配置 × 5 个随机种子实验，并可视化指标与损失。' },
      { en: 'Analyzed metrics and training curves, created visualizations, and contributed to the research report, working with a collaborator who led cue and experiment design.', zh: '负责指标分析、训练曲线与可视化，并参与研究报告写作；与主导提示及实验设计的合作者协作。' },
    ],
    architecture: [
      { en: 'TED-MDB annotations → data cleaning and span extraction → structural cue prefixing → all-MiniLM-L6-v2 fine tuning → evaluation.', zh: 'TED-MDB 标注 → 清洗与片段提取 → 结构提示前缀 → all-MiniLM-L6-v2 微调 → 评估。' },
      { en: 'Cues represent length ratio, dependency depth ratio, and argument distance.', zh: '提示分别表示长度比、依存深度比和论元距离。' },
    ],
    process: [
      { en: 'Kept the model backbone and training protocol fixed to isolate cue effects.', zh: '固定模型骨干和训练协议，隔离提示的影响。' },
      { en: 'Compared accuracy, F1, precision, recall, variance, and loss behavior across runs.', zh: '比较多次运行的准确率、F1、精确率、召回率、方差和损失行为。' },
    ],
    outcomes: [
      { en: 'No cue baseline: 0.7256 ± 0.0176 accuracy; 0.6608 ± 0.0219 F1.', zh: '无提示基准：准确率 0.7256 ± 0.0176；F1 为 0.6608 ± 0.0219。' },
      { en: 'Across 40 experimental runs, the tested cues did not consistently improve the baseline, identifying the limits of this cue injection approach.', zh: '通过 40 次实验发现，当前提示未稳定改善基准，明确了该提示注入方式的适用限制。' },
    ],
    reflection: { en: 'Repeated experiments revealed where extra structure did and did not help. This supports more focused next experiments on corpus scale and alternative cue injection, rather than choosing a model from a single run.', zh: '重复实验揭示了额外结构信号的实际作用，帮助下一轮研究聚焦语料规模与提示注入方式，也形成了基于多次比较进行模型判断的工作方法。' },
  },
]

const projectExperience = [
  { projectSlug: 'allied-medical-rag', title: { en: 'AI Engineering Intern', zh: 'AI 工程实习生' }, place: 'Allied Medical Limited', description: { en: 'Connected multimodal RAG, source refresh, and Front API integration to the service team’s workflow.', zh: '推进多模态 RAG、知识刷新与 Front API 集成，连接企业客服工作流。' } },
  { projectSlug: 'meet-ta', title: { en: 'Vision AI & multimodal integration', zh: '视觉 AI 与多模态集成' }, place: 'University of Auckland', description: { en: 'Developed and evaluated the visual emotion pipeline, then integrated it into Meet-ta’s conversational prototype.', zh: '开发与评估视觉情绪链路，接入 Meet-ta 多模态对话原型。' } },
  { projectSlug: 'discourse-research', title: { en: 'NLP research & model experiments', zh: 'NLP 研究与模型实验' }, place: 'University of Auckland', description: { en: 'Built the TED-MDB data pipeline and ran 40 MiniLM experiments with metrics and visual analysis.', zh: '完成 TED-MDB 数据处理与 40 次 MiniLM 实验，进行指标分析与可视化。' } },
  { projectSlug: 'uav-advisory-agent', title: { en: 'LLM application & agent design', zh: '大模型应用与智能体设计' }, place: 'New Zealand Customs', description: { en: 'Built a five-stage UAV export-controls advisory Agent and evaluated 15+ boundary scenarios.', zh: '开发五阶段无人机出口管制咨询 Agent，并用 15 个以上边界场景进行评测。' } },
  { projectSlug: 'caretrip-ops', title: { en: 'CareTrip Ops · Agent product design', zh: 'CareTrip Ops · Agent 产品设计' }, place: 'GOAI Agent Infra', description: { en: 'Designed the service journey, Manager / Worker architecture, Skill contracts, and acceptance plan for older travellers.', zh: '面向银发出行，设计服务旅程、Manager / Worker 架构、Skill 契约与验收规划。' } },
].map(item => ({ ...item, kind: 'project' as const, period: projects.find(project => project.slug === item.projectSlug)!.period }))

export const experience = [
  ...projectExperience,
  {
    kind: 'volunteer' as const,
    period: { en: '2026 · 10 hours', zh: '2026 · 志愿服务 10 小时' },
    title: {
      en: 'Mobile Support Team Volunteer – Traffic & Security Support',
      zh: '流动支援组志愿者 · 交通与安保支援',
    },
    place: 'Auckland Moon Festival',
    description: {
      en: 'Supported traffic management, road condition monitoring and event security; helped coordinate pedestrian and vehicle flow, adapt to changing on-site conditions, and assist other volunteer teams as needed.',
      zh: '参与现场交通管理、道路状况巡查和活动安保；协助疏导行人与车辆、维护会场周边通行秩序，并根据现场变化支援其他志愿者团队。',
    },
    certificate: './docs/Auckland_Moon_Festival_2026_Volunteer_Certificate.pdf',
  },
]

export const education = [
  { degree: { en: 'Master of Artificial Intelligence · First Class Honours', zh: '人工智能硕士 · 一等荣誉' }, school: 'University of Auckland', period: '2025.03 – 2026.09' },
  { degree: { en: 'BSc Statistics / BCom Finance', zh: '统计学理学学士 / 金融商学学士' }, school: 'University of Auckland', period: '2019.03 – 2024.09' },
]

export const awards = [
  { title: { en: 'Weekly Champion', zh: '周冠军' }, event: 'IKCEST 2025 Global Competition · AI Model Development', kind: { en: 'Competition award', zh: '竞赛奖项' } },
  { title: { en: 'Top 4 Nationwide', zh: '新西兰全国前四' }, event: 'NZ eVouch Growth Marketing Case Competition', kind: { en: 'Competition result', zh: '竞赛成绩' } },
]

export const categories = [
  { slug: 'role', name: { en: 'The person', zh: '角色' }, subtitle: { en: 'Mindset, story & experience', zh: '背景、工作方式与经历' }, image: './visuals/role.webp', link: '#/about', projectSlugs: [] },
  { slug: 'product', name: { en: 'Product', zh: '产品' }, subtitle: { en: 'From a need to a workflow', zh: '从需求到可执行工作流' }, image: './visuals/product.webp', link: '#/categories/product', projectSlugs: ['caretrip-ops', 'meet-ta'] },
  { slug: 'development', name: { en: 'Development', zh: '开发' }, subtitle: { en: 'Engineering useful applications', zh: 'AI 应用与工程集成' }, image: './visuals/development.webp', link: '#/categories/development', projectSlugs: ['allied-medical-rag', 'meet-ta'] },
  { slug: 'agent', name: { en: 'Agents', zh: 'Agent' }, subtitle: { en: 'Reason, retrieve & collaborate', zh: '检索、推理与协同' }, image: './visuals/agent.webp', link: '#/categories/agent', projectSlugs: ['uav-advisory-agent', 'caretrip-ops'] },
  { slug: 'algorithm', name: { en: 'Algorithms', zh: '算法' }, subtitle: { en: 'Train, compare & understand', zh: '训练、比较与模型理解' }, image: './visuals/algorithm.webp', link: '#/categories/algorithm', projectSlugs: ['discourse-research', 'meet-ta'] },
]

export const strengths = [
  { title: { en: 'Connect the engineering chain', zh: '打通 AI 工程链路' }, description: { en: 'From knowledge refresh and retrieval to APIs and service tools.', zh: '贯通知识刷新、检索、API 与业务工具集成。' }, link: '#/projects/allied-medical-rag', category: 'development' },
  { title: { en: 'Turn needs into architecture', zh: '把需求转化为系统设计' }, description: { en: 'Service journeys, agent responsibilities, and testable contracts.', zh: '从服务旅程出发，定义 Agent 职责与可验证契约。' }, link: '#/projects/caretrip-ops', category: 'product' },
  { title: { en: 'Structure agent reasoning', zh: '设计结构化 Agent 推理' }, description: { en: 'Connect retrieval, prompts, and scenario tests into a consistent flow.', zh: '连接检索、提示与场景测试，形成一致的推理流程。' }, link: '#/projects/uav-advisory-agent', category: 'agent' },
  { title: { en: 'Understand models through experiments', zh: '通过实验理解模型' }, description: { en: 'Controlled comparisons, multiple seeds, and visual analysis.', zh: '用受控比较、多随机种子与可视化定位模型表现。' }, link: '#/projects/discourse-research', category: 'algorithm' },
  { title: { en: 'Build across disciplines', zh: '推动跨模块协作' }, description: { en: 'Bring vision models into a shared multimodal product.', zh: '衔接视觉模型与交互模块，共同完成多模态产品。' }, link: '#/projects/meet-ta', category: 'role' },
]

export const projectVisuals: Record<string, string> = {
  'allied-medical-rag': './visuals/development.webp',
  'caretrip-ops': './visuals/product.webp',
  'uav-advisory-agent': './visuals/agent.webp',
  'meet-ta': './visuals/role.webp',
  'discourse-research': './visuals/algorithm.webp',
}

export const portfolioDocument = {
  pages: 16,
  year: 2026,
  previewPath: './docs/portfolio-pages',
}

export const careerRoles = [
  { en: 'AI Agent developer', zh: 'AI Agent 开发工程师' },
  { en: 'Applied AI engineer', zh: 'AI 应用工程师' },
  { en: 'AI product management', zh: 'AI 产品经理' },
]

export const homeHighlights = [
  { value: String(projects.length), label: { en: 'Core case studies', zh: '核心案例' } },
  { value: '8 × 5', label: { en: 'NLP settings × seeds', zh: 'NLP 配置 × 随机种子' } },
  { value: String(careerRoles.length), label: { en: 'Career directions', zh: '求职方向' } },
]

export const workingStyle = [
  { title: { en: 'Curious, then methodical', zh: '带着问题动手验证' }, description: { en: 'I break questions into experiments, compare multiple runs, and use metrics and visualizations to understand what changes.', zh: '习惯把问题拆成可执行实验，通过多次比较、指标与可视化理解变化，而后形成判断。' }, link: '#/projects/discourse-research' },
  { title: { en: 'Own a module, connect the team', zh: '把自己的模块做深，把接口接好' }, description: { en: 'In Meet-ta, I worked through the vision pipeline and collaborated on how its outputs fit voice, interface, and conversation modules.', zh: '在 Meet-ta 中深入完成视觉链路，也关注输出如何与语音、界面和对话模块衔接。' }, link: '#/projects/meet-ta' },
  { title: { en: 'Think through the next step', zh: '不仅想流程，也想异常与下一步' }, description: { en: 'I plan how a service recovers, who takes over, and how a design is accepted, as reflected in CareTrip Ops.', zh: '设计服务时会继续追问：失败后如何恢复、由谁接管、用什么标准验收，并把这些写进方案。' }, link: '#/projects/caretrip-ops' },
]
