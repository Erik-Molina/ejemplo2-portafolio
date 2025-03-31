// Usamos tu clave de API
const API_KEY = "";

// Mapeo de tipos de vehículo para mostrar el texto visible en lugar del data-type
const vehicleTypeMap = {
    standard: "Standard",
    premium: "Premium",
    suv: "VIP"
};

document.addEventListener("DOMContentLoaded", () => {
    // Botones de limpieza
    document.getElementById("clear-pickup").addEventListener("click", () => {
        document.getElementById("pickup").value = "";
        document.getElementById("point-a-text").textContent = "No seleccionado";
        updateRoute();
    });

    document.getElementById("clear-destination").addEventListener("click", () => {
        document.getElementById("destination").value = "";
        document.getElementById("point-b-text").textContent = "No seleccionado";
        updateRoute();
    });

    // Intercambiar ubicaciones
    document.getElementById("swap-locations").addEventListener("click", () => {
        const pickup = document.getElementById("pickup").value;
        const destination = document.getElementById("destination").value;
        document.getElementById("pickup").value = destination;
        document.getElementById("destination").value = pickup;
        updateRoute();
    });

    // Escuchar cambios en los campos de entrada
    document.getElementById("pickup").addEventListener("input", updateRoute);
    document.getElementById("destination").addEventListener("input", updateRoute);

    // Selección de tipo de vehículo
    const vehicleOptions = document.querySelectorAll(".vehicle-option");
    vehicleOptions.forEach(option => {
        option.addEventListener("click", () => {
            vehicleOptions.forEach(opt => opt.classList.remove("active"));
            option.classList.add("active");
        });
    });

    // Botón de confirmación
    document.getElementById("confirm-ride").addEventListener("click", () => {
        const pickup = document.getElementById("pickup").value;
        const destination = document.getElementById("destination").value;
        const vehicleType = document.querySelector(".vehicle-option.active").dataset.type;

        // Mapear el tipo de vehículo al texto visible
        const vehicleTypeText = vehicleTypeMap[vehicleType] || vehicleType;

        // Crear el enlace a Google Maps con la ruta
        const encodedPickup = encodeURIComponent(pickup);
        const encodedDestination = encodeURIComponent(destination);
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodedPickup}&destination=${encodedDestination}&travelmode=driving`;

        // Crear el mensaje para WhatsApp
        const message = `Solicitud de viaje:\nPunto A: ${pickup}\nPunto B: ${destination}\nTipo de vehículo: ${vehicleTypeText}\nRuta: ${mapsUrl}`;

        // Reemplaza con el número de WhatsApp al que deseas enviar el mensaje
        const whatsappNumber = "+50488313413"; // Cambia este número por el que desees
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

        // Abrir WhatsApp en una nueva pestaña
        window.open(whatsappUrl, "_blank");
    });

    // Llamar a updateRoute inicialmente para establecer el estado inicial
    updateRoute();
});

function updateRoute() {
    const pickup = document.getElementById("pickup").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const iframe = document.getElementById("map-iframe");
    const confirmButton = document.getElementById("confirm-ride");

    // Actualizar texto de puntos
    document.getElementById("point-a-text").textContent = pickup || "No seleccionado";
    document.getElementById("point-b-text").textContent = destination || "No seleccionado";

    // Si ambos campos están llenos, actualizar el iframe
    if (pickup && destination) {
        // Actualizar el iframe con la ruta
        const encodedPickup = encodeURIComponent(pickup);
        const encodedDestination = encodeURIComponent(destination);
        const iframeSrc = `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${encodedPickup}&destination=${encodedDestination}&mode=driving`;
        iframe.src = iframeSrc;

        // Habilitar el botón de confirmación
        confirmButton.disabled = false;
    } else {
        // Si no hay ambos puntos, mostrar el mapa por defecto (Tegucigalpa)
        iframe.src = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d66170.966429202!2d-87.19202909426379!3d14.072996616200351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2shn!4v1743080485028!5m2!1ses-419!2shn";
        confirmButton.disabled = true;
    }
}
