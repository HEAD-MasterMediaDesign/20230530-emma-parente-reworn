//pop-up add to gallery a la fin de l'experience

document.querySelector("#finished").addEventListener("click", function(){
    document.querySelector(".popupaddtogallery").style.display = "block";
});
  
//element pour fermer pop-up 
document.querySelector("#noshare").addEventListener("click", function(){
    document.querySelector(".popupaddtogallery").style.display = "none";
});
