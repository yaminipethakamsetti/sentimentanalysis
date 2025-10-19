import React from 'react'

export default function ResultCard({ result }){
  if(!result) return null
  const labelClass = result.label === 'positive' ? 'label-positive' : result.label === 'negative' ? 'label-negative' : 'label-neutral'
  return (
    <div className="result-card" role="status" aria-live="polite">
      <div className="result-row">
        <div className={`pill ${labelClass}`}>{result.label.toUpperCase()}</div>
        <div>
          <div><strong>Polarity:</strong> {result.polarity}</div>
          <div><strong>Subjectivity:</strong> {result.subjectivity}</div>
        </div>
      </div>
      <div style={{marginTop:10, color:'#475569'}}>{new Date(result.timestamp).toLocaleString()}</div>
    </div>
  )
}
