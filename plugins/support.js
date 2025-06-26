/*------------------------------------------------------------------------------------------------------------------------------------------------------


Copyright (C) 2023 Loki - Xer.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
DML 


------------------------------------------------------------------------------------------------------------------------------------------------------*/

const { System, isPrivate } = require("../lib/");
const { getJson, getBuffer, sleep } = require('./client/');
    
System({
    pattern: "help",
    fromMe: isPrivate,
    desc: "dml-md support",
    type: "support"
}, async (message) => {
    const name = 'DML-MD 🎓', title = "DML 🪄", number = '255622220680', body = "DML-MD";
    const image = "https://files.catbox.moe/vcdwmp.jpg", sourceUrl = 'https://github.com/MLILA17/DML-MD';
    const logo = await getBuffer(image);
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG: powered by Dml-md;\nTEL;type=CELL;type=VOICE;waid=${number}:${number}\nEND:VCARD`;
    const adon = { title, body, thumbnail: logo, mediaType: 1, mediaUrl: sourceUrl, sourceUrl, showAdAttribution: true, renderLargerThumbnail: false };
    await message.send({ displayName: name, contacts: [{ vcard }] }, { contextInfo: { externalAdReply: adon }, quoted: message }, "contacts");
});

System({
    pattern: "allplugin",
    fromMe: isPrivate,
    desc: "To get all plugin of dml-md",
    type: "support"
}, async (message) => {
    const { result: allPluginsData } = await getJson(api + 'bot/plugin?query=allplugin');
    const { result: externalPluginsData } = await getJson(api + 'bot/plugin?query=pluginlist');
    const formatPluginData = (pluginData) => {
        return Object.entries(pluginData).map(([key, value]) => `*${key}:* ${value.url}`).join('\n\n');
    };
    await message.send(formatPluginData(externalPluginsData), { quoted: message, contextInfo: { externalAdReply: { title: "External plugins no need to edit", body: "Ready to use", thumbnail: { url: "https://files.catbox.moe/vcdwmp.jpg" }, mediaType: 1, mediaUrl: 'https://github.com/IRON-M4N/Jarvis-MD-Plugins/tree/main', sourceUrl: "https://github.com/MLILA17/DML-MD-Plugins/tree/main", showAdAttribution: true } } });
    await sleep(500);
    await message.send(formatPluginData(allPluginsData), { quoted: message, contextInfo: { externalAdReply: { title: "External plugins need to edit", body: "Ready to use", thumbnail: { url: "https://files.catbox.moe/vcdwmp.jpg" }, mediaType: 1, mediaUrl: 'https://github.com/IRON-M4N/Jarvis-MD-Plugins/tree/main', sourceUrl: "https://github.com/MLILA17/DML-MD-Plugins/tree/main", showAdAttribution: true } } });
});
