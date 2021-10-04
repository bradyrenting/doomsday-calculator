function submit() {
    // Define date input element
    const date = document.getElementById('date').value;

    // Clear all alerts, to be sure
    clearAll();

    // Return if input is invalid
    if (!validate(date)) return;

    calculate(date);
}

/**
 * Check if date is valid or empty
 * @return boolean
 */
function validate(date) {
    console.log(date);
    if (!date) {
        alert(ALERT_TYPE.error, 'Incorrect date');
        return false;
    }
    return true;
}

document.getElementById('submit').onclick = submit;