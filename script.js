let toDoList = [];

const renderToDo = (todo) => {
    localStorage.setItem('toDoListRef', JSON.stringify(toDoList));
    const list = document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        return
    }

    const isChecked = todo.checked ? 'done' : '';
    const node = document.createElement('li');
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `<input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

const addToDo = () => {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    toDoList.push(todo);
    renderToDo(todo);
}

const toggleDone = (key) => {
    const index = toDoList.findIndex(item => item.id === Number(key));
    toDoList[index].checked = !toDoList[index].checked;
    renderToDo(toDoList[index]);
}

const deleteTodo = key => {
    const index = toDoList.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...toDoList[index]
    };
    toDoList = toDoList.filter(item => item.id !== Number(key));
    renderToDo(todo);
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');
    text = input.value.trim();
        if (text !== '') {
        addToDo(text);
        input.value = '';
        input.focus();
        }
} );

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }
    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
        }
})

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('toDoListRef');
    if (ref) {
      toDoList = JSON.parse(ref);
      toDoList.forEach(t => {
        renderToDo(t);
      });
    }
  });
