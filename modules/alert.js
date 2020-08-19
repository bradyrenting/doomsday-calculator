const alertElement = document.getElementById('alert');

const ALERT_TYPE = {
    error: {
        class: 'text-red-500 py-4'
    },
    success: {
        class: 'text-green-500 font-bold py-4'
    }
};

/**
 * Create an alert
 * @param type
 * @param content
 */
function alert(type, content) {
    const element = document.createElement('div');
    element.innerHTML = `<p class="${type.class}"> ${content} </p>`;

    alertElement.appendChild(element);
}

/**
 * Clears all shown alerts
 */
function clearAll() {
    alertElement.innerHTML = '';
}