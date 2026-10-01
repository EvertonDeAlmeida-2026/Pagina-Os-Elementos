// ==========================================================
// OS ELEMENTOS
// Controle dos cenários, elementos e partículas
// ==========================================================

const backgroundAtual =
    document.querySelector(".background-atual");

const backgroundProximo =
    document.querySelector(".background-proximo");

const elementos =
    document.querySelectorAll(".elemento");

const esferaContainer =
    document.querySelector(".esfera-container");

const particulasTerra =
    document.querySelector(".particulas-terra");

const particulasAgua =
    document.querySelector(".particulas-agua");

const particulasAr =
    document.querySelector(".particulas-ar");

const particulasFogo =
    document.querySelector(".particulas-fogo");

// ==========================================================
// CAMINHOS DOS CENÁRIOS
// ==========================================================

const backgrounds = {

    neutro:
        "assets/background/neutro.webp",

    terra:
        "assets/background/terra.webp",

    agua:
        "assets/background/agua.webp",

    ar:
        "assets/background/ar.webp",

    fogo:
        "assets/background/fogo.webp"

};

// ==========================================================
// CONTROLE DO ESTADO
// ==========================================================

let elementoAtual =
    "neutro";

let timerRetorno;

// ==========================================================
// TROCAR O CENÁRIO
// ==========================================================

function mudarCenario(elemento) {

    console.log(
        "Mudando para:",
        elemento
    );

    // Cancela timer anterior
    clearTimeout(
        timerRetorno
    );

    // ======================================================
    // REMOVE DESTAQUE DOS ÍCONES
    // ======================================================

    elementos.forEach(
        item => {

            item.classList.remove(
                "ativo"
            );

        }
    );

    // ======================================================
    // REMOVE EFEITOS ANTERIORES
    // ======================================================

    esferaContainer.classList.remove(
        "terra",
        "agua",
        "ar",
        "fogo"
    );

    // ======================================================
    // PROCURA ELEMENTO SELECIONADO
    // ======================================================

    const elementoSelecionado =
        document.querySelector(
            `.elemento[data-elemento="${elemento}"]`
        );

    // ======================================================
    // ATIVA ÍCONE
    // ======================================================

    if (
        elementoSelecionado &&
        elemento !== "neutro"
    ) {

        elementoSelecionado.classList.add(
            "ativo"
        );
    }

    // ======================================================
    // TERRA
    // ======================================================

    if (
        elemento === "terra"
    ) {

        esferaContainer.classList.add(
            "terra"
        );

        criarParticulasTerra();
    }

    // ======================================================
    // ÁGUA
    // ======================================================

    if (
        elemento === "agua"
    ) {

        esferaContainer.classList.add(
            "agua"
        );

        criarParticulasAgua();
    }

    // ======================================================
    // AR
    // ======================================================

    if (
        elemento === "ar"
    ) {

        esferaContainer.classList.add(
            "ar"
        );

        criarParticulasAr();
    }

    // ======================================================
    // FOGO
    // ======================================================

    if (
        elemento === "fogo"
    ) {

        esferaContainer.classList.add(
            "fogo"
        );

        criarParticulasFogo();
    }

    // ======================================================
    // PULSO DA ESFERA
    // ======================================================

    if (
        elemento !== "neutro"
    ) {

        esferaContainer.classList.remove(
            "ativando"
        );

        void esferaContainer.offsetWidth;

        esferaContainer.classList.add(
            "ativando"
        );

        setTimeout(
            () => {

                esferaContainer.classList.remove(
                    "ativando"
                );

            },
            800
        );
    }

    // ======================================================
    // VERIFICA CENÁRIO
    // ======================================================

    const novoBackground =
        backgrounds[elemento];

    if (!novoBackground) {

        console.error(
            "Cenário não encontrado:",
            elemento
        );

        return;
    }

    // ======================================================
    // SE JÁ ESTAMOS NO CENÁRIO
    // ======================================================

    if (
        elemento === elementoAtual
    ) {

        if (
            elemento !== "neutro"
        ) {

            iniciarRetornoNeutro();
        }

        return;
    }

    // ======================================================
    // PREPARA O NOVO CENÁRIO
    // ======================================================

    backgroundProximo.style.backgroundImage =
        `url("${novoBackground}")`;

    // ======================================================
    // COMEÇA UM POUCO MAIS AFASTADO
    // ======================================================

    backgroundProximo.style.transform =
        "scale(1.08)";

    backgroundProximo.style.opacity =
        "0";

    // ======================================================
    // FORÇA O NAVEGADOR A APLICAR O ESTADO
    // ANTES DA ANIMAÇÃO
    // ======================================================

    void backgroundProximo.offsetWidth;

    // ======================================================
    // ENTRA O NOVO CENÁRIO
    // ======================================================

    backgroundProximo.style.opacity =
        "1";

    backgroundProximo.style.transform =
        "scale(1.015)";

    // ======================================================
    // FINALIZA A TRANSIÇÃO
    // ======================================================

    setTimeout(
        () => {

            backgroundAtual.style.backgroundImage =
                `url("${novoBackground}")`;

            backgroundAtual.style.transform =
                "scale(1.015)";

            backgroundProximo.style.opacity =
                "0";

            elementoAtual =
                elemento;

            // ==============================================
            // INICIA OS 10 SEGUNDOS
            // ==============================================

            if (
                elemento !== "neutro"
            ) {

                iniciarRetornoNeutro();
            }

        },
        1400
    );
}

