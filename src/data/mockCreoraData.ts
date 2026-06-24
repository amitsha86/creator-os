// Creora mock data — isolated so it can be swapped for real API responses later.
// Replace each export with a call to the matching agent in src/lib/ai.ts when ready.

export type VideoIdea = {
  title: string;
  viralScore: number;
  why: string;
  hook: string;
  format: string;
  repurpose: string;
};

export const growth = {
  score: 82,
  trend: "Your channel is trending upward.",
  opportunity: "AI productivity videos",
};

export const nextBestIdea: VideoIdea = {
  title: "I Tried Building a Business With AI in 7 Days",
  viralScore: 91,
  why: "Personal-experiment AI content is getting 2.8x your average views with low saturation.",
  hook: "I replaced my entire content workflow with AI for 7 days.",
  format: "Long-form YouTube + 5 Shorts",
  repurpose: "5 Shorts, 3 LinkedIn posts, 1 newsletter",
};

export const viralOpportunities = [
  { topic: "AI tools for students", trend: 88, saturation: "Low", format: "Listicle + demo" },
  { topic: "Creator productivity stack", trend: 84, saturation: "Medium", format: "Personal experiment" },
  { topic: "Passive income experiments", trend: 79, saturation: "Medium", format: "Challenge / results" },
  { topic: "Personal finance mistakes", trend: 76, saturation: "High", format: "Story + lesson" },
];

export const competitorRadar = {
  outperforming: 3,
  pattern: "Challenge-style AI videos",
  response: "Create your own personal experiment video with a stronger beginner angle.",
};

export const growthCoach = [
  "Publish one AI tutorial this week",
  "Improve thumbnail contrast on your last 3 videos",
  "Repurpose your latest video into 4 Shorts",
  "Test titles with a stronger curiosity gap",
];

export const weeklyMetrics = [
  { label: "Views", value: "1.2M", delta: "+8%", spark: [10, 14, 12, 18, 22, 26, 30] },
  { label: "CTR", value: "7.4%", delta: "+0.6%", spark: [6, 6, 7, 7, 7, 7, 7] },
  { label: "Engagement", value: "12.1%", delta: "+1.4%", spark: [8, 9, 9, 10, 11, 11, 12] },
  { label: "Subscribers", value: "85.2K", delta: "+3.1%", spark: [70, 73, 76, 79, 81, 83, 85] },
];

// ---------- Free audit (deterministic sample result) ----------
export const auditResult = {
  score: 82,
  trend: "trending upward",
  working: [
    "Educational AI topics perform best",
    "Challenge-style content gets stronger engagement",
    "Titles with numbers outperform broad titles",
  ],
  notWorking: [
    "Thumbnails lack clear contrast",
    "Hooks are too slow in the first 10 seconds",
    "Repurposing is inconsistent",
  ],
  opportunities: [
    "AI productivity workflows",
    "Beginner-friendly AI tutorials",
    "Personal experiment videos",
    "Creator automation tools",
  ],
  ideas: [
    { title: "I Tried 7 AI Tools So You Don't Have To", viralScore: 91, why: "High demand, low saturation, trusted format.", hook: "I tested 7 AI tools so you can skip the bad ones.", format: "Long-form + 5 Shorts", repurpose: "Shorts, X thread, newsletter" },
    { title: "How I Automated My Content Workflow With AI", viralScore: 88, why: "Your audience responds to AI productivity content.", hook: "I replaced my whole workflow with AI for 7 days.", format: "Long-form tutorial", repurpose: "3 LinkedIn posts, blog" },
    { title: "The AI Stack Every Creator Needs in 2026", viralScore: 86, why: "Evergreen, searchable, sponsor-friendly.", hook: "These 6 tools run my entire channel.", format: "Listicle + demo", repurpose: "Shorts, IG carousel" },
    { title: "I Built a Business With Only AI for 30 Days", viralScore: 90, why: "Challenge format outperforms by 3.2x in your niche.", hook: "$0 to launch using only AI — 30 day challenge.", format: "Vlog series", repurpose: "Daily Shorts, newsletter" },
    { title: "Beginner AI Tutorial: Your First Automation", viralScore: 83, why: "Beginner intent is underserved in your niche.", hook: "If you've never automated anything, start here.", format: "Step-by-step tutorial", repurpose: "Shorts, blog" },
    { title: "5 AI Mistakes That Kill Your Content", viralScore: 81, why: "Mistake framing drives strong retention.", hook: "You're probably making mistake #3 right now.", format: "Listicle", repurpose: "X thread, Shorts" },
    { title: "I Let AI Plan My Content for a Week", viralScore: 85, why: "Experiment + relatable workflow pain point.", hook: "I gave AI full control of my calendar.", format: "Experiment", repurpose: "Shorts, LinkedIn" },
    { title: "Free AI Tools Better Than Paid Ones", viralScore: 84, why: "'Free' + comparison = high CTR.", hook: "Stop paying for these — the free versions win.", format: "Comparison", repurpose: "Shorts, carousel" },
    { title: "How Top Creators Use AI (Behind the Scenes)", viralScore: 82, why: "Curiosity + authority positioning.", hook: "Here's what big creators won't tell you about AI.", format: "Analysis", repurpose: "Newsletter, X" },
    { title: "Turn 1 Video Into 30 Pieces of Content", viralScore: 87, why: "Repurposing pain is universal and shareable.", hook: "One video. Thirty posts. Here's the system.", format: "Tutorial", repurpose: "Shorts, blog, newsletter" },
  ] as VideoIdea[],
  plan: [
    { week: "Week 1", focus: "AI tools comparison", note: "Hook-tested listicle + 3 Shorts" },
    { week: "Week 2", focus: "Personal experiment video", note: "7-day AI challenge vlog" },
    { week: "Week 3", focus: "Workflow tutorial", note: "Step-by-step automation guide" },
    { week: "Week 4", focus: "Case study / results", note: "What worked + repurpose pack" },
  ],
};

