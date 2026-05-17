# Documentação Técnica — Plugin Conversu

---

## Visão geral

O plugin é uma aplicação React que se inicializa dentro de um site terceiro a partir de uma única `<div>` HTML. Ele autentica o token com a API Conversu, renderiza um iframe apontando para a aplicação de chat (Lia), e gerencia toda a comunicação entre o site hospedeiro e o iframe via `postMessage`.

---

## 1. Bootstrap

**Arquivo:** `src/index.tsx`

O ponto de entrada localiza o elemento `#conversu-plugin` no DOM e lê todos os `data-*` attributes via `element.dataset`. A partir daí monta a árvore de providers e chama `ReactDOM.createRoot().render()`.

**Stack de providers (de fora para dentro):**

```
QueryClientProvider      → cache de mutations (React Query)
  └─ PluginProvider      → estado central + autorização
       └─ ThemeProvider  → Chakra UI + contexto de tema
            └─ SessionProvider  → sessão do usuário + postMessage
                 └─ App  → componente de renderização
```

**React Query — configuração padrão:**

| Opção | Valor |
|---|---|
| `cacheTime` | 10 minutos |
| `retry` | 1 vez |
| `retryDelay` | 1 minuto |

---

## 2. Autorização

**Arquivo:** `src/hooks/useAuthorize.tsx`

Ao montar, o `PluginProvider` executa uma mutation via `useMutation` do React Query para autorizar o token junto à API.

### Requisição

```
POST ${API_ENDPOINT}/plugin/authorize
```

**Body:**
```json
{
  "token": "...",
  "parameters": { ...dataset }
}
```

**Headers enviados:**

| Header | Valor |
|---|---|
| `x-origin` | `window.location.href` |
| `x-current-time` | Hora atual no formato `HH:mm` |
| `x-timestamp` | ISO 8601 com timezone |
| `x-timezone` | `Intl.DateTimeFormat().resolvedOptions().timeZone` |

### Resposta esperada

```typescript
{
  bot: {
    alias: string,        // slug de URL do bot
    uuid: string,         // ID único usado no atributo id do iframe
    tooltip?: string,     // mensagem de boas-vindas do painel
    layout: {
      user:   string,     // JSON serializado com { bg, color }
      bot:    string,
      agent:  string,
      colors: string      // JSON com { primary, secondary }
    }
  },
  liaEndpoint: string,            // URL base da aplicação Lia
  notificationEndpoint: string,   // URL do iframe de notificações
  schedule?: {
    start: string,        // HH:mm
    end:   string
  }
}
```

### Status resultantes

| Status | Condição |
|---|---|
| `loading` | Requisição em andamento |
| `authorized` | Resposta 200 e horário dentro da janela |
| `disabled` | Fora do horário de atendimento |
| `error` | Qualquer erro HTTP ou de rede |

### Lógica de agendamento

Os horários (`schedule.start` / `schedule.end` — ou `data-start-hour` / `data-end-hour`) são convertidos para minutos desde meia-noite. Suporta janelas que cruzam meia-noite:

```
start=22:00 (1320min), end=06:00 (360min)
→ dentro da janela se: agora >= 1320 OU agora <= 360
```

Os horários do servidor têm prioridade sobre os `data-*` attributes.

### Códigos de erro

| Código | Mensagem |
|---|---|
| `ERR_NETWORK` | Sem conexão |
| `401` | Falha ao autorizar plugin |
| `403` | Plugin não autorizado |
| `404` | Plugin não encontrado |
| `500` | Falha interna ao autorizar |

---

## 3. Estado central — PluginContext

**Arquivos:** `src/services/plugin/provider.tsx`, `src/services/plugin/context.ts`

Após autorização bem-sucedida, o `PluginProvider` expõe o contexto completo via `PluginContext`.

### Interface completa

