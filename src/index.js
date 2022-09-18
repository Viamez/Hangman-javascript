const btn1 = document.querySelector("#btnPalabraElegida");
const btn2 = document.querySelector("#btnValidarLetra");
const resultP = document.getElementById("resultP");
//funcion que me permite cambiar los guiones por las letras elegidas
String.prototype.replaceAt = function (index, character) {
  return (
    this.substring(0, index) +
    character +
    this.substring(index + character.length)
  );
};
const words = ["futbol", "basquet", "fresa", "tenis", "manzana"];
let word = "";
let star = false;
let wordGuiones = "";
let cuentaFallos = 0;
//Elegir palabra al azar
btn1.addEventListener("click", function palabraAleatoria() {
  if (!star) {
    word = words[Math.floor(Math.random() * words.length)];
    wordGuiones = word.replace(/./g, "_ ");
    resultP.innerText = wordGuiones;
    //este console es para ver que palabra es, asi poder textear mejor el programa
    console.log(word);
    (document.querySelector("#ocultarIniciar").style.display = "none"),
      (document.querySelector("#ocultar").style.display = "flex"),
      (star = true);
  }
});

//validacion
btn2.addEventListener("click", validarLetra);
function validarLetra() {
  const input = document.querySelector("#value");
  const value = input.value.toLowerCase();
  let fail = true;
  for (const i in word) {
    if (value == word[i]) {
      wordGuiones = wordGuiones.replaceAt(i * 2, value);

      fail = false;
    }
  }
  if (fail) {
    cuentaFallos++;
    document.querySelector(
      "#ahorcado"
    ).src = `./images/el-ahorcado${cuentaFallos}.png`;
    if (cuentaFallos == 6) {
      document.querySelector("#ocultar").style.display = "none";
      document.querySelector("#perdiste").style.display = "flex";
    }
  } else {
    if (wordGuiones.indexOf("_") < 0) {
      document.querySelector("#ocultar").style.display = "none";
      document.querySelector("#ganaste").style.display = "flex";
      const resultFinal = document.getElementById("palabraSecreta");
      resultFinal.innerText = `La palabra secreta era "${word}"`;
    }
  }
  resultP.innerText = wordGuiones;
  document.querySelector("#value").value = "";
  document.querySelector("#value").focus();
  document.querySelector("#value").click();
}
