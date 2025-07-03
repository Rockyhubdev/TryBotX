// Load environment variables from .env (no suppression)
require('dotenv').config();
const { Client } = require('fnbr');
const fetch = require('node-fetch');

const OWNER_USERNAME = process.env.OWNER_USERNAME;
const DEFAULTS = {
  skin: 'CID_452_Athena_Commando_F_CyberFu',
  backpack: 'BID_270_StreetDemon',
  pickaxe: 'HalloweenScythe',
  glider: 'Umbrella_Season_09',
  emote: 'EID_TakeTheL',
  level: 9999
};

const client = new Client({
  auth: {
    deviceAuth: {
      accountId: process.env.DEVICE_AUTH_ACCOUNT_ID,
      deviceId: process.env.DEVICE_AUTH_DEVICE_ID,
      secret: process.env.DEVICE_AUTH_SECRET,
    }
  }
});

let lastMessageTime = Date.now();
const MOTIVATIONAL_INTERVAL = 10 * 60 * 1000; // 10 minutos

let isDancingEnabled = true;
let danceInterval = null;
const DANCE_REPEAT_TIME = 20000; // 20 segundos entre bailes




async function startContinuousDancing() {
  if (danceInterval) {
    clearInterval(danceInterval);
  }
  if (!isDancingEnabled) return;
  console.log(`🕺 Starting continuous dance with emote: ${DEFAULTS.emote}`);
  danceInterval = setInterval(async () => {
    try {
      if (client.party && client.party.me && isDancingEnabled) {
        await client.party.me.setEmote(DEFAULTS.emote);
        console.log(`💃 Dancing: ${DEFAULTS.emote}`);
      }
    } catch (error) {
      handleError(error, 'Error while dancing');
    }
  }, DANCE_REPEAT_TIME);

}

function stopContinuousDancing() {
  if (danceInterval) {
    clearInterval(danceInterval);
    danceInterval = null;
    console.log('🛑 Dance stopped');
  }
}

async function restoreDefaults(party) {
  try {
    console.log('🔄 Restoring default configuration...');
    if (!party || !party.me) {
      handleError(new Error('No party or party.me'), 'Error restoring defaults');
      return;
    }
    await party.me.setLevel(DEFAULTS.level);
    try { await party.me.setOutfit(DEFAULTS.skin); } catch (e) { handleError(e, 'Error setting skin'); }
    try { await party.me.setBackpack(DEFAULTS.backpack); } catch (e) { handleError(e, 'Error setting backpack'); }
    try { await party.me.setPickaxe(DEFAULTS.pickaxe); } catch (e) { handleError(e, 'Error setting pickaxe'); }
    try { await party.me.setBanner(DEFAULTS.banner); } catch (e) { handleError(e, 'Error setting banner'); }
    // The following features are not supported by fnbr.js and will be skipped:
    // setContrail, setMusic, setLoadingScreen, setWrap, setSpray, setVehicle
    // Only supported: setOutfit, setBackpack, setPickaxe, setBanner, setPet, setEmoji, setEmote, setLevel
    try { await party.me.setPet(DEFAULTS.pet); } catch (e) { handleError(e, 'Error setting pet'); }
    try { await party.me.setEmoji(DEFAULTS.emoji); } catch (e) { handleError(e, 'Error setting emoji'); }
    try { await party.me.setEmote(DEFAULTS.emote); } catch (e) { handleError(e, 'Error setting emote'); }
    setTimeout(() => { startContinuousDancing(); }, 3000);
  } catch (generalError) {
    handleError(generalError, 'General error restoring defaults');
  }
}


// Improved error handler for user notification and logging
function handleError(error, context, msg) {
  const contactMsg = '\n⚠️ Please contact Rocky (remplasoopcional@gmail.com) about this error so it can be fixed!';
  const logMsg = `❌ [ERROR] ${context ? context + ': ' : ''}${error && error.message ? error.message : error}`;
  console.error(logMsg);
  if (error && error.stack) console.error('Stack:', error.stack);
  const emojiMsg = `🚨 Oops! An error occurred.\n${logMsg}${contactMsg}`;
  if (msg && typeof msg.reply === 'function') {
    msg.reply(emojiMsg).catch(e => console.error('Error sending error notification:', e));
  }
}



