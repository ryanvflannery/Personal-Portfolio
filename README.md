# My Personal Portfolio

A clean, minimal portfolio website built with Next.js, Tailwind CSS, and Shadcn UI. Features an AI chatbot, email contact form, and blog.


## Live Demo

🌐 Check it out here: ****

![Portfolio Screenshot]()

## Features

- Minimal design with Shadcn UI
- Light/dark mode toggle
- AI chatbot (Ted Support) trained on my portfolio content - please be nice to him! 😊
- Contact form with email integration
- Responsive mobile design
- Blog section

## Tech Stack

- Next.js
- Tailwind CSS
- Shadcn UI
- OpenAI API (chatbot)
- Vercel (hosting)
- AstraDB (vector storage)
- Upstash (caching)
- Resend (email)

## Getting Started

```bash
git clone https://github.com/tedawf/tedawf.com ted-portfolio
cd ted-portfolio
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables

```env
OPENAI_API_KEY=your_key
ASTRA_DB_API_ENDPOINT=your_endpoint
ASTRA_DB_APPLICATION_TOKEN=your_token
UPSTASH_REDIS_REST_URL=your_url
UPSTASH_REDIS_REST_TOKEN=your_token
```

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy

## Costs

- Domain: ~$20/year
- Hosting/DB: Free tiers

## License

MIT

---

