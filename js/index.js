// top scroll button
window.onload = function () {
  const btnScroll = document.querySelector("#btn_top");
  btnScroll.addEventListener("click", function () {
    
    window.scrollTo({top:0, left:0, behavior:'smooth'});
  });
};

function moveCommentPage(name) {
  location.href = "./guestbook.html?from=" + name;
}
