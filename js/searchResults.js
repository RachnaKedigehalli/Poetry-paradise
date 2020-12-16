window.onload = searchResults;

function searchResults() {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            console.log(arr);
            document.getElementById("results-number").innerText = arr.length + " results found.";
        }
    }
    var url = new URL(window.location.href);
    var title = url.searchParams.get("title");
    var verse = url.searchParams.get("verse");
    var poet = url.searchParams.get("poet");
    http.open("GET", `http://localhost:4000/api/poems?title=${title}&verse=${verse}&poet=${poet}`, true);
    http.send();
}