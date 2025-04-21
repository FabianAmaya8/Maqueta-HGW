export function resumenCarrito() {
    function recalcularTotales() {
        let precioCarritoTotal = 0;

        document.querySelectorAll('.item-carrito').forEach(item => {
            const precioTexto = item.querySelector('.precio').textContent.replace('$', '');
            const precioUnitario = parseFloat(precioTexto);
            const cantidad = parseInt(item.querySelector('input').value, 10);
            precioCarritoTotal += precioUnitario * cantidad;
        });

        const totalCompra = precioCarritoTotal + 10000;

        document.querySelectorAll('.subtotal').forEach(el => {
            el.textContent = `$${precioCarritoTotal.toFixed(2)}`;
        });

        document.querySelectorAll('.total').forEach(el => {
            el.textContent = `$${totalCompra.toFixed(2)}`;
        });
    }

    function activarEscuchadores() {
        document.querySelectorAll('.item-carrito input[type="number"]').forEach(input => {
            input.addEventListener('change', recalcularTotales);
        });

        document.querySelectorAll('.menos, .mas').forEach(btn => {
            btn.addEventListener('click', recalcularTotales);
        });
    }

    // Espera a que el DOM cargue completamente
    window.addEventListener('load', () => {
        // Espera un poco a que carritoCart cree los ítems
        setTimeout(() => {
            recalcularTotales();
            activarEscuchadores();
        }, 500);
    });
}
