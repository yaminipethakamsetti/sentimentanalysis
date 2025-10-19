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
      <div className="hero">
        <div className="brand-badge" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9S3 16.97 3 12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div>
          <h1>Sentiment Analyzer <span className="muted" style={{fontSize:14}}>MVP</span></h1>
          <div className="muted">Quick sentiment analysis using a lightweight TextBlob backend</div>
        </div>
      </div>

      <AnalyzeForm onResult={handleResult} />
      <ResultCard result={last} />

      <h2>Recent</h2>
      <ul className="history">
        {history.map((r,i) => (
          <li key={i}>
            <div>
              <strong className={r.label === 'positive' ? 'label-positive' : r.label === 'negative' ? 'label-negative' : 'label-neutral'}>{r.label}</strong>
              <div className="meta">Polarity: {r.polarity} • Subjectivity: {r.subjectivity}</div>
            </div>
            <div className="meta">{new Date(r.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
