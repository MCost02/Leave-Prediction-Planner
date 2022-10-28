//Save Profile Function
function profileSave() {
    document.getElementById("save").innerHTML = "Your changes have been saved successfully!";
}

function checkform() {
    var f = document.forms["profileform"].elements;
    var cansubmit = true;

    for (var i = 0; i < f.length; i++) {
        if (f[i].value.length == 0) cansubmit = false;
    }

    document.getElementById("profile-submit").disabled = !cansubmit;

}