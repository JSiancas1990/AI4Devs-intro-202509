/**
 * Método 4: Usando Array.from y reverse
 * Invierte el orden de una cadena de texto
 * @param {string} str - La cadena de texto a invertir
 * @returns {string} La cadena invertida
 */
function reverse_string(str) {
    return Array.from(str).reverse().join('');
}

/**
 * Función para invertir el texto desde la interfaz
 * Se ejecuta cuando se hace clic en el botón o se presiona Enter
 */
function invertirTexto() {
    const textInput = document.getElementById('textInput');
    const resultLabel = document.getElementById('resultLabel');
    const reverseBtn = document.getElementById('reverseBtn');
    
    const rawText = textInput.value;
    const trimmedText = rawText.trim();
    
    // No mostrar mensaje de error, solo validar que hay suficientes caracteres
    if (trimmedText === '' || trimmedText.length < 3) {
        return; // Salir silenciosamente
    }

    // Aplicar la función de inversión usando el método 4 con el texto original (sin trim)
    const reversedText = reverse_string(rawText);
    
    // Mostrar el resultado con animación
    resultLabel.className = 'fade-in';
    resultLabel.textContent = reversedText;
    resultLabel.style.color = '#333';
    
    // Agregar efecto visual al botón
    reverseBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        reverseBtn.style.transform = 'translateY(-3px)';
    }, 150);
}

/**
 * Función para manejar el modo de inversión en tiempo real
 */
function handleRealTimeInversion() {
    const textInput = document.getElementById('textInput');
    const resultLabel = document.getElementById('resultLabel');
    const realTimeCheck = document.getElementById('realTimeCheck');
    
    if (realTimeCheck && realTimeCheck.checked) {
        const inputText = textInput.value;
        
        if (inputText === '') {
            resultLabel.textContent = '';
        } else {
            const reversedText = reverse_string(inputText);
            resultLabel.className = 'fade-in';
            resultLabel.textContent = reversedText;
            resultLabel.style.color = '#333';
        }
    }
}

/**
 * Función para actualizar el estado del botón según el checkbox y caracteres
 */
function updateButtonState() {
    const textInput = document.getElementById('textInput');
    const reverseBtn = document.getElementById('reverseBtn');
    const realTimeCheck = document.getElementById('realTimeCheck');
    
    const trimmedCount = textInput.value.trim().length;
    
    if (realTimeCheck && realTimeCheck.checked) {
        // Si está en modo tiempo real, deshabilitar el botón
        reverseBtn.disabled = true;
    } else {
        // Si no está en modo tiempo real, habilitar según caracteres trimmed
        reverseBtn.disabled = trimmedCount < 3;
    }
}

/**
 * Función para actualizar el contador de caracteres y estado del botón
 */
function updateCharCount() {
    const textInput = document.getElementById('textInput');
    const charCount = document.getElementById('charCount');
    
    const count = textInput.value.length;
    charCount.textContent = count;
    
    // Actualizar estado del botón
    updateButtonState();
    
    // Cambiar color del contador según la proximidad al límite
    if (count > 800) {
        charCount.style.color = '#e74c3c';
    } else if (count > 600) {
        charCount.style.color = '#f39c12';
    } else {
        charCount.style.color = '#666';
    }
}

/**
 * Función para inicializar todos los event listeners y configuración inicial
 */
function initializeApp() {
    // Referencias a los elementos del DOM
    const textInput = document.getElementById('textInput');
    const reverseBtn = document.getElementById('reverseBtn');
    const resultLabel = document.getElementById('resultLabel');
    const realTimeCheck = document.getElementById('realTimeCheck');

    // Event listeners
    reverseBtn.addEventListener('click', invertirTexto);

    // Permitir invertir con Enter (solo si no está en modo tiempo real)
    textInput.addEventListener('keydown', function(event) {
        const realTimeCheck = document.getElementById('realTimeCheck');
        if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey && 
            !reverseBtn.disabled && !(realTimeCheck && realTimeCheck.checked)) {
            event.preventDefault();
            invertirTexto();
        }
    });

    // Actualizar contador y manejar tiempo real
    textInput.addEventListener('input', function() {
        updateCharCount();
        handleRealTimeInversion();
        
        // Limpiar resultado cuando no hay tiempo real activo
        const realTimeCheck = document.getElementById('realTimeCheck');
        if (!(realTimeCheck && realTimeCheck.checked)) {
            if (textInput.value === '') {
                resultLabel.textContent = '';
            }
        }
    });

    // Manejar cambios en el checkbox
    realTimeCheck.addEventListener('change', function() {
        updateButtonState();
        
        if (this.checked) {
            // Activar modo tiempo real - invertir inmediatamente si hay texto
            handleRealTimeInversion();
        } else {
            // Volver al modo normal
            if (textInput.value === '') {
                resultLabel.textContent = '';
            }
            // El resultado se mantiene si hay texto, pero ya no se actualiza en tiempo real
        }
    });

    // Inicializar contador y estado del botón
    updateCharCount();
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeApp);