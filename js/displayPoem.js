
window.onload = function() {
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

            var itps = ``;
            var arr = 0;
            for(var i=0; i<poem.interpretations.length; i++) {
                
            }
        }
    };
    poemHTTP.open("GET", `http://localhost:4000/api/poems/${poem_id}`, true);
    poemHTTP.send();
};