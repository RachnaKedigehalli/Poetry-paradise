
window.onload = displayPoem;

function displayPoem() {
    console.log("testt");
    var url = new URL(window.location.href);
    var poem_id = url.searchParams.get('poem_id');
    console.log(poem_id);

    var poemHTTP = new XMLHttpRequest();

    poemHTTP.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var poem = JSON.parse(this.responseText);
            console.log(poem);

            // display poem given it's json
            document.getElementById("poem-title").innerText = poem.title;
            document.getElementById("poet").innerText = "by " + poem.poet;
            document.getElementById("verse").innerText = poem.verse;
            var d = new Date(poem.datePosted);
            document.getElementById("poem-date").innerText = "Posted on " + d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes();

            var itps = poem.interpretations;
            document.getElementById("interpretations").innerHTML = '';
            if(itps.length == 0) {
                document.getElementById("interpretations").innerText = "There are currently no interpretations for this poem. Be the first to add one!";
            }
            for(var i=0; i<itps.length; i++) {
                d = new Date(itps[i].date);
                document.getElementById("interpretations").innerHTML += `<div class="interpretation">
                                        <div class="itp-text"></div>` +
                                        `<div class="itp-details">` + "Posted on " + d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + 
                                        " at " + d.getHours() + ":" + d.getMinutes() + `</div>
                                    </div>`;
                document.getElementsByClassName("itp-text")[i].innerText = itps[i].interpretation;
                // console.log(template.getElementsByClass("itp-text"));
            }
        }
    };
    poemHTTP.open("GET", `http://localhost:4000/api/poems/${poem_id}`, true);
    poemHTTP.send();
};