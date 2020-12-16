window.onload = searchResults;

function searchResults() {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var poems = JSON.parse(this.responseText);
            console.log(poems);
            document.getElementById("results-number").innerText = poems.length + " results found.";
            document.getElementById("results").innerHTML = '';
            for(var i=0; i<poems.length; i++) {
                document.getElementById("results").innerHTML += `<div class="result">
                                                    <div class="result-poem-title">`+ poems[i].title +`</div>
                                                    <div class="result-poet">by `+ poems[i].poet +`</div>
                                                    <div class="result-verse">`+ poems[i].verse +`</div>
                                                    <div class="poem-id">`+ poems[i]._id +`</div>
                                                </div>`;
                document.getElementsByClassName("result-verse")[i].innerText = poems[i].verse;
            }

            var poems = document.getElementsByClassName("result");
            for(var i=0; i<poems.length; i++) {
                poems[i].addEventListener("click", function(event){
                    console.log(this);
                    var poemId = this.getElementsByClassName("poem-id")[0].innerText;
                    var url = new URL(window.location.origin + "/public/poem.html");
                    url.searchParams.append('poem_id', poemId);
                    console.log(url);
                    window.location.href = url;
                });
            }
        }
    }
    var url = new URL(window.location.href);
    var title = url.searchParams.get("title");
    var verse = url.searchParams.get("verse");
    var poet = url.searchParams.get("poet");
    http.open("POST", `http://localhost:4000/api/poems/search`, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(verse);
    var obj = {};
    obj.title = title;
    obj.verse = verse;
    obj.poet = poet;
    // console.log(obj);
    obj = JSON.stringify(obj);


    http.send(obj);
}

