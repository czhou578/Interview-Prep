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

  return flattened
}

const setHeaders = (obj) => {
  let array = flattenObject(obj)
  const headers = []

  for (const property in array[0]) {
    headers.push(property)
  }

  return headers;

}

const sortingEnum = {
  DEFAULT: 'DEFAULT',
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING'
}


export default function Table(props) {
  const [people, setPeople] = useState([])
  const [locationHeaders, setLocationHeaders] = useState([])
  const [location, setLocation] = useState([])
  const [sortingDirection, setSortingDirections] = useState()

  useEffect(() => {
    fetchData().then((data) => {
      setPeople(data)

      // console.log('location : ' + JSON.stringify(data[0].location));

      setLocationHeaders(setHeaders([data[0].location]))
      setLocation(flattenObject(data.map((element) => element.location)))
      // setLocationHeaders(data[0].location)
      // setLocation(flattenObject(data.map((element) => element.location)))

      // setLocation(flattenObject(people[0].location))

      // flattenObject(location)
    })
  }, [])

  const sortColumn = (sortKey) => {
    console.log(sortKey);
    const newFlattenedLocations = {
      data: [...location]
      // ...location
    }

    newFlattenedLocations.data.sort((a, b) => {
      const relevantValueA = a[sortKey]
      const relevantValueB = b[sortKey]

      if (relevantValueA < relevantValueB) return -1
      if (relevantValueA > relevantValueB) return 1
      return 0
    })

    setLocation(newFlattenedLocations.data)
  }

  return (
    <div>
      <div>
        {people ? people.map((person, personIdx) => {
          return (
            <div key={personIdx}>
              <p>{`${person.name.first} ${person.name.last}`}</p>
            </div>
          )
        }) : null}
        <div>
          <table>
            <thead>
              <tr>
                {locationHeaders.map((element, index) => {
                  return (
                    <th key={index} onClick={() => sortColumn(element)}> {element}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {location.map((element, index) => {
                return <tr>
                  {Object.values(element).map((locationValue, index) => {
                    return <td key={index}> {locationValue}</td>
                  })}
                </tr>
              })}
            </tbody>
          </table>          
        </div>
      </div>
    </div>
  )
}