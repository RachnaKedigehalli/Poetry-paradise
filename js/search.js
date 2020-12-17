var searchBtn = document.getElementById("search");
var title = document.getElementById("title-input");
var verse = document.getElementById("verse-input");
var poet = document.getElementById("poet-input");

searchBtn.addEventListener("click", function(event) {
    // search only if there is text in either of the fields (title or verse or poet)
    if(title.value || verse.value || poet.value) {
        var url = new URL(window.location.origin + "/public/search.html");
        url.searchParams.append('title', title.value);
        url.searchParams.append('verse', verse.value);
        url.searchParams.append('poet', poet.value);
        window.location.href = url;
        title.value = "";
        verse.title = "";
        poet.value = "";
    }
    else {
        alert("Enter field to search");
    }
});