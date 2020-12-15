var submitBtn = document.getElementById("submit-button");
submitBtn.addEventListener("click", function(event){
    var itp = document.getElementById("enter-interpretation-text");
    if(!itp.value) {
        alert("Enter your interpretation.");
        return;
    }
    // creating JSON object from input
    var obj = {};
    obj.interpretation = itp.value;
    obj.date = new Date();
    obj = JSON.stringify(obj);

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var iptAdded = JSON.parse(this.responseText);
            console.log(iptAdded);
            displayPoem();
        }
    };

    var url = new URL(window.location.href);
    var poem_id = url.searchParams.get('poem_id');

    http.open('PUT', `http://localhost:4000/api/poems/interpretations/${poem_id}`, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.send(obj);
});