const API =
"http://localhost:5000/api/students";

const form =
document.getElementById("studentForm");

const studentList =
document.getElementById("studentList");

async function loadStudents(){

  const res =
  await fetch(API);

  const students =
  await res.json();

  studentList.innerHTML = "";

  students.forEach(student => {

    studentList.innerHTML += `
    <div class="student">

      <div>
        <h3>${student.name}</h3>
        <p>${student.course}</p>
      </div>

      <div>

        <button
        onclick="editStudent(
        ${student.id},
        '${student.name}',
        '${student.course}'
        )">
        Edit
        </button>

        <button
        onclick="deleteStudent(
        ${student.id}
        )">
        Delete
        </button>

      </div>

    </div>
    `;
  });
}

form.addEventListener(
"submit",
async (e) => {

  e.preventDefault();

  const name =
  document.getElementById("name").value;

  const course =
  document.getElementById("course").value;

  await fetch(API,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,
      course
    })
  });

  form.reset();

  loadStudents();
});

async function deleteStudent(id){

  await fetch(
    `${API}/${id}`,
    {
      method:"DELETE"
    }
  );

  loadStudents();
}

async function editStudent(
id,
oldName,
oldCourse
){

  const name =
  prompt(
  "Edit Name",
  oldName
  );

  const course =
  prompt(
  "Edit Course",
  oldCourse
  );

  await fetch(
  `${API}/${id}`,
  {
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,
      course
    })
  });

  loadStudents();
}

loadStudents();
