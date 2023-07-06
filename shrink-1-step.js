// Nothing to change here for dnd5e
const sizeNameAr = ['tiny', 'sm', 'med', 'lg', 'huge', 'grg'];
const tokSizeAr = [0.5, 1, 1, 2, 3, 4, 5];

const currentSize = sizeNameAr.indexOf(actor.system.traits.size);

if(currentSize == 0) { return; }

await token.document.update({width: tokSizeAr[currentSize-1], height: tokSizeAr[currentSize-1]});

let objUpdate = new Object();
objUpdate['system.traits.size'] = sizeNameAr[currentSize-1];
actor.update(objUpdate);
