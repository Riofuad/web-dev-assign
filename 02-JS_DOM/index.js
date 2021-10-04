// getting all required elements
const inputBox = document.querySelector('.inputField input')
inputBox.placeholder = 'Enter list here (e.g. milk, eggs, etc.)'
const addBtn = document.querySelector('.inputField button')
const shoppingList = document.querySelector('.shoppingList')
const deleteAllBtn = document.querySelector('.footer button')

showTasks() // calling showTasks function

// if user click on the add button
addBtn.onclick = () => {
    let userData = inputBox.value // getting user entered value
    let getLocalStorage = localStorage.getItem('New List') // getting localStorage

    if (userData === ''){
        alert('Item cant empty!')
        inputBox.focus()
        inputBox.placeholder = 'Insert here!'
    } else {
        if(getLocalStorage == null){ // if localStorage is null
            listArr = [] // creating blank array
        } else {
            listArr = JSON.parse(getLocalStorage) // transforming json string into a js object
            inputBox.placeholder = 'Enter list here (e.g. milk, eggs, etc.)'
        }

        if (listArr.includes(`${userData}`)){
            alert(`${userData} already added`)
            inputBox.focus()
            // console.log(`${userData}`)
        } else {
            listArr.push(userData) // pushing or adding user data
            localStorage.setItem('New List', JSON.stringify(listArr)) // transforming js object into a json string
            inputBox.focus()
        }
    }
    showTasks() // calling showTasks function
}

// function to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem('New List') // getting localStorage

    if(getLocalStorage == null){ // if localStorage is null
        listArr = [] // creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage) // transforming json string into a js object
    }

    const pendingNumb = document.querySelector('.pendingNumb')
    pendingNumb.textContent = listArr.length // passing the length value in pendingNumb

    // Clear All Button
    if(listArr.length > 0){ // if array length is greater than 0
        deleteAllBtn.classList.add('active') // active the clearAll button
    } else {
        deleteAllBtn.classList.remove('active') // unactive the clearAll button
    }

    // Add li tag inside ul tag
    let newLiTag = ''
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="bi bi-trash"></i></span></li>`
    });
    shoppingList.innerHTML = newLiTag // adding new li tag inside ul tag
    inputBox.value = '' // once task added leave the input field blank
}

// delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem('New List')
    listArr = JSON.parse(getLocalStorage)
    listArr.splice(index, 1) // delete or remove the particular indexed li

    // after remove the li again update the local storage
    localStorage.setItem('New List', JSON.stringify(listArr)) // transforming js object into a json string
    showTasks() // calling showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = () => {
    listArr =[] // empty an array

    // after delete all tasks again update the local storage
    localStorage.setItem('New List', JSON.stringify(listArr)) // transforming js object into a json string
    showTasks() // calling showTasks function
}