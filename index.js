const { Client, GatewayIntentBits, Partials } = require("discord.js");

const joinCmd = require("./commands/join");
const leaveCmd = require("./commands/leave");
const setCmd = require("./commands/set");
const startCmd = require("./commands/start");
const resetCmd = require("./commands/reset");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Channel]
});

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
    if (msg.author.bot) return;

    const [cmd, ...args] = msg.content.trim().split(/\s+/);

    switch (cmd) {

        case "!join":
            return joinCmd(msg);

        case "!leave":
            return leaveCmd(msg);

        case "!set":
            return setCmd(msg, args);

        case "!start":
            return startCmd(msg);

        case "!reset":
            return resetCmd(msg);
    }
});

client.login(process.env.TOKEN);