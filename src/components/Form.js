import React, { useState } from "react"
import Error from "./Error"

const Form = ({saveSearch}) => {
  const [term, saveTerm] = useState("")
  const [error, saveError] = useState(false)

  const searchImages = e => {
    e.preventDefault()
    //valdiar
    if (term.trim() === "") {
      saveError(true)
      return
    }
    saveError(false)
    //env el termino de busqueda hacia el componente princ
    saveSearch(term)
  }
  return (
    <form onSubmit={searchImages}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Buscar imagen, por ejemplo: futbol o café"
            onChange={e => saveTerm(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error ? <Error messege="Agrega un termino de busqueda" /> : null}
    </form>
  )
}

export default Form
