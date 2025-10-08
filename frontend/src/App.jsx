import React, { useState } from 'react'
import AnalyzeForm from './components/AnalyzeForm'
import ResultCard from './components/ResultCard'

export default function App(){
  const [last, setLast] = useState(null)
  const [history, setHistory] = useState([])

  const handleResult = (res) => {
    setLast(res)
    setHistory(h => [res, ...h].slice(0, 20))
  }

  return (
    <div className="container">
      <h1>Sentiment Analyzer (MVP)</h1>
      <AnalyzeForm onResult={handleResult} />
      <ResultCard result={last} />
      <hr />
      <h2>Recent</h2>
      <ul className="history">
        {history.map((r,i) => (
          <li key={i}>
            <strong>{r.label}</strong> — {r.polarity} — {new Date(r.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )
}
