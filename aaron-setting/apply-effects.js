const effectHoly = {
 changes: [],
 disabled: false,
 duration: { rounds: 1, seconds: undefined, startRound: undefined, startTime: undefined, startTurn: undefined, turns: undefined },
 icon: "icons/svg/book.svg",
 label: "Holy",
 tint: null,
 transfer: false,
}

const effectUnholy = {
 changes: [],
 disabled: false,
 duration: { rounds: 1, seconds: undefined, startRound: undefined, startTime: undefined, startTurn: undefined, turns: undefined },
 icon: "icons/svg/bones.svg",
 label: "Unholy",
 tint: null,
 transfer: false,
}

var hitTargets = args[0].hitTargets;

hitTargets.forEach(ht => {
 var target = ht.actor;

 switch (target.system.details.type.subtype) {
  case "Holy":
   target.createEmbeddedDocuments("ActiveEffect", [effectHoly]);
   break;
  case "Unholy":
   target.createEmbeddedDocuments("ActiveEffect", [effectUnholy]);
   break;

  default:
   break;
 }
});


//    var aoerange = new MeasuredTemplate();

// let selfAoe = await canvas.scene.createEmbeddedDocuments('MeasuredTemplate', [{
//  x: token.document.x+50,
//  y: token.document.y+50,
//  distance: data.castData.castLevel * 5,
//  t: "circle",
//  fillColor: "#ff0048",
//  borderColor: "#000000",
//  shape: {}
// }]);

// var template = canvas.templates.placeables.find(t => t.id == selfAoe[0].id);
// template._computeShape();
// console.debug(MidiQOL.selectTargetsForTemplate(template));