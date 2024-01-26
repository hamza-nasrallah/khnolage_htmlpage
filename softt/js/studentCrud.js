//var deceleration
let test_var = false;

//used on the regex validation
let i1 = false;
let i2 = false;
let i3 = false;
let i4 = false;

let studentName;
let studentAverage;
let studentAddress;
let studentAge;

let students = [];

//catch the body of the table
let rows = document.getElementById("table_body");

//to get search select element
let selector = document.getElementById("sel_search");

//show initial data from the local storage
if (JSON.parse(localStorage.getItem("students")) == null) {
  students = [];
} 
else {
  students = JSON.parse(localStorage.getItem("students"));
  Display();
}

//function to display popup to add students
function add_student() {
  sweetinputs();
  des();
}

//function to disable the button
function des() {
  Swal.disableButtons();
}

//function to display the sweet alert as popup
async function sweetinputs() {
  const { value: formValues } = await Swal.fire({
    title: "Add Student",
    confirmButtonText: "Add Student",
    confirmButtonColor: "#218838",
    html:
        `
        <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Name</p> <input placeholder="Student Name" onkeyup="validation(this,0)"  type="text" id="swal-input1" class="form-control  swal2-input " style="width:80%"/></label>
        <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Average</p> <input placeholder="Student Average" onkeyup="validation(this,1)" type="number" id="swal-input2" class="form-control swal2-input" style="width:80%"/></label>
        <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Address</p> <input placeholder="Student Address" onkeyup="validation(this,2)" type="text" id="swal-input3" class="form-control swal2-input" style="width:80%"/></label>
        <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Age</p> <input placeholder="Student Age" onkeyup="validation(this,3)" type="number" id="swal-input4" class="form-control swal2-input" style="width:80%"/></label>
        `,

    focusConfirm: true,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
        document.getElementById("swal-input3").value,
        document.getElementById("swal-input4").value,
      ];
    },
  });
  if (formValues) {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      confirmButtonColor: "#218838",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        storeData(JSON.stringify(formValues));
        Swal.fire("New Student Saved", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
}

//validate function
function validation(V, flag) {
  let condition;
  //Student name validation
  if (flag == 0) {
    condition = /^[A-Z][a-z,',-]+(\s)[A-Z][a-z,',-]+$/;
    if (condition.test(V.value)) {
      i1 = true;
      V.classList.add("is-valid");
      V.classList.remove("is-invalid");
    } else {
      i1 = false;
      V.classList.remove("is-valid");
      V.classList.add("is-invalid");
    }
    //Student Average Validation
  } else if (flag == 1) {
    if (V.value >= 0 && V.value <= 100) {
      i2 = true;
      V.classList.add("is-valid");
      V.classList.remove("is-invalid");
    } else {
      i2 = false;
      V.classList.remove("is-valid");
      V.classList.add("is-invalid");
    }
    //Student Address Validation
  } else if (flag == 2) {
    condition = /^[#.0-9a-zA-Z\s,-]+$/;
    if (V.value.length >= 5 && V.value.length <= 200) {
      i3 = true;
      V.classList.add("is-valid");
      V.classList.remove("is-invalid");
    } else {
      i3 = false;
      V.classList.remove("is-valid");
      V.classList.add("is-invalid");
    }
    //Student Age Validation
  } else if (flag == 3) {
    if (V.value >= 0 && V.value <= 100) {
      i4 = true;
      V.classList.add("is-valid");
      V.classList.remove("is-invalid");
    } else {
      i4 = false;
      V.classList.remove("is-valid");
      V.classList.add("is-invalid");
    }
  }
  //display sweet alert button
  if (i1 && i2 && i3 && i4) {
    test_var = true;
    Swal.enableButtons();
  } else {
    test_var = false;
    Swal.disableButtons();
  }
}

//function to add student to the local storage
function storeData(Data) {
  //-convert data from String format to Array
  let student_init = [];
  student_init = Data.split('"');
  let student_data = [];
  let j = 0;
  for (let i = 0; i < student_init.length; i++) {
    if (i % 2 == 1) {
      student_data[j] = student_init[i];
      j++;
    }
  }
  let student = {
    name: student_data[0],
    average: student_data[1],
    address: student_data[2],
    age: student_data[3],
  };
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  Display();
}

//function to display student data
function Display() {
  let val = "";
  for (let i = 0; i < students.length; i++) {
    val += `<tr>
                <td>${i + 1}</td>
                <td>${students[i].name}</td>
                <td>${students[i].average}%</td>
                <td>${students[i].address}</td>          
                <td>${students[i].age}</td>
                <td><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                <td><button onclick="delete_item(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`;
  }
  rows.innerHTML = val;
}

//function to delete one student
function delete_item(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      students.splice(index, 1);
      localStorage.setItem("students", JSON.stringify(students));
      Display();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
}
//function to delete all student
function delete_all() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let count = students.length;
      for (let i = 0; i < count; i++) {
        students.pop();
      }
      localStorage.setItem("students", JSON.stringify(students));
      Display();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
}

//show student data in sweet alert when inter on edit
function edit_item(index) {
  stdName = students[index].name;
  stdAverage = students[index].average;
  stdAddress = students[index].address;
  stdAge = students[index].age;
  sweetupdate(index);
  set_data();
}

async function sweetupdate(INDEX) {
  const { value: formValues } = await Swal.fire({
    title: "Update Student " + students[INDEX].name + " Information",
    confirmButtonText: "Update record",
    confirmButtonColor: "#4361ee",
    html:
        `
        <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Name</p>    <input placeholder="Student Name" onkeyup="validation(this,0)"  type="text" id="swal-input1" class="form-control  swal2-input " style="width:80%"/></label>
        <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Average</p> <input placeholder="Student Average" onkeyup="validation(this,1)" type="number" id="swal-input2" class="form-control swal2-input" style="width:80%"/></label>
        <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Address</p> <input placeholder="Student Address" onkeyup="validation(this,2)" type="text" id="swal-input3" class="form-control swal2-input" style="width:80%"/></label>
        <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Age</p>     <input placeholder="Student Age" onkeyup="validation(this,3)" type="number" id="swal-input4" class="form-control swal2-input" style="width:80%"/></label>
        `,

    focusConfirm: true,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
        document.getElementById("swal-input3").value,
        document.getElementById("swal-input4").value,
      ];
    },
  });
  if (formValues) {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      confirmButtonColor: "#218838",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        update(JSON.stringify(formValues), INDEX);
        Swal.fire("Student record were updated.", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved.", "", "info");
      }
    });
  }
}

