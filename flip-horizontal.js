const scaleX = token.document.texture.scaleX === 1 ? -1 : 1;
await token.document.update({"texture.scaleX": scaleX});