// Add images inside ''. You can add however many, adding new with , 'Image here'. Everything else doesn't need to be changes
const imagesAr = ['image1', 'image2', 'image3'];

const searchImage = token.document.texture.src;
var lineIndex = imagesAr.indexOf(searchImage);

if (lineIndex !== -1) 
{
 if (lineIndex == imagesAr.length-1){
  const src = imagesAr[0];
  return token.document.update({"texture.src": src});
 }
 else{
  const src2 = imagesAr[lineIndex+1];
  return token.document.update({"texture.src": src2});
 }
} 
else 
{
console.log('The line does not exist in the array.');
return;
}
