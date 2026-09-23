const cl = console.log;

const empForm = document.getElementById('empForm')
const name1 = document.getElementById('name')
const age = document.getElementById('age')
const role = document.getElementById('role')
const experience = document.getElementById('experience')
const addEmp = document.getElementById('addEmp')
const updateEmp = document.getElementById('updateEmp')
const empList = document.getElementById('empList')


// let employeeList = [
//     { id: "1", name: "Raj", age: 25, role: "Developer", experience: 2 },
//     { id: "2", name: "Neha", age: 28, role: "Designer", experience: 4 },
//     { id: "3", name: "Karan", age: 26, role: "Tester", experience: 3 },
//     { id: "4", name: "Pooja", age: 30, role: "Manager", experience: 6 },
//     { id: "5", name: "Vikas", age: 24, role: "Developer", experience: 1 }
// ];

// localStorage.setItem('employeeList', JSON.stringify(employeeList))

let employeeList = JSON.parse(localStorage.getItem("employeeList")) || []

function snackbar(msg, icon){
    Swal.fire({
        title : msg,
        icon : icon,
        timer : 3000
    })
}

function onCreateEmpList(arr){
    let res = '';

    arr.forEach((ele, i) => {
        res += `<tr id="${ele.id}">
                                <td>${i + 1}</td>
                                <td>${ele.name}</td>
                                <td>${ele.age}</td>
                                <td>${ele.role}</td>
                                <td>${ele.experience}</td>
                                <td><button onclick="onEdit(this)" class="btn btn-sm btn-success" type="button">Edit</button></td>
                                <td><button onclick="onDelete(this)" class="btn btn-sm btn-danger" type="button">Remove</button></td>

                            </tr>`
    });
    empList.innerHTML = res;
}

onCreateEmpList(employeeList)

function onSubmit(eve){
    eve.preventDefault()

    let newEmp = {
        name : name1.value,
        age : age.value,
        role : role.value,
        experience : experience.value,
        id : Date.now().toString()
    }

    employeeList.push(newEmp)
    empForm.reset();

    localStorage.setItem('employeeList', JSON.stringify(employeeList))

    let tr = document.createElement('tr')
    tr.id = newEmp.id
    tr.innerHTML = ` <td>${employeeList.length}</td>
                                <td>${newEmp.name}</td>
                                <td>${newEmp.age}</td>
                                <td>${newEmp.role}</td>
                                <td>${newEmp.experience}</td>
                                <td><button onclick="onEdit(this)" class="btn btn-sm btn-success" type="button">Edit</button></td>
                                <td><button onclick="onDelete(this)" class="btn btn-sm btn-danger" type="button">Remove</button></td>
                            `
    empList.append(tr)
    snackbar(`new employee with name ${newEmp.name} created successfully`, 'success')
}


function onEdit(ele){
    let editId= ele.closest('tr').id;
    // cl(editId)
    localStorage.setItem('updateId', editId)

    let editObj = employeeList.find(e => e.id === editId)
    // cl(editObj)

    name1.value =editObj.name
    age.value = editObj.age
    role.value = editObj.role
    experience.value = editObj.experience

    addEmp.classList.add('d-none')
    updateEmp.classList.remove('d-none')
}

function onUpdate(){
    let updateid = localStorage.getItem('updateId')
    // cl(updateId)
    localStorage.removeItem('updateId')

    let updateObj = {
        name : name1.value,
        age : age.value,
        role : role.value,
        experience : experience.value,
        id : updateid
    }
    empForm.reset();

    let getIdx = employeeList.findIndex(e => e.id === updateid)
    employeeList[getIdx] = updateObj

    localStorage.setItem('employeeList', JSON.stringify(employeeList))
    
    let upObj = document.getElementById(updateid).children
    upObj[1].innerText = updateObj.name
    upObj[2].innerText = updateObj.age
    upObj[3].innerText = updateObj.role
    upObj[4].innerText = updateObj.experience

    snackbar(`Employee with name ${updateObj.name} updated successfully`, 'success')


    addEmp.classList.remove('d-none')
    updateEmp.classList.add('d-none')
}

function onDelete(ele){
    let deleteId = ele.closest('tr').id;

    Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    
        let getIdx = employeeList.findIndex(e => e.id === deleteId)
        employeeList.splice(getIdx, 1)
        localStorage.setItem('employeeList', JSON.stringify(employeeList))
    
        ele.closest('tr').remove()
    
        snackbar(`new employee with id ${deleteId} deleted successfully`, 'success')
    
        let tr = empList.querySelectorAll('tr td:first-child');
        tr.forEach((e, i)=>{e.innerText = i +1})
    });
}

empForm.addEventListener('submit', onSubmit)
updateEmp.addEventListener('click', onUpdate)

