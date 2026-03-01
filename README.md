# Entrega 2 - JavaScript: CapStore

Este es mi proyecto para la segunda entrega del curso de JavaScript. Es un simulador interactivo de un carrito de compras para una tienda de gorras.

## Qué incluye esta entrega
Para esta etapa refactoricé el código de la entrega anterior para sacar los prompts y alerts, pasando toda la interacción directamente al DOM.

* **Estructura:** HTML y CSS (usé un poco de Bootstrap para agilizar el maquetado).
* **Lógica:** Implementé Clases para estructurar los productos y el carrito. La lógica de filtrado y cálculo de totales (con IVA) está hecha con métodos de array como map, find y reduce.
* **Eventos:** Toda la interacción del usuario se captura con `addEventListener` desde JavaScript, sin usar atributos onclick en el HTML.
* **Storage:** Sumé `localStorage` para que los productos agregados al carrito no se borren si se actualiza la página.

Autor: Santiago Martín
