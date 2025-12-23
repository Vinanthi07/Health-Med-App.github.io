function saveData() {
    const patientData = {
        age: document.getElementById("age").value,
        smoke: document.getElementById("smoke").value,
        alcohol: document.getElementById("alcohol").value,
        conditions: document.getElementById("conditions").value,
        allergy: document.getElementById("allergy").value
    };

    localStorage.setItem("patientData", JSON.stringify(patientData));
    alert("Health data saved successfully!");

    window.location.href = "doctor.html";
}
