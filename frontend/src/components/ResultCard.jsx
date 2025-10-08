import React from 'react'

export default function ResultCard({ result }){
  if(!result) return null
  return (
    <div className="result-card">
      <h3>Label: {result.label}</h3>
      <p>Polarity: {result.polarity}</p>
      <p>Subjectivity: {result.subjectivity}</p>
      <small>{new Date(result.timestamp).toLocaleString()}</small>
    </div>
  )
}
