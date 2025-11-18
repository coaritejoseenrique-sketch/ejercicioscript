/* ================= NAVEGACIÓN ================= */
function navegar(idPantalla) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
    // Mostrar la seleccionada
    document.getElementById(idPantalla).classList.add('activa');
}

/* ================= ASTRONOMÍA ================= */

// 1. IF - Magnitud
function astro1_Clasificar() {
    let mag = parseFloat(document.getElementById('astro1-input').value);
    let res = document.getElementById('astro1-result');
    let visual = document.getElementById('astro1-visual');

    if (isNaN(mag)) { res.innerText = "Ingresa un número"; return; }

    // Lógica
    let texto = "";
    let opacidad = 0;

    if (mag < 1.5) {
        texto = "Extremadamente brillante"; opacidad = 1;
    } else if (mag < 3) {
        texto = "Muy brillante"; opacidad = 0.8;
    } else if (mag < 6) {
        texto = "Brillante (Visible)"; opacidad = 0.5;
    } else {
        texto = "Débil o No visible"; opacidad = 0.1;
    }

    res.innerText = "Resultado: " + texto;
    // PLUS: Cambiar brillo de la estrella
    visual.style.backgroundColor = "gold";
    visual.style.opacity = opacidad;
    visual.style.boxShadow = `0 0 20px ${opacidad * 10}px gold`;
}

// 2. FOR - Distancias (Manejo de Array)
let astro2_datos = [];
function astro2_Agregar() {
    let val = parseFloat(document.getElementById('astro2-input').value);
    if (!isNaN(val)) {
        astro2_datos.push(val);
        document.getElementById('astro2-lista').innerText = "Datos: " + astro2_datos.join(" - ");
        document.getElementById('astro2-input').value = "";
    }
}
function astro2_Calcular() {
    if (astro2_datos.length === 0) return;
    let suma = 0;
    for (let i = 0; i < astro2_datos.length; i++) {
        suma += astro2_datos[i];
    }
    let promedio = suma / astro2_datos.length;
    // PLUS: Conversión a Unidades Astronómicas (1 UA = 150 mill km aprox)
    let ua = (promedio / 150).toFixed(2);
    document.getElementById('astro2-result').innerText = `Promedio: ${promedio.toFixed(2)} Mill Km (${ua} UA)`;
    astro2_datos = []; // Reset
}

// 3. WHILE - Cráteres
function astro3_Agregar() {
    let diametro = parseFloat(document.getElementById('astro3-input').value);
    let res = document.getElementById('astro3-result');
    
    // Simulación lógica WHILE: el usuario ingresa datos uno a uno
    if (diametro === 0) {
        res.innerText = "Registro finalizado.";
        return;
    }

    if (diametro > 50) {
        // Usamos una variable global o atributo data para contar
        let cuenta = parseInt(res.getAttribute('data-count') || 0) + 1;
        res.setAttribute('data-count', cuenta);
        res.innerText = `¡Cráter gigante registrado! Total > 50km: ${cuenta}`;
        res.style.color = "red";
    } else {
        res.innerText = "Cráter registrado (Pequeño).";
        res.style.color = "green";
    }
    
    // Actualizar contador visual
    let total = parseInt(document.getElementById('astro3-lista').getAttribute('data-total') || 0) + 1;
    document.getElementById('astro3-lista').setAttribute('data-total', total);
    document.getElementById('astro3-lista').innerText = "Registrados totales: " + total;
    
    document.getElementById('astro3-input').value = "";
}

// 4. SWITCH - Cuerpo Celeste
function astro4_Identificar() {
    let codigo = document.getElementById('astro4-input').value;
    let icono = document.getElementById('astro4-result');
    
    switch(codigo) {
        case "1": icono.innerText = "⭐ Estrella"; break;
        case "2": icono.innerText = "🪐 Planeta"; break;
        case "3": icono.innerText = "☄️ Cometa"; break;
        case "4": icono.innerText = "🪨 Asteroide"; break;
        case "5": icono.innerText = "🌌 Galaxia"; break;
        default: icono.innerText = "❓ Desconocido";
    }
}

// 5. DO WHILE - Lux
function astro5_Procesar() {
    let input = document.getElementById('astro5-input').value;
    let log = document.getElementById('astro5-log');
    let visual = document.getElementById('astro5-visual');

    if (input.toLowerCase() === "no") {
        log.innerText = "Sensor apagado.";
        visual.style.backgroundColor = "#eee";
        return;
    }

    let lux = parseFloat(input);
    if (lux < 5) {
        log.innerText = "Lectura: " + lux + " lux -> NOCHE PROFUNDA 🌑";
        visual.style.backgroundColor = "black";
    } else {
        log.innerText = "Lectura: " + lux + " lux -> Hay luz ☀️";
        visual.style.backgroundColor = "yellow";
    }
    document.getElementById('astro5-input').value = "";
}

