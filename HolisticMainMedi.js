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
    var messagesRef = firebase.database().ref('holistic-registation-meditation-session');

    const submitForm = async (e) => {
        e.preventDefault();
        document.getElementById('submit-button').disabled = true;
        document.getElementById('submit-button').innerText = "Wait..."
        
        var name = getInputVal('name')
        var age = getInputVal('age');
        var mobile = getInputVal('mobile');
        var gender = getInputVal('gender');
        var email = getInputVal('email');
        var purpose = getInputVal('purpose');
        var occupation = getInputVal('occupation');

        await saveMessage(name, age, mobile, gender, email, purpose, occupation);
        await axios.post('https://nodemailer-dr-neha.herokuapp.com/api/send', {email: email}).then(response => {
          console.log("Email sent")
          axios.post('https://dr-neha-presonal-emial.herokuapp.com/api/send', {name: name, occupation: occupation,age: age, mobile: mobile, gender: gender ,email: "healthequate@gmail.com",chiefComplaint: "", dateOfInjury: "", dateOfSurgery: "", descInjury: "", historyOfThreapy: "", conditionAfterThreapy: "", presentSymptoms: "", numberBestCorrespondsToPainBest: "", numberBestCorrespondsToPainWorse: "", descMakesConditionBetter: "", descMakesConditionWorse: "", prevMedicalIntervention: "", goalsAtEndOfThreapy: "", secureMedicalInformation: "", prevSurgeries: "", others: "",medications: "", allergies: "", purpose: purpose}).then(response => {
            console.log("email sent to Dr.")
            alert("Thanks for registration will contact you in next 24 hours")
            document.getElementById('submit-button').disabled = false;
            document.getElementById('submit-button').innerText = "Register"
          }).catch((err) => {
            alert('mail not sent')
          })
        }).catch((err) =>{ alert('Mail not delivered, Plz register again')
        console.log(`${err.message}`)})

    }

    document.getElementById('registrationForm').addEventListener('submit', submitForm);
    console.log(123)

    

    function getInputVal(id){
        return document.getElementById(id).value;
    }
    
    // Save message to firebase
    function saveMessage(name, occupation, age, mobile, gender, email, chiefComplaint, dateOfInjury, dateOfSurgery, descInjury, historyOfThreapy, conditionAfterThreapy, presentSymptoms, numberBestCorrespondsToPainBest, numberBestCorrespondsToPainWorse, descMakesConditionBetter, descMakesConditionWorse, prevMedicalIntervention, goalsAtEndOfThreapy, secureMedicalInformation, prevSurgeries, others, medications, allergies){
        var newMessageRef = messagesRef.push();
        newMessageRef.set({
        name: name,
        age: age,
        mobile: mobile,
        gender: gender,
        email:email,
        purpose:purpose,
        occupation: occupation
        });
    }
