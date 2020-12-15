var searchBtn = document.getElementById("search");
var title = document.getElementById("title-input");
var verse = document.getElementById("verse-input");
var poet = document.getElementById("poet-input");

searchBtn.addEventListener("click", function(event) {
    // console.log('search clicked');
    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            console.log(arr);
            console.log(arr[0]==arr[2]);
            //---------------------------------------
            /*
            const testForm = document.createElement('form');
            testForm.method = 'get';
            testForm.action = 'poem.html';
            for (const key in arr) {
                if (arr.hasOwnProperty(key)) {
                  const hiddenField = document.createElement('input');
                  hiddenField.type = 'hidden';
                  hiddenField.name = key;
                  hiddenField.value = arr[key];
            
                  testForm.appendChild(hiddenField);
                }
              }
            
              document.body.appendChild(testForm);
              testForm.submit();
              */
            //---------------------------------------
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
});