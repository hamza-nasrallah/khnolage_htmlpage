var swiper = new Swiper(".mySwiper-courses", {
    slidesPerView: 4,
    spaceBetween: 25,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
    },
});
let slider = document.getElementById('slider_courses');
let Courses = [];
Display();

if(JSON.parse(localStorage.getItem("Courses")) == null)
{
     Courses=[];
}
else {
    Courses = JSON.parse(localStorage.getItem("Courses"));
    Display();
}
console.log(Courses);

function Display()
{
    Courses = JSON.parse(localStorage.getItem("Courses"));
    let val ='';
    let counter = 0;
    let Teachers = JSON.parse(localStorage.getItem("teacherRecord"));
    let path;

    for(let i=0;i<Courses.length;i++)
    {
        if(Courses[i].Special == 1)
        {
            for(let k =0;k<Teachers.length;k++)
            {
               
                if(Courses[i].Teacher_Name === Teachers[k].Name)
                {
                    path = Teachers[k].Photo;

                }
            }
            counter++;
         
        val +=`  <div class="show-course swiper-slide" style="width:23%;">
                 <img src="${Courses[i].Image}" style="width:100% ; margin:0px 0px ; border-top-left-radius: .75rem; border-top-right-radius: .75rem;">
                 <div style="margin-top:10px ; margin-left:10px ;">
                 <h4>${Courses[i].Name} Course</h4>
                 <p><i class="fa-solid fa-clock" ></i> ${Courses[i].hours} hours ${Courses[i].min} minutes</p>
                 <p><i class="fa-solid fa-file-invoice-dollar"></i> ${Courses[i].Price} $</p>
                 <hr>
                 <img src="${path}" style="width:30px; border-radius:50% ;">
                 <h6 style="display:inline-block ;">${Courses[i].Teacher_Name}</h6>
                 </div>
                 </div>`;
       
        }
        else 
        {
            console.log(Courses[i].Image);
        }
    }
    slider.innerHTML = val;
}