// ==========================================================
// TIMER PARA VOLTAR AO NEUTRO
// ==========================================================

function iniciarRetornoNeutro() {

    clearTimeout(timerRetorno);

    timerRetorno =
        setTimeout(
            () => {

                console.log(
                    "10 segundos passaram. Dissipando elemento..."
                );

                // Começa a dissipação da energia
                esferaContainer.classList.add(
                    "dissipando"
                );

                // Aguarda a animação terminar
                setTimeout(
                    () => {

                        // Remove a dissipação
                        esferaContainer.classList.remove(
                            "dissipando"
                        );

                        // Volta para o cenário neutro
                        mudarCenario("neutro");

                    },
                    1200
                );

            },
            10000
        );
}

// ==========================================================
// PARTÍCULAS - TERRA
// ==========================================================

function criarParticulasTerra() {

    particulasTerra.innerHTML =
        "";

    const quantidade =
        35;

    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const particula =
            document.createElement(
                "span"
            );

        particula.classList.add(
            "particula-terra"
        );

        const tamanho =
            3 +
            Math.random() * 5;

        particula.style.width =
            `${tamanho}px`;

        particula.style.height =
            `${tamanho}px`;

        // ==================================================
        // NASCIMENTO PRÓXIMO DA ESFERA
        // ==================================================

        const posicaoX =
            Math.random() * 30 + 35;

        particula.style.left =
            `${posicaoX}%`;

        const posicaoY =
            Math.random() * 20 + 45;

        particula.style.top =
            `${posicaoY}%`;

        // ==================================================
        // MOVIMENTO
        // ==================================================

        const xInicial =
            Math.random() * 100 - 50;

        const xMeio =
            Math.random() * 120 - 60;

        const xFinal =
            Math.random() * 160 - 80;

        const duracao =
            3 +
            Math.random() * 4;

        const brilho =
            1 +
            Math.random() * 2;

        particula.style.setProperty(
            "--x-inicial",
            `${xInicial}px`
        );

        particula.style.setProperty(
            "--x-meio",
            `${xMeio}px`
        );

        particula.style.setProperty(
            "--x-final",
            `${xFinal}px`
        );

        particula.style.setProperty(
            "--duracao",
            `${duracao}s`
        );

        particula.style.setProperty(
            "--brilho",
            `${brilho}s`
        );

        particula.style.animationDelay =
            `${Math.random() * 4}s`;

        particulasTerra.appendChild(
            particula
        );
    }
}

// ==========================================================
// PARTÍCULAS - ÁGUA
// ==========================================================

function criarParticulasAgua() {

    particulasAgua.innerHTML =
        "";

    const quantidade =
        28;

    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const particula =
            document.createElement(
                "span"
            );

        particula.classList.add(
            "particula-agua"
        );

        const tamanho =
            4 +
            Math.random() * 10;

        particula.style.width =
            `${tamanho}px`;

        particula.style.height =
            `${tamanho}px`;

        // ==================================================
        // NASCIMENTO PRÓXIMO DA ESFERA
        // ==================================================

        const posicaoX =
            Math.random() * 30 + 35;

        particula.style.left =
            `${posicaoX}%`;

        const posicaoY =
            Math.random() * 20 + 45;

        particula.style.top =
            `${posicaoY}%`;

        // ==================================================
        // MOVIMENTO
        // ==================================================

        const xInicial =
            Math.random() * 70 - 35;

        const xMeio =
            Math.random() * 120 - 60;

        const xFinal =
            Math.random() * 160 - 80;

        const duracao =
            4 +
            Math.random() * 4;

        const brilho =
            1.5 +
            Math.random() * 2;

        particula.style.setProperty(
            "--x-inicial",
            `${xInicial}px`
        );

        particula.style.setProperty(
            "--x-meio",
            `${xMeio}px`
        );

        particula.style.setProperty(
            "--x-final",
            `${xFinal}px`
        );

        particula.style.setProperty(
            "--duracao",
            `${duracao}s`
        );

        particula.style.setProperty(
            "--brilho",
            `${brilho}s`
        );

        particula.style.animationDelay =
            `${Math.random() * 5}s`;

        particulasAgua.appendChild(
            particula
        );
    }
}

