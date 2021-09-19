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

const setHeaders = (obj) => { //
  let array = flattenObject(obj)
  const headers = []

  for (const property in array[0]) {
    headers.push(property)
  }

  return headers;

}

const sortingEnum = {
  UNSORTED: 'UNSORTED',
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING'
}

const sortData = (data, sortKey, sortDirection) => { //sorting by formula
  data.sort((a, b) => {
    const relevantValueA = a[sortKey]
    const relevantValueB = b[sortKey]

    if (sortDirection === sortingEnum.UNSORTED || sortDirection === sortingEnum.ASCENDING) {
      if (relevantValueA < relevantValueB) return -1
      if (relevantValueA > relevantValueB) return 1
      return 0

    } else {
      if (relevantValueA > relevantValueB) return -1
      if (relevantValueA < relevantValueB) return 1
      return 0
    }
  })
}

//determining what sorting direction to return
const getNextSortingDirection = (sortingDirection) => {
  if (sortingDirection === sortingEnum.UNSORTED || sortingDirection === sortingEnum.ASCENDING) {
    return sortingEnum.DESCENDING
  }

  return sortingEnum.ASCENDING

}

// returns the rows that satisfy the conditions
const getFilteredRows = (rows, filterKey) => {
  return rows.filter((row) => { 
    return Object.values(row).some(s => ("" + s).toLowerCase().includes(filterKey))
  }
  )}


export default function Table(props) {
  const [people, setPeople] = useState([])
  const [locationHeaders, setLocationHeaders] = useState([])
  const [location, setLocation] = useState([])
  const [sortingDirection, setSortingDirections] = useState({})
  const [inputFieldValue, setInputFieldValue] = useState('')

  useEffect(() => {
    fetchData().then((data) => {
      setPeople(data)
      setLocationHeaders(setHeaders([data[0].location]))
      const ourFlattenedLocations = flattenObject(data.map((element) => element.location))
      setLocation(ourFlattenedLocations)
 
      const ourSortingDirections = {}
      for (const header of locationHeaders) {
        ourSortingDirections[header] = sortingEnum.UNSORTED
      }

      setSortingDirections(ourSortingDirections)
    })
  }, [])

  const sortColumn = (sortKey) => {
    console.log(sortKey);
    const newFlattenedLocations = {
      data: [...location]
    }

    const currentSortingDirection = sortingDirection[sortKey]

    sortData(newFlattenedLocations.data, sortKey, currentSortingDirection)
    const nextSortingDirection = getNextSortingDirection(currentSortingDirection)
    const newSortingDirections = {...sortingDirection}
    newSortingDirections[sortKey] = nextSortingDirection
    setLocation(newFlattenedLocations.data)
    setSortingDirections(newSortingDirections)
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
          <input type="text" value={inputFieldValue} onChange={(e) => {
            setInputFieldValue(e.target.value)
          }}/>
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
              {getFilteredRows(location, inputFieldValue).map((element, index) => {
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