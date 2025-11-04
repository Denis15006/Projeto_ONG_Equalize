
// Espera o HTML carregar antes de rodar o JS
document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // 1️⃣ MENU HAMBÚRGUER (abre e fecha o menu no celular)
    // =======================================================
    const btnHamburger = document.getElementById("btn-hamburger");
    const menuNavegacao = document.querySelector(".main-nav");

    if (btnHamburger && menuNavegacao) {
        btnHamburger.addEventListener("click", () => {
            btnHamburger.classList.toggle("is-open");
            menuNavegacao.classList.toggle("is-open");
            const aberto = btnHamburger.classList.contains("is-open");
            btnHamburger.setAttribute("aria-expanded", aberto);
        });
    }

    // =======================================================
    // 2️⃣ FORMULÁRIO (exibe mensagem de sucesso)
    // =======================================================
    const formulario = document.getElementById('form-cadastro');
    const mensagemDiv = document.getElementById('mensagem-feedback');

    if (formulario && mensagemDiv) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault(); // impede o recarregamento da página
            formulario.style.display = 'none';
            mensagemDiv.textContent = 'Obrigado por se cadastrar!';
            mensagemDiv.classList.add('alerta', 'alerta-sucesso');
        });
    }

    // =======================================================
    // 3️⃣ BOTÃO COPIAR CHAVE PIX
    // =======================================================
    const botaoCopiar = document.getElementById('btn-copiar');
    const chavePix = document.getElementById('chave-pix');

    if (botaoCopiar && chavePix) {
        botaoCopiar.addEventListener('click', () => {
            const textoChave = chavePix.textContent;
            navigator.clipboard.writeText(textoChave).then(() => {
                botaoCopiar.textContent = 'Chave Copiada! ✅';
                setTimeout(() => botaoCopiar.textContent = 'Copiar Chave PIX', 3000);
            });
        });
    }

    // =======================================================
    // 4️⃣ MODO ESCURO / CLARO 🌙☀️
    // =======================================================
    const botaoTema = document.getElementById("btn-tema");

    if (botaoTema) {

        // Verifica se o usuário já tinha um tema salvo
        const temaSalvo = localStorage.getItem("tema");

        if (temaSalvo === "dark") {
            document.body.classList.add("dark-mode");
            botaoTema.textContent = "☀️";
            botaoTema.setAttribute("aria-label", "Ativar modo claro");
        } else {
            botaoTema.textContent = "🌙";
            botaoTema.setAttribute("aria-label", "Ativar modo escuro");
        }

        // Quando clicar no botão, alterna o modo
        botaoTema.addEventListener("click", () => {
            const modoEscuroAtivo = document.body.classList.toggle("dark-mode");

            if (modoEscuroAtivo) {
                botaoTema.textContent = "☀️";
                botaoTema.setAttribute("aria-label", "Ativar modo claro");
                localStorage.setItem("tema", "dark");
            } else {
                botaoTema.textContent = "🌙";
                botaoTema.setAttribute("aria-label", "Ativar modo escuro");
                localStorage.setItem("tema", "light");
            }
        });
    }

    // =======================================================
    // 5️⃣ INSERIR PROJETOS DINAMICAMENTE (TEMPLATE)
    // =======================================================
    const containerProjetos = document.querySelector('.lista-projetos');

    if (containerProjetos) {
        const dadosDosProjetos = [
            {
                titulo: 'A Música Salva Vidas',
                imagemSrc: 'images/projeto1.jpg',
                altText: 'Crianças na aula de música',
                descricao1: 'Neste projeto, usamos a música como ferramenta de transformação social.',
                descricao2: 'Oferecemos aulas de canto, violão e percussão para crianças e adolescentes.'
            },
            {
                titulo: 'A Arte Além do Limite',
                imagemSrc: 'images/projeto2.jpg',
                altText: 'Crianças de diferentes etnias pintando',
                descricao1: 'Neste projeto, usamos a arte para estimular a criatividade e inclusão.',
                descricao2: 'Oferecemos oficinas de pintura, desenho e artesanato.'
            },
            {
                titulo: 'Dança e Expressão Corporal',
                imagemSrc: 'images/projeto3.jpg',
                altText: 'Grupo de jovens dançando',
                descricao1: 'A dança liberta o corpo e a mente, promovendo a inclusão.',
                descricao2: 'Oficinas de dança de rua e contemporânea para jovens da comunidade.'
            }
        ];

        // Limpa o conteúdo antes de inserir
        containerProjetos.innerHTML = '';

        // Cria os elementos dinamicamente
        dadosDosProjetos.forEach(projeto => {
            const htmlDoProjeto = `
                <article class="projeto-item">
                    <img src="${projeto.imagemSrc}" alt="${projeto.altText}">
                    <div class="projeto-item-conteudo">
                        <h3>${projeto.titulo}</h3>
                        <p>${projeto.descricao1}</p>
                        <h4>O que fazemos</h4>
                        <p>${projeto.descricao2}</p>
                    </div>
                </article>
            `;
            containerProjetos.innerHTML += htmlDoProjeto;
        });
    }

}); // 🔚 fim do DOMContentLoaded