client.on('friend:request', async (friendRequest) => {
  try {
    await friendRequest.accept();
    console.log(`🤝 Friend request accepted from: ${friendRequest.displayName}`);
  } catch (error) {
    handleError(error, friendRequest);
  }
});

client.on('party:invite', async (invite) => {
  try {
    await invite.accept();
    console.log(`🎉 Party invite accepted from: ${invite.sender.displayName}`);
  } catch (error) {
    handleError(error, invite.sender);
  }
});

client.on('party:member:joined', async (member) => {
  try {
    console.log(`👤 ${member.displayName} joined the party`);
    if (client.party && client.party.me && client.party.me.isLeader) {
      console.log('👑 I am leader, restoring defaults...');
      await restoreDefaults(client.party);
    } else {
      if (!client.party) console.warn('⚠️ No party available in party:member:joined');
      if (!client.party?.me) console.warn('⚠️ No party.me available in party:member:joined');
    }
  } catch (error) {
    handleError(error, member);
  }
});

client.on('party:updated', async (party) => {
console.log('🔔 Party updated');
  
});

client.on('friend:message', async (msg) => {
  try {
    console.log(`✉️ Private message from ${msg.author.displayName}: "${msg.content}"`);
    
    if (msg.author.displayName !== OWNER_USERNAME) {
      console.log(`🚫 Message ignored (not from owner: ${OWNER_USERNAME})`);
      return;
    }
    
    lastMessageTime = Date.now();
    const content = msg.content.trim();
    const party = msg.client.party;
    const me = party && party.me;
    
    console.log(`⚙️ Processing command: "${content}"`);
    
    if (!me) {
      console.log('⚠️ No party or party.me');
      await msg.reply('I am not in a party or cannot change appearance now.');
      return;
    }

    // PROCESAR COMANDOS
    if (content.startsWith('/skin ')) {
      const skin = content.replace('/skin ', '').trim();
      console.log(`🎨 Changing skin to: ${skin}`);
      try {
        await me.setOutfit(skin);
        await msg.reply(`Skin changed to ${skin}.`);
        console.log('✅ Skin changed successfully');
      } catch (error) {
        handleError(error, msg);
        await msg.reply(`Error changing skin: ${error.message}`);
      }
      
    } else if (content.startsWith('/backpack ')) {
      const backpack = content.replace('/backpack ', '').trim();
      console.log(`🎒 Changing backpack to: ${backpack}`);
      try {
        await me.setBackpack(backpack);
        await msg.reply(`Backpack changed to ${backpack}.`);
        console.log('✅ Backpack changed successfully');
      } catch (error) {
        handleError(error, msg);
        await msg.reply(`Error changing backpack: ${error.message}`);
      }
      
    } else if (content.startsWith('/pickaxe ')) {
      const pickaxe = content.replace('/pickaxe ', '').trim();
      console.log(`⛏️ Changing pickaxe to: ${pickaxe}`);
      try {
        await me.setPickaxe(pickaxe);
        await msg.reply(`Pickaxe changed to ${pickaxe}.`);
        console.log('✅ Pickaxe changed successfully');
      } catch (error) {
        handleError(error, msg);
        await msg.reply(`Error changing pickaxe: ${error.message}`);
      }
      
    } else if (content.startsWith('/glider ')) {
      console.log('🪂 Glider command not supported');
      await msg.reply('Sorry, I cannot change the glider in this version.');
      
    } else if (content.startsWith('/emote ')) {
      const emote = content.replace('/emote ', '').trim();
      console.log(`😄 Doing temporary emote: ${emote}`);
      // Desactivar baile automático temporalmente
      const prevDancing = isDancingEnabled;
      isDancingEnabled = false;
      stopContinuousDancing();
      try {
        await me.setEmote(emote);
        await msg.reply(`Emote performed: ${emote} (continuous dance will resume after)`);
        console.log('✅ Emote performed successfully');
        // Esperar duración típica de un emote (6s) y reanudar baile automático si estaba activo
        setTimeout(() => {
          if (prevDancing) {
            isDancingEnabled = true;
            startContinuousDancing();
            console.log('🕺 Continuous dance resumed after temporary emote');
          }
        }, 6000);
      } catch (error) {
        handleError(error, msg);
        await msg.reply(`Error with emote: ${error.message}`);
        // Si falla, reanudar baile automático si estaba activo
        if (prevDancing) {
          isDancingEnabled = true;
          startContinuousDancing();
        }
      }
      
    } else if (content.startsWith('/level ')) {
      const lvl = parseInt(content.replace('/level ', '').trim());
      console.log(`🏆 Changing level to: ${lvl}`);
      if (!isNaN(lvl)) {
        try {
          await me.setLevel(lvl);
          await msg.reply(`Level changed to ${lvl}`);
          console.log('✅ Level changed successfully');
        } catch (error) {
          handleError(error, msg);
          await msg.reply(`Error changing level: ${error.message}`);
        }
      } else {
        await msg.reply('Invalid level. Use a number.');
      }
      
    } else if (content === '/sync') {
      await msg.reply('The /sync command has been disabled.');
      
    } else if (content === '/dance') {
      console.log('💃 Dance command received');
      if (isDancingEnabled) {
        isDancingEnabled = false;
        stopContinuousDancing();
        await msg.reply('Continuous dance DISABLED');
        console.log('🛑 Dance disabled');
      } else {
        isDancingEnabled = true;
        startContinuousDancing();
        await msg.reply('Continuous dance ENABLED');
        console.log('🟢 Dance enabled');
      }
      
    } else if (content === '/help') {
      console.log('📜 Sending command list');
      const helpMessage = `AVAILABLE COMMANDS:
/skin name → Change skin
/backpack name → Change backpack
/pickaxe name → Change pickaxe
/glider name → Change glider
/emote name → Perform emote
/level number → Change level
/dance → Enable/disable continuous dance
/default → Restore default configuration`;
      
      await msg.reply(helpMessage);
      console.log('✅ Command list sent');
      
    } else if (content === '/default') {
      console.log('🔄 Default command received');
      await msg.reply('Restoring default configuration...');
      await restoreDefaults(party);
      await msg.reply('Default configuration restored!');
      console.log('✅ Configuration restored');
      
    } else {
      await msg.reply('Unrecognized command. Use /help to see available commands.');
      console.log('❓ Unrecognized command received');
    }
    
  } catch (err) {
    handleError(err, msg);
    try {
      await msg.reply('An error occurred while processing your command.');
    } catch (replyError) {
      handleError(replyError, msg);
    }
  }
});

