import React, { useState, useEffect } from "react"
import Form from "./components/Form"
import ListImages from "./components/ListImages"

function App() {
  //state de la app
  const [search, saveSearch] = useState("")
  const [images, saveImages] = useState([])
  const [page, savePage] = useState(1)
  const [totalpages, saveTotalPages] = useState(1)

  useEffect(() => {
    const consultAPI = async () => {
      if (search === "") return
      const imagesForPage = 30
      const key = "17194857-656b33d5239b79e9791b8db64"
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesForPage}&page=${page}`
      const resp = await fetch(url)
      const result = await resp.json()
      saveImages(result.hits)
      //calcular total paginas
      const calculateTotalPages = Math.ceil(result.totalHits / imagesForPage)
      saveTotalPages(calculateTotalPages)
      //mover la pantalla hasta arriba
      const jumbotron = document.querySelector(".jumbotron")
      jumbotron.scrollIntoView({ behavior: "smooth" })
    }
    consultAPI()
  }, [search, page])
  //definir pag anterior
  const previousPage = () => {
    const newPageActual = page - 1
    if (newPageActual === 0) return
    savePage(newPageActual)
  }
  //pag siguiente
  const nextPage = () => {
    const newPageActual = page + 1
    if (newPageActual > totalpages) return
    savePage(newPageActual)
  }
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Form saveSearch={saveSearch} />
      </div>
      <div className="row justify-content-center">
        <ListImages images={images} />
        {page === 1 ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={previousPage}
          >
            &laquo; Anterior
          </button>
        )}
        {page === totalpages ? null : (
          <button type="button" className="bbtn btn-info" onClick={nextPage}>
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  )
}

export default App
