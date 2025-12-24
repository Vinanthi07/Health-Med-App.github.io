function savePatient(){
    localStorage.setItem("name", name.value);
    localStorage.setItem("age", age.value);
    localStorage.setItem("gender", gender.value);
    localStorage.setItem("history", history.value);
    localStorage.setItem("smoke", smoke.value);
    localStorage.setItem("alcohol", alcohol.value);
    localStorage.setItem("conditions", conditions.value);
    localStorage.setItem("allergy", allergy.value);

    window.location.href = "vitals.html";
}