/* ================= MEDIO AMBIENTE ================= */

// 1. IF - AQI
function amb1_Calcular() {
    let aqi = parseInt(document.getElementById('amb1-input').value);
    let res = document.getElementById('amb1-result');
    let bar = document.getElementById('amb1-semaforo');
    let msg = "", color = "";

    if (aqi <= 50) { msg = "Bueno"; color = "green"; }
    else if (aqi <= 100) { msg = "Moderado"; color = "yellow"; }
    else if (aqi <= 150) { msg = "Dañino (Grupos sensibles)"; color = "orange"; }
    else if (aqi <= 200) { msg = "Dañino"; color = "red"; }
    else { msg = "Muy Dañino / Peligroso"; color = "purple"; }

    res.innerText = "Calidad: " + msg;
    bar.style.backgroundColor = color;
}

// 2. FOR - Ruido
let amb2_totalMediciones = 0;
let amb2_contador = 0;
let amb2_acumulador = 0;

function amb2_Iniciar() {
    amb2_totalMediciones = parseInt(document.getElementById('amb2-cantidad').value);
    if (amb2_totalMediciones > 0) {
        document.getElementById('amb2-area-registro').style.display = 'block';
        amb2_contador = 0;
        amb2_acumulador = 0;
        document.getElementById('amb2-progreso').innerText = `Medición 1 de ${amb2_totalMediciones}`;
    }
}

function amb2_Agregar() {
    let val = parseFloat(document.getElementById('amb2-valor').value);
    if(!isNaN(val)) {
        amb2_acumulador += val;
        amb2_contador++;
        
        if (amb2_contador < amb2_totalMediciones) {
            document.getElementById('amb2-progreso').innerText = `Medición ${amb2_contador + 1} de ${amb2_totalMediciones}`;
        } else {
            // Fin del FOR simulado
            let promedio = amb2_acumulador / amb2_totalMediciones;
            document.getElementById('amb2-result').innerText = `Promedio Final: ${promedio.toFixed(1)} dB`;
            // PLUS: Alerta sonora visual
            if(promedio > 85) alert("⚠️ ¡Niveles peligrosos de ruido!");
            
            document.getElementById('amb2-area-registro').style.display = 'none';
        }
        document.getElementById('amb2-valor').value = "";
    }
}

// 3. WHILE - Incendios
let amb3_temps = [];
function amb3_Agregar() {
    let t = parseFloat(document.getElementById('amb3-input').value);
    if (t === 0) {
        // Conteo final
        let incendios = amb3_temps.filter(temp => temp > 45).length;
        document.getElementById('amb3-result').innerText = `Análisis terminado. Focos > 45°C: ${incendios}`;
        if(incendios > 0) document.getElementById('amb3-result').style.color = "red";
        amb3_temps = [];
    } else {
        amb3_temps.push(t);
        document.getElementById('amb3-lista').innerText = "Temps: " + amb3_temps.join(", ");
    }
    document.getElementById('amb3-input').value = "";
}

// 4. SWITCH - Residuos
function amb4_Clasificar() {
    let tipo = document.getElementById('amb4-input').value;
    let res = document.getElementById('amb4-result');
    let icono = document.getElementById('amb4-basurero');

    switch(tipo) {
        case "1": 
            res.innerText = "Contenedor Marrón/Verde (Orgánico)"; 
            icono.style.color = "brown";
            break;
        case "2": 
            res.innerText = "Contenedor Amarillo (Plástico)"; 
            icono.style.color = "gold";
            break;
        case "3": 
            res.innerText = "Contenedor Azul (Papel)"; 
            icono.style.color = "blue";
            break;
        case "4": 
            res.innerText = "Contenedor Verde iglú (Vidrio)"; 
            icono.style.color = "green";
            break;
    }
}

// 5. DO WHILE - Río
function amb5_Procesar() {
    let inp = document.getElementById('amb5-input').value;
    let agua = document.getElementById('amb5-visual');
    let res = document.getElementById('amb5-result');

    if (inp.toLowerCase() === "no") {
        res.innerText = "Monitoreo finalizado.";
        return;
    }
    let nivel = parseFloat(inp);
    // PLUS: La altura del div azul sube con el nivel (max 5m simulado)
    let porcentaje = Math.min((nivel / 5) * 100, 100); 
    agua.style.height = porcentaje + "%";

    if (nivel > 3) {
        res.innerText = `Nivel ${nivel}m - ¡ALERTA DE DESBORDE! 🌊`;
        res.style.color = "red";
        agua.style.backgroundColor = "red"; // Agua roja por peligro
    } else {
        res.innerText = `Nivel ${nivel}m - Seguro`;
        res.style.color = "blue";
        agua.style.backgroundColor = "#007bff";
    }
    document.getElementById('amb5-input').value = "";
}

