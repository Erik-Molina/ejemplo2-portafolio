document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.getElementById('btn-whatsapp');
    
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();
        const phoneNumber = '50488313413'; // Sin el signo +
        
        // Validación
        if (!name) {
            alert("Por favor ingresa tu nombre");
            document.getElementById('name').focus();
            return;
        }
        
        if (!message) {
            alert("Por favor escribe tu mensaje");
            document.getElementById('message').focus();
            return;
        }
        
        // Codificar mensaje
        const encodedMessage = encodeURIComponent(`Hola, soy ${name}.\n\n${message}`);
        
        // Crear URL de WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Intentar abrir WhatsApp
        try {
            // Método 1: window.open (para desktop)
            const newWindow = window.open(whatsappUrl, '_blank');
            
            // Si el navegador bloqueó la ventana emergente
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                // Método alternativo: redirección directa
                window.location.href = whatsappUrl;
            }
        } catch (error) {
            console.error('Error al abrir WhatsApp:', error);
            // Método de respaldo
            const link = document.createElement('a');
            link.href = whatsappUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        // Limpiar formulario (opcional)
        document.getElementById('name').value = '';
        document.getElementById('message').value = '';
    });
});