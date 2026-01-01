import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchItems = () => {
    setLoading(true)
    setError(null)
    
    axios.get('/api/items')
      .then(r => {
        setItems(r.data)
        setLoading(false)
      })
      .catch(err => {
        setError('Ошибка загрузки данных')
        setLoading(false)
        console.error('Ошибка при загрузке', err)
      })
  }

  return (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={fetchItems}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        Jgznm Кнопка
      </button>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <div>
        {items && items.map(item => (
          <span 
            style={{ padding: '0px 4px', display: 'inline-block', margin: '5px' }} 
            key={item.name} 
            className="roll-out"
          >
            <img 
              src={item.img} 
              alt='logo' 
              width="16" 
              style={{ padding: '0px 5px', verticalAlign: 'middle' }}
            />
            <span>{item.name}</span>
          </span>
        ))}
      </div>

      {!items && !loading && !error && (
        <div style={{ color: '#666' }}>
          Данные еще не загружены. Нажмите кнопку выше.
        </div>
      )}
    </div>
  )
}

export default App