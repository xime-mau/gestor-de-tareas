
const tareanueva = document.getElementById('tareanueva');
const formulario = document.getElementById('form');
const cerrar = document.getElementById('close');
const lista = document.getElementById('task-list');

const confirmDialog = document.getElementById('confirmDialog');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');

let taskToDelete = null;

// Mostrar el formulario al hacer clic en "Nueva Tarea"
tareanueva.addEventListener('click', () => {
  formulario.classList.remove('hidden');
  formulario.classList.add('visible');
  tareanueva.style.display = 'none';
});

// Ocultar el formulario al hacer clic en "Cerrar"
cerrar.addEventListener('click', () => {
  formulario.classList.remove('visible');
  formulario.classList.add('hidden');
  tareanueva.style.display = 'inline-block';
});

// Manejar el envío del formulario
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('task-title').value;
  const date = document.getElementById('task-date').value;
  const description = document.getElementById('description').value;
  const task = { id: Date.now(), title, date, description };

  // Añadir la tarea 
  addTaskToDOM(task);

  // Guardar la tarea
  saveTaskToLocalStorage(task);

  // Limpiar el formulario
  formulario.reset();

  // Ocultar el formulario y mostrar el botón "Nueva Tarea"
  formulario.classList.remove('visible');
  formulario.classList.add('hidden');
  tareanueva.style.display = 'inline-block';

  // Show success notification (alert box)
  alert('¡Tarea guardada con éxito!');
});


// Función para añadir una tarea al DOM
function addTaskToDOM(task) {
  const tarea = document.createElement('li');
  tarea.setAttribute('data-id', task.id);
  tarea.innerHTML = `
      <div cl>
        <h2>${task.title}</h2>
        <p><strong>Fecha:</strong> ${task.date}</p>
        <p>${task.description}</p>
      </div>
      <div class="task-buttons">
        <button class="edit">Editar</button>
        <button class="delete">Eliminar</button>
      </div>
     
  `;

  // Insertar el nuevo elemento al principio de la lista de tareas
  lista.insertBefore(tarea, lista.firstChild);

  // Añadir evento para eliminar la tarea
  tarea.querySelector('.delete').addEventListener('click', () => {
    lista.removeChild(tarea);
    removeTaskFromLocalStorage(task.id);
    confirmDialog.showModal();
  });



  // Añadir evento para editar la tarea
  tarea.querySelector('.edit').addEventListener('click', () => {
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-date').value = task.date;
    document.getElementById('description').value = task.description;
    lista.removeChild(tarea);
    formulario.classList.remove('hidden');
    formulario.classList.add('visible');
    tareanueva.style.display = 'none';
    removeTaskFromLocalStorage(task.id);
  });
}

// Guardar tarea en localStorage
function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Eliminar tarea 
function removeTaskFromLocalStorage(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
confirmYes.addEventListener('click', () => {
  if (taskToDelete) {
      tareas.removeChild(taskToDelete);
      taskToDelete = null;
  }
  confirmDialog.close();
});

confirmNo.addEventListener('click', () => {
  confirmDialog.close();
  taskToDelete = null; 
});


// Cargar tareas 
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task));
}

// Cargar tareas al iniciar la página
loadTasks();
