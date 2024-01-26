//_______________________VARS__________________________

let test_var = false;

let i1 = false;
let i2 = false;
let i3 = false;
let i4 = false;

let Name;
let Position;
let Email;
let Photo;
let Address;
let Course;
let Upload_path;

let teacherRecord = [];

let rows = document.getElementById('table_body');

//____________Show initial data from localstorge_______
if(JSON.parse(localStorage.getItem("teacherRecord")) == null) {
     teacherRecord = [];
}
else {
    teacherRecord = JSON.parse(localStorage.getItem("teacherRecord"));
    Display();
}

//__________________On click add button________________
function Add_course() {
    sweetinputs();
    des();
}

//___________________init sweetalert2__________________
function des() {
    Swal.disableButtons();
}

//___________________Input sweetalert2_________________
async function sweetinputs() {
    const { value: formValues } = await Swal.fire({
        title: 'Add Teacher',
        confirmButtonText: 'Add Teacher',
        confirmButtonColor: '#2fa74e',
        html:  `<label style = "display:flex">
                    <p style="width:25%; margin-top: revert;">Name</p>
                    <input placeholder="Teacher Name" onkeyup="validation(this,0)"  type="text" id="swal-input1" class="form-control swal2-input" style="width:80%"/>
                </label>
                <label style = "display:flex"> 
                    <p style="width:25%; margin-top: revert;">Position</p>
                    <input placeholder="Teacher Position" onkeyup="validation(this,1)" type="text" id="swal-input2" class="form-control swal2-input" style="width:80%"/>
                </label>
                <label style = "display:flex">
                    <p style="width:25%; margin-top: revert;">Email</p>
                    <input placeholder="Teacher Email" onkeyup="validation(this,2)" type="email" id="swal-input3" class="form-control swal2-input" style="width:80%"/>
                </label>
                <label style = "display:flex">
                    <p style="width:25%; margin-top: revert;">Photo</p>
                    <input placeholder="Teacher Photo" type="file" id="swal-input4" class="form-control swal2-input" style="width:80%"  onchange="FileValidation(this)" />
                </label>
                <label style = "display:flex">
                    <p style="width:25%; margin-top: revert;">Address</p>
                    <input placeholder="Teacher Address" onkeyup="validation(this,3)" type="text" id="swal-input5" class="form-control swal2-input" style="width:80%"/>
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
                Swal.fire('Save New Teacher Record', '', 'success')
            } 
            
            else if (result.isDenied) {
                Swal.fire('Changes are not saved.', '', 'info')
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
function validation(V,flag) {
    
    let condition;
    
    if(flag == 0) { //----------teacher name validation

        condition = /^[A-Z][a-z,',-]+(\s)[A-Z][a-z,',-]+$/;

        if(condition.test(V.value)) {
            i1 = true;
            V.classList.add("is-valid");
            V.classList.remove("is-invalid");
        }
        else {
            i1 = false;
            V.classList.remove("is-valid");
            V.classList.add("is-invalid");
        }
    }

    else if(flag == 1) { //----------teacher position validation

        if(V.value.length > 5 && V.value.length < 25) {
            i2 = true;
            V.classList.add("is-valid");
            V.classList.remove("is-invalid");
        }
        else {
            i2 = false;
            V.classList.remove("is-valid");
            V.classList.add("is-invalid");
        }
    }

    else if(flag == 2) { //----------teacher email validation
       
        condition = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(condition.test(V.value)) {
            i3 = true;
            V.classList.add("is-valid");
            V.classList.remove("is-invalid");
        }
        else {
            i3 = false;
            V.classList.remove("is-valid");
            V.classList.add("is-invalid");
        }
    }
    
    else { //----------teacher address validation   

        condition = /^[#.0-9a-zA-Z\s,-]+$/;
        
        if(condition.test(V.value)) {
            i4 = true;
            V.classList.add("is-valid");
            V.classList.remove("is-invalid");
        }
        else {
            i4 = false;
            V.classList.remove("is-valid");
            V.classList.add("is-invalid");
        }
    }
    
    if(i1 && i2 && i3 && i4) { //-to enable and disable sweetalert buttons
        test_var = true;
        Swal.enableButtons();
    }
    
    else {
        test_var =false;
        Swal.disableButtons();  
    }
}

//____________________Store function___________________
function storeData(Data) {

    //-convert data from String format to Array
    let teacher_init = [];
    teacher_init = Data.split("\"");
    let teacher_data = [];
    let j = 0;

    for(let i = 0; i < teacher_init.length; i++) {

        if(i%2 == 1) {
            teacher_data[j] = teacher_init[i];
            j++;
        }
    }

   // let Image = teacher_data[3].split("\\\\");
    
    let Course = {
        Name: teacher_data[0],
        Position: teacher_data[1],
        Email: teacher_data[2],
        Photo: Upload_path,
        Address: teacher_data[4],
    }

    teacherRecord.push(Course);
    localStorage.setItem("teacherRecord", JSON.stringify(teacherRecord));
    Display();
}

//________________Display data on table _______________
function Display() {
    let val = "";

    for(let i = 0; i < teacherRecord.length; i++) {

        val +=  `<tr>
                    <th>${i+1}</th>
                    <td>${teacherRecord[i].Name}</td>
                    <td><img onclick="img_onclick(${i})" style="width: 110px; height: 100px; margin-top: -30px;" class="car-img" src="${teacherRecord[i].Photo}"></td>
                    <td>${teacherRecord[i].Position}</td>
                    <td>${teacherRecord[i].Email}</td>
                    <td>${teacherRecord[i].Address}</td>
                    <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"><i class="fa-solid fa-pen"></i></button></td>
                    <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
                </tr>` ;
    }

    rows.innerHTML = val;
}

//________________On click delete button_______________
function delete_item(index) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        
        if (result.isConfirmed) {
            teacherRecord.splice(index,1);
            localStorage.setItem("teacherRecord", JSON.stringify(teacherRecord));
            Display();
            Swal.fire('Deleted!','Teachers records were deleted.','success')
        }
    })
   
}
 
//______________On click delete All button_____________
function delete_all() {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',

      }).then((result) => {
        
        if (result.isConfirmed) {
            let count = teacherRecord.length;
            for(let i = 0; i < count; i++) {
                teacherRecord.pop();
            }
            localStorage.setItem('teacherRecord',JSON.stringify(teacherRecord));
            Display();
            Swal.fire('Deleted!', 'Teachers records were deleted.','success')
        }
      })
}
 
//___________________Edit any Course___________________
function edit_item(index) {

    Name = teacherRecord[index].Name;
    Position = teacherRecord[index].Position;
    Email = teacherRecord[index].Email;
    Photo = teacherRecord[index].Photo;
    Address = teacherRecord[index].Address;

    sweetupdate(index);
    set_data();
}

//___________________Update sweetalert2________________
async function sweetupdate(INDEX) {

    const { value: formValues } = await Swal.fire({

        title: 'Add Teacher',
        confirmButtonText: 'Add Teacher',
        confirmButtonColor: '#2fa74e',
        html:  `<label style = "display:flex">
                    <p style="width:25%; margin-top: revert;">Name</p>
                    <input placeholder="Teacher Name" onkeyup="validation(this,0)"  type="text" id="swal-input1" class="form-control swal2-input" style="width:80%"/>
                </label>
                <label style = "display:flex"> 
                    <p style="width:25%; margin-top: revert;">Position</p>
                    <input placeholder="Teacher Position" onkeyup="validation(this,1)" type="text" id="swal-input2" class="form-control swal2-input" style="width:80%"/>
                </label>
                <label style = "display:flex">
                    <p style="width:25%; margin-top: revert;">Email</p>
                    <input placeholder="Teacher Email" onkeyup="validation(this,2)" type="email" id="swal-input3" class="form-control swal2-input" style="width:80%"/>
                </label>
                <label style = "display:flex">
                    <p style="width:25%; margin-top: revert;">Photo</p>
                    <input placeholder="Teacher Photo" type="file" id="swal-input4" class="form-control swal2-input" style="width:80%"  onchange="FileValidation(this)"/>
                </label>
                <label style = "display:flex">
                    <p style="width:25%; margin-top: revert;">Address</p>
                    <input placeholder="Teacher Address" onkeyup="validation(this,3)" type="text" id="swal-input5" class="form-control swal2-input" style="width:80%"/>
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
                Swal.fire('Record Teacher Updated.', '', 'success')
            
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
        })
    };
}
 
