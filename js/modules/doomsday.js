// Century codes
//
// 1500, 1900, 2300 = 3 (wed)
// 1600, 2000, 2400 = 2 (tue)
// 1700, 2100, 2500 = 0 (sun)
// 1800, 2200, 2600 = 5 (fri)

// Doomsday months (month -> memorable day)
months = {
    1: 31,  // January
    2: 28,  // February
    3: 7,   // March
    4: 4,   // April
    5: 7,   // May
    6: 6,   // June
    7: 11,  // July
    8: 8,   // August
    9: 5,   // September
    10: 10, // October
    11: 7,  // November
    12: 12, // December
};

// Weekdays numbers
weekdays = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
};

/**
 * Gets the century code from the given century (e.g 2032 returns 2).
 * @param year
 * @return {number}
 */
function getCenturyCode(year) {
    const centuryCode = Number(Math.floor(year / 100 % 4).toFixed(0));

    switch (centuryCode) {
        case 0:
            return 2;
        case 1:
            return 0;
        case 2:
            return 5;
        case 3:
            return 3;
    }
}

/**
 * Extracts the century year from the century (e.g 2032 returns 32)
 * @param year
 * @return century year
 */
function getCenturyYear(year) {
    // Get last two numbers from the year
    return Number(String(year).slice('-2'));
}

/**
 * Checks if given year is a leap year
 * @param year
 * @return {boolean}
 */
function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

/**
 * Calculates what the doomsday weekday is for the given year.
 * @param year
 * @return {number}
 */
function calculateDoomsdayWeekday(year) {
    const centuryCode = getCenturyCode(year);
    const centuryYear = getCenturyYear(year);

    // Divide century_year by 12 and find the remainder
    const a = Math.floor(centuryYear / 12);
    const b = Math.floor(centuryYear % 12);

    // Divide the two
    const c = Math.floor(b / 4);

    // Add all together (century code + a + b + c)
    let weekday = Math.floor(centuryCode + a + b + c);

    // If number is greater than 6, find remainder of 7
    if (weekday > 6)
        weekday = weekday % 7;

    return weekday;
}

/**
 * Calculates what weekday it is for the given date.
 * @param day
 * @param month
 * @param year
 * @return {number}
 */
function calculateWeekday(day, month, year) {
    const doomsdayWeekday = calculateDoomsdayWeekday(year);

    // Get the day of the month the weekday is on
    const doomsdayDay = months[month];

    // Set weekday to the doomsday weekday as a start point
    let weekday = doomsdayWeekday;

    // Get amount of days between the provided day and the doomsday day
    let difference = (day - doomsdayDay);

    while (difference > 0) {
        // Move weekday one up and difference one down
        weekday = (weekday + 1);
        difference = (difference - 1);

        // Reset weekday if out of bounds
        if (weekday > 6) weekday = 0;
    }

    while (difference < 0) {
        // Move weekday one down and difference one up
        weekday = (weekday - 1);
        difference = (difference + 1);

        // Reset weekday if out of bounds
        if (weekday < 0) weekday = 6;
    }

    // Account for leap years by moving weekday one backward
    if ((month === 1 || month === 2) && isLeapYear(year)) {
        if (weekday === 0) {
            weekday = 6;
        } else {
            weekday = (weekday - 1);
        }
    }

    return weekday;
}

function calculate(date) {
    // Split date into variables
    const dateArray = date.split('-');

    // Each type has its own variable
    const year = Number(dateArray[0]);
    const month = Number(dateArray[1]);
    const day = Number(dateArray[2]);

    const weekdayCode = calculateWeekday(day, month, year);
    const weekdayText = weekdays[weekdayCode];

    alert(ALERT_TYPE.success, `${day}/${month}/${year} was/is on a ${weekdayText}`);
}