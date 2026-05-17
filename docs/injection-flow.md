# Fluxo de Injeção no Site Terceiro

```mermaid
flowchart TD
    A([Third-party site loads]) --> B

    subgraph HTML ["1. HTML"]
        B[div conversu-plugin + data-token + script tag]
    end

    B --> C

    subgraph BOOT ["2. Bootstrap"]
        C[Find div conversu-plugin in DOM] --> D
        D[Read data attributes via dataset] --> E
        E[Create QueryClient] --> F
        F[ReactDOM createRoot - mount providers]
    end

    F --> G

    subgraph AUTH ["3. Authorization"]
        G[PluginProvider mounts - fires useMutation] --> H
        H{Waiting for API} --> |loading| I1[Render skeleton]
        H --> J
        J[POST /plugin/authorize] --> K
        K{API Response} --> |200 OK| L
        K --> |4xx 5xx| M[status: error]
        K --> |ERR_NETWORK| M
        L[Validate schedule window] --> |inside window| N[status: authorized]
        L --> |outside window| O[status: disabled]
    end

    M --> |displayError true| P[Show error component]
    M --> |displayError false| Q[Render empty]
    O --> Q

    N --> R

    subgraph RENDER ["4. Rendering"]
        R[ThemeProvider - Chakra UI] --> S
        S[SessionProvider - restore session from localStorage] --> T
        T{data-mode} --> |POPOVER| U
        T --> |COMPONENT| V

        subgraph POPOVER ["Mode: POPOVER"]
            U[Plugin.Container fixed in viewport] --> U1
            U1[Floating button: circle / badge / ghost] --> U2
            U2[Hidden popover with SlideFade]
        end

        subgraph COMPONENT ["Mode: COMPONENT"]
            V[Inline box inside original div]
        end
    end

    U2 --> W
    V --> W

    subgraph IFRAME ["5. Lia Iframe"]
        W[Build iframe URL with base64 params] --> X
        X[Render iframe - id = bot.uuid] --> Y
        Y{Loading} --> |under 8s| Z[State: loaded]
        Y --> |timeout 8s| AA[State: error - fallback button]
    end

    subgraph NOTIFY ["6. Notifications"]
        AB[Hidden iframe - notificationEndpoint]
    end

    Z --> MC
    Z --> SC1
    AB --> MD

    subgraph MSG ["7. postMessage"]
        MC[Channel 1 - Lia to Plugin] --> ME
        ME[OPENED / CLOSED / LOGOUT / POPOVER_CLOSE / POPOVER_EXPAND]
        MD[Channel 2 - Notifications to Plugin] --> MF
        MF[Play sound and show tooltip]
    end

    subgraph SCROLL ["8. Scroll control"]
        SC1[mouseenter - disable page scroll] --> SC2
        SC2[mouseleave - restore scroll]
    end
```

---

## Resumo do fluxo em texto

| Etapa | O que acontece |
|---|---|
| **1. HTML** | Site terceiro inclui a `<div>` e o `<script>` |
| **2. Bootstrap** | Script lê `data-*`, monta providers React |
| **3. Autorização** | `POST /plugin/authorize` com token + origem + horário |
| **4. Validação** | API verifica CORS, token, domínio registrado |
| **5. Agendamento** | Plugin verifica se está dentro da janela de horário |
| **6. Renderização** | Monta botão (POPOVER) ou embed direto (COMPONENT) |
| **7. Iframe** | Constrói URL com parâmetros codificados em base64, renderiza Lia |
| **8. postMessage** | Dois canais independentes: Lia e notificações |
| **9. Sessão** | SessionId persistido no `localStorage` do site hospedeiro |
| **10. Scroll** | Scroll do site bloqueado enquanto cursor está sobre o iframe |

---

## Validações de segurança

```
Site terceiro
    │
    │  POST /plugin/authorize
    │  x-origin: window.location.href
    ▼
API Conversu
    ├─ Verifica política CORS (domínio registrado no painel)
    ├─ Valida token contra domínio de origem
    └─ Retorna 403 se domínio não registrado

Plugin (client-side)
    ├─ Canal 1: aceita postMessage apenas se event.origin === liaEndpoint
    └─ Canal 2: aceita postMessage apenas se notification.startsWith(event.origin)
```
