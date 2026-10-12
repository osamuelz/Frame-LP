# FRAME — Aplicativo Conceitual de Fotografia

> *Cada instante merece espaço.*  
> Landing page conceitual desenvolvida para portfólio, inspirada na linguagem de design e apresentação visual dos produtos da Apple: tipografia imponente e refinada, fotografias em destaque, espaços generosos, contrastes precisos e interações elegantes.

---

## 📸 Sobre o Projeto

**FRAME** é um aplicativo fictício de fotografia e edição de imagens que ajuda a transformar fotografias do cotidiano em registros expressivos através de ajustes tonais equilibrados e presets visuais de alta fidelidade.

Este projeto foi concebido como peça de destaque para portfólio no GitHub, priorizando:
- **Apresentação visual Apple-grade**: Layout minimalista, paleta em escala cinza suave (`#F5F5F7`), tipografia de sistema balanceada e uma seção imersiva em modo escuro para a experiência de edição.
- **Mockup de smartphone 100% em código**: Construído exclusivamente em HTML5 e CSS3 (sem imagens prontas de celular), com detalhes como ilha dinâmica, barra de status, grade dos terços e controles táteis de ajuste.
- **Comparador interativo antes/depois**: Demonstração em tempo real com a **mesma fotografia**, controlada por um elemento nativo acessível (`<input type="range">`), suporte a mouse, toque e teclado, e três presets de estilo (*Natural*, *Cinema* e *Mono*).
- **Galeria editorial com lightbox**: Grade com ritmo visual variado, navegação por teclado (`Enter`, `Space`, `Escape`), retenção de foco e bloqueio de rolagem do fundo.
- **Zero dependências de build**: Desenvolvido exclusivamente em HTML5 semântico, CSS3 e JavaScript puro (ES6+), pronto para execução instantânea em qualquer navegador moderno e compatível com GitHub Pages.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**: Estrutura semântica (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<dialog>` patterns), conformidade com acessibilidade (WAI-ARIA) e internacionalização (`lang="pt-BR"`).
- **CSS3 Puro**:
  - CSS Custom Properties (Design tokens para cores, tipografia, espaçamento e sombras).
  - Tipografia fluida com `clamp()`.
  - Layouts responsivos com CSS Grid e Flexbox.
  - Efeitos de corte com `clip-path` para o comparador de imagens.
  - Filtros CSS (`contrast`, `saturate`, `brightness`, `sepia`, `grayscale`).
  - Efeito de desfoque de fundo com `backdrop-filter`.
  - Suporte nativo à diretiva de acessibilidade `@media (prefers-reduced-motion: reduce)`.
- **JavaScript Vanilla (ES6+)**:
  - Manipulação de eventos de ponteiro (Pointer Events API) e captura de toque.
  - Sincronização bidirecional entre slider e arrasto de tela.
  - `IntersectionObserver` para animações discretas de entrada.
  - Gerenciamento acessível de foco no modal e menu mobile.

---

## 📁 Estrutura de Arquivos

```text
FRAME/
├── index.html              # Estrutura principal da landing page
├── css/
│   └── styles.css          # Design system completo e folhas de estilo
├── js/
│   └── main.js             # Lógica das interações, comparador e lightbox
├── assets/
│   └── images/             # Fotografias de alta qualidade (otimizadas)
│       ├── hero-phone.jpg          # Foto exibida no mockup de celular
│       ├── demo-photo.jpg          # Foto base da comparação antes/depois
│       ├── gallery-arquitetura.jpg # Galeria: Geometria e Luz
│       ├── gallery-paisagem.jpg    # Galeria: Horizontes Silenciosos
│       ├── gallery-retrato.jpg     # Galeria: Expressão Natural
│       ├── gallery-cotidiano.jpg   # Galeria: Manhãs e Sombras
│       ├── gallery-textura.jpg     # Galeria: Traços Orgânicos
│       └── gallery-urbano.jpg      # Galeria: Cores da Cidade
└── README.md               # Documentação técnica e guia do projeto
```

---

## 🚀 Como Executar Localmente

Como o projeto não utiliza ferramentas de empacotamento (bundlers) nem dependências externas, você pode executá-lo de qualquer uma das formas abaixo:

### Opção 1: Abrir diretamente no navegador
Dê um duplo clique no arquivo `index.html` ou abra-o arrastando para o navegador de sua preferência (Chrome, Safari, Firefox, Edge).

### Opção 2: Servidor local com VS Code Live Server
1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server** (se ainda não possuir).
3. Clique com o botão direito em `index.html` e selecione **"Open with Live Server"**.

### Opção 3: Usando Python ou Node.js
Se preferir a linha de comando:

**Com Python 3:**
```bash
python -m http.server 3000
```
Acesse: `http://localhost:3000`

**Com Node.js (npx serve):**
```bash
npx serve .
```

---

## 🌐 Como Publicar no GitHub Pages

O projeto foi estruturado com caminhos relativos intencionais, tornando a publicação no GitHub Pages direta e sem necessidade de configurações adicionais de build:

1. Crie um novo repositório no seu perfil do GitHub (ex: `frame-app`).
2. No seu terminal local, inicialize o Git e envie os arquivos:
   ```bash
   git init
   git add .
   git commit -m "feat: projeto inicial FRAME landing page"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/frame-app.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings** (Configurações do repositório) > **Pages** (no menu lateral).
4. Em **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: Selecione `main` e a pasta `/ (root)`.
   - Clique em **Save**.
5. Aguarde alguns instantes. Seu site estará disponível em:  
   `https://SEU_USUARIO.github.io/frame-app/`

---

## 🔗 Onde Adicionar o Link do Repositório no Rodapé

Caso deseje exibir um link direto para o repositório do GitHub no rodapé do site, localize o arquivo [index.html](file:///c:/Users/Lucas/Documents/FRAME/index.html) na seção `<footer>` (em torno da linha 330) e insira o link na lista `<ul class="footer-nav">` ou na seção inferior `<div class="footer-bottom">`:

```html
<!-- Exemplo de adição na lista de navegação do rodapé: -->
<ul class="footer-nav" aria-label="Links rápidos do rodapé">
  <li><a href="#recursos">Recursos</a></li>
  <li><a href="#galeria">Galeria</a></li>
  <li><a href="#demonstracao">Experimente</a></li>
  <li><a href="https://github.com/SEU_USUARIO/frame-app" target="_blank" rel="noopener noreferrer">GitHub</a></li>
</ul>
```

---

## 🕹️ Interações e Recursos Implementados

1. **Navegação Fixa com Efeito Translúcido**:
   - Cabeçalho compacto com `backdrop-filter: blur(20px)` e transição suave.
   - Menu móvel acessível com estado de expansão ARIA (`aria-expanded`).
   - Rolagem suave até as seções correspondentes.

2. **Mockup de Smartphone Responsivo**:
   - Desenhado puramente com CSS (bordas, curvas em raio contínuo, reflexos, ilha de sensores e botões laterais sutis).
   - Simulação da interface do aplicativo sobre uma fotografia autêntica.

3. **Comparador Antes / Depois (Split Slider)**:
   - Apresenta a **mesma foto** exatamente no mesmo enquadramento e corte.
   - Divisor deslizante interativo com alça e setas direcionais.
   - Controlável por toque em telas móveis, arrasto com mouse ou teclas de seta no teclado via `<input type="range">`.
   - Alternância dinâmica entre 3 estilos de tratamento (*Natural*, *Cinema* e *Mono*), com transição suave de filtros CSS.

4. **Galeria Editorial com Lightbox Acessível**:
   - Grid dinâmico com proporções intencionais de arquitetura, paisagem, retrato, cotidiano, texturas e cena urbana.
   - Lightbox modal com foco capturado, fechamento pela tecla `Esc`, clique no fundo ou botão de fechar, restaurando o foco ao elemento original.

5. **Acessibilidade e Desempenho**:
   - Anéis de foco claros e visíveis (`:focus-visible`).
   - Tags de imagem com dimensões explícitas para evitar *Cumulative Layout Shift* (CLS).
   - Carregamento prioritário na imagem principal (`fetchpriority="high"`) e lazy loading (`loading="lazy"`) nas fotos subsequentes.
   - Respeito integral às preferências de redução de movimento do sistema (`prefers-reduced-motion`).

---

## 📷 Origem e Atribuição das Fotografias

As imagens utilizadas no projeto foram selecionadas de fotógrafos da comunidade [Unsplash](https://unsplash.com), sob a licença Unsplash (livre para uso pessoal e comercial, sem necessidade estrita de atribuição, mas creditadas aqui em reconhecimento ao talento dos artistas):

- **Mockup Hero (Retrato)**: Ayo Ogunseinde ([Unsplash](https://unsplash.com/photos/53994a69daeb))
- **Comparador Interativo (Paisagem)**: Bailey Zindel ([Unsplash](https://unsplash.com/photos/506744038136-46273834b3fb))
- **Galeria - Geometria e Luz (Arquitetura)**: Joel Filipe ([Unsplash](https://unsplash.com/photos/1486406146926-c627a92ad1ab))
- **Galeria - Horizontes Silenciosos (Paisagem)**: Kalen Emsley ([Unsplash](https://unsplash.com/photos/1464822759023-fed622ff2c3b))
- **Galeria - Expressão Natural (Retrato)**: Christopher Campbell ([Unsplash](https://unsplash.com/photos/1544005313-94ddf0286df2))
- **Galeria - Manhãs e Sombras (Cotidiano)**: Nathan Dumlao ([Unsplash](https://unsplash.com/photos/1495474472287-4d71bcdd2085))
- **Galeria - Traços Orgânicos (Texturas)**: Scott Webb ([Unsplash](https://unsplash.com/photos/1518495973542-4542c06a5843))
- **Galeria - Cores da Cidade (Urbano)**: Aleksandar Pasaric ([Unsplash](https://unsplash.com/photos/1514565131-fce0801e5785))

---

## ⚖️ Declaração de Uso

**FRAME** é um projeto conceitual e fictício desenvolvido para fins de demonstração técnica, design de interface e composição de portfólio. Não possui vínculo com produtos comerciais, serviços pagos ou aplicativos reais nas lojas de aplicativos.
