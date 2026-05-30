import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { projectName, topic, channel } = await req.json()

  const mockResponses: Record<string, string> = {
    x: `Just shipped something cool for ${projectName} 🚀\n\n${topic ? `After working on ${topic}, I realized something: most tools in this space are overcomplicated. So I built it simpler.\n\nHere's what I learned:\n\n1/ Start with the problem, not the tech. People don't care about your stack. They care about what it does for them.\n\n2/ Ship fast, iterate faster. The first version will be ugly. That's fine. Ugly and useful beats pretty and useless.\n\n3/ Talk to users early. Like, before you finish building. The feedback will save you weeks.` : `Building ${projectName} has been a journey. Here are 3 things I wish I knew when I started:\n\n1/ Your first idea is probably wrong. Don't fall in love with it. Fall in love with the problem.\n\n2/ 80% of success is just showing up consistently. Not genius. Not luck. Just consistency.\n\n3/ Ship. Ship. Ship. Perfect is the enemy of done.`}\n\nWhat are you building? Drop it below 👇`,
    linkedin: `I've been heads-down building ${projectName} for the past few months, and I want to share something that changed my perspective.\n\n${topic ? `The work on ${topic} taught me that the best solutions come from scratching your own itch. I built this because I needed it. And that authenticity resonates with users in a way that market research never can.` : `Building in public has been the single best decision I've made. Not for the attention — but for the accountability. When you tell people what you're building, you have to ship. And shipping is everything.`}\n\nHere's what I've learned:\n\n• Build for yourself first. If you don't need it, you won't understand your users.\n• Talk to your users every single day. Not surveys. Actual conversations.\n• Don't optimize for things that don't matter yet. Scale later.\n\nI'm sharing the full journey at ${projectName}. Would love to connect with other founders building cool stuff.`,

    telegram: `🚀 ${projectName} update: ${topic || 'Shipping progress'}\n\nBeen working on this and it's coming together nicely. The vision is simple: make something that people actually want to use.\n\nMore soon. Stay tuned. 💪`,

    blog: `## Why I Built ${projectName}\n\nEvery developer knows the feeling: you spend hours searching for a tool that does one specific thing, and nothing fits. So you build it yourself.\n\nThat's exactly how ${projectName} was born.\n\n### The Problem\n\n${topic || `Existing solutions were either too complex, too expensive, or didn't solve the right problem. I needed something that just worked.`}\n\n### The Solution\n\nSo I built it. Simple, focused, and designed for people who actually need it.\n\n### What's Next\n\nThis is just the beginning. I'm sharing the journey openly, and I'd love for you to follow along.`,

    reddit: `**Title:** Built ${projectName} because nothing else worked for me\n\n**Body:**\n\nBeen working on ${projectName} for a while now. ${topic ? `The ${topic} feature was the missing piece that made me realize I needed to build this.` : `The idea started as a scratch-my-own-itch project, but the more I worked on it, the more I realized others might find it useful too.`}\n\nIt's a no-code visual trading strategy builder that lets you backtest and deploy without writing Pine Script or Python.\n\nBuilt it because I was tired of fighting with APIs when I just wanted to test a strategy.\n\nCheck it out: [https://edgekeeper.app](https://edgekeeper.app)\n\nHappy to answer any questions!`,

    video: `[SCENE: You at your desk, natural lighting]\n\n"So I built this tool because I was frustrated with [PROBLEM]. \n\n[Cut to screen recording of the product]\n\nHere's the thing — most tools in this space are overengineered. They assume you need complexity. \n\nBut really, you just need something that works.\n\n[Show key feature in action]\n\nThat's why I built ${projectName}. It does one thing well: [CORE VALUE PROP].\n\n[Closing shot: You talking to camera]\n\nIf you're working on something similar, I'd love to connect. Link in bio."\n\n[END]`,
  }

  const content = mockResponses[channel] || mockResponses.x

  return NextResponse.json({ content })
}
