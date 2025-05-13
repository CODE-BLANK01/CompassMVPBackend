const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const slackEvents = async (req, res) => {
  const signature = req.headers["x-slack-signature"];
  const timestamp = req.headers["x-slack-request-timestamp"];
  const body = JSON.stringify(req.body);
  const hmac = crypto.createHmac("sha256", process.env.SLACK_SIGNING_SECRET);
  const [version, hash] = signature.split("=");
  const baseString = `${version}:${timestamp}:${body}`;
  const computedHash = hmac.update(baseString).digest("hex");

  if (hash !== computedHash) return res.status(403).send("Invalid signature");

  const { type, event, challenge } = req.body;

  if (type === "url_verification") return res.send(challenge);

  if (type === "event_callback" && event.type === "message" && !event.subtype) {
    await prisma.message.upsert({
      where: { ts: event.ts },
      update: {},
      create: {
        ts: event.ts,
        user: event.user,
        channel: event.channel,
        text: event.text,
      },
    });
  }

  res.send("ok");
};

module.exports = slackEvents;
