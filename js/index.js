window.onload = function(){
  // top scroll button
  const btnScroll = document.querySelector("#btn_top");
  btnScroll.addEventListener("click",function(){
    if(window.scrollY > 80){
      window.scrollTo({
        scrollY: 0,
        behavior:"smooth"
      });
    }
  });

}