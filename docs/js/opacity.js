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

var bodyparts = document.querySelectorAll(".bodypart");

bodyparts.forEach(function(bodypart) {
    bodypart.addEventListener("click", function() {
        var currentOpacity = parseFloat(this.style.opacity);
        this.style.opacity = currentOpacity.toFixed(1) === '0.6' ? '1' : '0.6';
    });
});