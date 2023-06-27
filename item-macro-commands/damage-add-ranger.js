if (!["mwak","rwak"].includes(args[0].item.data.actionType)) return {}; // weapon attack
if (args[0].hitTargets.length < 1) return;

token = canvas.tokens.get(args[0].tokenId);
actor = token.actor;

let target = canvas.tokens.get(args[0].hitTargets[0].id ?? args[0].hitTargers[0]._id);

const lastArg = args[args.length - 1];
let tactor = target.actor;

if (game.combat) {
  const combatTime = `${game.combat.id}-${game.combat.round + game.combat.turn /100}`;
  const lastTime = actor.getFlag("midi-qol", "markAttackTime");
  if (combatTime === lastTime) {
   MidiQOL.warn("");
   return {};
  }
}
let markNumber = 0;
if (tactor.effects.find(i => i.data.label === "Marked")) {
	markNumber = 1;
}
else if (tactor.effects.find(i => i.data.label === "Favored")) {
    markNumber = 2;
} else return

let useMarks = false;
if (markNumber > 0) {
    let dialog = new Promise((resolve, reject) => {
      new Dialog({
      // localize this text
      title: "Conditional Damage",
      content: `<p>Add Additional Damage?</p>`,
      buttons: {
          one: {
              icon: '<i class="fas fa-check"></i>',
              label: "Confirm",
              callback: () => resolve(true)
          },
          two: {
              icon: '<i class="fas fa-times"></i>',
              label: "Cancel",
              callback: () => {resolve(false)}
          }
      },
      default: "two"
      }).render(true);
    });
    useMarks = await dialog;
}

if (!useMarks) return {}
const diceMult = args[0].isCritical ? 2: 1;

if (game.combat) {
  const combatTime = `${game.combat.id}-${game.combat.round + game.combat.turn /100}`;
  const lastTime = actor.getFlag("midi-qol", "markAttackTime");
  if (combatTime !== lastTime) {
     await actor.setFlag("midi-qol", "markAttackTime", combatTime)
  }
}

if(markNumber === 1){
	return {damageRoll: `${diceMult}d6`, flavor: "Marked Damage"};
} else { return {damageRoll: `${diceMult}d4`, flavor: "Favored Damage"}; }