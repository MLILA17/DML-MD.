const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = Date.now();
         // Stylish Emojis
        const reactionEmojis = ['⚡', '🚀', '🔥', '💨', '🌟'];
        const statusEmojis = ['✅', '🟢', '✨', '📶', '🔋'];
        
        // Array of dynamic, fancy text messages
        const fancyTexts = [
            "“✨Stay foolish to stay sane.✨”",
            "“🟢The only way to do great work is to love what you do.🎀”",
            "“❤️Simplicity is the ultimate sophistication.💞”",
            "“🤔Your time is limited, so don’t waste it living someone else’s life.🥹”",
            "“✅Innovation distinguishes between a leader and a follower📊.”",
            "“📆Strive for greatness.🟢”"
        ];
        const randomFancyText = fancyTexts[Math.floor(Math.random() * fancyTexts.length)];

        // Initial "checking" message
        await conn.sendMessage(from, {
            text: '*〘⏳ Checking bot speed... 〙*'
        });

        const end = Date.now();
        const speed = end - start;

        // Determine the bot's status based on speed
        let status = "Stable";
        if (speed > 1000) status = "Faster🚀";
        else if (speed > 500) status = "Moderate";

        // Fetch the user's profile picture
        let profilePicUrl;
        try {
            profilePicUrl = await conn.profilePictureUrl(sender, 'image');
        } catch {
            // Provide a default fallback image if the user has no profile picture
            profilePicUrl = 'https://files.catbox.moe/v5we38.jpg';
        }
        
        // Construct the stylish caption text
        const stylishText = `
╭─❏ *『 DML-MD BOT PING STATUS 』*
│
├─🤖 *Bot Name:* ${config.botname || 'DML-MD'}
├─⚡ *Speed:* ${statusEmojis[Math.floor(Math.random() * statusEmojis.length)]} ${speed}ms
├─📶 *Status:* ${statusEmojis[Math.floor(Math.random() * statusEmojis.length)]} ${status}
├─⏱️ *Checked At:* ${new Date().toLocaleTimeString()}
│
╰─❏ *${randomFancyText}!*
        `.trim();

        // Send the profile picture with the caption
        await conn.sendMessage(from, {
            image: { url: profilePicUrl },
            caption: stylishText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363387497418815@newsletter',
                    newsletterName: "DML-MD",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
