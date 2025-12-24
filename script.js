console.log("script.js loaded");

// ---------- PATIENT FORM ----------
const nextVitalsBtn = document.getElementById("nextVitals");
if(nextVitalsBtn){
    nextVitalsBtn.addEventListener("click", ()=>{
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
    submitVitalsBtn.addEventListener("click", ()=>{
        localStorage.setItem("bp", document.getElementById("bp").value);
        localStorage.setItem("heart", document.getElementById("heart").value);
        localStorage.setItem("temp", document.getElementById("temp").value);
        window.location.href="doctor.html";
    });
}

// ---------- DOCTOR DASHBOARD ----------
document.addEventListener("DOMContentLoaded", ()=>{
    const patientInfo = document.getElementById("patientInfo");
    const vitalsInfo = document.getElementById("vitalsInfo");
    const riskBox = document.getElementById("riskAlerts");

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

    if(vitalsInfo){
        vitalsInfo.innerHTML = `
        BP: ${localStorage.getItem("bp")}<br>
        Heart Rate: ${localStorage.getItem("heart")}<br>
        Temp: ${localStorage.getItem("temp")}
        `;
    }

    // Risk Alerts
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

    // Buttons
    const btnMapping = [
        ["editVitals","vitals.html"],
        ["voiceRx","prescription.html"],
        ["summary","summary.html"],
        ["educationBtn","education.html"],
        ["supportBtn","support.html"],
        ["wellnessBtn","wellness.html"]
    ];

    btnMapping.forEach(([id,page])=>{
        const btn = document.getElementById(id);
        if(btn) btn.addEventListener("click",()=> window.location.href=page);
    });
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

        startBtn.addEventListener("click",()=> recognition.start());
        stopBtn.addEventListener("click",()=> recognition.stop());

        recognition.onresult=function(event){
            let transcript="";
            for(let i=event.resultIndex;i<event.results.length;i++){
                transcript+=event.results[i][0].transcript+" ";
            }
            output.innerText=transcript;
            localStorage.setItem("voicePrescription",transcript);
        }
    }
}

// ---------- SUMMARY AUTO-GENERATION ----------
const summaryOutput = document.getElementById("summaryOutput");
if(summaryOutput){
    const name = localStorage.getItem("name")||"Patient";
    const age = localStorage.getItem("age")||"N/A";
    const gender = localStorage.getItem("gender")||"N/A";
    const history = localStorage.getItem("history")||"N/A";
    const bp = localStorage.getItem("bp")||"N/A";
    const heart = localStorage.getItem("heart")||"N/A";
    const temp = localStorage.getItem("temp")||"N/A";
    const voiceRx = localStorage.getItem("voicePrescription")||"No prescription";

    // Simple auto summary (~300 words simulated)
    summaryOutput.innerHTML=`
    <p><b>Name:</b> ${name}</p>
    <p><b>Age/Gender:</b> ${age} / ${gender}</p>
    <p><b>Medical History:</b> ${history}</p>
    <p><b>Vitals:</b> BP ${bp}, Heart Rate ${heart}, Temp ${temp}</p>
    <p><b>Prescription:</b> ${voiceRx}</p>
    <p>This patient has been assessed based on pre-consultation information and vitals. All clinical parameters were reviewed. Appropriate prescription has been recorded. Patient education, support, and wellness interventions will be recommended accordingly. Continuous monitoring is advised, and follow-ups should be scheduled as needed. Overall, the patient is being managed according to best practice standards and all clinical guidelines for outpatient management are followed. Additional advice has been provided to maintain lifestyle, medication adherence, and wellness tracking.</p>
    <p>Further recommendations will be updated during follow-up visits and all data are logged for clinical review and auditing purposes.</p>
    `;
}

// ---------- EDUCATION / SUPPORT / WELLNESS ----------
const saveEducation = document.getElementById("saveEducation");
if(saveEducation){
    saveEducation.addEventListener("click", ()=>{
        const val=document.getElementById("educationText").value;
        localStorage.setItem("education_ack", val);
        alert("Education feedback saved!");
    });
}

const saveSupport = document.getElementById("saveSupport");
if(saveSupport){
    saveSupport.addEventListener("click", ()=>{
        const val=document.getElementById("supportText").value;
        localStorage.setItem("support_feedback", val);
        alert("Support feedback saved!");
    });
}

const saveWellness = document.getElementById("saveWellness");
if(saveWellness){
    saveWellness.addEventListener("click", ()=>{
        const val=document.getElementById("wellnessText").value;
        localStorage.setItem("wellness_feedback", val);
        alert("Wellness feedback saved!");
    });
}
