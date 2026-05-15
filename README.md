# BEM Connect

BEM Fasilkom UI 2026 | Open Recruitment Assignment for Biro Bisnis dan Kemitraan (bismit)

## Project Structure

```
bem-connect/
├── server/              # Express.js backend (API)
│   ├── server.js        # Entry point
│   ├── app.js           # Express app setup
│   ├── config/          # Database & app config
│   ├── controllers/     # Request handlers
│   ├── middlewares/      # Custom middleware
│   ├── models/          # Model helpers
│   ├── routes/          # API route definitions
│   └── services/        # Business logic
├── src/                 # Next.js frontend
│   ├── app/             # App Router pages
│   └── lib/             # Shared utilities (API helper, etc.)
├── prisma/              # Prisma schema & migrations
├── public/              # Static assets (images, icons)
├── .env                 # Environment variables
├── package.json         # Single unified package.json
└── next.config.mjs      # Next.js configuration
```