```typescript
interface IPluginContext {
  // Dados do bot (vindos da API)
  bot: IBot;
  url: string;                        // URL base da Lia
  notification: string | null;        // URL do iframe de notificações

  // Estado da UI
  isExpanded: boolean;                // popover aberto/fechado
  isMaximized: boolean;               // modo tela cheia
  isShortVersion: boolean;            // viewport <= 400px
  mode: 'POPOVER' | 'COMPONENT';
  allowExpand: boolean;

  // Ações
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  onMaximizeToggle: () => void;

  // Tooltip
  showTooltip: boolean;
  tooltip: string;
  tooltipMessage: (v: string) => void;
  onTooltipClose: () => void;

  // Layout calculado
  buttonSize: number;
  borderRadius: string;               // varia conforme position
  contentPositionProps: FlexProps;    // flexDir, align, justify
  containerPositionProps: BoxProps;   // top/bottom/left/right

  popover: {
    height: number;                   // px calculado dinamicamente
    width: number;
  };
  component: {
    height?: string | number;
    width?: string | number;
    maxHeight?: string | number;
    maxWidth?: string | number;
  };
}
```

### Cálculo de dimensões do popover

| Dimensão | Lógica |
|---|---|
| Largura (colapsado) | `buttonSize` px |
| Largura (expandido) | `450px` padrão, ou `75%` se tooltip visível |
| Altura | `720px` padrão, ou `window.innerHeight - 40` se menor |

### Border radius por posição

| Posição | Border radius |
|---|---|
| `bottom-right` | `0.75rem 0.75rem 0 0.75rem` |
| `bottom-left` | `0.75rem 0.75rem 0.75rem 0` |
| `top-right` | `0.75rem 0 0.75rem 0.75rem` |
| `top-left` | `0 0.75rem 0.75rem 0.75rem` |

O canto adjacente ao botão é sempre cortado (sem raio), criando a conexão visual entre popover e botão.

---

## 4. Iframe — Lia

**Arquivo:** `src/components/Lia/index.tsx`

O componente `Lia` renderiza o iframe que aponta para a aplicação de chat remota.

### Construção da URL

**Com sessão ativa:**
```
${liaEndpoint}/${bot.alias}/i/${sessionId}?${queryParams}
```

**Sem sessão:**
```
${liaEndpoint}/${bot.alias}?${queryParams}
```

### Query params enviados ao iframe

| Parâmetro | Valor |
|---|---|
| `type` | `"plugin"` |
| `theme` | `"dark"` ou `"light"` |
| `allow-toggle` | `true/false` (se dark theme permitido) |
| `origin` | `btoa(window.location.origin)` |
| `username` | `btoa(username)` ou omitido |
| `name` | `btoa(name)` ou omitido |
| `mode` | `"POPOVER"` ou `"COMPONENT"` |
| `isExpanded` | `true/false` |

`origin`, `username` e `name` são **codificados em base64** antes de serem enviados.

### Estados de carregamento

| Estado | Comportamento |
|---|---|
| `loading` | Spinner + texto "Carregando..." |
| `loaded` | Iframe visível com `opacity: 1` |
| `error` | Fallback com botão "Acessar" (abre em nova aba) |

Timeout de **8 segundos**: se o iframe não disparar o evento `load` dentro desse prazo, o estado muda para `error`.

### Bloqueio de scroll

Ao passar o mouse sobre o iframe, o scroll do site hospedeiro é desativado (`wheel` + `touchmove` com `preventDefault`). Ao sair, o scroll é restaurado. Isso evita que a página role enquanto o usuário navega no chat.

---

## 5. Comunicação via postMessage

O plugin opera com **dois canais** independentes de `postMessage`.

### Canal 1 — Iframe da Lia → Plugin

**Emissor:** Aplicação Lia (iframe principal)  
**Receptor:** `SessionProvider` + `PluginProvider`  
**Validação de origem:** `event.origin === liaEndpoint`

| Evento | Efeito no plugin |
|---|---|
| `OPENED` | Salva `sessionId` no `localStorage` |
| `CLOSED` | Remove sessão do `localStorage` |
| `LOGOUT` | Limpa sessão e reseta estado |
| `POPOVER_CLOSE` | Fecha o popover (`onClose()`) |
| `POPOVER_EXPAND` | Alterna tela cheia (`onMaximizeToggle()`) |

### Canal 2 — Iframe de notificações → Plugin

**Emissor:** Iframe oculto de notificações  
**Receptor:** `PluginProvider`  
**Validação de origem:** `notification.startsWith(event.origin)`

| Evento | Efeito no plugin |
|---|---|
| `NOTIFY` | Toca som + exibe tooltip com `data.title` |

