# Parâmetros do Plugin Conversu

O plugin é inicializado a partir de um elemento `<div>` com o id `conversu-plugin`. Todos os parâmetros são passados como atributos `data-*` nesse elemento.

> Os atributos HTML usam kebab-case (ex: `data-btn-size`). O browser converte automaticamente para camelCase ao acessar via `dataset` no JavaScript (ex: `dataset.btnSize`).

## Exemplo de uso básico

```html
<div id="conversu-plugin" data-token="SEU_TOKEN"></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

---

## Parâmetros disponíveis

### Autenticação

| Atributo | Tipo | Obrigatório | Padrão | Descrição |
|---|---|---|---|---|
| `data-token` | `string` | **Sim** | — | Token de autenticação para autorizar o plugin junto à API. |

---

### Posicionamento e tamanho

| Atributo | Tipo | Padrão | Descrição |
|---|---|---|---|
| `data-position` | `"bottom-right"` \| `"bottom-left"` \| `"top-right"` \| `"top-left"` | `"bottom-right"` | Posição do plugin na tela (modo POPOVER). |
| `data-btn-size` | `number` (px) | `64` | Tamanho em pixels do botão de abertura. |
| `data-height` | `string` (CSS) | — | Altura do popover (ex: `"500px"`, `"80vh"`). |
| `data-width` | `string` (CSS) | — | Largura do popover (ex: `"400px"`). |
| `data-max-height` | `string` (CSS) | — | Altura máxima do popover. |
| `data-max-width` | `string` (CSS) | — | Largura máxima do popover. |
| `data-z-index` | `number` | `9998` | Z-index CSS do container do plugin. |

---

### Modo de exibição

| Atributo | Tipo | Padrão | Descrição |
|---|---|---|---|
| `data-mode` | `"POPOVER"` \| `"COMPONENT"` | `"POPOVER"` | Modo de renderização. `POPOVER` exibe o botão flutuante com chat oculto; `COMPONENT` renderiza o chat diretamente na div, sem botão. |
| `data-allow-expand` | `"true"` \| `"false"` | `"true"` | Permite que o usuário expanda o chat para tela cheia. |
| `data-show-on-error` | `"true"` \| `"false"` | `"false"` | Exibe um componente de erro visível quando o plugin falha ao carregar. Útil para debug. |

---

### Botão de abertura

| Atributo | Tipo | Padrão | Descrição |
|---|---|---|---|
| `data-btn-type` | `"circle"` \| `"badge"` \| `"ghost"` | `"circle"` | Estilo visual do botão. `circle` = botão redondo; `badge` = botão com texto; `ghost` = botão transparente. |
| `data-color` | `string` (cor CSS) | — | Cor de fundo do botão. Alternativa: `data-btn-color`. |
| `data-btn-color` | `string` (cor CSS) | — | Cor de fundo do botão (fallback de `data-color`). |
| `data-btn-icon` | `string` (URL) | — | URL de imagem para usar como ícone do botão. |
| `data-btn-title` | `string` | — | Texto exibido no botão (usado principalmente com `btn-type="badge"`). |
| `data-icon-width` | `string` (CSS) | — | Largura da imagem do ícone (ex: `"32px"`). Requer `data-btn-icon` e `data-icon-height`. |
| `data-icon-height` | `string` (CSS) | — | Altura da imagem do ícone (ex: `"32px"`). Requer `data-btn-icon` e `data-icon-width`. |

---

### Tooltip

| Atributo | Tipo | Padrão | Descrição |
|---|---|---|---|
| `data-tooltip` | `string` | — | Texto do tooltip exibido ao passar o mouse sobre o botão. Se não definido, o servidor pode fornecer um tooltip configurado no bot. |
| `data-tooltip-color` | `string` (cor CSS) | — | Cor do texto do tooltip. |
| `data-tooltip-bg` | `string` (cor CSS) | — | Cor de fundo do tooltip. |

---

### Identificação do usuário

| Atributo | Tipo | Padrão | Descrição |
|---|---|---|---|
| `data-user` | `string` | — | Username do usuário logado (identificador). Tem prioridade sobre `data-username`. |
| `data-username` | `string` | — | Alternativa a `data-user`. |
| `data-name` | `string` | — | Nome de exibição do usuário, passado ao iframe do chat. |

---

### Agendamento de disponibilidade

| Atributo | Tipo | Padrão | Descrição |
|---|---|---|---|
| `data-start-hour` | `string` (HH:mm) | — | Hora de início da janela de disponibilidade. Se não definido, o plugin fica disponível 24h. |
| `data-end-hour` | `string` (HH:mm) | — | Hora de fim da janela de disponibilidade. Suporta janelas que cruzam meia-noite (ex: `22:00` até `06:00`). |

> **Nota:** os horários do servidor têm prioridade. Se o bot tiver horários configurados na plataforma, eles sobrescrevem os valores do `data-*`.

---

### Tema e estilos

| Atributo | Tipo | Padrão | Descrição |
|---|---|---|---|
| `data-theme` | `"light"` \| `"dark"` | `"light"` | Tema de cores padrão do plugin. |
| `data-allow-dark-theme` | `"true"` \| `"false"` | `"false"` | Permite que o plugin siga a preferência de tema claro/escuro do navegador do usuário. |
| `data-border` | `string` (CSS) | — | Borda customizada para o container do popover (ex: `"1px solid #ccc"`). |
| `data-global-css` | `"allowed"` \| `"blocked"` | `"allowed"` | Controla se o CSS global do site pode afetar o plugin. Use `"blocked"` para isolar o estilo. |
| `data-reset-css` | `"true"` \| `"false"` | `"false"` | Aplica um reset de CSS antes dos estilos do plugin, garantindo consistência visual. |

---

## Modo COMPONENT

No modo `COMPONENT`, o chat é renderizado diretamente dentro da `div#conversu-plugin`, sem botão flutuante. Os parâmetros de posicionamento (`data-position`, `data-btn-size`, `data-btn-type`, etc.) são ignorados. Os parâmetros `data-width`, `data-height`, `data-max-width` e `data-max-height` controlam o tamanho do container do chat.

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

## Exemplo completo

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"

  data-position="bottom-right"
  data-mode="POPOVER"
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
