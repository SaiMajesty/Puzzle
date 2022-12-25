let bEl = document.getElementById("btn");
let addUserFormEl = document.getElementById("addUserForm");
let uEl = document.getElementById("name");
let mEl = document.getElementById("mobile");
let backEl = document.getElementById("back");

backEl.onclick = function() {
    window.location.href = ("https://loginpageone.ccbp.tech/");
}
bEl.onclick = function() {
    let uVal = uEl.value;
    let mVal = mEl.value;
    if (uVal !== "" && mVal !== "") {

        alert("Successfully Submitted your details");
        window.location.href=("https://puzzleslide.ccbp.tech/");

    } else {

        alert("Missing some details,Please check the form Once again ");
    }

}
addUserFormEl.addEventListener("submit", function(event) {
    event.preventDefault();

});