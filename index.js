
var firebaseConfig = {
    apiKey: "AIzaSyCZxHhK18aNCOFD3m_GwQkHmt2TM2aVS8w",
    authDomain: "fir-contact-form-9c812.firebaseapp.com",
    databaseURL: "https://fir-contact-form-9c812-default-rtdb.firebaseio.com/",
    projectId: "fir-contact-form-9c812",
    storageBucket: "fir-contact-form-9c812.appspot.com",
    messagingSenderId: "1002103329337",
    appId: "1:1002103329337:web:46c5ee07427ada441c33e8"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

    // Reference messages collection
var messagesRef = firebase.database().ref('contact-us');

const submitForm = async (e) => {
    e.preventDefault();

    var name = getInputVal('name')
    var purpose = getInputVal('purpose');
    var email = getInputVal('email');
    
    console.log(name)
    await saveMessage(name, purpose, email);

    await axios.post('https://nodemailer-dr-neha.herokuapp.com/api/send', {email: email}).then(response => {
      console.log("Email sent")
      axios.post('https://dr-neha-presonal-emial.herokuapp.com/api/send ', {name: name, occupation: "",age: "", mobile: "", gender: "" ,email: "healthequate@gmail.com", regEmail: email, chiefComplaint: "", dateOfInjury: "", dateOfSurgery: "", descInjury: "", historyOfThreapy: "", conditionAfterThreapy: "", presentSymptoms: "", numberBestCorrespondsToPainBest: "", numberBestCorrespondsToPainWorse: "", descMakesConditionBetter: "", descMakesConditionWorse: "", prevMedicalIntervention: "", goalsAtEndOfThreapy: "", secureMedicalInformation: "", prevSurgeries: "", others: "",medications: "", allergies: "", purpose: purpose}).then(response => {
        console.log("email sent to Dr.")
        alert("Thanks for registration will contact you in next 24 hours")
      }).catch((err) => {
        alert('mail not sent')
      })
    }).catch((err) =>{ alert('Mail not delivered, Plz register again')
    console.log(`${err.message}`)})

}

document.getElementById('contactus').addEventListener('submit', submitForm);
console.log(123)



function getInputVal(id){
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, number){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
    name: name,
    number: number,
    email:email,
    });
}

