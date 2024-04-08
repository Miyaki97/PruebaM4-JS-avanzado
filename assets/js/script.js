import { Animal, Leon, Lobo, Oso, Serpiente, Aguila } from "./moduloclass.js";

const inputComentarios = document.querySelector("#inputComentarios");
const animalSeleccion = document.querySelector("#animal");
const edadSeleccion = document.querySelector("#edad");
const comentarios = document.querySelector("#comentarios");
const btnRegistrar = document.querySelector("#btnRegistrar");
const modal = document.querySelector("#exampleModal");
const modalAnimal = document.querySelector("#modalAnimal");
const modalEdad = document.querySelector("#modalEdad");
const modalComentarios = document.querySelector("#modalComentarios");
const spanCerrar = document.querySelector(".close");
const animalesContainer = document.querySelector("#animales");

export { animalesContainer };

let animalTodos = [];

(async () => {
  try {
    const response = await fetch("animales.json");

    if (response.ok === false) {
      console.log("No se encuentran animales");

      throw {
        codigo: 404,
        mensaje: "No existen animales",
      };
    }
    console.log("si encontró el animal");
    const data = await response.json();
    /* console.log(data); */
    animalTodos = data.animales;

    console.log(data.name);
    console.log(data.imagen);
  } catch (error) {
    //Capturando
    console.log(error);
  }
})();



const animalTypes = {
  Leon: Leon,
  Lobo: Lobo,
  Oso: Oso,
  Serpiente: Serpiente,
  Aguila: Aguila,
};

btnRegistrar.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("me estas procesando");
  console.log(animalSeleccion.value);
  console.log(edadSeleccion.value);
  console.log(comentarios.value);

  const animalEncontrado = animalTodos.find(
    (item) => item.name.toLowerCase() === animalSeleccion.value.toLowerCase()
  );
  console.log(animalEncontrado);

  if (animalEncontrado) {
    //Esto reemplaza el switch, hace el llamado a cada clase del animal que se elija y crea la instancia
    const nombreAnimal = animalTypes[animalEncontrado.name];

    if (nombreAnimal) {
      const animal = new nombreAnimal(
        animalEncontrado.name,
        edadSeleccion.value,
        animalEncontrado.imagen,
        comentarios.value,
        animalEncontrado.sonido
      );

      animal.pintarHTML();

      const emitirSonidoBotones = document.querySelectorAll(".emitir-sonido");
      emitirSonidoBotones.forEach((boton) => {
        boton.addEventListener("click", () => {
          animal.Sonido(animal.sonido);
        });
      });
    }
  }
});

modalAnimal.textContent = "animal:" + animalSeleccion.value;
modalEdad.textContent = "Edad:" + edadSeleccion.value;
modalComentarios.textContent = "Comentarios:" + comentarios.value;

mostrarModal();



const lobo = new Lobo("Lobo", "edad", "img", "comentarios");
const oso = new Oso("Oso", "edad", "img", "comentarios", "sonido");

const serpiente = new Serpiente("Serpiente", "edad", "img", "comentarios");

const aguila = new Aguila("Aguila", "edad", "img", "sonido");

console.log(animal.nombre);
console.log(leon.sonido());
console.log(oso.edad);
