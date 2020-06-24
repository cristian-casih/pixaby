import React from "react"
const Error = ({ messege }) => {
  return (
    <p className="my-3 p-4 text-center alert alert-primary">
      {messege}
    </p>
  )
}

export default Error
