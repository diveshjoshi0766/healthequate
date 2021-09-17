

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
    var messagesRef = firebase.database().ref('assessment-form');

    const submitForm = async (e) => {
        e.preventDefault();

        document.getElementById('submit-button').disabled = true;
        document.getElementById('submit-button').innerText = "Wait..."

        var name = getInputVal('name')
        var occupation = getInputVal('occupation');
        var age = getInputVal('age');
        var mobile = getInputVal('mobile');
        var gender = getInputVal('gender');
        var email = getInputVal('email');
        var chiefComplaint = getInputVal('chief-complaint');
        var dateOfInjury = getInputVal('date-of-injury');
        var dateOfSurgery = getInputVal('date-of-surgery');
        var descInjury = getInputVal('desc-injury');
        var historyOfThreapy = getInputVal('history-of-threapy');
        var conditionAfterThreapy = getInputVal('condition-after-threapy');
        var presentSymptoms = getInputVal('present-symptoms');
        var numberBestCorrespondsToPainBest = getInputVal('number-best-corresponds-to-pain-best');
        var numberBestCorrespondsToPainWorse = getInputVal('number-best-corresponds-to-pain-worse');
        var descMakesConditionBetter = getSelectValues(document.getElementById("desc-makes-condition-better"))
        var descMakesConditionWorse = getSelectValues(document.getElementById("desc-makes-condition-worse"))
        var prevMedicalIntervention = getSelectValues(document.getElementById("prev-medical-intervention"))
        var goalsAtEndOfThreapy = getInputVal('goals-at-end-of-threapy');
        var secureMedicalInformation = getSelectValues(document.getElementById("medical-information-secure"))
        var prevSurgeries = getInputVal('prev-surgeries');
        var others = getInputVal('other');
        var medications = getInputVal('medication');
        var allergies = getInputVal('allergies');
        await saveMessage(name, occupation, age, mobile, gender, email, chiefComplaint, dateOfInjury, dateOfSurgery, descInjury, historyOfThreapy, conditionAfterThreapy, presentSymptoms, numberBestCorrespondsToPainBest, numberBestCorrespondsToPainWorse, descMakesConditionBetter, descMakesConditionWorse, prevMedicalIntervention, goalsAtEndOfThreapy, secureMedicalInformation, prevSurgeries, others, medications, allergies);
        await axios.post('https://nodemailer-dr-neha.herokuapp.com/api/send', {email: email}).then(response => {
          console.log("Email sent")
          axios.post('https://dr-neha-presonal-emial.herokuapp.com/api/send', {name: name, occupation: occupation,age: age, mobile: mobile, gender: gender ,email: "healthequate@gmail.com", regEmail: email, chiefComplaint: chiefComplaint, dateOfInjury: dateOfInjury, dateOfSurgery: dateOfSurgery, descInjury: descInjury, historyOfThreapy: historyOfThreapy, conditionAfterThreapy: conditionAfterThreapy, presentSymptoms: presentSymptoms, numberBestCorrespondsToPainBest: numberBestCorrespondsToPainBest, numberBestCorrespondsToPainWorse: numberBestCorrespondsToPainWorse, descMakesConditionBetter: descMakesConditionBetter, descMakesConditionWorse: descMakesConditionWorse, prevMedicalIntervention: prevMedicalIntervention, goalsAtEndOfThreapy: goalsAtEndOfThreapy, secureMedicalInformation: secureMedicalInformation, prevSurgeries: prevSurgeries, others: others,medications: medications, allergies: allergies, purpose: ""}).then(response => {
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
    function getSelectValues(select) {
        var result = [];
        var options = select && select.options;
        var opt;
      
        for (var i=0, iLen=options.length; i<iLen; i++) {
          opt = options[i];
      
          if (opt.selected) {
            result.push(opt.value || opt.text);
          }
        }
        return result;
    }
    // Save message to firebase
    function saveMessage(name, occupation, age, mobile, gender, email, chiefComplaint, dateOfInjury, dateOfSurgery, descInjury, historyOfThreapy, conditionAfterThreapy, presentSymptoms, numberBestCorrespondsToPainBest, numberBestCorrespondsToPainWorse, descMakesConditionBetter, descMakesConditionWorse, prevMedicalIntervention, goalsAtEndOfThreapy, secureMedicalInformation, prevSurgeries, others, medications, allergies){
        var newMessageRef = messagesRef.push();
        newMessageRef.set({
        name: name,
        occupation:occupation,
        age: age,
        mobile: mobile,
        gender: gender,
        email:email,
        chiefComplaint:chiefComplaint,
        dateOfInjury:dateOfInjury,
        dateOfSurgery:dateOfSurgery,
        descriptionOfInjury:descInjury,
        historyOfThreapy:historyOfThreapy,
        conditionAfterThreapy:conditionAfterThreapy,
        presentSymptoms:presentSymptoms,
        numberBestCorrespondsToPainBest:numberBestCorrespondsToPainBest,
        numberBestCorrespondsToPainWorse:numberBestCorrespondsToPainWorse,
        descriptionMakesConditionBetter:descMakesConditionBetter,
        descriptionMakesConditionWorse:descMakesConditionWorse,
        prevMedicalIntervention:prevMedicalIntervention,
        goalsAtEndOfThreapy:goalsAtEndOfThreapy,
        secureMedicalInformation:secureMedicalInformation,
        prevSurgeries:prevSurgeries,
        others:others,
        medications:medications,
        allergies:allergies
        });
    }
