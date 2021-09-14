import { useEffect, useState } from "react"

const fetchData = () => {
  return fetch('https://randomuser.me/api/?results=20', {
  }).then((response) => response.json()).then((data) => {
    return data.results
  })
}

const flattenObject = (obj) => {
  const flattened = [];

  for (const {street, coordinates, timezone, ...rest} of obj) {
    flattened.push({
      number: street.number,
      name: street.name,
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
      ...rest
    })
  }

  // Object.keys(obj).forEach((key) => {
  //   if (typeof obj[key] === 'object' && obj[key] != null) {
  //     Object.assign(flattened, flattenObject(key))
  //   } else {
  //     flattened[key] = obj[key]
  //   }
  // })
  console.log('flattended: ' + JSON.stringify(flattened))
  return flattened
}


export default function Table(props) {
  const [people, setPeople] = useState([])
  const [location, setLocation] = useState([])

  useEffect(() => {
    fetchData().then((data) => {
      setLocation(data.map((element) => element.location))
      flattenObject(location)
      // data.forEach((element, index) => {     
      //   let array = [...location, ...flattenObject(element.location)]
      //   setLocation(array)
      // })
      // setLocation(flattenObject(data.location))
      setPeople(data)
    })
  }, [])

  return (
    <div>
      <div>
        {people ? people.map((person, personIdx) => {
          return (
            <div key={personIdx}>
              <p>{`${person.name.first} ${person.name.last}`}</p>
              {/* <p>{person.location}</p> */}
            </div>
          )
        }) : null}
        <table>

        </table>
      </div>
    </div>
  )
}