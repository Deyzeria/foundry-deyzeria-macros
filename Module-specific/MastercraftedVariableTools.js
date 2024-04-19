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
