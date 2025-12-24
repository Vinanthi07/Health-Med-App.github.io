console.log("script.js loaded");

// ---------- PATIENT FORM ----------
const nextVitalsBtn = document.getElementById("nextVitals");
if(nextVitalsBtn){
    nextVitalsBtn.addEventListener("click", function(){
        localStorage.setItem("name", document.getElementById("name").value);
        localStorage.setItem("age", document.getElementById("age").value);
        localStorage.setItem("gender", document.getElementById("gender").value);
        localStorage.setItem("history", document.getElementById("history").value);
        localStorage.setItem("smoke", document.getElementById("smoke").value);
        localStorage.setItem("alcohol", document.getElementById("alcohol").value);
        window.location.href="vitals.html";
    });
}

// ---------- VITALS FORM ----------
const submitVitalsBtn = document.getElementById("submitVitals");
if(submitVitalsBtn){
    submitVitalsBtn.addEventListener("click", function(){
        localStorage.setItem("bp", document.getElementById("bp").value);
        localStorage.setItem("heart", document.getElementById("heart").value);
        localStorage.setItem("temp", document.getElementById("temp").value);
        window.location.href="doctor.html";
    });
}

// ---------- DOCTOR DASHBOARD ----------
document.addEventListener("DOMContentLoaded", function(){
    const patientInfo = document.getElementById("patientInfo");
    if(patientInfo){
        patientInfo.innerHTML = `
        Name: ${localStorage.getItem("name")}<br>
        Age: ${localStorage.getItem("age")}<br>
        Gender: ${localStorage.getItem("gender")}<br>
        History: ${localStorage.getItem("history")}<br>
        Smoking: ${localStorage.getItem("smoke")}<br>
        Alcohol: ${localStorage.getItem("alcohol")}
        `;
    }

    const vitalsInfo = document.getElementById("vitalsInfo");
    if(vitalsInfo){
        vitalsInfo.innerHTML = `
        BP: ${localStorage.getItem("bp")}<br>
        Heart Rate: ${localStorage.getItem("heart")}<br>
        Temp: ${localStorage.getItem("temp")}
        `;
    }

    // ---------- RISK ALERTS ----------
    const riskBox = document.getElementById("riskAlerts");
    if(riskBox){
        let risks=[];
        const bp = localStorage.getItem("bp")||"0";
        const age = parseInt(localStorage.getItem("age")||0);
        if(localStorage.getItem("smoke")==="Yes") risks.push("Smoking increases cardiovascular risk.");
        if(localStorage.getItem("alcohol")==="Yes") risks.push("Alcohol may interfere with medication.");
        if(bp.startsWith("14") || bp.startsWith("15")) risks.push("High BP detected.");
        if(age>60) risks.push("Elderly patient, monitor carefully.");

        riskBox.innerHTML = risks.length>0? risks.map(r=>"• "+r).join("<br>"):"<span style='color:green'>No immediate risks.</span>";
    }

    // ---------- DASHBOARD BUTTONS ----------
    const editVitalsBtn = document.getElementById("editVitals");
    if(editVitalsBtn) editVitalsBtn.addEventListener("click", ()=>window.location.href="vitals.html");

    const voiceRxBtn = document.getElementById("voiceRx");
    if(voiceRxBtn) voiceRxBtn.addEventListener("click", ()=>window.location.href="prescription.html");

    const summaryBtn = document.getElementById("summary");
    if(summaryBtn) summaryBtn.addEventListener("click", ()=>window.location.href="summary.html");
});

// ---------- VOICE PRESCRIPTION ----------
const startBtn = document.getElementById("startRecording");
const stopBtn = document.getElementById("stopRecording");
const output = document.getElementById("prescriptionText");

if(startBtn && stopBtn && output){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SpeechRecognition){
        output.innerText="Browser does not support voice recognition.";
    } else {
        const recognition = new SpeechRecognition();
        recognition.continuous=true;
        recognition.interimResults=false;
        recognition.lang="en-US";

        startBtn.addEventListener("click",()=>recognition.start());
        stopBtn.addEventListener("click",()=>recognition.stop());

        recognition.onresult=function(event){
            let transcript="";
            for(let i=event.resultIndex;i<event.results.length;i++){
                transcript+=event.results[i][0].transcript+" ";
            }
            output.innerText = transcript;
            localStorage.setItem("voicePrescription", transcript);
        }
    }
}
