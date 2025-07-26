# DR-Shield

DR-Shield é um script de proteção em JavaScript para ofertas digitais.  
Ele atua bloqueando extensões conhecidas de espionagem, detectando abertura de DevTools e, opcionalmente, invalidando versões clonadas da página.

---

## Funcionalidades

- Detecção de DevTools abertos.
- Bloqueio de extensões como Allow Copy, AdBlock, Automa, etc.
- Substituição de links em páginas clonadas.
- Redirecionamento ou travamento de aba ao detectar espionagem.
- Compatível com adição de Canary Tokens para monitoramento.

---

## Instalação

### 1. Adicione a lib base no `<head>`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/devtools-detector/2.0.22/devtools-detector.min.js"></script>
````

### 2. Adicione o DR-Shield no final do `<body>`:

Recomendado via CDN oficial, ou com nome do script alterado dentro do seu próprio servidor para dificil identificação:

```html
<script src="https://cdn.jsdelivr.net/gh/izackzz/DR-Shield@v1.0.1/dr-shield.min.js"></script>
```

---

## Configuração

Para uso, defina as seguintes variáveis em uma tag "<script></script>" antes da importação da ferramenta, (obviamente com js ofuscado):

```js
    const crashPage = false;

    // Adicione aqui os IDs de extensões que você quer bloquear.
    const blockedExtensions = [
      // - ALLOW COPY E SEMELHANTES
      "aefehdhdciieocakfobpaaolhipkcpgc",
      "lamaakaemgdclpnfbofmhpkanfnojjch",
      "mmpljcghnbpkokhbkmfdmoagllopfmlm",
      "onepmapfbjohnegdmfhndpefjkppbjkm",
      "imblndhbdddibjabnddopiehagbkipkj",
      "mlloloooolpffjkjaclpfpeednngpjon",
      "fpjppnhnpnknbenelmbnidjbolhandnf",
      "nahkcohcfljjjkhdcbfdphegdoiflbjd",
      "ehfmpjdcdldhefieelihdobnjfpalhic",
      "moomnncijchljipbmkiblfbaaldinhde",
      "ajhbdcgfhlhhmocddefknjjkejcfpbnj",
      "jhodmcfehicjonjdoljadkbkenaoehfm",
      "gbjocelfmcapnmcocncmheabfhdhmadl",
      "mbjgbabnndiapebkfoenicelmacgabep",
      "igbahmkffbagkepelepkldjiknhbklga",
      "lljjoinbdnpeicjceklabpahjgcmjbbg",
      "plnlliclnceednefeebkgflnmlchdmcf",
      //- ROUBAR VSL
      "ajplclfainbnjaedmaijgkpdhgmlfihj",
      "iogidnfllpdhagebkblkgbfijkbkjdmm",
      "ekhbcipncbkfpkaianbjbcbmfehjflpf",
      "ghiehahinoheonempcikofhlhnbpnhga",
      "",
      //- ADBLOCK
      "cjpalhdlnbpafiamejdnhcphjbkeiagm",
      //- SPY
      "ppbmlcfgohokdanfpeoanjcdclffjncg",
      "gppongmhjkpfnbhagpmjfkannfbllamg",
      "",
      //- COOKIE
      "hlkenndednhfkekhgcdicdfddnkalmdm",
      //- HACKERS
      "cmbndhnoonmghfofefkcccljbkdpamhi",
      "ginpbkfigcoaokgflihfhhmglmbchinc",
      "ngpampappnmepgilojfohadhhmbhlaek",
      "fahollcgofmpnehocdgofnhkkchiekoo",
      //- USER AGENT
      "einpaelgookohagofgnnkcfjbkkgepnp",
      //- CONTROLADOR DE VELOCIDADE
      "nkkhljadiejecbgelalchmjncoilpnlk",
      //- PIXEL HELPER
      "fdgfkebogiimcoedlicjlajpkdmockpc",
      //- AUTOMA
      "infppggnoaenmfagbfknfkancpbljcca",

      // Adicione mais IDs de extensões aqui
    ];
    const redirectURL = "https://google.com";
    const baseDomain = "seu-dominio.com";
    const antiCloneDomain = "https://seu-checkout.com/oferta-xyz";
    const timeBeforeReplace = 5 * 60 * 1000;
```

---

## Recomendações

* Obfusque o script final para dificultar engenharia reversa.
* Atualize a lista de `blockedExtensions` conforme necessidade.
* Utilize monitoramento adicional se necessário (como Canary Tokens via CSS).

---

Quer trocar ideia, sugerir melhorias ou relatar bug? Fale comigo no TG: [@yMusashi](https://t.me/yMusashi)

---
