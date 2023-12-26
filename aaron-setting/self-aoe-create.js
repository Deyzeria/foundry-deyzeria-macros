var data = args[0];
if (data.castData?.castLevel < 1 || data.castData?.castLevel == undefined) return;
if (token.actor.flags.dnd5e.casterType == "versatile") return;

let tempLocation = {
  x: token.document.x + 50,
  y: token.document.y + 50,
}
let aoeId = await warpgate.spawnAt(tempLocation, "AuraEffect");

let aoeActor = canvas.tokens.placeables.find(t => t.id == aoeId);

var valueChange = 0;
var changeName = "";

// Visual aura
const newAura = Auras.newAura();
newAura.distance = data.castData.castLevel * 5;
newAura.opacity = 0.1;
switch (token.actor.flags.dnd5e.casterType) {
  case "thalergic":
    newAura.colour = "#f7ff17";
    valueChange = 1;
    changeName = "Thalergic-";
    break;

  case "thanurgic":
    newAura.colour = "#8a0012";
    valueChange = -1;
    changeName = "Thanurgic-";
    break;

  default:
    return;
}
aoeActor.document.setFlag('token-auras', 'aura1', newAura);

// Effect aura
const effect = {
  changes: [],
  duration: { rounds: undefined, seconds: undefined, startRound: undefined, startTime: undefined, startTurn: undefined, turns: undefined },
  icon: "icons/svg/book.svg",
  label: changeName + aoeActor.id,
  tint: null,
  transfer: false,
  disabled: false,
  flags: {
    ActiveAuras: {
      isAura: true,
      aura: "All",
      radius: data.castData.castLevel * 5,
      customCheck: "actor.flags.dnd5e.isNotCaster == false || actor.flags.dnd5e.isNotCaster == undefined",
      displayTemp: false
    },
    dae: {
      showIcon: false,
      stackable: "noneName"
    },
    aaron: valueChange
  }
}
aoeActor.document.actor.createEmbeddedDocuments("ActiveEffect", [effect]);
