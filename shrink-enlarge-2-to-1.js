const newSize = [2,1][token.data.width - 1];
await token.document.update({width: newSize, height: newSize})