export const pricingPlans = [
  { name: "Free", price: "₹0", tagline: "Trying Creora", limit: "1 channel · 1 audit / month", features: ["1 channel audit / month", "3 content ideas", "Sample dashboard access", "Basic AI recommendations"], cta: "Start Free Audit", highlight: false },
  { name: "Starter", price: "₹999", per: "/mo", tagline: "Solo creators", limit: "10 audits / month", features: ["10 audits / month", "50 content ideas / month", "20 scripts / month", "Basic repurposing", "3 competitor channels", "Weekly growth suggestions"], cta: "Start Starter", highlight: false },
  { name: "Pro", price: "₹2,999", per: "/mo", tagline: "Serious creators", limit: "50 audits / month · advanced radar", features: ["50 audits / month", "Advanced competitor radar", "Unlimited ideas (fair use)", "Advanced scripts", "Repurposing engine", "Weekly growth reports", "Thumbnail & title suggestions", "Priority AI generation"], cta: "Start Pro", highlight: true },
  { name: "Team", price: "₹7,999", per: "/mo", tagline: "Creator teams & agencies", limit: "5 seats · client workspaces", features: ["5 seats", "Client workspaces", "Shared content pipeline", "Approval workflow", "Team content calendar", "Agency reports", "Priority support"], cta: "Start Team", highlight: false },
];

export const features = [
  { name: "Viral Intelligence", desc: "Find rising topics before your competitors." },
  { name: "AI Content Brain", desc: "Generate ideas, hooks, titles, outlines, and scripts." },
  { name: "Competitor Radar", desc: "Track what's working in your niche." },
  { name: "Script Studio", desc: "Turn ideas into structured, retention-friendly scripts." },
  { name: "Repurpose Engine", desc: "Turn one video into 20+ platform-ready assets." },
  { name: "AI Growth Coach", desc: "Weekly recommendations based on your performance." },
];

export const faqs = [
  { q: "What is Creora?", a: "Creora is an AI growth copilot that helps creators discover what to create next, then generate scripts, repurpose content, and improve performance." },
  { q: "Who is Creora for?", a: "YouTubers, short-form creators, podcasters, creator teams, and agencies." },
  { q: "Does Creora replace ChatGPT?", a: "Creora uses AI inside a creator-specific workflow. Unlike generic chat tools, it combines ideas, strategy, scripts, repurposing, and growth recommendations." },
  { q: "Do I need to connect my channel?", a: "You can start with a channel URL or sample data. Connecting your account gives better recommendations." },
  { q: "Will Creora post without permission?", a: "No. Creora never posts anything without explicit permission." },
];

