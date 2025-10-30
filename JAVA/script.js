/* Usamos 'DOMContentLoaded' para garantir que o JavaScript 
  só rode DEPOIS que todo o HTML foi carregado.
*/
document.addEventListener('DOMContentLoaded', function() {
    
    // --- REQUISITO 1: MANIPULAÇÃO DO DOM (Menu Hambúrguer) ---
    const btnHamburger = document.getElementById('btn-hamburger');
    const menuNavegacao = document.querySelector('.main-nav');
    
    // Verifica se o botão existe na página atual
    if (btnHamburger && menuNavegacao) {
        
        // "Escuta" o clique no botão
        btnHamburger.addEventListener('click', function() {
            
            // Adiciona/Remove a classe 'is-open' no botão (para o "X")
            btnHamburger.classList.toggle('is-open');
            
            // Adiciona/Remove a classe 'is-open' no menu (para mostrar/esconder)
            menuNavegacao.classList.toggle('is-open');
            
            // Bônus: Acessibilidade
            const estaAberto = btnHamburger.classList.contains('is-open');
            btnHamburger.setAttribute('aria-expanded', estaAberto);
        });
    }

    
    // --- REQUISITO 2: MANIPULAÇÃO DO DOM (Formulário de Cadastro) ---
    const formulario = document.getElementById('form-cadastro');
    const mensagemDiv = document.getElementById('mensagem-feedback');

    // Verifica se o formulário existe na página atual
    if (formulario && mensagemDiv) {

        // "Escuta" o evento de "submit" (envio)
        formulario.addEventListener('submit', function(evento) {
            
            // 1. Impede o comportamento padrão (recarregar a página)
            evento.preventDefault(); 
            
            // 2. Esconde o formulário
            formulario.style.display = 'none';
            
            // 3. Coloca o texto na div de feedback
            mensagemDiv.textContent = 'Obrigado por se cadastrar!';
            
            // 4. Adiciona as classes de estilo (que criamos no CSS)
            mensagemDiv.classList.add('alerta', 'alerta-sucesso');
        });
    }


    // --- REQUISITO 3: MANIPULAÇÃO DO DOM (Botão Copiar PIX) ---
    const botaoCopiar = document.getElementById('btn-copiar');
    const chavePix = document.getElementById('chave-pix');
    
    // Verifica se o botão existe na página atual
    if (botaoCopiar && chavePix) {
        
        // "Escuta" o clique no botão
        botaoCopiar.addEventListener('click', function() {
            
            // Pega o texto de dentro da tag <p id="chave-pix">
            const textoChave = chavePix.textContent;
            
            // Usa a API do navegador para copiar o texto
            navigator.clipboard.writeText(textoChave).then(function() {
                
                // Aviso de sucesso: muda o texto do botão
                botaoCopiar.textContent = 'Chave Copiada! ✅';
                
                // Volta o texto original depois de 3 segundos
                setTimeout(function() {
                    botaoCopiar.textContent = 'Copiar Chave PIX';
                }, 3000); 
                
            }, function() {
                // Aviso de erro
                alert('Não foi possível copiar a chave.');
            });
        });
    }
    
});
document.addEventListener('DOMContentLoaded', function() {
    
    /* --- CÓDIGO DO MENU HAMBÚRGUER (JÁ DEVE ESTAR AQUI) --- */
    // (O código do menu ... )
    
    /* --- CÓDIGO DO FORMULÁRIO (JÁ DEVE ESTAR AQUI) --- */
    // (O código do formulário ... )
    
    /* --- CÓDIGO DO BOTÃO COPIAR (JÁ DEVE ESTAR AQUI) --- */
    // (O código do botão ... )


    // =======================================================
    // NOVO REQUISITO: SISTEMA DE TEMPLATES JAVASCRIPT
    // =======================================================

    // 1. OS DADOS (Nossa "base de dados" simples)
    // Uma lista (Array) de objetos. Cada objeto é um projeto.
    const dadosDosProjetos = [
        {
            titulo: 'A Música Salva Vidas',
            imagemSrc: 'images/projeto1.jpg',
            altText: 'Crianças na aula de musica',
            descricao1: 'Neste projeto, usamos a música como uma poderosa ferramenta de transformação social.',
            descricao2: 'Oferecemos aulas de música (como canto, violão e percussão) para crianças e adolescentes.'
        },
        {
            titulo: 'A arte além do limite',
            imagemSrc: 'images/projeto2.jpg',
            altText: 'Diferentes etinias',
            descricao1: 'Neste projeto, usamos a arte como uma poderosa ferramenta de transformação social.',
            descricao2: 'Oferecemos aulas de artes visuais (como pintura, desenho e artesanato) para crianças.'
        },
        {
            titulo: 'Dança e Expressão Corporal',
            imagemSrc: 'images/projeto3.jpg', // (Você precisaria ter essa imagem)
            altText: 'Grupo de jovens dançando',
            descricao1: 'A dança liberta o corpo e a mente, promovendo a inclusão e a autoconfiança.',
            descricao2: 'Nossas oficinas de dança de rua e contemporânea são um sucesso entre os jovens da comunidade.'
        }
        // Para adicionar mais projetos, é só copiar e colar
        // um novo objeto { ... } aqui.
    ];


    // 2. O TEMPLATE (Onde o JS vai "desenhar")
    
    // Primeiro, encontramos o "pai" vazio que deixamos no HTML
    const containerProjetos = document.querySelector('.lista-projetos');

    // Verifica se estamos na página de projetos (se o container existe)
    if (containerProjetos) {
        
        // 3. O LOOP (Construindo o HTML)
        
        // Limpa o container (só por garantia)
        containerProjetos.innerHTML = ''; 

        // Para cada "projeto" na nossa lista "dadosDosProjetos"...
        dadosDosProjetos.forEach(function(projeto) {
            
            // ...crie este bloco de HTML.
            // (Note as crases ` ` que permitem multi-linhas)
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
            
            // 4. A INSERÇÃO (Coloca o HTML na página)
            containerProjetos.innerHTML += htmlDoProjeto;
        });
    }

}); // <-- Fim do 'DOMContentLoaded'

