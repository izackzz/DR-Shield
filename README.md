# DR-Shield: Proteção Avançada para Suas Páginas Web

O DR-Shield é um script de segurança robusto projetado para proteger suas páginas da web contra uma variedade de ameaças, incluindo a abertura do DevTools, o uso de extensões maliciosas, a cópia de conteúdo e a clonagem de páginas. Com uma configuração flexível e múltiplas camadas de defesa, o DR-Shield é uma ferramenta essencial para proteger seus ativos digitais.

## Funcionalidades Principais

  * **Bloqueio de DevTools**: Detecta a abertura das ferramentas de desenvolvedor (DevTools) no navegador. Ao ser detectado, o script pode fechar a aba ou redirecionar o usuário para uma página de sua escolha, dificultando a inspeção do código-fonte.
  * **Bloqueio de Extensões**: Permite o bloqueio de extensões específicas do navegador com base em seus IDs. Isso é útil para neutralizar ferramentas de cópia, bloqueadores de anúncios e outras extensões que possam interferir no funcionamento da sua página.
  * **Proteção Anti-Cópia**: Desabilita a seleção de texto, o clique com o botão direito do mouse e diversos atalhos de teclado comumente usados para copiar conteúdo (como Ctrl+C, Ctrl+U, F5).
  * **Sistema Anti-Clone**: Verifica se a sua página está sendo executada no domínio original. Se um domínio diferente for detectado, o script pode substituir todos os links da página por um link de sua escolha após um tempo determinado, protegendo contra a clonagem de páginas e o roubo de leads.
  * **Monitoramento de Scripts Injetados**: Utiliza um `MutationObserver` para monitorar e remover scripts que são injetados no DOM por extensões maliciosas, garantindo maior segurança para sua página.

## Configuração

A personalização do DR-Shield é feita diretamente no código-fonte, através da alteração de variáveis de configuração.

```javascript
// ===================== CONFIGURAÇÕES =====================

// Lista de extensões bloqueadas (IDs)
const blockedExtensions = [
    // - ALLOW COPY E SEMELHANTES
    "aefehdhdciieocakfobpaaolhipkcpgc",
    "lamaakaemgdclpnfbofmhpkanfnojjch",
    //- ROUBAR VSL
    "ajplclfainbnjaedmaijgkpdhgmlfihj",
    "iogidnfllpdhagebkblkgbfijkbkjdmm",
    //- ADBLOCK
    "cjpalhdlnbpafiamejdnhcphjbkeiagm",
    // Adicione mais IDs de extensões aqui
];

// URL para redirecionamento quando DevTools é detectado
const redirectURL = "WHITE-PAGE.html"; // Substitua pela URL desejada

// URL base que será usada para comparação
const baseDomain = "DOMINIO-DA-SUA-OFERTA-ORIGINAL-QUE-SERÁ-USADO-PARA-COMPARAÇÃO"; // Substitua pelo domínio base

// URL para substituir todos os links após o tempo definido
const antiCloneDomain = "SEU-CHECKOUT-ENCURTADO-PARA-ROUBAR-LEADS-DO-CLONADOR"; //anti-clone

// Tempo em milissegundos antes de substituir os links (5 minutos)
const timeBeforeReplace = 5 * 60 * 1000; // 5 minutos em milissegundos
```

## Instalação e Uso

Para implementar o DR-Shield em sua página, siga os passos abaixo:

1.  **Adicione o Detector de DevTools**: Insira o script do `devtools-detector` no topo da tag `<head>` do seu HTML. Você pode usar a versão hospedada ou o arquivo `dev-detect.min.js` localmente.

    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/devtools-detector/2.0.22/devtools-detector.min.js"></script>

    <script src="dev-detect.min.js"></script>
    ```

2.  **Personalize o Script Principal**: Configure as variáveis (`blockedExtensions`, `redirectURL`, `baseDomain`, etc.) no script principal para atender às suas necessidades.

3.  **Ofusque o Script**: Para dificultar a análise do seu código, é altamente recomendável que você ofusque o conteúdo do script principal.

4.  **Organize e Adicione o Script ao seu HTML**: Salve o script ofuscado em uma estrutura de pastas que dificulte sua detecção. Por exemplo: `pages/wp-content/plugins/native-config/elementor-network/assets/js/elementor-8213497xEgn-config.js`.

5.  **Adicione o Script ao Corpo do HTML**: Inclua o seu script ofuscado no final da tag `<body>` do seu arquivo HTML.

    ```html
    <script src="./pages/wp-content/plugins/native-config/elementor-network/assets/js/elementor-8213497xEgn-config.js"></script>
    ```

## Recomendações de Segurança Adicionais

  * **Canary Tokens**: Para um nível extra de segurança e monitoramento, considere o uso de Canary Tokens em seu CSS. Isso pode ajudar a detectar se alguém está tentando copiar ou analisar seus arquivos.

## Contato

Para dúvidas, sugestões ou para trocar ideias sobre o script, entre em contato com o desenvolvedor através do Telegram: [@Prometheust](https://t.me/Prometheust).