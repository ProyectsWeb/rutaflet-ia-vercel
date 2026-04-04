export const tagRenderHTML = async (nameClassSelector, elemTagToRender)=>{
  const tag= document.querySelector(nameClassSelector);
  tag.innerHTML="";
  tag.appendChild(await elemTagToRender); 
}