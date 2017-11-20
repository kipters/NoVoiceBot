const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

const key = process.env.BOT_KEY || 'BOT_KEY_HERE';
const botId = +process.env.BOT_ID || 0; // BOT ID HERE (it's the part before the colon in the bot key)
const maxVoice = process.env.MAX_VOICE || 10;
const maxVideo = process.env.MAX_VIDEO || 10;
const banTime = process.env.BAN_TIME || 1;
const infoMsg = process.env.INFO_MSG || 'Make me admin so I can ban whoever uses voice or video messages';
const privMsg = process.env.PRIV_MSG || 'This bot only works in groups. You can find the source code [here](https://github.com/kipters/NoVoiceBot).\n\n_Pull requests are welcome._';

function timeDelta(delta) {
    const ts = Date.now() + delta * 1000;
    const floored = Math.floor(ts / 1000);
    return floored;
}

app.post(`/bot/${key}`, function(req, res) {
    const update = req.body;

    if (update.message === undefined) {
        return res.sendStatus(200);
    }

    const msg = update.message;
    const chatId = msg.chat.id;

    if (msg.chat.type === 'private') {
        const data = {
            chat_id: chatId,
            text: privMsg,
            parse_mode: 'markdown',
            method: 'sendMessage'
        };
        return res.send(data);
    }

    if (msg.group_chat_created) {
        const data = {
            chat_id: chatId,
            text: infoMsg,
            disable_notification: true,
            method: 'sendMessage'
        };
        return res.send(data);
    }

    if (msg.new_chat_members !== undefined && msg.new_chat_members.length > 0) {
        const filtered = msg.new_chat_members.filter(m => m.id === botId);
        if (filtered.length === 0) {
            return res.sendStatus(200);
        } else {
            const data = {
                chat_id: chatId,
                text: infoMsg,
                disable_notification: true,
                method: 'sendMessage'
            };
            return res.send(data);
        }
    }

    if (maxVoice !== -1 && msg.voice !== undefined && msg.voice.duration > maxVoice) {
        const data = {
            chat_id: chatId,
            user_id: msg.from.id,
            until_date: timeDelta(banTime),
            method: 'kickChatMember'
        };
        return res.send(data);
    }

    if (maxVideo !== -1 && msg.video_note !== undefined && msg.video_note.duration > maxVideo) {
        const data = {
            chat_id: chatId,
            user_id: msg.from.id,
            until_date: timeDelta(banTime),
            method: 'kickChatMember'
        };
        return res.send(data);
    }

    return res.sendStatus(200);
});

app.get('/', function(req, res) {
    res.sendStatus(404);
});

app.listen(app.get('port'), function() {
    console.log(`Node app is running at localhost:${app.get('port')}`)
});