/* --- REQUISITO: SPA BÁSICO ---

   Vamos reestruturar todo o nosso código.
   1. Funções Separadas: Vamos criar funções separadas para 
      iniciar os listeners (do formulário, do botão copiar, etc.).
   2. Navegação SPA: Vamos criar uma função que "intercepta" os cliques 
      nos links, busca o novo conteúdo e o injeta na página.
   3. Re-inicialização: Após injetar o novo conteúdo, vamos chamar 
      as funções separadas de novo para "ativar" o JS no novo HTML.
*/

// =======================================================
// FUNÇÕES REUTILIZÁVEIS (Para ativar o conteúdo de 'main')
// =======================================================

function initMainContentListeners() {
    
    // --- Ativa o Formulário de Cadastro ---
    const formulario = document.getElementById('form-cadastro');
    const mensagemDiv = document.getElementById('mensagem-feedback');

    if (formulario && mensagemDiv) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault(); 
            formulario.style.display = 'none';
            mensagemDiv.textContent = 'Obrigado por se cadastrar!';
            mensagemDiv.classList.add('alerta', 'alerta-sucesso');
        });
    }

    // --- Ativa o Botão Copiar PIX ---
    const botaoCopiar = document.getElementById('btn-copiar');
    const chavePix = document.getElementById('chave-pix');
    
    if (botaoCopiar && chavePix) {
        botaoCopiar.addEventListener('click', function() {
            const textoChave = chavePix.textContent;
            navigator.clipboard.writeText(textoChave).then(function() {
                botaoCopiar.textContent = 'Chave Copiada! ✅';
                setTimeout(function() {
                    botaoCopiar.textContent = 'Copiar Chave PIX';
                }, 3000); 
            });
        });
    }

    // --- Ativa o Template de Projetos ---
    const containerProjetos = document.querySelector('.lista-projetos');
    
    if (containerProjetos) {
        const dadosDosProjetos = [
            {
                titulo: 'A Música Salva Vidas',
                imagemSrc: 'images/projeto1.jpg',
                altText: 'Crianças na aula de musica',
                descricao1: 'Neste projeto, usamos a música...',
                descricao2: 'Oferecemos aulas de música (canto, violão)...'
            },
            {
                titulo: 'A arte além do limite',
                imagemSrc: 'images/projeto2.jpg',
                altText: 'Diferentes etinias',
                descricao1: 'Neste projeto, usamos a arte...',
                descricao2: 'Oferecemos aulas de artes visuais (pintura, desenho)...'
            },
            {
                titulo: 'Dança e Expressão Corporal',
                imagemSrc: 'images/projeto3.jpg',
                altText: 'Grupo de jovens dançando',
                descricao1: 'A dança liberta o corpo e a mente...',
                descricao2: 'Nossas oficinas de dança de rua são um sucesso.'
            }
        ];
        
        containerProjetos.innerHTML = ''; // Limpa o container
        
        dadosDosProjetos.forEach(function(projeto) {
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
} // --- Fim de initMainContentListeners ---


// =======================================================
// FUNÇÃO PARA CARREGAR O CONTEÚDO DA PÁGINA (O "SPA")
// =======================================================
async function loadPage(url) {
    try {
        // 1. Busca o arquivo HTML completo (ex: "projetos.html")
        const response = await fetch(url);
        const text = await response.text();

        // 2. Transforma o texto HTML em um documento "virtual"
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // 3. "Recorta" o conteúdo de <main> e <title> do documento virtual
        const newMainContent = doc.querySelector('main').innerHTML;
        const newTitle = doc.querySelector('title').textContent;

        // 4. "Cola" o novo conteúdo no nosso <main> principal
        document.getElementById('main-content').innerHTML = newMainContent;

        // 5. Atualiza o título da aba do navegador
        document.title = newTitle;
        
        // 6. Atualiza a URL na barra do navegador (sem recarregar)
        history.pushState(null, newTitle, url);

        // 7. CHAMA DE NOVO AS FUNÇÕES DE LISTENER!
        // Isso "ativa" o JavaScript no novo conteúdo que acabamos de colar.
        initMainContentListeners();

    } catch (error) {
        console.error('Erro ao carregar a página:', error);
        // Se falhar, apenas navega do jeito normal
        window.location.href = url;
    }
}


// =======================================================
// EXECUÇÃO INICIAL (Roda uma vez quando o site carrega)
// =======================================================
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Ativa o Menu Hambúrguer (só precisa rodar uma vez) ---
    const btnHamburger = document.getElementById('btn-hamburger');
    const menuNavegacao = document.querySelector('.main-nav');
    
    if (btnHamburger && menuNavegacao) {
        btnHamburger.addEventListener('click', function() {
            btnHamburger.classList.toggle('is-open');
            menuNavegacao.classList.toggle('is-open');
        });
    }

    // --- 2. Ativa os links de navegação do SPA ---
    const navLinks = document.querySelectorAll('.main-nav-list a');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Impede o recarregamento da página
            e.preventDefault(); 
            
            const url = link.getAttribute('href');
            
            // Chama nossa nova função de carregar página
            loadPage(url);
            
            // Bônus: Fecha o menu mobile se estiver aberto
            if (menuNavegacao.classList.contains('is-open')) {
                btnHamburger.classList.remove('is-open');
                menuNavegacao.classList.remove('is-open');
            }
        });
    });

    // --- 3. Ativa os listeners para o conteúdo inicial (index.html) ---
    initMainContentListeners();

    // --- 4. Lida com os botões "Voltar" e "Avançar" do navegador ---
    window.addEventListener('popstate', function() {
        // Carrega o conteúdo da URL para a qual o usuário "voltou"
        loadPage(location.pathname);
    });
});