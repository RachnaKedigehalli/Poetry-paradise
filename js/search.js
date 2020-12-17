var searchBtn = document.getElementById("search");
var title = document.getElementById("title-input");
var verse = document.getElementById("verse-input");
var poet = document.getElementById("poet-input");

searchBtn.addEventListener("click", function(event) {
    // console.log('search clicked');
    
    /*
    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            console.log(arr);
            console.log(arr[0]==arr[2]);
        }
    }
    // console.log(verse.value);
    // console.log(poet.value);

    // search only if there is text in either of the fields (title or verse or poet)
    if(title.value || verse.value || poet.value) {
        console.log(title.value);
        console.log(verse.value);
        console.log(poet.value);
        http.open("GET", `http://localhost:4000/api/poems?title=${title.value}&verse=${verse.value}&poet=${poet.value}`, true);
        http.send();
        // console.log('sent');
    }
    */

    // search only if there is text in either of the fields (title or verse or poet)
    if(title.value || verse.value || poet.value) {
        var url = new URL(window.location.origin + "/public/search.html");
        url.searchParams.append('title', title.value);
        url.searchParams.append('verse', verse.value);
        url.searchParams.append('poet', poet.value);
        console.log(url);
        window.location.href = url;
        title.value = "";
        verse.title = "";
        poet.value = "";
    }
    else {
        alert("Enter field to search");
    }
});