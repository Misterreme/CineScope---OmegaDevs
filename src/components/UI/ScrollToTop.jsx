import React, { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import './ScrollToTop.css'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Mostrar/ocultar el botón basado en el scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Función para volver arriba con animación suave
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Volver arriba"
          title="Volver arriba"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  )
}

export default ScrollToTop