### Formato das mensagens

Todas as mensagens trafegam como **JSON serializado em string**:

```javascript
// Enviado pelo iframe:
window.parent.postMessage(JSON.stringify({
  event: 'OPENED',
  sessionId: 'abc123'
}), '*')

// Recebido pelo plugin:
const data = JSON.parse(event.data)
```

---

## 6. Sessão do usuário

**Arquivo:** `src/services/session/provider.tsx`

O `SessionProvider` persiste o ID de sessão no `localStorage` com a chave `'conversu-session'`. Isso permite que conversas sejam retomadas entre recarregamentos de página.

**Fluxo:**

1. Iframe emite `OPENED` com `sessionId`
2. Plugin verifica se já existe sessão no `localStorage`
3. Se não existir: salva o novo `sessionId`
4. Se existir: mantém o existente e o envia de volta ao iframe na próxima carga
5. Ao receber `CLOSED` ou `LOGOUT`: remove do `localStorage`

---

## 7. Tema e estilos

**Arquivo:** `src/theme/theme.provider.tsx`

O tema é injetado via Chakra UI (`ChakraProvider`). Dois parâmetros de `data-*` afetam diretamente o Chakra:

| Parâmetro | Prop Chakra | Efeito |
|---|---|---|
| `data-global-css="blocked"` | `disableGlobalStyle={true}` | Remove estilos globais do Chakra |
| `data-reset-css="true"` | `resetCSS={true}` | Aplica reset CSS antes dos estilos |

**Fonte global:** `Sora, sans-serif` (heading e body)

**Breakpoints:**

| Nome | Valor |
|---|---|
| `xs` | 280px |
| `sm` | 320px |
| `md` | 480px |
| `lg` | 960px |
| `xl` | 1280px |

### Layout de cores do chat

As cores das bolhas de mensagem vêm da API. Quando a API não retorna layout, usa-se o padrão:

| Elemento | Background | Cor do texto |
|---|---|---|
| Mensagem do usuário | `#FEEBC8` | `#FF5224` (laranja) |
| Mensagem do bot | `#EEEEF2` | `#410075` (roxo) |
| Mensagem do agente | `#E9D8FD` | `#410075` (roxo) |
| Primary | — | `#410075` |
| Secondary | — | `#FF5224` |

---

## 8. Notificações sonoras

**Hook:** `src/hooks/useRemoteSoundNotification.ts`

Ao receber um evento `NOTIFY`, o plugin toca um som de notificação.

**URL do áudio:** `https://conversu-plugin.s3.sa-east-1.amazonaws.com/assets/notification.mp3`

**Mecanismo:**
- O áudio é pré-carregado via **Cache Storage API** (`caches.open()`) com fallback para `fetch`
- A cada notificação, o elemento `<audio>` é **clonado** antes de tocar, permitindo sons sobrepostos
- Lida silenciosamente com bloqueios de autoplay do navegador

---

## 9. Tipos principais

### IBot

```typescript
interface IBot {
  uuid: string;           // id do elemento iframe no DOM
  alias: string;          // slug de URL (ex: "suporte")
  tooltip?: string;       // tooltip vinda do painel
  layout: {
    user:   { bg: string; color: string };
    bot:    { bg: string; color: string };
    agent:  { bg: string; color: string };
    title?: { font: string; color: string };
    colors: { primary: string; secondary: string };
  }
}
```

### PluginMode

```typescript
enum PluginMode {
  POPOVER   = 'POPOVER',    // botão flutuante + chat oculto
  COMPONENT = 'COMPONENT'   // chat inline na div
}
```

### MessageEventType

```typescript
enum MessageEventType {
  SIGN_IN        = 'SIGN_IN',
  LOGOUT         = 'LOGOUT',
  OPENED         = 'OPENED',
  CLOSED         = 'CLOSED',
  POPOVER_CLOSE  = 'POPOVER_CLOSE',
  POPOVER_EXPAND = 'POPOVER_EXPAND',
  NOTIFY         = 'NOTIFY'
}
```

---

## 10. Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `API_ENDPOINT` | URL base da API de autorização (ex: `https://api.conversu.com.br`) |

Configurada por ambiente nos arquivos `.env.development`, `.env.stage` e `.env.production`.
