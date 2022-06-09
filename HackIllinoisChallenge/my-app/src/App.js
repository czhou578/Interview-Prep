import { useState } from "react";
import { Input } from "semantic-ui-react";
import "./App.css";
import DisplayTable from "./DisplayTable";

function App() {
  const [numRows, setNumRows] = useState(null);

  return (
    <div className="App">
      <h3>HackIllinois Leaderboard</h3>
      <div className="form">
        <label>Number of Rows</label>
        <Input
          type="number"
          size="small"
          onChange={(e) => setNumRows(parseInt(e.target.value))}
        ></Input>
      </div>
      <div className="App">
        <DisplayTable numRows={numRows} />
      </div>
    </div>
  );
}

export default App;
