//pop-up explicatif début experience
window.addEventListener("load", function(){
    setTimeout(
        function open(event){
            document.querySelector(".popup").style.display = "block";
        },
        1000
    )
});
document.querySelector("#close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});
  
//element pour fermer pop-up retry et server failed
document.querySelector("#croix").addEventListener("click", function(){
    document.querySelector("#retry").style.display = "none";
});

document.querySelector("#croixserver").addEventListener("click", function(){
    document.querySelector("#serverfail").style.display = "none";
});