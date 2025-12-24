console.log("script.js loaded");

// ---------- SAVE PATIENT ----------
function savePatient() {
    localStorage.setItem("name", document.getElementById("name").value);
    localStorage.setItem("age", document.getElementById("age").value);
    localStorage.setItem("gender", document.getElementById("gender").value);
    localStorage.setItem("history", document.getElementById("history").value);
    localStorage.setItem("smoke", document.getElementById("smoke").value);
    localStorage.setItem("alcohol", document.getElementById("alcohol").value);

    window.location.href = "vitals.html";
}

// ---------- SAVE VITALS ----------
function saveVitals() {
    localStorage.setItem("bp", document.getElementById("bp").value);
    localStorage.setItem("heart", document.getElementById("heart").value);
    localStorage.setItem("temp", document.getElementById("temp").value);

    window.location.href = "doctor.html";
}

// ---------- LOAD DASHBOARD ----------
document.addEventListener("DOMContentLoaded", function () {

    const patientInfo = document.getElementById("patientInfo");
    if (patientInfo) {
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
    if (vitalsInfo) {
        vitalsInfo.innerHTML = `
        BP: ${localStorage.getItem("bp")}<br>
        Heart Rate: ${localStorage.getItem("heart")}<br>
        Temperature: ${localStorage.getItem("temp")}
        `;
    }
});

// ---------- NAVIGATION ----------
function goTo(page) {
    window.location.href = page;
}
