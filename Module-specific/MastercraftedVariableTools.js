const arrayNames = {
  alchemist: {
    name: "Alchemist’s supplies",
    icon: `<i class="fa-solid fa-flask-vial"></i>`
  },
  brewer: {
    name: "Brewer’s supplies",
    icon: `<i class="fa-solid fa-beer-mug-empty"></i>`
  },
  calligrapher: {
    name: "Calligrapher’s supplies",
    icon: `<i class="fa-solid fa-signature"></i>`
  },
  carpenter: {
    name: "Carpenter’s tools",
    icon: `<i class="fa-solid fa-tree"></i>`
  },
  cartographer: {
    name: "Cartographer’s tools",
    icon: `<i class="fa-solid fa-map"></i>`
  },
  cobbler: {
    name: "Cobbler’s tools",
    icon: `<i class="fa-solid fa-socks"></i>`
  },
  cook: {
    name: "Cook’s utensils",
    icon: `<i class="fa-solid fa-utensils"></i>`
  },
  glassblower: {
    name: "Glassblower’s tools",
    icon: `<i class="fa-solid fa-glass-water"></i>`
  },
  herb: {
    name: "Herbalism Kit",
    icon: `<i class="fa-solid fa-leaf"></i>`
  },
  jeweler: {
    name: "Jeweler’s tools",
    icon: `<i class="fa-solid fa-gem"></i>`
  },
  leatherworker: {
    name: "Leatherworker’s tools",
    icon: `<i class="fa-solid fa-rug"></i>`
  },
  mason: {
    name: "Mason’s tools",
    icon: `<i class="fa-solid fa-building"></i>`
  },
  painter: {
    name: "Painter’s supplies",
    icon: `<i class="fa-solid fa-paintbrush"></i>`
  },
  pois: {
    name: "Poisoner’s Kit",
    icon: `<i class="fa-solid fa-vial-virus"></i>`
  },
  potter: {
    name: "Potter’s tools",
    icon: `<i class="fa-solid fa-monument"></i>`
  },
  smith: {
    name: "Smith’s tools",
    icon: `<i class="fa-solid fa-hammer"></i>`
  },
  tinker: {
    name: "Tinker’s tools",
    icon: `<i class="fa-solid fa-screwdriver-wrench"></i>`
  },
  weaver: {
    name: "Weaver’s tools",
    icon: `<i class="fa-solid fa-shirt"></i>`
  },
  woodcarver: {
    name: "Woodcarver’s tools",
    icon: `<i class="fa-solid fa-tree"></i>`
  }
};

const arrayTools = macroArgs[0].split(',');
var object = {};

var toolDialogue = new Promise((resolve, reject) => {
  let dialog = new Dialog({
    title: "Which tool to use?",
    content: ``,
    buttons: {}
  });
  arrayTools.forEach(element => {
    dialog.data.buttons[element] = {
      icon: arrayNames[element].icon ?? `<i class="fa-solid fa-toolbox"></i>`,
      label: arrayNames[element].name ?? element.charAt(0).toUpperCase() + element.slice(1),
      callback: () => resolve(element)
    }
  }); 
  dialog.render(true);
});
var toolID = await toolDialogue;
const DC = macroArgs[1];

const result = await actor.rollToolCheck(toolID);
return  {
    success: result.total >= DC,
    consume: true
};