// ---------- Full SAMPLE audit (public /sample-audit) ----------
export const sampleAudit = {
  creator: "AI productivity YouTube creator",
  niche: "AI tools, creator workflows, productivity automation",
  goal: "Grow YouTube views and repurpose content across Shorts, LinkedIn, and newsletters",
  score: 82,
  opportunity: "AI productivity tutorials and personal experiment videos.",
  summary: "Your channel performs best when content combines practical AI tools with personal testing or real workflows.",
  working: [
    "Educational AI content performs best",
    "Titles with numbers get higher curiosity",
    "Personal experiment formats create stronger hooks",
    "Beginner-friendly content has broader appeal",
  ],
  notWorking: [
    "Thumbnails need clearer contrast",
    "Hooks are too slow in the first 10 seconds",
    "Content is not being repurposed consistently",
    "Titles sometimes describe instead of creating curiosity",
  ],
  opportunities: [
    { topic: "AI workflow automation", trend: 88, saturation: "Medium", format: "Tutorial + personal workflow" },
    { topic: "AI tools for beginners", trend: 84, saturation: "Medium", format: "Listicle / tutorial" },
    { topic: "Creator productivity systems", trend: 79, saturation: "Low", format: "Behind-the-scenes workflow" },
    { topic: "Personal AI experiments", trend: 91, saturation: "Medium", format: "7-day challenge" },
  ],
  ideas: [
    { title: "I Used AI to Run My Content Workflow for 7 Days", viralScore: 91, why: "Challenge formats outperform average uploads in your niche.", hook: "I gave AI control of my content workflow for a week.", thumbnail: 'Face reaction + laptop dashboard + "AI Ran This"', repurpose: "5 Shorts from each experiment day" },
    { title: "7 AI Tools Every Creator Should Use in 2025", viralScore: 88, why: "Most creators underuse AI; '7 tools' is high-CTR.", hook: "Most creators use AI for writing. That's only 10% of what it can do.", thumbnail: 'Tool logos + creator face + "7 AI Tools"', repurpose: "Shorts per tool, IG carousel" },
    { title: "I Built a Full Content System Using Only AI", viralScore: 86, why: "Personal experiment + system framing builds trust.", hook: "I wanted to see if AI could replace my messy content workflow.", thumbnail: "Before/after workflow board", repurpose: "Newsletter, blog" },
    { title: "Stop Using ChatGPT Like This", viralScore: 84, why: "Mistake framing drives curiosity and retention.", hook: "If you're only asking ChatGPT for captions, you're missing the real power.", thumbnail: "Red cross over generic prompt + better workflow", repurpose: "X thread, Shorts" },
    { title: "My AI Creator Stack for Planning, Scripting, and Repurposing", viralScore: 83, why: "Evergreen, searchable, sponsor-friendly.", hook: "This is the exact AI stack I'd use if I started from zero.", thumbnail: 'Stack diagram + "Start Here"', repurpose: "Carousel, newsletter" },
    { title: "I Turned One Video Into 20 Pieces of Content With AI", viralScore: 89, why: "Repurposing pain is universal and shareable.", hook: "Most creators publish once and move on. I turned one idea into 20 assets.", thumbnail: "One video splitting into many posts", repurpose: "Shorts, LinkedIn, blog" },
    { title: "The 30-Minute AI Content Planning System", viralScore: 81, why: "Time-saving systems convert well.", hook: "This system plans an entire week of content in 30 minutes.", thumbnail: "Timer + content calendar", repurpose: "Shorts, newsletter" },
    { title: "I Let AI Pick My Next YouTube Video", viralScore: 87, why: "Curiosity + experiment format.", hook: "Instead of guessing my next idea, I let AI analyze the opportunity.", thumbnail: "AI robot choosing between video ideas", repurpose: "Shorts, X" },
    { title: "The AI Workflow That Saves Me 10 Hours Every Week", viralScore: 85, why: "Outcome-driven, relatable pain.", hook: "This workflow removed the most annoying parts of content creation.", thumbnail: "Clock + workflow board", repurpose: "LinkedIn, Shorts" },
    { title: "How I Would Grow a New YouTube Channel With AI", viralScore: 90, why: "Aspirational 'start from zero' is highly shareable.", hook: "If I had to start from zero today, here's exactly how I'd use AI.", thumbnail: "Zero to growth chart", repurpose: "Newsletter, thread, Shorts" },
  ] as Array<VideoIdea & { thumbnail: string }>,
  plan: [
    { week: "Week 1", focus: "AI tools comparison video", note: "Repurpose into 3 Shorts + 1 LinkedIn post" },
    { week: "Week 2", focus: "Personal AI experiment video", note: "Repurpose into daily Shorts" },
    { week: "Week 3", focus: "Workflow tutorial", note: "Turn into a newsletter + carousel" },
    { week: "Week 4", focus: "Results / case-study video", note: "Best clips → Shorts + community posts" },
  ],
  scriptPreview: {
    title: "I Used AI to Run My Content Workflow for 7 Days",
    hook: "I gave AI control of my entire content workflow for a week — from ideas to scripts to repurposing. Some parts saved hours. Some parts completely failed.",
    structure: [
      "Day 1: AI chooses video ideas",
      "Day 2: AI writes hooks and outlines",
      "Day 3: AI builds the script",
      "Day 4: AI creates repurposed posts",
      "Day 5: AI helps package thumbnail and title",
      "Day 6: Human review and fixes",
      "Day 7: Results and lessons",
    ],
  },
  repurpose: [
    { kind: "Short-form hook", text: "Most creators waste 80% of every video. Here's how I turned one into twenty posts…" },
    { kind: "LinkedIn post", text: "Creators don't need more tools. They need a system. Here's the AI workflow that runs my channel." },
    { kind: "X thread", text: "I let AI run my content for 7 days. Day 3 broke. Day 5 saved me 6 hours. A thread 🧵" },
    { kind: "Newsletter intro", text: "This week I handed my workflow to AI. The wins, the fails, and the exact stack — inside." },
    { kind: "Community post", text: "Would you let AI pick your next video? I did. Results dropping Friday." },
  ],
};