client.on('party:message', async (msg) => {
  try {
    console.log(`💬 Party chat message: ${msg.author.displayName}: "${msg.content}"`);
    // Procesar comandos del owner desde el chat también
    if (msg.author.displayName === OWNER_USERNAME && msg.content.startsWith('/')) {
      console.log(`🛠️ Owner command in chat: "${msg.content}"`);
    }
  } catch (err) {
    handleError(err, msg);
  }
});

client.on('ready', async () => {
  console.log(`✅ Bot connected successfully!`);
  console.log(`👤 User: ${client.user.self._displayName}`);
  console.log(`👑 Owner: ${OWNER_USERNAME}`);
  console.log(`💃 Favorite dance: BOOGIE DOWN`);
  
  // Esperar antes de configurar
  setTimeout(async () => {
    console.log('⏳ Applying initial configuration in 5 seconds...');
    if (client.party && client.party.me) {
      try {
        await restoreDefaults(client.party);
      } catch (error) {
        handleError(error, client.party.me);
      }
    } else {
      console.warn('⚠️ Party not ready, retrying...');
      setTimeout(async () => {
        if (client.party && client.party.me) {
          try {
            await restoreDefaults(client.party);
          } catch (error) {
            handleError(error, client.party.me);
          }
        }
      }, 5000);
    }
  }, 5000);

  // Aceptar solicitudes pendientes
  if (client.friends && client.friends.requests) {
    for (const req of client.friends.requests.values()) {
      try {
        await req.accept();
        console.log(`🤝 Pending friend request accepted: ${req.displayName}`);
      } catch (error) {
        handleError(error, req);
      }
    }
  }
});

client.on('error', (err) => {
  handleError(err, null);
});

process.on('SIGINT', () => {
console.log('🛑 Shutting down bot...');
  stopContinuousDancing();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down bot...');
  stopContinuousDancing();
  process.exit(0);
});


console.log('==============================');
console.log('🤖 TryBotX for Fortnite');
console.log('©️ 2025 Rockyhubdev');
console.log('🌐 https://github.com/Rockyhubdev/TryBotX');
console.log('==============================');
console.log('🚀 Starting Fortnite bot...');
client.login();
