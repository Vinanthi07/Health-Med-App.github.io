// ========= SAFETY CHECK =========
if (!localStorage.getItem("name")) {
    document.body.innerHTML = "<h2>Please start from index.html</h2>";
}

// ========= HELPER =========
function get(key, fallback = "Not provided") {
    return localStorage.getItem(key) || fallback;
}

// ========= PATIENT PROFILE =========
document.getElementById("patientProfile").innerHTML = `
<b>Name:</b> ${get("name")}<br>
<b>Age:</b> ${get("age")}<br>
<b>Gender:</b> ${get("gender")}<br>
<b>Medical History:</b> ${get("history")}<br>
<b>Smoking:</b> ${get("smoke")}<br>
<b>Alcohol:</b> ${get("alcohol")}<br>
<b>Conditions:</b> ${get("conditions")}<br>
<b>Allergies:</b> ${get("allergy")}
`;

// ========= VITALS =========
document.getElementById("vitalsInfo").innerHTML = `
<b>Blood Pressure:</b> ${get("bp")}<br>
<b>Heart Rate:</b> ${get("heart")}<br>
<b>Temperature:</b> ${get("temp")}
`;

// ========= RISK ALERTS =========
let risks = [];

if (get("smoke") === "Yes" && get("bp").includes("14")) {
    risks.push("Smoking with high BP increases cardiac risk.");
}

if (get("alcohol") === "Yes") {
    risks.push("Alcohol may interfere with medications.");
}

if (get("sleep") === "Poor" || get("mood") === "Stressed") {
    risks.push("Mental or physical stress indicators detected.");
}

document.getElementById("riskAlerts").innerHTML =
    risks.length > 0
        ? risks.map(r => "• " + r).join("<br>")
        : "<span style='color:green'>No immediate risks detected.</span>";

// ========= EDUCATION =========
document.getElementById("educationInfo").innerHTML =
    get("education_ack") !== "Not provided"
        ? "Patient acknowledged education module."
        : "Education module not completed.";

// ========= SUPPORT =========
document.getElementById("supportInfo").innerHTML = `
<b>Symptoms:</b> ${get("symptoms")}<br>
<b>Medication Reminders:</b> ${get("reminder")}
`;

// ========= WELLNESS =========
document.getElementById("wellnessInfo").innerHTML = `
<b>Sleep:</b> ${get("sleep")}<br>
<b>Activity:</b> ${get("activity")}<br>
<b>Mood:</b> ${get("mood")}
`;

// ========= NAVIGATION =========
function goTo(page) {
    window.location.href = page;
}
