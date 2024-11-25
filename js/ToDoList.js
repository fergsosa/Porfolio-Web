const d = document;

export default function ToDoList(lista, input, btnEnter) {
  // elemento = d.querySelector("#elemento"),
  const $lista = d.querySelector(lista),
    $input = d.querySelector(input),
    $botonEnter = d.querySelector(btnEnter);
  const check = "fa-check-circle",
    uncheck = "fa-circle",
    lineThrough = "line-through";

  let _LIST;
  let id; // * para que inicie en 0 cada tarea tendrá un id diferente

  // * función de agregar tarea
  function agregarTarea(tarea, id, realizado, eliminado) {
    if (eliminado) return;
    // si existe eliminado es true si no es false
    const REALIZADO = realizado ? check : uncheck;
    // si realizado es verdadero check si no uncheck
    const LINE = realizado ? lineThrough : "";

    const elemento = `
    <li id="elemento">
      <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
      <p class="text ${LINE}">${tarea}</p>
      <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
    </li>
    `;
    $lista.insertAdjacentHTML("beforeend", elemento);
  }

  // * función de Tarea Realizada
  function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);
    _LIST[element.id].realizado = _LIST[element.id].realizado ? false : true; //Si
    // console.log(_LIST);
    // console.log(_LIST[element.id]);
    // console.log(_LIST[element.id].realizado);
  }

  function tareaEliminada(element) {
    // console.log(element.parentNode);
    // console.log(element.parentNode.parentNode);
    element.parentNode.parentNode.removeChild(element.parentNode);
    _LIST[element.id].eliminado = true;
    console.log(_LIST);
  }

  // * crear un evento para escuchar el enter y para habilitar el boton
  $botonEnter.addEventListener("click", () => {
    const tarea = $input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      _LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
      localStorage.setItem("TODO", JSON.stringify(_LIST));
      id++;
      $input.value = "";
    }
  });

  d.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      const tarea = $input.value;
      if (tarea) {
        agregarTarea(tarea, id, false, false);
        _LIST.push({
          nombre: tarea,
          id: id,
          realizado: false,
          eliminado: false,
        });
        localStorage.setItem("TODO", JSON.stringify(_LIST));

        id++;
        $input.value = "";
        console.log(_LIST);
      }
    }
  });

  $lista.addEventListener("click", function (event) {
    const element = event.target;
    const elementData = element.attributes.data.value;
    // console.log({ element, elementData });

    if (elementData === "realizado") tareaRealizada(element);
    else if (elementData === "eliminado") {
      tareaEliminada(element);
      console.log("eliminado");
    }
    localStorage.setItem("TODO", JSON.stringify(_LIST));
  });

  function cargarLista(array) {
    array.forEach((item) => {
      agregarTarea(item.nombre, item.id, item.realizado, item.eliminado);
    });
  }

  let data = localStorage.getItem("TODO");
  if (data) {
    _LIST = JSON.parse(data);
    // console.log(_LIST);
    id = _LIST.length;
    cargarLista(_LIST);
  } else {
    _LIST = [];
    id = 0;
  }
}
