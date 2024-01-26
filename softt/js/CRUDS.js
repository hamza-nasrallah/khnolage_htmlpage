let count = JSON.parse(localStorage.getItem("Courses"));
document.getElementById('num-of-courses').innerHTML = count.length;


let count1 = JSON.parse(localStorage.getItem("students"));
document.getElementById('num-of-students').innerHTML = count1.length;

let teacherRecord = JSON.parse(localStorage.getItem("teacherRecord"));
document.getElementById('num-of-teachers').innerHTML = teacherRecord.length;
