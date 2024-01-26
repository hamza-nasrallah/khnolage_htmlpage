let courseDetailsDiv = document.getElementById("courseDetailsDiv");
let id = localStorage.getItem("id");
let Courses = [];

if (JSON.parse(localStorage.getItem("Courses")) == null) {
  Courses = [];
} else {
  Courses = JSON.parse(localStorage.getItem("Courses"));
  display();
}

function display() {
  let val = ``;
  val += `
        <div class="courseInfo">
            <h2 id="courseName">${Courses[id].Name}</h2>
            <p id="courseDes">${Courses[id].Description}</p>
            <span id="coursePeriod"><span class="red"><i class="far fa-clock me-1"></i></span><span
                    class="bold">  ${Courses[id].hours}</span> <span class="red">Hours</span> <span class="bold"> ${Courses[id].min} </span>
                <span class="red">Minutes</span></span>
            <div class="teacherImg">
                <i class="fas fa-chalkboard-teacher"></i>
                <h6 style="display:inline-block ;" id="teacherName">Teacher Name: ${Courses[id].Teacher_Name}</h6>
            </div>
        </div>
        <div class="courseImgDiv text-center">
            <img src="${Courses[id].Image}" alt="Course Image" id="courseImg">
            <p class="coursePrice"><span class="bold">Course Price:</span> ${Courses[id].Price}<span class="red">$</span></p>
            <button type="button" class="btn" id="btn" style="margin-right: 5px;">Enroll course</button>
        </div>

        `;
  courseDetailsDiv.innerHTML = val;
}
