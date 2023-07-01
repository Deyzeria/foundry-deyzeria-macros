const imgA = "Image here";
const imgB = "Image 2 here";
const src = token.document.texture.src === imgA ? imgB : imgA;
return token.document.update({"texture.src": src});

// To have a version which works with version 9 Foundry, change the line 3 and 4 to the following lines
let img = token.data.img;
img = token.data.img=== imgA ? imgB : imgA;
token.document.update({ img });
