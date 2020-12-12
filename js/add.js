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
    // console.log(obj);
    obj = JSON.stringify(obj);

    // POST request 
    // adds poem to db
    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var addedData = JSON.parse(this.responseText);
            console.log(addedData);
            // console.log(addedData.datePosted);
            // var d = new Date(addedData.datePosted);
            // console.log(d.getDate());
            // window.location.href = window.location.href + "/poems/" + addedData._id;
            // console.log(window.location.href);


            // var url = new URL(window.location.href);
            var url = new URL(window.location.origin + "/public/poem.html");
            // url = window.location.origin + "/public/poem.html";
            url.searchParams.append('poem_id', addedData._id);
            console.log(url);
            window.location.href = url;
            // window.location.pathname = "/public/poem.html";
            

            // displayPoem(addedData);
            // console.log("test");
            // console.log(window.location.href);
        }
    };
    http.open('POST', "http://localhost:4000/api/poems", true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            //add.status=204;
    console.log(obj);
    http.send(obj);
    console.log('sent');
});