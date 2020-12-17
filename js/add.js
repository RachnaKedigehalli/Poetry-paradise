var addBtn = document.getElementById("add");
var title = document.getElementById("title-input");
var verse = document.getElementById("verse-input");
var poet = document.getElementById("poet-input");

addBtn.addEventListener("click", function(event) {
    if(!verse.value) {
        alert("Enter the verses you want to search or add. (Required field)");
        return;
    }

    // creating JSON object from input
    var obj = {};
    obj[title.name] = title.value;
    obj[verse.name] = verse.value;
    obj[poet.name] = poet.value;
    obj.datePosted = new Date();
    obj = JSON.stringify(obj);

    // POST request 
    // adds poem to db
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var addedData = JSON.parse(this.responseText);

            // redirect to poem.html which displays its details
            var url = new URL(window.location.origin + "/public/poem.html");
            url.searchParams.append('poem_id', addedData._id);
            window.location.href = url;
        }
    };

    http.open('POST', "http://localhost:4000/api/poems", true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.send(obj);
});