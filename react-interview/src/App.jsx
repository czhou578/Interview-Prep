import './App.css';
import * as React from "react"

const nameCard = (props) => {
  const {fetched} = props
  console.log('fetched: ' + fetched)

  return (
    <div>

    </div>
  )
}

function App() {

  const [counter, setCounter] = React.useState(0)
  const [fetched, setFetched] = React.useState(null)
  const axios = require('axios');

  React.useEffect(() => {
    getAPI()
  }, [])

  function getAPI() {
    axios.get('https://randomuser.me/api').then(function({data}) {
      let array = []
      array.push(JSON.stringify(data))
      setFetched(array)
    })
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => setCounter(counter + 1)}> Click Me </button>
        <button onClick={() => getAPI()}>Fetch Data</button>
        <h1>{counter}</h1>
        <div className="hello">
          <pre>{fetched}</pre>
        </div>
        <div>
          <nameCard fetchedData={fetched}/>
        </div>
      </div>
    </div>
  );
}

export default App;
