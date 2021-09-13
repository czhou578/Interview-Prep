import './App.css';
import * as React from "react"
import axios from 'axios';

const Card = (props) => {
  const {fetchedData} = props
  console.log("hellowwww: " + fetchedData.results);

  return (
    <div className="brits">
      {fetchedData ? <div><p>{fetchedData.results}</p> </div> : null}
    </div>
  )
}

// const returnUserName = (object) => {
//   return object.results
// }

const fetchData = async () => {
  return axios.get('https://randomuser.me/api').then((data) => {
    return JSON.stringify(data, null, 2)
  })
}

const retrieveData = async () => {
  return axios.get('https://randomuser.me/api').then((data) => {
    return data
  })
  // return 
}

function App() {
  
  const [counter, setCounter] = React.useState(0)
  const [fetched, setFetched] = React.useState(null)
  const [firstName, setFirstName] = React.useState(null)
  
  React.useEffect(() => {
    fetchData().then((data) => {
      setFetched(data)
      // setFirstName(data.results)
    })
  }, [])
  
  React.useEffect(() => {
    retrieveData().then((data) => {
      setFirstName(data.results)
    })
  })
  
  // function getAPI() {
  //   axios.get('https://randomuser.me/api').then(function({data}) {
  //     let array = []
  //     array.push(JSON.stringify(data))
  //     setFetched(array)
  
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }

  return (
    <div className="App">
      <div>
        <button onClick={() => setCounter(counter + 1)}> Click Me </button>
        <button onClick={() => fetchData()}>Fetch Data</button>
        <h1>{counter}</h1>
        <div className="hello">
          <pre>{fetched}</pre>
        </div>
        <div>
          HEllo, this is great
          {firstName}
        </div>
      </div>
    </div>
  );
}

export default App;
