/**
 * DR-Shield v3.0 - Escudo Reativo
 * Detecta a injeção de elementos por extensões bloqueadas usando Regex,
 * de forma universal para qualquer navegador.
 */
(function() {
    // Flag para garantir que a ação de punição seja disparada apenas uma vez.
    let threatDetected = false;

    // Carrega a configuração do usuário a partir da página HTML.
    const config = {
        crashPage: typeof crashPage !== 'undefined' ? crashPage : false,
        blockedExtensions: typeof blockedExtensions !== 'undefined' ? blockedExtensions.filter(id => id && typeof id === 'string') : [],
        redirectURL: typeof redirectURL !== 'undefined' ? redirectURL : '',
        baseDomain: typeof baseDomain !== 'undefined' ? baseDomain : window.location.hostname.replace('www.', ''),
        antiCloneDomain: typeof antiCloneDomain !== 'undefined' ? antiCloneDomain : '',
        timeBeforeReplace: typeof timeBeforeReplace !== 'undefined' ? timeBeforeReplace : 300000
    };

    // ===================== AÇÃO DE PUNIÇÃO =====================

    /**
     * Função central que executa a ação final (crash ou redirect).
     * @param {string} reason - O motivo pelo qual a ação foi disparada.
     */
    function triggerAction(reason) {
        if (threatDetected) return;
        threatDetected = true;
        
        // console.warn(`DR-Shield: Ameaça detectada! Motivo: ${reason}`);

        if (config.crashPage) {
            console.error("DR-Shield: Modo Agressivo ativado. Travando a aba do navegador...");
            if (typeof devtoolsDetector !== 'undefined') {
                devtoolsDetector.crashBrowser();
            }
        } else {
            console.warn(`DR-Shield: Modo Sutil ativado. Redirecionando o usuário...`);
            if (config.redirectURL) {
                window.location.href = config.redirectURL;
            } else {
                window.open('', '_self').close();
            }
        }
    }

    // ===================== MÉTODO DE DETECÇÃO PRINCIPAL =====================

    /**
     * Inspeciona um nó recém-adicionado ao DOM.
     * @param {Node} node - O elemento que foi injetado na página.
     */
    function inspectInjectedNode(node) {
        // Só nos interessamos por elementos (nodeType 1) que podem carregar recursos.
        if (node.nodeType !== 1) return;

        // O atributo 'src' é o mais comum para scripts e iframes.
        const source = node.src || '';

        // Se não houver 'src' ou se a lista de bloqueio estiver vazia, não faz nada.
        if (!source || config.blockedExtensions.length === 0) return;

        // Para cada ID na lista de bloqueio...
        for (const id of config.blockedExtensions) {
            // ...cria uma expressão regular para encontrar a string do ID dentro do 'src'.
            // Esta busca é poderosa porque não se importa com o protocolo ou o resto da URL.
            try {
                const idRegex = new RegExp(id.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')); // Escapa caracteres especiais para o Regex

                // Se o ID da extensão for encontrado no 'src' do script injetado...
                if (idRegex.test(source)) {
                    // ...GATILHO!
                    triggerAction(`Injeção detectada contendo o ID bloqueado: ${id}`);
                    // Uma vez que a ameaça é detectada, podemos parar de procurar.
                    break;
                }
            } catch (e) {
                console.error(`DR-Shield: ID de extensão inválido para Regex: ${id}`, e);
            }
        }
    }

    /**
     * Inicia o MutationObserver, o "vigia" que monitora a página em tempo real.
     */
    function initializeInjectionObserver() {
        // O MutationObserver é a API nativa do navegador para observar mudanças no DOM.
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                // Para cada grupo de nós adicionados...
                for (const node of mutation.addedNodes) {
                    // ...inspeciona o nó.
                    inspectInjectedNode(node);
                }
            }
        });

        // Configura o observador para vigiar a página inteira em busca de novos elementos.
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
    /**
     * Detecta a abertura do DevTools (continua como uma camada de proteção adicional).
     */
    function detectDevTools() {
        if (typeof devtoolsDetector === 'undefined') {
            console.error("DR-Shield: Biblioteca 'devtools-detector' não encontrada.");
            return;
        }
        devtoolsDetector.addListener(isOpen => {
            if (isOpen) {
                triggerAction("DevTools aberto pelo usuário");
            }
        });
        devtoolsDetector.launch();
    }

    // ===================== FUNÇÕES AUXILIARES E INICIALIZAÇÃO =====================

    function setupAntiCopy() {
        document.oncontextmenu = () => false;
        document.onselectstart = () => false;
        window.onkeydown = e => {
            if ((e.ctrlKey || e.metaKey) && ['c', 'u', 's', 'i', 'p', 'a'].includes(e.key.toLowerCase())) e.preventDefault();
            if (['F12', 'F5'].includes(e.key)) e.preventDefault();
        };
    }

    function activateAntiClone() {
        const currentHostname = window.location.hostname.replace('www.', '');
        if (config.baseDomain && currentHostname !== config.baseDomain) {
            setTimeout(() => {
                if (!config.antiCloneDomain) return;
                document.querySelectorAll('a').forEach(link => link.href = config.antiCloneDomain);
                console.log("DR-Shield: Sistema anti-clone ativado. Links substituídos.");
            }, config.timeBeforeReplace);
        }
    }

    function initializeShield() {
        if (window.self !== window.top) return;

        console.log("DR-Shield v3.0 ativado.");
        
        setupAntiCopy();
        detectDevTools();
        initializeInjectionObserver(); // <-- O vigia de injeções é ativado aqui.
        activateAntiClone();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeShield);
    } else {
        initializeShield();
    }
})();