// ==========================================================
// PARTÍCULAS - AR
// ==========================================================

function criarParticulasAr() {

    particulasAr.innerHTML =
        "";

    const quantidade =
        24;

    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const particula =
            document.createElement(
                "span"
            );

        particula.classList.add(
            "particula-ar"
        );

        const tamanho =
            30 +
            Math.random() * 90;

        particula.style.width =
            `${tamanho}px`;

        // ==================================================
        // NASCIMENTO PRÓXIMO DA ESFERA
        // ==================================================

        const posicaoX =
            Math.random() * 40 + 30;

        const posicaoY =
            Math.random() * 30 + 35;

        particula.style.left =
            `${posicaoX}%`;

        particula.style.top =
            `${posicaoY}%`;

        // ==================================================
        // MOVIMENTO
        // ==================================================

        const inicio =
            Math.random() * 180 - 90;

        const meio =
            Math.random() * 160 - 80;

        const fim =
            Math.random() * 240 - 120;

        const yInicio =
            Math.random() * 50 - 25;

        const yMeio =
            Math.random() * 80 - 40;

        const yFim =
            Math.random() * 100 - 50;

        const rotacao =
            Math.random() * 30 - 15;

        const duracao =
            3 +
            Math.random() * 4;

        const brilho =
            1.5 +
            Math.random() * 2;

        particula.style.setProperty(
            "--inicio",
            `${inicio}px`
        );

        particula.style.setProperty(
            "--meio",
            `${meio}px`
        );

        particula.style.setProperty(
            "--fim",
            `${fim}px`
        );

        particula.style.setProperty(
            "--y-inicio",
            `${yInicio}px`
        );

        particula.style.setProperty(
            "--y-meio",
            `${yMeio}px`
        );

        particula.style.setProperty(
            "--y-fim",
            `${yFim}px`
        );

        particula.style.setProperty(
            "--rotacao",
            `${rotacao}deg`
        );

        particula.style.setProperty(
            "--duracao",
            `${duracao}s`
        );

        particula.style.setProperty(
            "--brilho",
            `${brilho}s`
        );

        particula.style.animationDelay =
            `${Math.random() * 4}s`;

        particulasAr.appendChild(
            particula
        );
    }
}

// ==========================================================
// PARTÍCULAS - FOGO
// ==========================================================

function criarParticulasFogo() {

    particulasFogo.innerHTML =
        "";

    const quantidade =
        38;

    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const particula =
            document.createElement(
                "span"
            );

        particula.classList.add(
            "particula-fogo"
        );

        const tamanho =
            3 +
            Math.random() * 7;

        particula.style.width =
            `${tamanho}px`;

        particula.style.height =
            `${tamanho}px`;

        // ==================================================
        // NASCIMENTO PRÓXIMO DA ESFERA
        // ==================================================

        const posicaoX =
            Math.random() * 30 + 35;

        particula.style.left =
            `${posicaoX}%`;

        const posicaoY =
            Math.random() * 20 + 45;

        particula.style.top =
            `${posicaoY}%`;

        // ==================================================
        // MOVIMENTO
        // ==================================================

        const xInicial =
            Math.random() * 70 - 35;

        const xMeio =
            Math.random() * 120 - 60;

        const xQuase =
            Math.random() * 170 - 85;

        const xFinal =
            Math.random() * 220 - 110;

        const duracao =
            2.5 +
            Math.random() * 3;

        const brilho =
            0.8 +
            Math.random() * 1.5;

        particula.style.setProperty(
            "--x-inicial",
            `${xInicial}px`
        );

        particula.style.setProperty(
            "--x-meio",
            `${xMeio}px`
        );

        particula.style.setProperty(
            "--x-quase",
            `${xQuase}px`
        );

        particula.style.setProperty(
            "--x-final",
            `${xFinal}px`
        );

        particula.style.setProperty(
            "--duracao",
            `${duracao}s`
        );

        particula.style.setProperty(
            "--brilho",
            `${brilho}s`
        );

        particula.style.animationDelay =
            `${Math.random() * 3}s`;

        particulasFogo.appendChild(
            particula
        );
    }
}

// ==========================================================
// EVENTOS DOS ELEMENTOS
// ==========================================================

elementos.forEach(
    elemento => {

        // ==================================================
        // MOUSE
        // ==================================================

        elemento.addEventListener(
            "mouseenter",
            () => {

                const nome =
                    elemento.dataset.elemento;

                console.log(
                    "Mouse sobre:",
                    nome
                );

                mudarCenario(
                    nome
                );
            }
        );

        // ==================================================
        // CLIQUE
        // ==================================================

        elemento.addEventListener(
            "click",
            () => {

                const nome =
                    elemento.dataset.elemento;

                console.log(
                    "Clique em:",
                    nome
                );

                mudarCenario(
                    nome
                );
            }
        );
    }
);