var searchBtn = document.getElementById("search");
var verse = document.getElementById("verse-input");
var poet = document.getElementById("poet-input");

searchBtn.addEventListener("click", function(event) {
    console.log('search clicked');
    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            console.log(arr);
        }
    }
    console.log(verse.value);
    console.log(poet.value);
    if(verse.value || poet.value) {
        http.open("GET", `http://localhost:4000/api/poems/${poet.value}`, true);
        // http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        http.send();
        console.log('sent');
    }
});