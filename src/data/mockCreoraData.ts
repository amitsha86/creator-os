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
  { name: "Free", price: "₹0", tagline: "Try your first audit", features: ["Basic channel audit", "3 content ideas", "Limited AI recommendations"], cta: "Get Free Audit", highlight: false },
  { name: "Starter", price: "₹999", per: "/mo", tagline: "Solo creators", features: ["Weekly ideas", "Script generation", "Basic repurposing"], cta: "Start Starter", highlight: false },
  { name: "Pro", price: "₹2,999", per: "/mo", tagline: "Serious creators", features: ["Competitor radar", "Advanced scripts", "Repurposing engine", "Growth reports"], cta: "Go Pro", highlight: true },
  { name: "Team", price: "₹7,999", per: "/mo", tagline: "Teams & agencies", features: ["Shared workspace", "Approvals", "Team content pipeline", "Priority support"], cta: "Talk to us", highlight: false },
];

export const features = [
  { name: "Viral Intelligence", desc: "Find rising topics before your competitors." },
  { name: "AI Content Brain", desc: "Generate ideas, hooks, titles, outlines, and scripts." },
  { name: "Competitor Radar", desc: "Track what's working in your niche." },
  { name: "Script Studio", desc: "Turn ideas into structured, retention-friendly scripts." },
  { name: "Repurpose Engine", desc: "Turn one video into Shorts, posts, blogs, and newsletters." },
  { name: "AI Growth Coach", desc: "Weekly recommendations based on your performance." },
];

export const faqs = [
  { q: "What is Creora?", a: "Creora is an AI growth copilot that helps creators discover what to create next, then generate scripts, repurpose content, and improve performance." },
  { q: "Who is Creora for?", a: "YouTubers, short-form creators, podcasters, creator teams, and agencies." },
  { q: "Does Creora replace ChatGPT?", a: "Creora uses AI inside a creator-specific workflow. Unlike generic chat tools, it combines ideas, strategy, scripts, repurposing, and growth recommendations." },
  { q: "Do I need to connect my channel?", a: "You can start with a channel URL or sample data. Connecting your account gives better recommendations." },
  { q: "Will Creora post without permission?", a: "No. Creora never posts anything without explicit permission." },
];
