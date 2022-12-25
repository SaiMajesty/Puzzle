let mailEl = document.getElementById("mail");
let passwordEl = document.getElementById("password");
let signEl = document.getElementById("signin");
let loginEl = document.getElementById("login");
let emailErrMsgEl = document.getElementById("mailErrMsg");
let passwordErrMsgEl = document.getElementById("passwordErrMsg");
let myFormEl = document.getElementById("myForm");

let reqData = {
    mail: "",
    password: ""
}

mailEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }

    reqData.mail = event.target.value;
});

passwordEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        passwordErrMsgEl.textContent = "Required*";
    } else {
        passwordErrMsgEl.textContent = "";
    }

    reqData.password = event.target.value;
});

function SubmitData(reqData) {
    let {
        mail,
        password
    } = reqData;
    if (mail === "") {
        emailErrMsgEl.textContent = "Required*";
    }
    if (password === "") {
        passwordErrMsgEl.textContent = "Required*";
    }
    if (mail !== "" && password !== "") {
        localStorage.setItem("mail", mail);
        localStorage.setItem("password", password);
        let params = {
            email_id: mail,
            password: password
        };
        emailjs.send("service_unw8e0o", "template_w1wrk2a", params).then(function(res) {
            alert("Successfully signed up");
        });

    }
}
myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();

});


signEl.onclick = function() {
    SubmitData(reqData);
    mailEl.value = "";
    passwordEl.value = "";

};

function Check(reqData) {
    let {
        mail,
        password
    } = reqData;
    let mailVal = localStorage.getItem("mail");
    let passwordVal = localStorage.getItem("password");
    if (mail === mailVal) {
        alert("Email Matched");
    }
    if (password === passwordVal) {
        alert("Passsword Matched");
    }
    if ((mail !== mailVal) || (password !== passwordVal)) {
        alert("Incorrect Creditinals");

    }
    if ((mail === mailVal) && (password === passwordVal)) {
        window.location.href = ("https://loginsecond.ccbp.tech/");

    }
}
loginEl.onclick = function() {
    Check(reqData);
};