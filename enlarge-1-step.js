// Nothing to change here. If your system adds sizes, then just write them here. Yes, sure, maybe I could have gotten them from config, but I really didn't want to
const sizeNameAr = ['tiny', 'sm', 'med', 'lg', 'huge', 'grg'];
const tokSizeAr = [0.5, 1, 1, 2, 3, 4, 5];

var currentSize = sizeNameAr.indexOf(actor.system.traits.size);
console.log(currentSize)
if(currentSize == 5) { return; }

await token.document.update({width: tokSizeAr[currentSize+1], height: tokSizeAr[currentSize+1]});

let objUpdate = new Object();
objUpdate['system.traits.size'] = sizeNameAr[currentSize+1];
actor.update(objUpdate);
