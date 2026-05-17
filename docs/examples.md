# Exemplos por tipo de plugin

---

## Modo POPOVER — Botão Circle (padrão)

Botão redondo flutuante no canto da tela. É o comportamento padrão do plugin.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-mode="POPOVER"
  data-btn-type="circle"
  data-position="bottom-right"
  data-color="#FF9234"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

**Quando usar:** em qualquer site que precise de um chat de suporte discreto, sem interferir no layout da página.

---

## Modo POPOVER — Botão Circle com ícone customizado

Substitui o ícone padrão (smile) por uma imagem própria.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-mode="POPOVER"
  data-btn-type="circle"
  data-position="bottom-right"
  data-color="#1A56DB"
  data-btn-icon="https://exemplo.com/logo.png"
  data-icon-width="40px"
  data-icon-height="40px"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

**Quando usar:** quando a marca tem um ícone ou avatar próprio para o assistente.

---

## Modo POPOVER — Botão Badge

Botão retangular com texto, ancorado na borda da tela. Visualmente mais chamativo.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-mode="POPOVER"
  data-btn-type="badge"
  data-position="bottom-right"
  data-color="#FF9234"
  data-btn-title="Fale conosco"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

**Quando usar:** quando se quer chamar mais atenção para o canal de atendimento, com uma call-to-action textual.

---

## Modo POPOVER — Botão Ghost

Botão sem fundo e sem sombra — apenas a imagem/ícone é clicável. Ideal para usar com um ícone customizado que já tem visual próprio.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-mode="POPOVER"
  data-btn-type="ghost"
  data-position="bottom-right"
  data-btn-icon="https://exemplo.com/avatar.png"
  data-icon-width="64px"
  data-icon-height="64px"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

**Quando usar:** quando o ícone do botão já tem o visual completo e não deve ter nenhum container ao redor.

---

## Modo POPOVER — Com tooltip

Exibe uma mensagem de boas-vindas em balão antes do usuário abrir o chat.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-mode="POPOVER"
  data-btn-type="circle"
  data-position="bottom-right"
  data-color="#FF9234"
  data-tooltip="Olá! Posso te ajudar? 👋"
  data-tooltip-color="#333333"
  data-tooltip-bg="#ffffff"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

**Quando usar:** para aumentar a taxa de engajamento com o chat, exibindo uma mensagem proativa ao visitante.

---

## Modo POPOVER — Com horário de atendimento

O plugin fica visível apenas dentro do intervalo de horário definido.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-mode="POPOVER"
  data-btn-type="circle"
  data-position="bottom-right"
  data-color="#38A169"
  data-start-hour="09:00"
  data-end-hour="18:00"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

> Para janelas que cruzam meia-noite (ex: suporte noturno), use `data-start-hour="22:00"` e `data-end-hour="06:00"`.

**Quando usar:** quando o atendimento humano tem horário definido e não faz sentido exibir o chat fora desse período.

---

## Modo POPOVER — Com usuário autenticado

Passa a identidade do usuário logado no sistema para o chat, permitindo personalização e histórico.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-mode="POPOVER"
  data-btn-type="circle"
  data-position="bottom-right"
  data-user="user-123"
  data-name="Maria Silva"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

**Quando usar:** em áreas logadas do sistema (dashboards, portais, apps SaaS) onde o usuário já está identificado.

---

## Modo COMPONENT — Embed fixo na página

O chat é renderizado diretamente em uma área da página, sem botão flutuante. Útil para páginas de contato ou suporte dedicado.

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

**Quando usar:** em uma página de "Fale conosco" ou "Suporte" onde o chat é o conteúdo principal, não um widget flutuante.

---

## Modo COMPONENT — Embed em container restrito

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

**Quando usar:** em layouts responsivos onde o chat precisa respeitar o container pai.

---

## Modo POPOVER — Tema escuro

Plugin com tema escuro habilitado por padrão.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-mode="POPOVER"
  data-btn-type="circle"
  data-position="bottom-right"
  data-color="#2D3748"
  data-theme="dark"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

**Quando usar:** em sites com tema escuro fixo.

---

## Modo POPOVER — Seguindo preferência do navegador

O plugin detecta automaticamente se o usuário prefere tema claro ou escuro.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-mode="POPOVER"
  data-btn-type="circle"
  data-position="bottom-right"
  data-allow-dark-theme="true"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

**Quando usar:** em sites que respeitam `prefers-color-scheme` do sistema operacional do usuário.

---

## Modo POPOVER — CSS isolado

Garante que o CSS do site não vaze para dentro do plugin, útil em projetos com reset CSS agressivo ou frameworks que afetam estilos globais.

```html
<div
  id="conversu-plugin"
  data-token="SEU_TOKEN_AQUI"
  data-mode="POPOVER"
  data-btn-type="circle"
  data-position="bottom-right"
  data-global-css="blocked"
  data-reset-css="true"
></div>
<script type="module" defer src="https://cdn.jsdelivr.net/npm/@conversu/plugin"></script>
```

**Quando usar:** quando o visual do plugin está sendo afetado por estilos globais do site (ex: Tailwind preflight, Bootstrap reset).

---

## Resumo rápido

| Tipo | `data-mode` | `data-btn-type` | Característica principal |
|---|---|---|---|
| Circle (padrão) | `POPOVER` | `circle` | Botão redondo flutuante |
| Circle com ícone | `POPOVER` | `circle` | Botão redondo com imagem customizada |
| Badge | `POPOVER` | `badge` | Botão retangular com texto |
| Ghost | `POPOVER` | `ghost` | Apenas a imagem, sem container |
| Embed fixo | `COMPONENT` | — | Chat direto na página, sem botão |
