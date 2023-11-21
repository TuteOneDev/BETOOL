document.addEventListener("keydown", function (event) {
    // Verificar si algún campo de texto tiene el foco
    if (
        document.activeElement.tagName === "INPUT" &&
        document.activeElement.type === "text"
    ) {
        return;
    }

    // Obtener todas las pestañas y encontrar la activa
    const tabs = document.querySelectorAll(".tab");
    const activeTab = document.querySelector(".tab.active");

    if (!activeTab) {
        return; // No hay pestaña activa, salir
    }

    const currentIndex = Array.from(tabs).indexOf(activeTab);

    switch (event.key) {
        case "ArrowRight":
            cambiarTab(tabs[(currentIndex + 1) % tabs.length].id);
            break;
        case "ArrowLeft":
            cambiarTab(tabs[(currentIndex - 1 + tabs.length) % tabs.length].id);
            break;
        default:
            // Manejar otras teclas según la pestaña activa
            if (activeTab.id === "TAB_01") {
                const merCheckbox = activeTab.querySelector("#merCheckbox");
                const heightmapCheckbox = activeTab.querySelector("#heightmapCheckbox");
                const normalCheckbox = activeTab.querySelector("#normalCheckbox");

                switch (event.key) {
                    case "1":
                        merCheckbox.checked = !merCheckbox.checked;
                        break;
                    case "2":
                        heightmapCheckbox.checked = !heightmapCheckbox.checked;
                        break;
                    case "3":
                        normalCheckbox.checked = !normalCheckbox.checked;
                        break;
                    case "s":
                        guardarArchivo();
                        break;
                    default:
                        break;
                }
            }
            break;
    }
});

function cambiarTab(tabId) {
    // Desactivar todas las pestañas
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    // Activar la pestaña correspondiente
    document.getElementById(tabId).classList.add("active");
}

function mostrarTabs() {
    const tabList = document.querySelector('.TabList');
    tabList.classList.toggle('active');
}


function guardarArchivo() {
	const textureName = document.getElementById("textureName").value;
	const merChecked = document.getElementById("merCheckbox").checked;
	const heightmapChecked = document.getElementById("heightmapCheckbox").checked;
	const normalChecked = document.getElementById("normalCheckbox").checked;

	const data = {
		format_version: "1.16.100",
		"minecraft:texture_set": {
			color: textureName,
			...(merChecked && {
				metalness_emissive_roughness: `${textureName}_mer`,
			}),
			...(heightmapChecked && {
				heightmap: `${textureName}_heightmap`,
			}),
			...(normalChecked && { normal: `${textureName}_normal` }),
		},
	};

	const fileName = `${textureName}.texture_set.json`;
	const fileContent = JSON.stringify(data, null, 2);

	// Simulación de descarga del archivo
	const blob = new Blob([fileContent], { type: "application/json" });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = fileName;
	link.click();
}
// Función para agregar una imagen debajo del título si no hay contenido
function agregarImagenSiVacio(tabId, imagenSrc) {
    var tab = document.getElementById(tabId);
    if (tab.innerText.trim() === tab.querySelector('h1').innerText.trim()) {
        // Si el contenido de la pestaña es solo el título, agregar la imagen
        var imagen = document.createElement('img');
        imagen.src = imagenSrc;
        imagen.style.maxWidth = '100%';
        tab.appendChild(imagen);
    }
}

// Obtener todas las pestañas y recorrerlas para agregar la imagen si es necesario
var tabs = document.querySelectorAll('.tab');
tabs.forEach(function(tab) {
    var tabId = tab.id;
    agregarImagenSiVacio(tabId, './wip.gif');
});