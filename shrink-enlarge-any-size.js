const initialSize = 1;
const targetSize = 2;
const newSize = token.data.width === initialSize ? targetSize : initialSize;
await token.document.update({width: newSize, height: newSize});

// Add this to the code if you also want to change the actual size in the token. 
// It works to medium, large, huge and gargantuan.
const newSizeAr = ['sm', 'med', 'lg', 'huge', 'grg']
let objUpdate = new Object();
objUpdate['system.traits.size'] = newSizeAr[newSize];

actor.update(objUpdate);
