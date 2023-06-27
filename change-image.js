const imgA = "Image here";
const imgB = "Image 2 here";
const src = token.document.texture.src === imgA ? imgB : imgA;
return token.document.update({"texture.src": src});