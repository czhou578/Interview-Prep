import './App.css';
import * as React from "react"
import axios from 'axios';
import Table from './Table'

const increasePageNumber = async (pageNum) => {
  return axios.get(`https://randomuser.me/api?page=${pageNum}`).then(({data}) => {
    return data.results
  })
}

const getUserName = (element) => {
  const {name: {first, last}} = element
  return `${first} ${last}`
}

function App() {
  const [counter, setCounter] = React.useState(0)
  const [userData, setFetchedUserData] = React.useState([])
  const [pageNumber, setPageNumber] = React.useState(1)

  function getUsers() {
    setPageNumber(pageNumber + 1)
      increasePageNumber(pageNumber).then((data) => {
      // console.log('part one data: ' + JSON.stringify(data))
      const array = [...userData, ...data]
      setFetchedUserData(array)
    })
  }

  React.useEffect(() => {
    getUsers()
  }, [])
    
  return (
    <div className="App">
      <div>
        <div className="hello">
        </div>
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
        <p>{counter}</p>
          <button>Get Data</button>
          <button onClick={() => getUsers()}>Load More</button>
        <div>
          <div>
            <pre>
            </pre>
          </div>
        </div>
          {userData.length != 0 ? userData.map((element, index) => {
            return (
              <div>
                <p>{getUserName(element)}</p>
                <img src={element.picture.large} alt="" />
              </div>
            )
          }) : null}
        <div>
        </div>

        <div>
          <Table />
        </div>
      </div>
    </div>
  );
}

export default App;
