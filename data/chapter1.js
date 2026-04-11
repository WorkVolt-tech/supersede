// data/chapter1.js — Chapter 1 story content
// To add a node: add an entry to NODES. That's it.
// To add a chapter: create data/chapter2.js, copy this structure.

export const META = {
  number: 1,
  title:  'System Initialization',
  sub:    'The world stops. The game begins.',
  unlocksChapter: 2,
}

export const NODES = {

  opening: {
    id: 'opening', type: 'story',
    text: `Everything freezes.

Cars stop mid-motion. People halt mid-step. Even the wind disappears — as though the world has been pressed pause.

Then a voice. Calm. Everywhere at once.

"Welcome to SuperSede."

A glowing interface materializes before your eyes — transparent, electric, impossibly clear.`,
    sysMsg: 'Players are now active. A player may appear at any time.',
    choices: [
      { id: 'go_search', label: 'Search your surroundings',     sub: 'Check nearby cars and bodies for supplies', next: 'search' },
      { id: 'go_street', label: 'Move forward into the street', sub: 'See what is happening beyond',             next: 'street' },
      { id: 'go_system', label: 'Inspect the System interface',  sub: 'Study your stats and nearby signals',      next: 'system' },
    ],
  },

  search: {
    id: 'search', type: 'story',
    text: `You move between frozen cars. A coffee cup hangs in mid-drip. A coin spins in the air, suspended.

Everything feels paused — yet alive. You rummage quickly through bags and glove compartments.`,
    rewards: [{ itemKey:'scrap_blade', qty:1 }, { itemKey:'flashlight', qty:1 }],
    xp: 15,
    sysMsg: '⚠ A player is nearby…',
    choices: [
      { id: 'to_encounter', label: 'Continue', sub: 'A nervous figure approaches', next: 'encounter' },
    ],
  },

  encounter: {
    id: 'encounter', type: 'story',
    text: `A figure stumbles out from between two frozen cars. Eyes wide. Hands empty.

They spot you. They freeze — not like the world around you, but from fear.`,
    choices: [
      { id: 'enc_team',    label: 'Team up',  sub: 'Gain a temporary ally — shared XP',           next: 'mid_event', outcome: 'team'    },
      { id: 'enc_attack',  label: 'Attack',   sub: 'Easy win. Gain loot. Reputation shifts red.',  next: 'mid_event', outcome: 'attack', variant: 'danger' },
      { id: 'enc_observe', label: 'Observe',  sub: 'Watch their behavior — gain Awareness XP.',    next: 'mid_event', outcome: 'observe' },
    ],
  },

  street: {
    id: 'street', type: 'story',
    text: `Chaos. The street has partially unfrozen — people running, screaming, shoving.

Someone screams: "They're killing each other!"

You see a brutal fight, a player looting a body, and a narrow alley half-hidden in shadow.`,
    choices: [
      { id: 'fight', label: 'Join the fight',      sub: 'Medium risk — chance to gain a weapon', next: 'street_fight', variant:'danger' },
      { id: 'steal', label: 'Steal the loot',      sub: 'Random items — risk of being caught',   next: 'street_steal' },
      { id: 'alley', label: 'Slip into the alley', sub: 'Safe path — something hidden inside',   next: 'street_alley' },
    ],
  },

  street_fight: {
    id: 'street_fight', type: 'story',
    text: `You throw yourself into the brawl. Hard blows. They bolt. A knife gleams on the pavement.`,
    rewards: [{ itemKey:'knife', qty:1 }], hpLoss: 20, xp: 20,
    choices: [{ label:'Continue', next:'mid_event' }],
  },

  street_steal: {
    id: 'street_steal', type: 'story',
    text: `You grab a jacket from beside a fallen player — but the owner sees you. They charge.`,
    rewards: [{ itemKey:'jacket', qty:1 }], xp: 10,
    choices: [{ label:'Continue', next:'mid_event' }],
  },

  street_alley: {
    id: 'street_alley', type: 'story',
    text: `You press into the shadow. Cool and quiet. Behind a dumpster: an energy drink, still cold. Scrap metal beside it.`,
    rewards: [{ itemKey:'energy_drink', qty:1 }, { itemKey:'scrap_metal', qty:2 }], xp: 12,
    choices: [{ label:'Continue', next:'mid_event' }],
  },

  system: {
    id: 'system', type: 'story',
    text: `You focus on the glowing interface. New tabs materialize — Stats. Inventory. A pulsing radar map.

One dot blinks red. Twenty meters. Closing.`,
    xp: 10, sysMsg: '⚠ Scanning… A player is 20m away.',
    choices: [
      { label:'Track the player', sub:'First-strike advantage',       next:'sys_track' },
      { label:'Avoid the player', sub:'Safe — but lose the chance',   next:'sys_avoid' },
      { label:'Set a trap',       sub:'High reward — risky if fails', next:'sys_trap'  },
    ],
  },

  sys_track: {
    id:'sys_track', type:'story',
    text:`You move silently. They don't see you coming. You have every advantage.`,
    xp:18, rewards:[{itemKey:'scrap_blade',qty:1}],
    choices:[{label:'Continue',next:'mid_event'}],
  },

  sys_avoid: {
    id:'sys_avoid', type:'story',
    text:`You ghost the signal. They pass within ten meters. You hold your breath. They move on.`,
    xp:8,
    choices:[{label:'Continue',next:'mid_event'}],
  },

  sys_trap: {
    id:'sys_trap', type:'story',
    text:`You rig a funnel using two frozen cars and wait. They walk straight in — stunned. Free win.`,
    xp:25, rewards:[{itemKey:'knife',qty:1}],
    choices:[{label:'Continue',next:'mid_event'}],
  },

  mid_event: {
    id:'mid_event', type:'story',
    text:`The sky glitches.

A crack tears across the horizon — jagged, electric, wrong. Through it opens an eye. Massive. Ancient. Patient.

The city goes quiet.`,
    sysMsg: 'Boss Entity Detected — The Watcher',
    choices: [
      { label:'Form an alliance with nearby players', sub:'3 players detected — shared fight',    next:'boss', bossMode:'team'   },
      { label:'Face The Watcher alone',               sub:'Easier — no shared rewards',           next:'boss', bossMode:'solo'   },
      { label:'Join the alliance… then betray',        sub:'Maximum loot — maximum risk',          next:'boss', bossMode:'betray', variant:'danger' },
    ],
  },

  boss: {
    id:'boss', type:'boss',
    text:`The eye opens fully. The air vibrates. It sees every choice you have ever made.`,
    enemy: { name:'The Watcher', icon:'👁', hp:200, atk:18, xp:80, loot:[{itemKey:'core_fragment',qty:1}] },
  },

  chapter_end: {
    id:'chapter_end', type:'end',
    text:`The Watcher shatters.

Not with violence — with silence. The sky seals itself.

A message appears across the world:

"Chapter 1 Complete. Behavior Recorded."

Then, quieter:

"Your evolution is being calculated…"`,
    sysMsg: 'Core Fragment obtained. Chapter 2 unlocked.',
    unlocksChapter: 2,
  },
}
