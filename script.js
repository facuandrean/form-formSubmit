const d = document;

const $form_validacion = d.querySelector('.contact-form'), $inputs = d.querySelectorAll('.contact-form [required]');

document.addEventListener('DOMContentLoaded', (e) => {

    $inputs.forEach(input => {
        const $span = d.createElement('span');
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add('contact-form-error', 'none-2');
        input.insertAdjacentElement('afterend', $span);
    });

})

document.addEventListener('submit', (e) => {

    if (e.target === $form_validacion) {

        const $loader = d.querySelector('.contact-form-loader'), $response = d.querySelector('.contact-form-response');

        $loader.classList.remove('none-2');

        // setTimeout(() => {
        //     $loader.classList.add('none-2');
        //     $response.classList.remove('none-2');
        //     $form_validacion.reset();

        //     setTimeout(() => {
        //         $response.classList.add('none-2');
        //     }, 3000);
        // }, 3000);

        // comentamos este código porque va a ser reemplazado por una respuesta desde el lado del servidor por una petición fetch.

        fetch("https://formsubmit.co/ajax/facundoandrean22@gmail.com", {
            method: "POST",
            body: new FormData(e.target)
            // el formdata parsea todos los elementos que traiga el formulario. Y para que haga ese parseo por nosotros, todos los inputs deben de tener su atributo name establecido porque es el nombre que toma la variable cuando mandamos el formulario.
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => { 
            console.log(json);
            $loader.classList.add('none-2');
            $response.classList.remove('none-2');
            $response.innerHTML = `<p>${json.message}</p>`
            $form_validacion.reset(); 
        })
        .catch(err => {
            console.log(err);
            let message = err.statusText || 'Ocurrió un error al enviar, intenta nuevamente.';
            $response.innerHTML = `<p>Error: ${err.status}: ${message}</p>`;
        })
        .finally(() => setTimeout(() => {
            $response.classList.add('none-2');
            $response.innerHTML = "";
        }, 3000))
    }

})

document.addEventListener('keyup', (e) => {

    if (e.target.matches('.contact-form [required]')) {
        let $input = e.target, pattern = $input.pattern || $input.dataset.pattern;

        if (pattern && $input.value !== "") {
            let regex = new RegExp(pattern);
            return !regex.exec($input.value) ? d.getElementById($input.name).classList.add('is-active') : d.getElementById($input.name).classList.remove('is-active')
            // si el valor del input no cumple con la expresión regular, se ejecuta ?, pero si cumple, se ejecuta :
        }

        if (!pattern) {
            return $input.value === "" ? d.getElementById($input.name).classList.add('is-active') : d.getElementById($input.name).classList.remove('is-active')
            // si el input value es exactamente igual a nada, muestra el mensaje de error, sino no lo muestres.
        }
    }

})