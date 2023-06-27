if (!["mwak"].includes(args[0].item.data.actionType)) return {}; // weapon attack
if (args[0].hitTargets.length < 1) return;

token = canvas.tokens.get(args[0].tokenId);
actor = token.actor;

let target = canvas.tokens.get(args[0].hitTargets[0].id ?? args[0].hitTargers[0]._id);

const lastArg = args[args.length - 1];
let tactor = target.actor;

const saveType = "con";
const DC = actor.data.data.attributes.spelldc;
const flavor = `${CONFIG.DND5E.abilities[saveType]} DC${DC} ${item?.name || ""}`;

const effectDataNoReaction = {
    changes: [],
    disabled: false,
    duration: {rounds: 1, seconds: undefined, startRound: undefined, startTime: undefined, startTurn: undefined, turns: undefined},
    icon: "icons/dice/No_Reactions.png",
    label: "No Reaction",
    tint: null,
    transfer: false,
    //flags: {dae : {specialDuration: ["turnStart"]}}
}

const effectDataWith = {
    changes: [],
    disabled: false,
    duration: {rounds: 1, seconds: undefined, startRound: undefined, startTime: undefined, startTurn: undefined, turns: undefined},
    icon: "icons/dice/OneAttackPerTurn.png",
    label: "One Attack Per Turn",
    tint: null,
    transfer: false,
    //flags: {dae : {specialDuration: ["turnStart"]}}
}

let saveFunc = async function () {
	let hopeuse = 0;
	let hopePoints = actor.data.data.resources.primary.value;
	if(hopePoints>0){
		let dialogtwo = new Promise((resolve, reject) => {
		  new Dialog({
		  title: "Hope Usage",
		  content: `<p>Use Hope?</p>`,
		  buttons: {
			  one: {
				  icon: '<i class="fas fa-check"></i>',
				  label: "Yes",
				  callback: () => resolve(1)
			  },
			  two:{
				  icon: '<i class="fas fa-times"></i>',
				  label: "No",
				  callback: () => resolve(0)
			  }
			}
		  //default: "two"
		  }).render(true);
		});
		hopeuse = await dialogtwo;
	}
	let save = (await tactor.rollAbilitySave(saveType, { flavor, fastForward: true })).total;
	if (save < DC) {
		if(hopeuse === 0){
		    target.actor.createEmbeddedDocuments("ActiveEffect", [effectDataNoReaction]);
		} else {
			actor.data.data.resources.primary.value -= 1;
			target.actor.createEmbeddedDocuments("ActiveEffect", [effectDataNoReaction]);
			target.actor.createEmbeddedDocuments("ActiveEffect", [effectDataWith]);
		}
	}
}

if (game.combat) {
  const combatTime = `${game.combat.id}-${game.combat.round + game.combat.turn /100}`;
  const lastTime = actor.getFlag("midi-qol", "fistAttackTime");
  //let fistType = actor.getFlag("midi-qol", "fistType");
  if (combatTime === lastTime) {
  return {};
  }
}
// && fistType === 3

let continueDam = 0;
let dialog = new Promise((resolve, reject) => {
      new Dialog({
      // localize this text
      title: "Conditional Damage",
      content: `<p>Add Additional Damage?</p>`,
      buttons: {
          one: {
              icon: '<i class="fas fa-check"></i>',
              label: "Radiant Blow",
              callback: () => resolve(1)
          },
		  two:{
			  icon: '<i class="fas fa-check"></i>',
              label: "Biting Strike",
              callback: () => resolve(2)
		  },
		  three:{
			  icon: '<i class="fas fa-check"></i>',
              label: "Both",
              callback: () => resolve(3)
		  },
          four: {
              icon: '<i class="fas fa-times"></i>',
              label: "Normal",
              callback: () => {resolve(0)}
          }
      },
      default: "four"
      }).render(true);
    });
    continueDam = await dialog;
	
//let fistType = actor.getFlag("midi-qol", "fistType"); //2
//if()
//await actor.setFlag("midi-qol", "fistType", continueDam);


if (continueDam === 0) return {}
const diceMult = args[0].isCritical ? 2: 1;

if (game.combat) {
  const combatTime = `${game.combat.id}-${game.combat.round + game.combat.turn /100}`;
  const lastTime = actor.getFlag("midi-qol", "fistAttackTime");
  if (combatTime !== lastTime) {
     await actor.setFlag("midi-qol", "fistAttackTime", combatTime)
  }
}




if(continueDam === 1){
	return {damageRoll: `${diceMult}d6[fire]`, flavor: "Radiant Blow"};
} else if (continueDam === 2){
	saveFunc();
	return {damageRoll: `${diceMult}d6[bludgeoning]`, flavor: "Biting Strike"}; 
} else {
	saveFunc();
	return {damageRoll: `${diceMult}d6[bludgeoning]+${diceMult}d6[fire]`, flavor: "Radiant Blow + Biting Strike"};
}