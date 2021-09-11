document.getElementById("form-submit").addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;


    sendEmail(name, email, message);
    document.querySelector(".filled-button").reset();


}

//send Email Info

function sendEmail(name, email, message){
    // Email.send({
    //     Host: "smtp.gmail.com",
    //     Username: 'diveshjoshi34@gmail.com',
    //     Password: "fswhnsaerafgtoya",
    //     To: "diveshjoshi34@gmail.com",
    //     From: 'diveshjoshi34@gmail.com',
    //     Subject: `${name} sent you a message`,
    //     Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`
    // }).then((message) => alert("mail has been sent"))
    Email.send({
        Host : "smtp.gmail.com",
        Username : "diveshjoshi34@gmail.com",
        Password : "fswhnsaerafgtoya",
        To : 'diveshjoshi34@gmail.com',
        From : "diveshjoshi34@gmail.com",
        Subject: `${name} sent you a message`,
        Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`
    }).then(
      message => alert(message)
    );
}