// ---------- Public DEMO dashboard (/demo) ----------
export const demoDashboard = {
  growth: { score: 82, trend: "Your channel is trending upward.", opportunity: "AI productivity videos." },
  nextIdea: {
    title: "I Used AI to Run My Content Workflow for 7 Days",
    viralScore: 91,
    effort: "Medium",
    format: "Long-form YouTube + 5 Shorts",
    why: "Competitor videos using challenge-style AI formats are outperforming average uploads.",
  },
  opportunities: [
    { topic: "AI workflow automation", trend: 88, saturation: "Medium" },
    { topic: "Creator productivity systems", trend: 79, saturation: "Low" },
    { topic: "AI tools for beginners", trend: 84, saturation: "Medium" },
    { topic: "Personal AI experiments", trend: 91, saturation: "Medium" },
  ],
  competitor: {
    outperforming: 3,
    pattern: "Challenge-style AI videos.",
    response: "Create your own personal experiment video with a stronger beginner-friendly angle.",
  },
  coach: [
    "Publish one AI tutorial",
    "Improve thumbnail contrast",
    "Repurpose your latest video into 4 Shorts",
    "Test titles with a stronger curiosity gap",
  ],
  pipeline: [
    { title: "AI tools comparison", stage: "Script ready" },
    { title: "AI workflow experiment", stage: "Editing" },
    { title: "ChatGPT mistakes", stage: "Thumbnail needed" },
    { title: "Creator stack video", stage: "Scheduled" },
  ],
  repurpose: ["5 Shorts", "3 LinkedIn posts", "5 X posts", "1 newsletter", "1 blog post", "1 community post"],
  metrics: [
    { label: "Views", value: "42.8K", spark: [12, 16, 14, 20, 24, 28, 33] },
    { label: "CTR", value: "6.4%", spark: [5, 6, 6, 6, 6, 7, 6] },
    { label: "Subscribers", value: "+812", spark: [40, 50, 55, 60, 66, 70, 81] },
    { label: "Content output", value: "12 assets", spark: [2, 4, 6, 7, 9, 11, 12] },
  ],
};
