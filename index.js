// Your code here
function createRecord(keyData, valueData) {
  return Object.assign(...keyData.map((key, index) => ({[key]: valueData[index]})));
}

function createEmployeeRecord(employeeData) {
  let keyData = ["firstName", "familyName", "title", "payPerHour"];
  if (keyData.length != employeeData.length || keyData.length == 0 || employeeData.length == 0) {
    return null;
  }
  let recordEmployee = createRecord(keyData, employeeData);
  recordEmployee["timeInEvents"] = [];
  recordEmployee["timeOutEvents"] = [];
  return recordEmployee;
}

function createEmployeeRecords(arrayEmployeeDatas) {
  let employeeRecords = {};
  employeeRecords = arrayEmployeeDatas.map((employeeData) => createEmployeeRecord(employeeData));
  return employeeRecords;
}

function createTimeEvent(recordEmployee, timeEvent, inOutEvent) {
  let timeWord = inOutEvent.replace("Events", "");
  let eventName = timeWord[0].toUpperCase() + timeWord.slice(1);
  let timeSplit = timeEvent.split(" ");
  timeSplit[1] = parseInt(timeSplit[1]);
  let keyTime = ["date", "hour"];
  let recordTime = createRecord(keyTime, timeSplit);
  recordEmployee[inOutEvent].push(recordTime);
  recordEmployee[inOutEvent][recordEmployee[inOutEvent].length - 1]["type"] = eventName;
  return recordEmployee;
}

function createTimeInEvent(recordEmployee, timeInEvent) {
  return createTimeEvent(recordEmployee, timeInEvent, "timeInEvents");
}

function createTimeOutEvent(recordEmployee, timeOutEvent) {
  return createTimeEvent(recordEmployee, timeOutEvent, "timeOutEvents");
}

function hoursWorkedOnDate(recordEmployee, date) {
  let eventIn = recordEmployee["timeInEvents"].filter(timeInEvent => timeInEvent["date"] === date);
  let eventOut = recordEmployee["timeOutEvents"].filter(timeOutEvent => timeOutEvent["date"] === date);
  return (eventIn.length && eventOut.length) ? (eventOut[0].hour/100 - eventIn[0].hour/100) : 0;
}

function wagesEarnedOnDate(recordEmployee, date) {
  let hoursWorked = hoursWorkedOnDate(recordEmployee, date);
  return hoursWorked * recordEmployee["payPerHour"];
}

function allWagesFor(recordEmployee) {
  let datesList = recordEmployee["timeInEvents"].map(inEvent => inEvent.date);
  let wageList = datesList.map(date => wagesEarnedOnDate(recordEmployee, date));
  return wageList.reduce((sum, val) => sum + val);
}

function calculatePayroll(employeeRecords) {
  let wageEmployees = employeeRecords.map(recordEmployee => allWagesFor(recordEmployee));
  return wageEmployees.reduce((sum, val) => sum + val);
}