/* ================= SALUD ================= */

// 1. IF - Presión
function salud1_Calcular() {
    let s = parseInt(document.getElementById('salud1-sis').value);
    let d = parseInt(document.getElementById('salud1-dias').value);
    let res = document.getElementById('salud1-result');

    if (s < 120 && d < 80) res.innerText = "Normal";
    else if (s >= 120 && s <= 129 && d < 80) res.innerText = "Elevada";
    else if ((s >= 130 && s <= 139) || (d >= 80 && d <= 89)) res.innerText = "HTA Grado 1";
    else res.innerText = "HTA Grado 2 (Crisis)";
}

// 2. FOR - Temperaturas Promedio
let salud2_datos = [];
function salud2_Agregar() {
    let val = parseFloat(document.getElementById('salud2-input').value);
    if (!isNaN(val)) {
        salud2_datos.push(val);
        document.getElementById('salud2-lista').innerText = `Pacientes registrados: ${salud2_datos.length}`;
        document.getElementById('salud2-input').value = "";
    }
}
function salud2_Calcular() {
    if (salud2_datos.length === 0) return;
    let sum = salud2_datos.reduce((a, b) => a + b, 0);
    let prom = sum / salud2_datos.length;
    document.getElementById('salud2-result').innerText = "Promedio: " + prom.toFixed(1) + "°C";
    // PLUS: Limpiar para nuevo grupo
    salud2_datos = [];
}

// 3. WHILE - Fiebre
let salud3_fiebreCount = 0;
function salud3_Agregar() {
    let t = parseFloat(document.getElementById('salud3-input').value);
    if (t === 0) {
        alert(`Sesión finalizada. Total con fiebre: ${salud3_fiebreCount}`);
        salud3_fiebreCount = 0; // Reset
        document.getElementById('salud3-result').innerText = "Casos de fiebre detectados: 0";
    } else {
        if (t >= 38) {
            salud3_fiebreCount++;
            document.getElementById('salud3-result').innerText = `Casos de fiebre detectados: ${salud3_fiebreCount}`;
            document.getElementById('salud3-result').style.color = "red";
        }
    }
    document.getElementById('salud3-input').value = "";
}

// 4. SWITCH - Triage
function salud4_Clasificar() {
    let cod = document.getElementById('salud4-input').value;
    let res = document.getElementById('salud4-result');
    
    res.style.padding = "10px";
    res.style.color = "white";
    res.style.borderRadius = "5px";

    switch(cod) {
        case "1": 
            res.innerText = "🔴 ROJO: Resucitación (Atención Inmediata)";
            res.style.backgroundColor = "red";
            break;
        case "2": 
            res.innerText = "🟠 NARANJA: Emergencia (10-15 min)";
            res.style.backgroundColor = "orange";
            break;
        case "3": 
            res.innerText = "🟡 AMARILLO: Urgencia (60 min)";
            res.style.backgroundColor = "#d4ac0d"; // Amarillo oscuro para leer letras blancas
            break;
        case "4": 
            res.innerText = "🔵 AZUL: Menor / No Urgente";
            res.style.backgroundColor = "blue";
            break;
    }
}

// 5. DO WHILE - SpO2
function salud5_Procesar() {
    let inp = document.getElementById('salud5-input').value;
    let alerta = document.getElementById('salud5-alerta');
    let log = document.getElementById('salud5-log');

    if (inp.toLowerCase() === "no") {
        log.innerText = "Fin de mediciones.";
        return;
    }
    
    let sat = parseFloat(inp);
    log.innerText = "Última lectura: " + sat + "%";

    // PLUS: Visualización de estado crítico
    if (sat < 90) {
        alerta.innerText = "HIPOXIA ⚠️";
        alerta.style.backgroundColor = "red";
        alerta.style.color = "white";
        alerta.style.animation = "parpadeo 1s infinite"; // Efecto visual extra
    } else {
        alerta.innerText = "NORMAL ✅";
        alerta.style.backgroundColor = "#90EE90";
        alerta.style.color = "black";
        alerta.style.animation = "none";
    }
    document.getElementById('salud5-input').value = "";
}

/* Agregar animación de parpadeo dinámicamente al CSS */
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes parpadeo {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);