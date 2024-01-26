let teacherDetailsDiv = document.getElementById("teacherDetailsDiv");
let TeacherId = localStorage.getItem("Teacherid");
let Teacher = [];

if (JSON.parse(localStorage.getItem("teacherRecord")) == null) {
  Teacher = [];
} else {
  Teacher = JSON.parse(localStorage.getItem("teacherRecord"));
  display();
}

function display() {
    let Courses = [];
    Courses = JSON.parse(localStorage.getItem("Courses"));
    let count =0;
    let val2 ='';
    for(let i=0;i<Courses.length;i++)
    {
        if(Teacher[TeacherId].Name === Courses[i].Teacher_Name)
        {
            count++;
        
        val2 +=
        `
         <div class="d-flex courses" onclick="ShowCourse(${i})">
           <img style="width: 100px" src="${Courses[i].Image}"/>
           <h4>${Courses[i].Name }  Course</h4>
           <h5><i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours} H ${Courses[i].min} M </h5>
           <h5>${Courses[i].Price} $ </h5>
         
           </div> 
         <hr>
        `;
        }
    }
    let pro_img = document.getElementById('img');

    let val1 =`<img class="Teacher-img" src="${Teacher[TeacherId].Photo}" style="border-radius: 50%; width:200px">
    `;
    pro_img.innerHTML = val1;
  let val = ``;
  val += `
        <div class="col-12 profile">
            <h2 id="TeacherName" style="margin-top : 50px"> ${Teacher[TeacherId].Name}</h2>
            
             <table class="table">
                <thead>
                <tr>
                    <th scope="col">Courses(${count})</th>
                    <th scope="col">Students(30)</th>
                    <th scope="col">Reviews(10)</th>

                </tr>
            </thead>
            </table>
            <div class="input-data">

                 <h4 style="text-align :center;margin-bottom:30px"><i class="fa-solid fa-at"></i> ${Teacher[TeacherId].Email} </h4>
                 <h4 style="text-align :center;margin-bottom:30px"> <i class="fa-brands fa-buromobelexperte"></i> ${Teacher[TeacherId].Position} </h4>
                 <h4 style="text-align :center;margin-bottom:30px"> <i class="fa-solid fa-location-dot"></i> ${Teacher[TeacherId].Address} </h4>

                 </div>
            </div>
        `;
        let mycourses = document.getElementById('mycourses');
        mycourses.innerHTML = val2;
        teacherDetailsDiv.innerHTML = val;
}
function ShowCourse(id)
{
    localStorage.setItem('id',id);
    window.location.href = 'COURSE.html';
}


