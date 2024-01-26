//_______________________VARS__________________________

let test_var = false;

let i1=false;
let i2=false;
let i3=false;
let i4=false;
let i5=false;
let i6=false;

let Name;
let Price;
let Desc;
let Imag;
let hours;
let mins;
let Teacher;
let Courses =[];
let Upload_path;

let rows = document.getElementById('table_body');
//____________Show initial data from localstorge_______
if(JSON.parse(localStorage.getItem("Courses")) == null)
{
     Courses=[];
}
else {
    Courses = JSON.parse(localStorage.getItem("Courses"));
    Display();
}
//__________________On click add button________________
function Add_course()
{
    sweetinputs();
    des();
}
//___________________init sweetalert2__________________
function des()
{
    Swal.disableButtons();
}
//___________________Input sweetalert2_________________
async function sweetinputs()
{
    let teacher = JSON.parse(localStorage.getItem("teacherRecord"));
    let val1 ="";
    for(let i=0;i<teacher.length;i++)
    {
      val1 +=
      `
      <option selected>${teacher[i].Name}</option>

      `;
    }
    const { value: formValues } = await Swal.fire({
        title: 'Add Course',
        confirmButtonText: 'Add course',
        confirmButtonColor: '#2fa74e',
        html:  `<label style = "display:flex"> <p style="width:25%; margin-top: revert;">Name</p>  <input placeholder="Course Name" onkeyup="validation(this,0)"  type="text" id="swal-input1" class="form-control  swal2-input " style="width:80%"/></label>
                <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Price</p> <input placeholder="Course Price" onkeyup="validation(this,1)" type="number" id="swal-input2" class="form-control swal2-input" style="width:80%"/></label>
                <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Description</p>  <input placeholder="Course Description" onkeyup="validation(this,2)" type="text" id="swal-input3" class="form-control swal2-input" style="width:80%"/></label>
                <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Image</p> <input placeholder="Course Image" type="file" id="swal-input4" class="form-control swal2-input" style="width:80%"  onchange="FileValidation(this)"/></label>
                <label style = "display:flex"> 
                    <p style="width:25%; margin-top: revert;">Period</p>
                    <input placeholder="hours" onkeyup="validation(this,3)" type="text" id="swal-input5" class="form-control swal2-input" style="width:30%"/>
                    <p style="width:5%; margin-top: revert; margin-right: 10px; font-weight: bold;">:</p>
                    <input placeholder="min" onkeyup="validation(this,4)"  type="text" id="swal-input7" class="form-control swal2-input" style="width:30%"/>
                </label>
                <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Teacher</p>
               <select     onchange ="validation(this,10)" id="swal-input6" class="form-control swal2-input" style="width:80%">
               `
               +
                val1
               +
               `
            </select>
            </label>
                
                `,
       
        focusConfirm: true,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value,
                document.getElementById('swal-input4').value,
                document.getElementById('swal-input5').value,
                document.getElementById('swal-input7').value,
                document.getElementById('swal-input6').value
            ]
        }
    })
      if (formValues) {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            confirmButtonColor: '#2fa74e',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              storeData(JSON.stringify(formValues));
              Swal.fire('Saved New Course.', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
      };
 
}
FileValidation = (E) => {

    const reader = new FileReader();
    reader.addEventListener('load', function() {
        Upload_path = reader.result;
    })    ;
    reader.readAsDataURL(E.files[0]);
}
//_________________Validation function ________________
 function validation(V,flag)
{
    let condition;
   if(flag == 0)//---------- course name validation

   {
    condition = /^[A-Z][a-z]{2,10}$/;
    if(condition.test(V.value))
    {
        i1=true;
        V.classList.add("is-valid");
        V.classList.remove("is-invalid");
    }
    else
    {
        i1=false;
        V.classList.remove("is-valid");
        V.classList.add("is-invalid");
    }
   }
   else if(flag == 1)//----------course price validation

   {
    condition =  /^[0-9]{2,5}$/;
    if(condition.test(V.value))
    {
        i2=true;
        V.classList.add("is-valid");
        V.classList.remove("is-invalid");
    }
    else
    {
        i2=false
        V.classList.remove("is-valid");
        V.classList.add("is-invalid");
    }
   }
    else if(flag == 2)//----------course Desc validation
    {
        if(V.value.length >10 && V.value.length<5000)// any ASCII but ,must be length range 10 to 5000
        {
            i3=true;
            V.classList.add("is-valid");
            V.classList.remove("is-invalid");
       }
       else
       {
           i3=false;
           V.classList.remove("is-valid");
           V.classList.add("is-invalid");
       }
    }
    else if(flag == 3)//----------course hourse validation
    {
        condition =  /^[0-9]{1,5}$/;
        if(V.value >= 0 && V.value<24 &&condition.test(V.value))
        {
            i4=true;
            V.classList.add("is-valid");
            V.classList.remove("is-invalid");
       }
       else
       {
           i4=false;
           V.classList.remove("is-valid");
           V.classList.add("is-invalid");
       }
    }
    else if(flag == 4)//----------course min validation
    {
        condition =  /^[0-9]{1,5}$/;
        if(V.value >= 0 && V.value<60 && condition.test(V.value))
        {
            i6=true;
            V.classList.add("is-valid");
            V.classList.remove("is-invalid");
       }
       else
       {
           i6=false;
           V.classList.remove("is-valid");
           V.classList.add("is-invalid");
       }
    }
    

    if(i1 && i2 && i3 && i4  && i6)//-to enable and disable sweetalert buttons
    {
        test_var = true;
        Swal.enableButtons();
    }
    else
    {
        test_var =false;
        Swal.disableButtons();	
    }
}
//____________________Store function___________________
function storeData(Data)
{

    //-convert data from String format to Array  
    let Course_init =[]
    Course_init= Data.split("\"");
    let Course_data =[];
    let j=0
    for(let i=0;i<Course_init.length;i++)
    {
        if(i%2==1)
        {
            Course_data[j]=Course_init[i];
            j++;
        }
    }

     //let Image = Course_data[3].split("\\\\");
   let Course = 
    {
        Name : Course_data[0],
        Price : Course_data[1],
        Description : Course_data[2],
        Image : Upload_path,
        hours : Course_data[4],
        min : Course_data[5],
        Teacher_Name : Course_data[6],
        Special : 0
    }
    Courses.push(Course);
    localStorage.setItem("Courses", JSON.stringify(Courses));
    Display();
}
//________________Display data on table _______________
function Display()
{
    let val ="";
    for(let i=0;i<Courses.length;i++)
    {
        val +=  `<tr>
                    <th>${i+1}</th>
                    <td>${Courses[i].Name}</td>
                    <td>${Courses[i].Price} <span style="font-weight: bold;">$</span></td>
                    <td>${Courses[i].Teacher_Name}</td>
                    <td>
                        <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours}
                        <span style="font-weight: bold;">h</span> 
                        <span style="font-weight: bold;">:</span> ${Courses[i].min}
                        <span style="font-weight: bold;">m</span>
                    </td>
                    <td><img onclick = "img_onclick(${i})" style="width: 120px; height: 70px; text-align: center;" class="car-img" src="${Courses[i].Image}"></td>
                    <td style="margin:auto;"><button class="btn btn-secondary" onclick="Desc_val(${i})"><i class="fa-solid fa-file-medical"></i></button></td>
                    <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                    <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> </button></td>
                `;

                    if(Courses[i].Special == 1)
                    {
                        val+= 
                        `
                        <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info" Checked/> </td>
                        </tr>
                        `;
                    }
                    else
                    {
                        val+= 
                        `
                        <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info"/> </td>
                        </tr>
                        `; 
                    }
                    

    }
    rows.innerHTML = val;
}
//-------------------Delete functions------------------
//________________On click delete button_______________
function delete_item(index)
{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            Courses.splice(index,1);
            localStorage.setItem("Courses", JSON.stringify(Courses));
            Display();
          Swal.fire('Deleted!','Courses has been deleted.','success')
        }
      })
   
}
//______________On click delete All button_____________
function delete_all()
{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            let count = Courses.length;
            for(let i=0 ;i<count;i++)
            {
            Courses.pop();
            }
            localStorage.setItem('Courses',JSON.stringify(Courses));
            Display();
          Swal.fire('Deleted!','Your course has been deleted.','success')
        }
      })
}
//-------------------Edit functions--------------------
//___________________Edit any Course___________________
function edit_item(index)
{
    Name =Courses[index].Name;
    Price =Courses[index].Price;
    Desc =Courses[index].Description;
    Imag =Courses[index].Image;
    hours =Courses[index].hours;
    mins =Courses[index].min;
    Teacher =Courses[index].Teacher_Name;
    sweetupdate(index);
    set_data();
}
//___________________Update sweetalert2________________
async function sweetupdate(INDEX)
{let teacher = JSON.parse(localStorage.getItem("teacherRecord"));
let val1 ="";
for(let i=0;i<teacher.length;i++)
{
  val1 +=
  `
  <option selected>${teacher[i].Name}</option>

  `;
}
const { value: formValues } = await Swal.fire({
    title: 'Update for ' + Courses[INDEX].Name +' Course',
    confirmButtonText: 'Add course',
    confirmButtonColor: '#2fa74e',
    html:  `<label style = "display:flex"> <p style="width:25%; margin-top: revert;">Name</p>  <input placeholder="Course Name" onkeyup="validation(this,0)"  type="text" id="swal-input1" class="form-control  swal2-input " style="width:80%"/></label>
            <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Price</p> <input placeholder="Course Price" onkeyup="validation(this,1)" type="number" id="swal-input2" class="form-control swal2-input" style="width:80%"/></label>
            <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Description</p>  <input placeholder="Course Description" onkeyup="validation(this,2)" type="text" id="swal-input3" class="form-control swal2-input" style="width:80%"/></label>
            <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Image</p> <input placeholder="Course Image" type="file" id="swal-input4" class="form-control swal2-input" style="width:80%" onchange="FileValidation(this)" /></label>
            <label style = "display:flex"> 
                <p style="width:25%; margin-top: revert;">Period</p>
                <input placeholder="hours" onkeyup="validation(this,3)" type="text" id="swal-input5" class="form-control swal2-input" style="width:30%"/>
                <p style="width:5%; margin-top: revert; margin-right: 10px; font-weight: bold;">:</p>
                <input placeholder="min" onkeyup="validation(this,4)"  type="text" id="swal-input7" class="form-control swal2-input" style="width:30%"/>
            </label>
            <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Teacher</p>
           <select     onchange="validation(this,10)" id="swal-input6" class="form-control swal2-input" style="width:80%">
           `
           +
            val1
           +
           `
        </select>
        </label>
            
            `,
        focusConfirm: true,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value,
            document.getElementById('swal-input3').value,
            document.getElementById('swal-input4').value,
            document.getElementById('swal-input5').value,
            document.getElementById('swal-input7').value,
            document.getElementById('swal-input6').value
          ]
        }
      })
      if (formValues) {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            confirmButtonColor: "#218838",
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                update(JSON.stringify(formValues),INDEX);
              Swal.fire('Course Updated.', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
      };
}
//_____________show course data in sweetalert__________
function set_data()
{
    Swal.disableButtons();
    let In1 = document.getElementById('swal-input1');
    let In2 = document.getElementById('swal-input2');
    let In3 = document.getElementById('swal-input3');
    let In4 = document.getElementById('swal-input6');
    let In5 = document.getElementById('swal-input5');
    let In6 = document.getElementById('swal-input7');

    In1.value = Name;
    In2.value = Price;
    In3.value = Desc;
    In4.value = Teacher;
    In5.value = hours;
    In6.value = mins;

    In1.classList.add('is-valid');
    In2.classList.add('is-valid');
    In3.classList.add('is-valid');
    In5.classList.add('is-valid');
    In6.classList.add('is-valid');

    i1 = true;
    i2 = true;
    i3 = true;
    i4 = true;
    i5 = true;
    i6 = true;
}
//_____________________Update Course___________________
function update(Data,index)
{
    let Course_init =[]
    Course_init= Data.split("\"");
    let Course_data =[];
    let j=0
    for(let i=0;i<Course_init.length;i++)
    {
        if(i%2==1)
        {
            Course_data[j]=Course_init[i];
            j++;
        }
    }
    let Image = Course_data[3].split("\\\\");
    
        Courses[index].Name = Course_data[0];
        Courses[index].Price = Course_data[1];
        Courses[index].Description = Course_data[2];
        if(Image[2]!=null)
        {
        Courses[index].Image = Upload_path;
        }
        Courses[index].hours = Course_data[4];
        Courses[index].min = Course_data[5];
        Courses[index].Teacher_Name = Course_data[6];
        localStorage.setItem("Courses", JSON.stringify(Courses));
        Display();
} 
//-------------------Search functions------------------
//_____________________choose select___________________
let selector = document.getElementById('sel_search');
function select_search(Value)
{
    if(selector.value === "name")
    {
        search_data(Value,0);
    }
    else if(selector.value === "price")
    {
        search_data(Value,1);
    }
    else
    {
        search_data(Value,2);
    }
}
//________________show data after search________________
function search_data(value,column)
{
    let table_content ="";
    if(column === 0)
    {
        table_content ="";
    for(let i=0;i<Courses.length;i++)
    {
        if(Courses[i].Name.includes(value.value))
        {
            table_content +=
            `<tr>
            <th>${i+1}</th>
            <td>${Courses[i].Name}</td>
            <td>${Courses[i].Price} <span style="font-weight: bold;">$</span></td>
            <td>${Courses[i].Teacher_Name}</td>
            <td>
                <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours}
                <span style="font-weight: bold;">h</span> 
                <span style="font-weight: bold;">:</span> ${Courses[i].min}
                <span style="font-weight: bold;">m</span>
            </td>
            <td><img onclick = "img_onclick(${i})" style="width: 120px; height: 70px; text-align: center;" class="car-img" src="${Courses[i].Image}"></td>
            <td style="margin:auto;"><button class="btn btn-secondary" onclick="Desc_val(${i})"><i class="fa-solid fa-file-medical"></i></button></td>
            <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
            <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> </button></td>
             `;

                if(Courses[i].Special == 1)
                {
                    table_content+= 
                    `
                    <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info" Checked/> </td>
                    </tr>
                    `;
                }
                else
                {
                    table_content+= 
                    `
                    <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info"/> </td>
                    </tr>
                    `; 
                } 
        }
    }
    }
    else  if(column === 1)
    {
        table_content ="";
    for(let i=0;i<Courses.length;i++)
    {
        if(Courses[i].Price.includes(value.value))
        {
            table_content +=
            `<tr>
                <th>${i+1}</th>
                <td>${Courses[i].Name}</td>
                <td>${Courses[i].Price} <span style="font-weight: bold;">$</span></td>
                <td>${Courses[i].Teacher_Name}</td>
                <td>
                    <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours}
                    <span style="font-weight: bold;">h</span> 
                    <span style="font-weight: bold;">:</span> ${Courses[i].min}
                    <span style="font-weight: bold;">m</span>
                </td>
                <td><img onclick = "img_onclick(${i})" style="width: 120px; height: 70px; text-align: center;" class="car-img" src="${Courses[i].Image}"></td>
                <td style="margin:auto;"><button class="btn btn-secondary" onclick="Desc_val(${i})"><i class="fa-solid fa-file-medical"></i></button></td>
                <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> </button></td>
            `;

                    if(Courses[i].Special == 1)
                    {
                        table_content+= 
                        `
                        <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info" Checked/> </td>
                        </tr>
                        `;
                    }
                    else
                    {
                        table_content+= 
                        `
                        <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info"/> </td>
                        </tr>
                        `; 
                    }
        }
    }
    }
    else
    {
        table_content ="";
        for(let i=0;i<Courses.length;i++)
        {
            if(Courses[i].Teacher_Name.includes(value.value))
            {
                table_content +=
                `<tr>
                <th>${i+1}</th>
                <td>${Courses[i].Name}</td>
                <td>${Courses[i].Price} <span style="font-weight: bold;">$</span></td>
                <td>${Courses[i].Teacher_Name}</td>
                <td>
                    <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours}
                    <span style="font-weight: bold;">h</span> 
                    <span style="font-weight: bold;">:</span> ${Courses[i].min}
                    <span style="font-weight: bold;">m</span>
                </td>
                <td><img onclick = "img_onclick(${i})" style="width: 120px; height: 70px; text-align: center;" class="car-img" src="${Courses[i].Image}"></td>
                <td style="margin:auto;"><button class="btn btn-secondary" onclick="Desc_val(${i})"><i class="fa-solid fa-file-medical"></i></button></td>
                <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> </button></td>
                `;

                    if(Courses[i].Special == 1)
                    {
                        table_content+= 
                        `
                        <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info" Checked/> </td>
                        </tr>
                        `;
                    }
                    else
                    {
                        table_content+= 
                        `
                        <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info"/> </td>
                        </tr>
                        `; 
                    }
            }
        }
    }
    rows.innerHTML = table_content;
}
async function Desc_val(index)
{
    Swal.fire({
        title :'Description for '+ Courses[index].Name,
        text: Courses[index].Description,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
}
function img_onclick(index)
{
    Swal.fire({
        title: Courses[index].Name,
        text: 'Course Image ...',
        imageUrl: Courses[index].Image,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}
function Special(index,val)
{
    if(val.checked)
    {
        Courses[index].Special = 1;
    }
    else
    {
        Courses[index].Special = 0;
    }
    localStorage.setItem("Courses", JSON.stringify(Courses));
}