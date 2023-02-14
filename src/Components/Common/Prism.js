import React from 'react'
import Prism from 'prismjs'

const PrismCode = ({ code, language }) => {
  const ref = React.useRef()

  React.useEffect(() => {
    highlight()
  }, [])

  const highlight = () => {
    if (ref && ref.current) {
      Prism.highlightElement(ref.current)
    }
  }

  return (
    <React.Fragment>
      <pre className="line-numbers">
        <code ref={ref} className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
    </React.Fragment>
  )
}

export default PrismCode
