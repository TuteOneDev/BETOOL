document.addEventListener("keydown", function (event) {
    const textureNameInput = document.getElementById("textureName");
    const merCheckbox = document.getElementById("merCheckbox");
    const heightmapCheckbox = document.getElementById("heightmapCheckbox");
    const normalCheckbox = document.getElementById("normalCheckbox");

    // Verificar si el foco está en el campo de texto
    if (document.activeElement === textureNameInput) {
        return;
    }

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
});

function guardarArchivo() {
    const textureName = document.getElementById("textureName").value;
    const merChecked = document.getElementById("merCheckbox").checked;
    const heightmapChecked =
        document.getElementById("heightmapCheckbox").checked;
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