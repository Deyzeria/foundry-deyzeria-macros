// This macro handles any size, including tiny, while also setting them in the character sheet. 
// Change Here
var initialSize = 'medium';
var targetSize = 'tiny';


// ------------------------------------------------------------------
const lookUp = ['tiny', 'small', 'medium', 'large', 'huge', 'gargantuan'];
initialSize = lookUp.indexOf(initialSize);
targetSize = lookUp.indexOf(targetSize);

const sizeNameAr = ['tiny', 'sm', 'med', 'lg', 'huge', 'grg'];
const tokSizeAr = [0.5, 1, 1, 2, 3, 4, 5];
const newSize = token.document.width === tokSizeAr[initialSize] ? tokSizeAr[targetSize] : tokSizeAr[initialSize];

await token.document.update({width: newSize, height: newSize});

// ------------------------------------------------------------------
const newSizeChar = actor.system.traits.size === sizeNameAr[initialSize] ? sizeNameAr[targetSize] : sizeNameAr[initialSize];
let objUpdate = new Object();
objUpdate['system.traits.size'] = newSizeChar;
actor.update(objUpdate);
