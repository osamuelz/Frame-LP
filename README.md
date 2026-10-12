# FRAME

**Cada instante merece espaço.** Landing page de um aplicativo fictício de fotografia, criada para portfólio.

## Design

Tema escuro em grafite e lavanda, com alternativa clara, tipografia geométrica Manrope, navegação flutuante, fotos com cantos arredondados e transições suaves. A escolha de tema fica salva no navegador. A fonte é local: não depende do Google Fonts durante o uso.

## Tecnologias

HTML, CSS e JavaScript puro, sem dependências de build. Os caminhos são relativos e compatíveis com GitHub Pages.

## Executar

Abra `index.html` no navegador, use o Live Server ou execute `python -m http.server 3000` na pasta do projeto e acesse `http://localhost:3000`.

## Estrutura

```text
FRAME/
├── index.html
├── css/styles.css
├── js/main.js
├── assets/images/
├── assets/fonts/manrope-variable.ttf
├── assets/fonts/OFL.txt
└── README.md
```

## Interações

- Alternância entre os temas claro e escuro, com persistência local.
- Comparação da mesma foto antes e depois, com mouse, toque ou teclado.
- Estilos Natural, Cinema e Mono com filtros CSS.
- Galeria ampliada em um diálogo nativo, com fechamento por Escape, botão e clique no fundo. O foco retorna à foto.
- Menu móvel, navegação por âncoras e link para pular ao conteúdo.
- Animações de entrada que respeitam a preferência por movimento reduzido.

O mockup e o acervo ilustram o conceito do produto; não oferecem edição real de arquivos, upload ou download de aplicativo.

## Publicar no GitHub Pages

Envie os arquivos para um repositório. Em **Settings → Pages**, escolha **Deploy from a branch**, a branch desejada e a pasta **/ (root)**. Não é necessário um processo de build.

Para incluir um link para seu repositório, adicione a URL real à navegação do rodapé em `index.html`.

## Créditos

As fotografias locais foram preservadas do projeto original. Ele informa a origem como Unsplash e os seguintes créditos: Ayo Ogunseinde (hero), Bailey Zindel (comparador), Joel Filipe (arquitetura), Kalen Emsley (paisagem), Christopher Campbell (retrato), Nathan Dumlao (cotidiano), Scott Webb (natureza) e Aleksandar Pasaric (cidade).

Manrope: [Google Fonts](https://fonts.google.com/specimen/Manrope), distribuída sob SIL Open Font License. A licença completa está em `assets/fonts/OFL.txt`.

FRAME é um produto fictício desenvolvido para demonstração de interface e portfólio.
