//SKAPA OCH HÄMTA ELEMENT VI BEHÖVER
let main = document.getElementById("main");
let container = document.createElement("SECTION");
container.id = "container";
main.appendChild(container);


//FUNKTION FÖR ATT PRINTA START-SIDAN
function printStartpage() {
    
    //LOGGA IN-FORMULÄR
    container.innerHTML = "";

    let loginForm = document.createElement("SECTION");
    loginForm.id = "loginForm";
    container.appendChild(loginForm);

    loginForm.insertAdjacentHTML("beforeend", "<h3>Logga in</h3><p>Användarnamn:</p>");
    
    let userNameLogin = document.createElement("INPUT");
    userNameLogin.setAttribute("type", "text");
    userNameLogin.id = "userNameLogin";
    loginForm.appendChild(userNameLogin);
    loginForm.insertAdjacentHTML("beforeend", "<br>");

    loginForm.insertAdjacentHTML("beforeend", "<p>Lösenord:</p>")
    
    let passwordLogin = document.createElement("INPUT");
    passwordLogin.setAttribute("type", "password");
    passwordLogin.id = "passwordLogin";
    loginForm.appendChild(passwordLogin);
    loginForm.insertAdjacentHTML("beforeend", "<br>")

    let btnLogin = document.createElement("BUTTON");
    btnLogin.id = "btnLogin";
    let btnLoginText = document.createTextNode("Logga in");
    btnLogin.appendChild(btnLoginText);
    loginForm.appendChild(btnLogin);
    loginForm.insertAdjacentHTML("beforeend", "<br>");

    let errorMsgContainerLogin = document.createElement("DIV");
    errorMsgContainerLogin.id = "errorMsgContainerLogin";
    loginForm.appendChild(errorMsgContainerLogin);


    //REGISTRERA-FORMULÄR
    let signUpForm = document.createElement("SECTION");
    signUpForm.id = "signUpForm";
    container.appendChild(signUpForm);

    signUpForm.insertAdjacentHTML("beforeend", "<h3>Registrera ny användare</h3><p>Användarnamn:</p>");
    
    //Input username
    let userNameSignUp = document.createElement("INPUT");
    userNameSignUp.setAttribute("type", "text");
    userNameSignUp.id = "userNameSignUp";
    signUpForm.appendChild(userNameSignUp);
    signUpForm.insertAdjacentHTML("beforeend", "<br>");
    signUpForm.insertAdjacentHTML("beforeend", "<p>Lösenord:</p>");

    //Input password
    let passwordSignUp = document.createElement("INPUT");
    passwordSignUp.setAttribute("type", "password");
    passwordSignUp.id = "passwordSignUp";
    signUpForm.appendChild(passwordSignUp);
    signUpForm.insertAdjacentHTML("beforeend", "<br><p>Email:</p>");

    //Input email
    let emailSignUp = document.createElement("INPUT");
    emailSignUp.setAttribute("type", "text");
    emailSignUp.id = "emailSignUp";
    signUpForm.appendChild(emailSignUp);
    signUpForm.insertAdjacentHTML("beforeend", "<br><p>Vill du ha vårat nyhetsbrev?</p>");

    //Select för nyhetsbrev
    let select = document.createElement("SELECT");
    select.id = "select";
    signUpForm.appendChild(select);

    let optionTrue = document.createElement("OPTION");
    optionTrue.setAttribute("value", "true");
    let optionTrueText = document.createTextNode("Ja");
    optionTrue.appendChild(optionTrueText);
    select.appendChild(optionTrue);

    let optionFalse = document.createElement("OPTION");
    optionFalse.setAttribute("value", "false");
    let optionFalseText = document.createTextNode("Nej");
    optionFalse.appendChild(optionFalseText);
    select.appendChild(optionFalse);
    signUpForm.insertAdjacentHTML("beforeend", "<br>")
    
    //Knapp
    let btnSignUp = document.createElement("BUTTON");
    btnSignUp.id = "btnSignUp";
    let btnSignUpText = document.createTextNode("Registera dig");
    btnSignUp.appendChild(btnSignUpText);
    signUpForm.appendChild(btnSignUp);


    let errorMsgContainerSignUp = document.createElement("DIV");
    errorMsgContainerSignUp.id = "errorMsgContainerSignUp";
    signUpForm.appendChild(errorMsgContainerSignUp);

    //NÄR MAN KLICKAR PÅ LOGGA IN-KNAPPEN SKICKAS UPPGIFTERNA TILL BACKEND, OCH SVAR FÅR TILLBAKA OM DET GÅR ATT LOGGA IN ELLER INTE
    btnLogin.addEventListener("click", function() {
       
        let userNameLogin = document.getElementById("userNameLogin").value;
        let passwordLogin = document.getElementById("passwordLogin").value;

        let checkUser = {userName: userNameLogin, password: passwordLogin};

        //Skicka användarens info till back-enden
        fetch("https://nyhetsbrevet.herokuapp.com/check", { //http://localhost:3000/users/check
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkUser)
        })
        .then(res => res.json())
        .then(data => {

            //Svar från back-enden och välja vad som ska göras med den
            if(data.code == "OK") {
                localStorage.setItem("userId", data.userId);
                loggedInPage(data);
            }
            else {
                errorPageLogin();
            }
        })
    });


    //NÄR MAN KLICKAR FÖR ATT REGISTRERA NY ANVÄNDARE

    btnSignUp.addEventListener("click", function() {

        let userNameSignUp = document.getElementById("userNameSignUp").value;
        let passwordSignUp = document.getElementById("passwordSignUp").value;
        let emailSignUp = document.getElementById("emailSignUp").value
        let newsletterSelect = document.getElementById("select").value;

        let newUser = {userName: userNameSignUp, password: passwordSignUp, email: emailSignUp, newsletter: newsletterSelect};

        //Skicka användarens info till back-enden
        fetch("https://nyhetsbrevet.herokuapp.com/new", { //http://localhost:3000/users/new
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {

            //Svar från back-enden och välja vad som ska göras med den
            if(data == "ERROR") {
                errorPageSignUp();
            }
            else {

                signUpForm.innerHTML = "";
                signUpForm.insertAdjacentHTML("beforeend", "<p>Registreringen lyckades, vänligen logga in i formuläret här bredvid!");

                //localStorage.setItem("userId", data);
            }          
        })
    })
}


