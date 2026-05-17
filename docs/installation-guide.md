# Guia de Instalação do Plugin Conversu

Este guia detalha o processo de instalação do plugin Conversu em seu site. Para garantir o funcionamento correto do plugin, siga cuidadosamente as instruções abaixo.

---

## 1. Inserção do Código HTML

Para instalar o plugin, adicione o seguinte código dentro da tag `<body>` do HTML da sua aplicação:

```html
<div id="conversu-plugin" data-token="SEU_TOKEN_AQUI"></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

### 1.1 Parâmetros obrigatórios

- **`id`**: O valor deve sempre ser `"conversu-plugin"`.
- **`data-token`**: Token fornecido pelo painel administrativo da sua conta. O token é único e identifica sua instância do plugin.

---

## 2. Segurança

Por motivos de segurança, o site onde o plugin será hospedado deve estar registrado no painel de administração do Conversu. Caso contrário, o plugin não será injetado na página. A validação é feita utilizando a política CORS durante a injeção, além de uma autenticação que compara o token do plugin com sua origem.

Certifique-se de que o domínio do seu site está corretamente registrado para evitar problemas na exibição do plugin.

---

## 3. Parâmetros opcionais

Todos os parâmetros opcionais são adicionados como atributos `data-*` na mesma `<div>`.

### 3.1 Modo de exibição

| Atributo | Valores | Padrão | Descrição |
|---|---|---|---|
| `data-mode` | `"POPOVER"` \| `"COMPONENT"` | `"POPOVER"` | **POPOVER**: exibe um botão flutuante que abre o chat ao ser clicado. **COMPONENT**: renderiza o chat diretamente na div, sem botão. Ideal para embeds fixos na página. |
| `data-allow-expand` | `"true"` \| `"false"` | `"true"` | Permite que o usuário expanda o chat para tela cheia. |
| `data-show-on-error` | `"true"` \| `"false"` | `"false"` | Exibe um componente de erro visível quando o plugin falha ao carregar. Útil para debug em desenvolvimento. |

### 3.2 Posicionamento

| Atributo | Valores | Padrão | Descrição |
|---|---|---|---|
| `data-position` | `"bottom-right"` \| `"bottom-left"` \| `"top-right"` \| `"top-left"` | `"bottom-right"` | Posição do botão flutuante na tela. Aplicável apenas no modo `POPOVER`. |
| `data-z-index` | número | `9998` | Z-index CSS do container do plugin. Aumente se outros elementos do site ficarem sobrepostos ao plugin. |

### 3.3 Dimensões

| Atributo | Valores | Padrão | Descrição |
|---|---|---|---|
| `data-btn-size` | número (px) | `64` | Tamanho em pixels do botão de abertura. |
| `data-height` | string CSS | — | Altura do chat aberto (ex: `"500px"`, `"80vh"`). |
| `data-width` | string CSS | — | Largura do chat aberto (ex: `"400px"`). |
| `data-max-height` | string CSS | — | Altura máxima do chat. |
| `data-max-width` | string CSS | — | Largura máxima do chat. |

### 3.4 Botão de abertura

| Atributo | Valores | Padrão | Descrição |
|---|---|---|---|
| `data-btn-type` | `"circle"` \| `"badge"` \| `"ghost"` | `"circle"` | Estilo visual do botão. **circle**: botão redondo. **badge**: botão retangular com texto. **ghost**: botão transparente. |
| `data-color` | cor CSS | — | Cor de fundo do botão (ex: `"#ff5733"`). |
| `data-btn-icon` | URL | — | URL de uma imagem para usar como ícone do botão. |
| `data-btn-title` | string | — | Texto exibido no botão. Usado principalmente com `data-btn-type="badge"`. |
| `data-icon-width` | string CSS | — | Largura da imagem do ícone (ex: `"32px"`). Requer `data-btn-icon` e `data-icon-height`. |
| `data-icon-height` | string CSS | — | Altura da imagem do ícone (ex: `"32px"`). Requer `data-btn-icon` e `data-icon-width`. |

### 3.5 Tooltip

| Atributo | Valores | Padrão | Descrição |
|---|---|---|---|
| `data-tooltip` | string | — | Texto do tooltip exibido ao passar o mouse sobre o botão. Se não definido, o servidor pode fornecer um tooltip configurado no painel do bot. |
| `data-tooltip-color` | cor CSS | — | Cor do texto do tooltip. |
| `data-tooltip-bg` | cor CSS | — | Cor de fundo do tooltip. |

### 3.6 Identificação do usuário

Esses parâmetros são úteis para associar a conversa a um usuário já autenticado no seu sistema.

| Atributo | Valores | Padrão | Descrição |
|---|---|---|---|
| `data-user` | string | — | Identificador único do usuário logado (ex: ID ou e-mail). Tem prioridade sobre `data-username`. |
| `data-username` | string | — | Alternativa a `data-user`. |
| `data-name` | string | — | Nome de exibição do usuário, passado ao chat. |

### 3.7 Agendamento de disponibilidade

Controla em quais horários o plugin fica visível. Fora do intervalo definido, o plugin é ocultado automaticamente.

| Atributo | Valores | Padrão | Descrição |
|---|---|---|---|
| `data-start-hour` | `"HH:mm"` | — | Hora de início da janela de disponibilidade. Se não definido, o plugin fica disponível 24h. |
| `data-end-hour` | `"HH:mm"` | — | Hora de fim da janela de disponibilidade. Suporta janelas que cruzam meia-noite (ex: `"22:00"` até `"06:00"`). |

> **Nota:** os horários configurados no painel administrativo têm prioridade sobre os valores definidos aqui via `data-*`.

### 3.8 Aparência e tema

| Atributo | Valores | Padrão | Descrição |
|---|---|---|---|
| `data-theme` | `"light"` \| `"dark"` | `"light"` | Tema de cores padrão do plugin. |
| `data-allow-dark-theme` | `"true"` \| `"false"` | `"false"` | Permite que o plugin siga automaticamente a preferência de tema claro/escuro do navegador do usuário. |
| `data-border` | string CSS | — | Borda customizada para o container do chat quando aberto (ex: `"1px solid #000000"`). |
| `data-global-css` | `"allowed"` \| `"blocked"` | `"allowed"` | Controla se o CSS global do site pode afetar o visual do plugin. Use `"blocked"` para isolar completamente o estilo. |
| `data-reset-css` | `"true"` \| `"false"` | `"false"` | Aplica um reset de CSS antes dos estilos do plugin, garantindo consistência visual entre diferentes sites. |

---

## 4. Exemplos

### Exemplo mínimo

```html
<div id="conversu-plugin" data-token="SEU_TOKEN_AQUI"></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

