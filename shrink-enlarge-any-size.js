const initialSize = 1;
const targetSize = 2;
const newSize = token.data.width === initialSize ? targetSize : initialSize;
await token.document.update({width: newSize, height: newSize});