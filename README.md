# 🤖 CompassMVP Backend – Slack Message Ingestion Engine

This is the Phase 1 backend of **Jarvis Assistant**, an internal Slack-powered assistant. It captures messages from your Slack workspace and stores them in a PostgreSQL database for future use in AI-powered Q\&A, summarization, and knowledge retrieval.

---

## 🚀 Features

* Listens for Slack events (public channels and DMs)
* Verifies event authenticity using Slack's signing secret
* Stores messages in PostgreSQL via Prisma ORM
* Built using Node.js + Express.js
* Prisma + Supabase PostgreSQL integration
* Ready for Phase 2 (LLM-powered responses & vector search)

---

## 🧱 Tech Stack

* **Node.js + Express.js** – Web server
* **Slack Events API** – Message ingestion
* **Prisma** – Type-safe DB ORM
* **PostgreSQL (Supabase)** – Message storage
* **ngrok** – Local webhook tunneling (for dev)

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/jarvis-backend.git
cd jarvis-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

```env
SLACK_SIGNING_SECRET=your-slack-signing-secret
SLACK_BOT_TOKEN=xoxb-your-bot-token
DATABASE_URL=postgresql://postgres:yourpassword@yourhost.supabase.co:5432/postgres
```

### 4. Set Up PostgreSQL (Supabase)

* Create a Supabase project
* Get the database connection string from **Settings → Database**
* Paste into `DATABASE_URL`

### 5. Set Up Prisma Schema

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 6. Start the Server

```bash
node index.js
```

---

## 🌐 Expose Locally (for Slack Event Subscriptions)

Use `ngrok` to expose your local server:

```bash
ngrok http 3000
```

Copy the generated HTTPS URL.

---

## 🔧 Configure Your Slack App

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps)
2. Select your app
3. Go to **Event Subscriptions**

   * Enable Events
   * Request URL: `https://your-ngrok-url.ngrok.io/slack/events`
4. Subscribe to the following bot events:

   * `message.channels`
   * `message.im`
5. Ensure the following scopes are added under **OAuth & Permissions**:

   * `channels:history`
   * `im:history`
   * `chat:write`
   * `users:read`

---

## ✅ Test the Bot

1. Invite the bot to a channel:

   ```
   /invite @Jarvis Assistant
   ```
2. Send a message in the channel (e.g., “Hello Jarvis!”)
3. Check the stored messages using:

   ```bash
   npx prisma studio
   ```

---

## 📁 Folder Structure

```
jarvis-backend/
├── index.js              # Express app entry point
├── slackEvents.js        # Slack event handler
├── db.js                 # Prisma DB client
├── prisma/
│   └── schema.prisma     # DB schema
├── .env                  # Environment variables
└── package.json
```

---

## 🛠 Future Roadmap

* [ ] Phase 2: Threaded replies and message summarization
* [ ] Phase 3: Vector DB (e.g., Qdrant) + RAG-based knowledge engine
* [ ] Slack slash commands for internal tools
* [ ] OAuth 2.0 support for external workspace installations

---

## 🤝 Contributing

Feel free to fork this repo and send PRs. Bug reports and feature suggestions are welcome via [issues](https://github.com/your-username/jarvis-backend/issues).

---

## 📜 License

MIT
