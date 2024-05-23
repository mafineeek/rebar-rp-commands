import { useRebar } from '@Server/index.js';
import alt from 'alt-server';
import * as Utility from '@Shared/utility/index.js';
import { useCharacter } from '@Server/document/index.js';

const rebar = useRebar();
const messenger = rebar.messenger.useMessenger();

const CHAT_DISTANCE = 10;
const CHAT_DISTANCES = {
    normal: CHAT_DISTANCE,
    low: CHAT_DISTANCE * 0.5,
    shout: CHAT_DISTANCE * 1.5,
    megaphone: CHAT_DISTANCE * 2
};

const sendMessageToNearbyPlayers = (player, message, distance = CHAT_DISTANCE) => {
    alt.Player.all.forEach(target => {
        if (target.valid && Utility.vector.distance2d(player.pos, target.pos) <= distance) {
            messenger.message.send(target, { type: 'player', content: message, author: player.name });
        }
    });
};

export const fixName = name => name.replace('_', ' ');

const registerCommand = (name, desc, messageFormatter, distanceType = 'normal') => {
    messenger.commands.register({
        name,
        desc,
        callback: (player, ...args) => {
            if (args.length < 1) return;
            const message = args.join(' ');
            const character = useCharacter(player).get();
            sendMessageToNearbyPlayers(player, messageFormatter(fixName(character.name), message), CHAT_DISTANCES[distanceType]);
        }
    });
};

registerCommand('me', 'Describe action made by character', (name, message) => `{c2a2da}* ${name} ${message}`);
registerCommand('do', 'Describe background', (name, message) => `{8b8ee1}** ${message} ((${name}))`);
registerCommand('low', 'Say something using low voice', (name, message) => `{e0e0e0}${name} says (low): ${message}`, 'low');
registerCommand('shout', 'Say something using high voice', (name, message) => `{e0e0e0}${name} says (shout): ${message}`, 'shout');
registerCommand('megaphone', 'Say something louder using megaphone', (name, message) => `{e8ea1b}${name} says on megaphone: ${message}`, 'megaphone');
registerCommand('looc', 'Say something using local ooc', (name, message) => `{616161}(( ${name}: ${message} ))`);