---

### 4.1 Botão Circle (padrão)

Botão redondo flutuante no canto da tela.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-btn-type="circle"
  data-position="bottom-right"
  data-color="#FF9234"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

---

### 4.2 Botão Circle com ícone customizado

Substitui o ícone padrão por uma imagem própria.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-btn-type="circle"
  data-position="bottom-right"
  data-color="#1A56DB"
  data-btn-icon="https://exemplo.com/logo.png"
  data-icon-width="40px"
  data-icon-height="40px"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

---

### 4.3 Botão Badge

Botão retangular com texto, mais chamativo visualmente.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-btn-type="badge"
  data-position="bottom-right"
  data-color="#FF9234"
  data-btn-title="Fale conosco"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

---

### 4.4 Botão Ghost

Apenas a imagem é exibida, sem nenhum container ou fundo ao redor.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-btn-type="ghost"
  data-position="bottom-right"
  data-btn-icon="https://exemplo.com/avatar.png"
  data-icon-width="64px"
  data-icon-height="64px"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

---

### 4.5 Com tooltip

Exibe uma mensagem de boas-vindas em balão antes do usuário abrir o chat.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-btn-type="circle"
  data-position="bottom-right"
  data-color="#FF9234"
  data-tooltip="Olá! Posso te ajudar?"
  data-tooltip-color="#333333"
  data-tooltip-bg="#ffffff"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

---

### 4.6 Com horário de atendimento

O plugin fica visível apenas dentro do intervalo definido.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-btn-type="circle"
  data-position="bottom-right"
  data-color="#38A169"
  data-start-hour="09:00"
  data-end-hour="18:00"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

> Para janelas que cruzam meia-noite, use ex: `data-start-hour="22:00"` e `data-end-hour="06:00"`.

---

### 4.7 Com usuário autenticado

Passa a identidade do usuário logado para o chat.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-btn-type="circle"
  data-position="bottom-right"
  data-user="user-123"
  data-name="Maria Silva"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

---

### 4.8 Modo COMPONENT — Embed fixo na página

O chat é renderizado diretamente na área da página, sem botão flutuante. Ideal para páginas de suporte dedicadas.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-mode="COMPONENT"
  data-width="100%"
  data-height="600px"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

---

### 4.9 Modo COMPONENT — Em container responsivo

Chat embutido dentro de um container com tamanho máximo controlado.

```html
<div style="max-width: 480px; margin: 0 auto;">
  <div
    id="conversu-plugin"
    data-token="SEU_TOKEN_AQUI"
    data-mode="COMPONENT"
    data-width="100%"
    data-height="500px"
    data-max-height="80vh"
  ></div>
</div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

---

### 4.10 Tema escuro

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-btn-type="circle"
  data-position="bottom-right"
  data-color="#2D3748"
  data-theme="dark"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

---

### 4.11 CSS isolado

Garante que o CSS do site não afete o visual do plugin. Recomendado em projetos com Tailwind preflight, Bootstrap reset ou qualquer reset CSS global.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-btn-type="circle"
  data-position="bottom-right"
  data-global-css="blocked"
  data-reset-css="true"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

---

### 4.12 Exemplo completo

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"

  data-mode="POPOVER"
  data-position="bottom-right"
  data-allow-expand="true"
  data-show-on-error="false"

  data-btn-size="64"
  data-btn-type="circle"
  data-color="#FF9234"
  data-btn-icon="https://exemplo.com/icone.png"
  data-icon-width="32px"
  data-icon-height="32px"
  data-btn-title="Fale conosco"

  data-tooltip="Clique para conversar"
  data-tooltip-color="#ffffff"
  data-tooltip-bg="#333333"

  data-user="id-do-usuario"
  data-name="Nome do Usuário"

  data-start-hour="09:00"
  data-end-hour="18:00"

  data-height="500px"
  data-width="400px"
  data-z-index="9999"

  data-theme="light"
  data-allow-dark-theme="false"
  data-border="1px solid #e2e8f0"
  data-global-css="allowed"
  data-reset-css="false"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

---

Seguindo estas instruções, o plugin Conversu estará corretamente instalado e pronto para ser utilizado no seu site. Se encontrar qualquer dificuldade, entre em contato com o suporte técnico para assistência adicional.