//FUNKTION FÖR ERROR I LOGGA IN-FORMULÄRET
function errorPageLogin() { 
    errorMsgContainerLogin.innerHTML = "";
    errorMsgContainerLogin.insertAdjacentHTML("beforeend", "<p id='errorMessageLogin'>Du har skrivit fel användarnamn eller fel löseord. Prova igen!</p>")
}

//FUNKTION FÖR ERROR I REGISTRERINGS-FORMULÄRET
function errorPageSignUp() { 
    errorMsgContainerSignUp.innerHTML = "";
    errorMsgContainerSignUp.insertAdjacentHTML("beforeend", "<p id='errorMessageSignUp'>Användarnamnet finns redan. Vänligen prova ett annat!</p>")
}

//FUNKTION FÖR INLOGGAD ANVÄNDARE
function loggedInPage(data) {
    container.innerHTML = "";

    //Skapar element för sidan
    let containerLoggedIn = document.createElement("DIV");
    containerLoggedIn.id = "containerLoggedIn";
    container.appendChild(containerLoggedIn);

    let btnSignOut = document.createElement("BUTTON");
    btnSignOut.id = "btnSignOut";
    let btnSignOutText = document.createTextNode("Logga ut");
    btnSignOut.appendChild(btnSignOutText);
    containerLoggedIn.appendChild(btnSignOut);

    containerLoggedIn.insertAdjacentHTML("beforeend", "<h2>Du är inloggad!</h2>");
   
    let statusContainer = document.createElement("DIV");
    statusContainer.id = "statusContainer";
    containerLoggedIn.appendChild(statusContainer);

    //GÖR ETT FORMULÄR OM MAN VILL ÄNDRA SIN PRENUMERATION PÅ NYHETSBREV
    //Selsect
    let selectChange = document.createElement("SELECT");
    selectChange.id = "selectChange";

    let optionTrueChange = document.createElement("OPTION");
    optionTrueChange.setAttribute("value", "true");
    let optionTrueChangeText = document.createTextNode("Ja");
    optionTrueChange.appendChild(optionTrueChangeText);
    selectChange.appendChild(optionTrueChange);

    let optionFalseChange = document.createElement("OPTION");
    optionFalseChange.setAttribute("value", "false");
    let optionFalseChangeText = document.createTextNode("Nej");
    optionFalseChange.appendChild(optionFalseChangeText);
    selectChange.appendChild(optionFalseChange);

    //Knapp
    let btnSelectChange = document.createElement("BUTTON");
    btnSelectChange.id = "btnSelectChange";
    let btnSelectChangeText = document.createTextNode("Ändra");
    btnSelectChange.appendChild(btnSelectChangeText);
    


    //KOLLAR OM NEWSLETTER ÄR TRUE ELLER FALSE OCH SKRIVER UT FORMULÄR
    statusContainer.insertAdjacentHTML("beforeend", `<p>${data.newsletter == "true" ? "Du prenumererar just nu på nyhetsbrevet! Du kan ändra nedan om du vill." : "Du prenumererar inte på nyhetsbrevet. Du kan ändra nedan om du vill."}</p><p>Vill du prenumerera på nyhetsbrevet?</p>`);
    statusContainer.appendChild(selectChange);
    statusContainer.appendChild(btnSelectChange);

    //OM KNAPPEN FÖR ATT ÄNDRA SIN PRENUMERATION KLICKAS
    btnSelectChange.addEventListener("click", function(data) {
        let newsletterChangeValue = selectChange.value;

        let idOfUser = localStorage.getItem("userId");

        let newsletterChange = {id: idOfUser, newsletter: newsletterChangeValue}

        //Skickar användarens id och prenumerationsstatus till back-end
        fetch("https://nyhetsbrevet.herokuapp.com/change", { //http://localhost:3000/users/change
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newsletterChange)
        })
        .then(res => res.json())
        .then(data => {

            //Skriver ut svaret från back-enden
            statusContainer.innerHTML = "";

            statusContainer.insertAdjacentHTML("beforeend", `<p>${newsletterChangeValue == "true" ? "Nu prenumererar du på nyhetsbrevet!" : "Nu prenumererar du inte på nyhetsbrevet!"}</p>`);
        })
       
    })
    
    //OM LOGGA UT-KNAPPEN KLICKAS
    btnSignOut.addEventListener("click", function() {
        localStorage.clear();
        printStartpage();
    })

}



//KÖR APPLIKATIONEN
if("userId" in localStorage) {
    loggedInPage();
}
else {
    printStartpage();
}

