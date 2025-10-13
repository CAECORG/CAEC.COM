let codigosValidos = {
  "ABC123":"ANGEL GUEVARA"
};

let enlaceForms = "https://forms.office.com/tu-enlace-aqui";




function verificarCodigo() {
  const fechaActual = new Date();
  const fechaInicio = new Date("2026-02-02T00:00:00");

  // Mostrar advertencia si aún no es la fecha de apertura
  if (fechaActual < fechaInicio) {
    document.getElementById("enlaceFormsModal").href = enlaceForms;
    document.getElementById("modalBloqueo").classList.remove("hidden");
    return;
  }

  // Si ya es la fecha, continúa con verificación normal
  const codigo = document.getElementById("codigo").value.trim();
  const resultDiv = document.getElementById("result");

  if (codigosValidos[codigo]) {
    document.getElementById("access-box").classList.add("hidden");
    document.getElementById("areaPrivada").classList.remove("hidden");
    document.getElementById("nombreUsuario").textContent = codigosValidos[codigo];
    setTimeout(() => {
      document.getElementById("contenidoBox").classList.remove("hidden");
      mostrarRecibo(codigo);
    }, 2000);
  } else {
    resultDiv.innerHTML = `
      ❌ Código no válido.<br>
      Comunícate con el reforzador.<br>
      <a href="${enlaceForms}" target="_blank">Inscríbete aquí</a>.
    `;
  }
}

function cerrarModal() {
  document.getElementById("modalBloqueo").classList.add("hidden");
}






//function verificarCodigo() {
  //const codigo = document.getElementById("codigo").value.trim();
  //const resultDiv = document.getElementById("result");
  

  //if (codigosValidos[codigo]) {
    //document.getElementById("access-box").classList.add("hidden");
    //document.getElementById("areaPrivada").classList.remove("hidden");

    //document.getElementById("nombreUsuario").textContent = codigosValidos[codigo];

    //mostrarRecibo(codigo); // ← Aquí llamamos al recibo
  //} else {
    //resultDiv.innerHTML = `
      //❌ Lo sentimos - Nuestra pagina no estara disponible hasta la fecha establecida.<br>
      //<a href="${enlaceForms}" target="_blank">Pero te puedes inscribir aqui</a>.
    //`;
  //}
//}

function actualizarLista() {
  let texto = "";
  for (let codigo in codigosValidos) {
    texto += `${codigo} → ${codigosValidos[codigo]}\n`;
  }
  const lista = document.getElementById("listaCodigos");
  if (lista) lista.value = texto;
}

function agregarCodigo() {
  const codigo = document.getElementById("nuevoCodigo").value.trim();
  const nombre = document.getElementById("nombrePersona").value.trim();
  if (codigo && nombre) {
    codigosValidos[codigo] = nombre;
    actualizarLista();
    alert("✅ Código agregado.");
  } else {
    alert("⚠️ Completa ambos campos.");
  }
}

function actualizarEnlace() {
  const nuevo = document.getElementById("nuevoEnlace").value.trim();
  if (nuevo.startsWith("https://")) {
    enlaceForms = nuevo;
    alert("✅ Enlace actualizado.");
  } else {
    alert("⚠️ Enlace inválido.");
  }
}

document.addEventListener("DOMContentLoaded", actualizarLista);

function mostrarRecibo(codigo) {
  const mesActual = "oct2025"; // ← Puedes actualizar esto manualmente cada mes
  const ruta = `recibos/${codigo}_${mesActual}.jpg`;

  const reciboBox = document.getElementById("reciboBox");
  const reciboImg = document.getElementById("reciboImg");
  const descargarRecibo = document.getElementById("descargarRecibo");

  reciboImg.src = ruta;
  descargarRecibo.href = ruta;
  reciboBox.classList.remove("hidden");
}

function cerrarPanel() {
  if (document.getElementById("mensajeSalida")) return;

  document.body.innerHTML = `
    <div id="mensajeSalida">
      <h2>👋 Panel cerrado</h2>
      <p>Gracias por tu gestión, reforzador. Puedes cerrar esta pestaña si lo deseás.</p>
    </div>
  `;
}
