document.addEventListener("DOMContentLoaded", async () => {
  let studentDataArr = [];
  let general_table_section = document.querySelector(".general_table_section");
  let general_table_body = document.querySelector(".general_table_body");
  let males_table_section = document.querySelector(".males_table_section");
  let females_table_section = document.querySelector(".females_table_section");

  //defeault behaviour
  males_table_section.classList.add("d-none");
  females_table_section.classList.add("d-none");

  //fetching the data
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    studentDataArr = Object.entries(data);
  } catch (error) {
    console.log(error);
  }

  function renderStudent(student, renderArea) {
    let studentId = student.id;
    let studentFullName = `${student.first_name} ${student.last_name}`;
    let studentMail = student.email;
    let studentGender = student.gender;
    let studentImg = student.img_src;
    let studentClass = student.class;
    let studentMarks = student.marks;
    let studentPassStatus = student.passing;
    renderArea.insertAdjacentHTML(
      "beforeend",
      `<tr>
        <td class="fs-5">${studentId}</td>
        <td class="d-flex align-items-center gap-2 fs-5"><div class="student_logo_container"><img alt="studentProfile_image" src="${studentImg}"></div>${studentFullName}</td>
        <td class="fs-5">${studentGender}</td>
        <td class="fs-5">${studentClass}</td>
        <td class="fs-5">${studentMarks}</td>
        <td class="fs-5">${studentPassStatus}</td>
        <td class="fs-5">${studentMail}</td>
        </tr>`,
    );
  }

  //default Render function
  function baseRender(studentDataArr) {
    let general_table_body = document.querySelector(".general_table_body");
    studentDataArr.forEach((student) => {
      renderStudent(student[1], general_table_body);
    });
  }
  baseRender(studentDataArr);

  //sort A2Z functionality
  document.querySelector("#sortA2Z").addEventListener("click", (e) => {
    general_table_body.innerHTML = "";
    let localData = [];
    studentDataArr.forEach((student) => localData.push(student[1]));
    localData.sort((a, b) =>
      `${a.first_name} ${a.last_name}`.localeCompare(
        `${b.first_name} ${b.last_name}`,
      ),
    );
    localData.forEach((data) => renderStudent(data, general_table_body));
  });

  //sort Z2A functionality
  document.querySelector("#sortZ2A").addEventListener("click", (e) => {
    general_table_body.innerHTML = "";
    let localData = [];
    studentDataArr.forEach((student) => localData.push(student[1]));
    localData.sort((a, b) =>
      `${b.first_name} ${b.last_name}`.localeCompare(
        `${a.first_name} ${a.last_name}`,
      ),
    );
    localData.forEach((data) => renderStudent(data, general_table_body));
  });

  // sort by marks functionality
  document.querySelector("#sortByMarks").addEventListener("click", (e) => {
    general_table_body.innerHTML = "";
    let localDataArr = [];
    studentDataArr.forEach((student) => {
      localDataArr.push(student[1]);
    });
    localDataArr.sort((a, b) => a.marks - b.marks);
    localDataArr.forEach((data) => {
      renderStudent(data, general_table_body);
    });
  });

  //sort by passing functionality
  document.querySelector("#sortByPassing").addEventListener("click", (e) => {
    let renderArea = document.querySelector(".general_table_body");
    let tempStudentArr = [];
    studentDataArr.forEach((student) => {
      if (student[1].passing) {
        tempStudentArr.push(student[1]);
      }
    });
    renderArea.innerHTML = "";
    tempStudentArr.forEach((student) => {
      renderStudent(student, renderArea);
    });
  });

  //sort by class functionality
  document.querySelector("#sortByClass").addEventListener("click", () => {
    general_table_body.innerHTML = "";
    let classData = [];
    studentDataArr.forEach((student) => {
      classData.push(student[1]);
    });
    classData.sort((a, b) => a.class - b.class);
    classData.forEach((data) => renderStudent(data, general_table_body));
  });

  //sorting by gender functionality
  document.querySelector("#sortByGender").addEventListener("click", (e) => {
    general_table_section.classList.add("d-none");
    males_table_section.classList.remove("d-none");
    females_table_section.classList.remove("d-none");
    let malesArr = [];
    let femalesArr = [];
    studentDataArr.forEach((student) => {
      if (student[1].gender === "Male") {
        malesArr.push(student[1]);
      }
      if (student[1].gender === "Female") {
        femalesArr.push(student[1]);
      }
    });

    //pushing the data into the male table
    let renderAreaMale = document.querySelector(".males_table_body");
    malesArr.forEach((maleStudent) => {
      renderStudent(maleStudent, renderAreaMale);
    });

    //pushing the data into the female table
    let renderAreaFemale = document.querySelector(".females_table_body");
    femalesArr.forEach((femaleStudent) => {
      renderStudent(femaleStudent, renderAreaFemale);
    });
  });

  //search function
  function search(searchValue) {
    general_table_body.innerHTML = "";
    let filteredData = [];
    studentDataArr.forEach((currentStudent) => {
      // console.log(currentStudent);
      if (
        currentStudent[1].first_name.toLowerCase().includes(searchValue) ||
        currentStudent[1].last_name.toLowerCase().includes(searchValue) ||
        currentStudent[1].email.toLowerCase().includes(searchValue)
      ) {
        filteredData.push(currentStudent[1]);
      }
    });
    filteredData.forEach((data) => {
      // console.log(data);
      renderStudent(data, general_table_body);
    });
  }

  //search functionality on seach input
  let searchInput = document.querySelector("#search");
  searchInput.addEventListener("input", (event) => {
    const searchValue = event.target.value.toLowerCase().trim();
    search(searchValue);
  });

  //search functionality on seach button
  document.querySelector("#btnSearch").addEventListener("click", () => {
    // console.log("cl;icked");
    const searchValue = document
      .querySelector("#search")
      .value.toLowerCase()
      .trim();
    // console.log(searchValue);
    search(searchValue);
  });
});