//_____________show course data in sweetalert__________
function set_data() {

    Swal.disableButtons();
    
    let In1 = document.getElementById('swal-input1');
    let In2 = document.getElementById('swal-input2');
    let In3 = document.getElementById('swal-input3');
    let In4 = document.getElementById('swal-input5');
 
    In1.value = Name;
    In2.value = Position;
    In3.value = Email;
    In4.value = Address;

    In1.classList.add('is-valid');
    In2.classList.add('is-valid');
    In3.classList.add('is-valid');
    In4.classList.add('is-valid');
 
    i1 = true;
    i2 = true;
    i3 = true;
    i4 = true;
}
 
//_____________________Update Course___________________
function update(Data,index) {

    let teacher_init = [];
    teacher_init = Data.split("\"");
    let teacher_data = [];
    let j = 0;
    
    for(let i = 0; i < teacher_init.length; i++) {
    
        if(i%2 == 1) {
            teacher_data[j] = teacher_init[i];
            j++;
        }
    }
    
    let Photo = teacher_data[3].split("\\\\");
   
    teacherRecord[index].Name = teacher_data[0];
    teacherRecord[index].Position = teacher_data[1];
    teacherRecord[index].Email = teacher_data[2];

    if(Photo[2] != null) {
        teacherRecord[index].Photo = Upload_path;
    }

    teacherRecord[index].Address = teacher_data[4];
    localStorage.setItem("teacherRecord", JSON.stringify(teacherRecord));
    Display();
}

//-------------------Search functions------------------
 
//_____________________choose select___________________
let selector = document.getElementById('sel_search');

function select_search(Value) {

    if(selector.value === "name") {
        search_data(Value,0);
    }
}
 
//________________show data after search________________
function search_data(value, column) {

    let table_content = "";

    if(column === 0) {
        table_content = "";

        for(let i = 0; i < teacherRecord.length; i++) {

            if(teacherRecord[i].Name.includes(value.value)) {

                table_content +=   `<tr>
                <th>${i+1}</th>
                <td>${teacherRecord[i].Name}</td>
                <td><img onclick="img_onclick(${i})" style="width: 110px; height: 100px; margin-top: -30px;" class="car-img" src="${teacherRecord[i].Photo}"></td>
                <td>${teacherRecord[i].Position}</td>
                <td>${teacherRecord[i].Email}</td>
                <td>${teacherRecord[i].Address}</td>
                <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"><i class="fa-solid fa-pen"></i></button></td>
                <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
             </tr>` ;
            }
        }
    }
    rows.innerHTML = table_content;
}

function img_onclick(index) {

    Swal.fire({

        title: teacherRecord[index].Name,
        imageUrl: teacherRecord[index].Photo,
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: 'Teacher photo.',
      })
}