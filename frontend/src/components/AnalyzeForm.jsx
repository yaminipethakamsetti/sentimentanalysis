import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api'

export default function AnalyzeForm({ onResult }){
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function submit(e){
    e.preventDefault()
    setError(null)
    if(!text.trim()) {
      setError('Please enter some text')
      return
    }
    setLoading(true)
    try{
      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ text })
      })
      if(!res.ok){
        const err = await res.json().catch(()=>({detail:'API error'}))
        throw new Error(err.detail || 'API error')
      }
      const data = await res.json()
      onResult(data)
      setText('')
    }catch(err){
      setError(err.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="analyze-form" aria-label="Analyze text">
      <textarea
        rows={6}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type or paste text to analyze..."
        aria-label="Text to analyze"
      />
      <div className="controls">
        <button type="submit" disabled={loading || !text.trim()} aria-busy={loading}>
          {loading ? 'Analyzing…' : 'Analyze'}
        </button>
        {error && <div className="error" role="status">{error}</div>}
      </div>
    </form>
  )
}