function set_data() {
  Swal.disableButtons();
  let stdNameInput = document.getElementById("swal-input1");
  let stdAverageInput = document.getElementById("swal-input2");
  let stdAddressInput = document.getElementById("swal-input3");
  let stdAgeInput = document.getElementById("swal-input4");

  stdNameInput.value = stdName;
  stdAverageInput.value = stdAverage;
  stdAddressInput.value = stdAddress;
  stdAgeInput.value = stdAge;

  stdNameInput.classList.add("is-valid");
  stdAverageInput.classList.add("is-valid");
  stdAddressInput.classList.add("is-valid");
  stdAgeInput.classList.add("is-valid");

  i1 = true;
  i2 = true;
  i3 = true;
  i4 = true;
}

function update(Data, index) {
  let student_init = [];
  student_init = Data.split('"');
  let student_data = [];
  let j = 0;
  for (let i = 0; i < student_init.length; i++) {
    if (i % 2 == 1) {
      student_data[j] = student_init[i];
      j++;
    }
  }
  students[index].name = student_data[0];
  students[index].average = student_data[1];
  students[index].address = student_data[2];
  students[index].age = student_data[3];
  localStorage.setItem("students", JSON.stringify(students));
  Display();
}

// search functions

//choose select
function select_search(Value) {
  if (selector.value === "name") {
    search_data(Value, 0);
  } else if (selector.value === "address") {
    search_data(Value, 1);
  }
}

//show result after searching
function search_data(value, column) {
  let table_content = "";
  if (column === 0) {
    table_content = "";
    for (let i = 0; i < students.length; i++) {
      if (students[i].name.includes(value.value)) {
        table_content += `<tr>
                            <td>${i + 1}</td>
                            <td>${students[i].name}</td>
                            <td>${students[i].average}%</td>
                            <td style="width : 20%">${students[i].address}</td>          
                            <td>${students[i].age}</td>
                            <td><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                            <td><button onclick="delete_item(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
                            </tr>`;
      }
    }
  } else if (column === 1) {
    table_content = "";
    for (let i = 0; i < students.length; i++) {
      if (students[i].address.includes(value.value)) {
        table_content += `<tr>
                            <td>${i + 1}</td>
                            <td>${students[i].name}</td>
                            <td>${students[i].average}%</td>
                            <td style="width : 20%">${students[i].address}</td>          
                            <td>${students[i].age}</td>
                            <td><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                            <td><button onclick="delete_item(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
                        </tr>`;
      }
    }
  }
  rows.innerHTML = table_content;
}