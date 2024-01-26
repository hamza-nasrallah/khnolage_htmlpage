let AllCourses = document.getElementById('All-Courses');
let Courses = [];
if(JSON.parse(localStorage.getItem("Courses")) == null)
{
     Courses=[];
}
else {
    Courses = JSON.parse(localStorage.getItem("Courses"));
    Display();
}
Display();
    

function Display()
{
    let Teachers = JSON.parse(localStorage.getItem("teacherRecord"));
    let path;
    let val =``;
    for(let i=0;i<Courses.length;i++)
    {
        for(let k =0;k<Teachers.length;k++)
        {
           
            if(Courses[i].Teacher_Name === Teachers[k].Name)
            {
                path = Teachers[k].Photo;
            }
        }
        val +=
        `
        <div class="show-course" style="width:23%;">
        <img src="${Courses[i].Image}" style="width:100% ; margin:0px 0px ; border-top-left-radius: .75rem; border-top-right-radius: .75rem;">
        <div style="margin-top:10px ; margin-left:10px ;">
            <h4>${Courses[i].Name} Course</h4>
            <p><i class="fa-solid fa-clock" ></i> ${Courses[i].hours} hours ${Courses[i].min} minutes</p>
            <p><i class="fa-solid fa-file-invoice-dollar"></i> ${Courses[i].Price} $</p>
            <hr>
            <img src="${path}" style="width:30px; border-radius:50% ;">
            <h6 style="display:inline-block ;">${Courses[i].Teacher_Name}</h6>
        </div>
        </div>
        `
    }
    AllCourses.innerHTML = val;
}

let divs = document.querySelectorAll('.show-course');

for(let i =0;i<Courses.length;i++) {

    divs[i].addEventListener('click', ()=> {
        pass(i);
    })
}
// passing data to product html page
function pass(id)
{
    localStorage.setItem('id',id);
    window.location.href = 'COURSE.html';
}