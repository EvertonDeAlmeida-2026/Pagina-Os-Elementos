const formulario =
    document.getElementById("wishlistForm");

const mensagemSucesso =
    document.getElementById("wishlistSucesso");


formulario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        formulario.classList.add(
            "escondido"
        );

        mensagemSucesso.classList.add(
            "visivel"
        );

    }
);