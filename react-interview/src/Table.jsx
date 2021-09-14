import { useEffect, useState } from "react"

const fetchData = () => {
  return fetch('https://randomuser.me/api/?results=20', {
  }).then((response) => response.json()).then((data) => {
    return data
  })
}


export default function Table(props) {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData().then((data) => {
      setData(data)
    })
  }, [])

  return (
    <div>
      <p>{JSON.stringify(data, null, 2)}</p>
    </div>
  )
}