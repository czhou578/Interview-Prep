const listsContainer = document.querySelector('[data-lists]') //brackets mean attribute
 
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks] ')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')


const LOCAL_STORAGE_LIST_KEY = "task.lists" //local storage key
const LOCAL_STORAGE_SELECTED_LIST_KEY = "task.selectedListId"

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_KEY);

listsContainer.addEventListener('click', e => {
  if(e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
})

tasksContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedList = lists.find(list.id === selectedListId) 
    const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
    selectedTask.complete = e.target.checked;
    save();
    renderTaskCount(selectedList)
  }
})

deleteListButton.addEventListener('click', e => {
  lists = lists.filter(lists => lists.id !== selectedListId)
  selectedListId = null;
  saveAndRender();
})

newListForm.addEventListener('submit', e=> {
  e.preventDefault();
  const listName = newListInput.value //input typed in
  if(listName == null || listName == '') {
    return;
  }
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
})

newTaskForm.addEventListener('submit', e=> {
  e.preventDefault();
  const taskName = newTaskInput.value //input typed in
  if(taskName == null || taskName == '') {
    return;
  }
  const list = createTask(taskName);
  newTaskInput.value = null;
  const selectedList = lists.find(list => list.id === selectedListId)
  selectedList.tasks.push(task)
  saveAndRender();
})

function createTask(name) {
  return({id: Date.now().toString(), name: name, complete: false})

}

function createList(name) {
  return({id: Date.now().toString(), name: name, tasks: []})
}

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_KEY, selectedListId);
}

function render() {
  clearElement(listsContainer);
  renderLists();
  const selectedList = lists.find(list => list.id === selectedListId);

  if (selectedListId == null) {
    listDisplayContainer.style.display = 'none';

  } else {

    listDisplayContainer.style.display = '';
    listTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);
    clearElement(tasksContainer);
    renderTasks(selectedList)
  }
}

// function renderTasks(selectedList) {
//   selectedList.tasks.forEach(tasl => {
//     const taskElement = document.importNode(taskTemplate.content, true);
//     const checkbox = taskElement.querySelector('input')
//     checkbox.id = task.id
//     checkbox.checked = task.complete
//     const label = taskElement.querySelector('label')
//     label.htmlFor = task.id
//     label.append(task.name);
//     tasksContainer.appendChild(taskElement)
//     console.log(tasksContainer)
//   })
// }

// function renderTaskCount(selectedList) {
//   const incompleteTasks = selectedList.tasks.filter(task => !task.complete).length
//   const taskString = incompleteTasks === 1 ? "task" : "tasks";
//   listCountElement.innerText = `${incompleteTasks} ${taskString} remaining`
// }

function renderLists() {
  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id; //to know what element was clicked
    console.log(list.id)
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      console.log(list.id)
      console.log(selectedListId)
      listElement.classList.add('active-list')
    }
    listsContainer.appendChild(listElement);
  })
}

function clearElement(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

render()