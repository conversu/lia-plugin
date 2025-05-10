

function App() {

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: 0,
      padding: 0,

    }}>
      <header
        style={{
          width: '100vw',
          height: '5rem',
          background: 'rgba(0, 0, 0, 0.24)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span style={{
          width: '100%',
          textAlign: 'center'
        }}>
          header
        </span>
      </header>
      <div
        style={{
          width: '100vw',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <aside
          style={{
            width: '15vw',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            background: '#E2E8F0'
          }}
        >
          <span style={{
            width: '100%',
            textAlign: 'center'
          }}>
            sidebar
          </span>
        </aside>
        <main
          style={{
            width: '98vw',
            height: '100%',
            color: 'black'
          }}
        >
          <div
            id="conversu-plugin"
            data-token="B-PLUG-D3E4ED1E-9EC8-4BB6-8A9A-C7BE837C6A0E"
            data-mode="COMPONENT"
            data-width='90vw'
            data-height='90vh'
            data-username='teste.signu15@email.com'
            data-name='Novo Teste'
            data-allow-toggle="false"
          />

        </main>
      </div>
    </div>
  )
}

export default App
