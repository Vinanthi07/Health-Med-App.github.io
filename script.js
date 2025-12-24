console.log("script.js loaded");

// -------- PATIENT FORM ----------
const nextVitalsBtn = document.getElementById("nextVitals");
if(nextVitalsBtn) {
    nextVitalsBtn.addEventListener("click", function() {
        localStorage.setItem("name", document.getElementById("name").value);
        localStorage.setItem("age", document.getElementById("age").value);
        localStorage.setItem("gender", document.getElementById("gender").value);
        localStorage.setItem("history", document.getElementById("history").value);
        localStorage.setItem("smoke", document.getElementById("smoke").value);
        localStorage.setItem("alcohol", document.getElementById("alcohol").value);

        window.location.href = "vitals.html";
    });
}

// -------- VITALS FORM ----------
const submitVitalsBtn = document.getElementById("submitVitals");
if(submitVitalsBtn) {
    submitVitalsBtn.addEventListener("click", function() {
        localStorage.setItem("bp", document.getElementById("bp").value);
        localStorage.setItem("heart", document.getElementById("heart").value);
        localStorage.setItem("temp", document.getElementById("temp").value);

        window.location.href = "doctor.html";
    });
}

// -------- DOCTOR DASHBOARD ----------
document.addEventListener("DOMContentLoaded", function() {
    const patientInfo = document.getElementById("patientInfo");
    if(patientInfo) {
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
    if(vitalsInfo) {
        vitalsInfo.innerHTML = `
        BP: ${localStorage.getItem("bp")}<br>
        Heart Rate: ${localStorage.getItem("heart")}<br>
        Temp: ${localStorage.getItem("temp")}
        `;
    }

    // Dashboard buttons
    const editVitalsBtn = document.getElementById("editVitals");
    if(editVitalsBtn) editVitalsBtn.addEventListener("click", ()=> window.location.href="vitals.html");

    const voiceRxBtn = document.getElementById("voiceRx");
    if(voiceRxBtn) voiceRxBtn.addEventListener("click", ()=> window.location.href="prescription.html");

    const summaryBtn = document.getElementById("summary");
    if(summaryBtn) summaryBtn.addEventListener("click", ()=> window.location.href="summary.html");
});
