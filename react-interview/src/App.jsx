// import './App.css';
// import * as React from "react"
// import axios from 'axios';

// // const returnUserName = (object) => {
// //   return object.results
// // }


// // const retrieveData = async () => {
//   //   return axios.get('https://randomuser.me/api').then((data) => {
//     //     return data
//     //   })
//     //   // return 
//     // }
    
// const fetchData = (pageNum) => {
//   return axios.get(`https://randomuser.me/api?page=${pageNum}`).then(({data}) => {
//     return data
//   })
// }

// const getFullUserName = (element) => {
//   // let userInfo
//   const {name: {first, last}} = element

//   return `${first} ${last}`
// }

// function App() {
  
//   const [counter, setCounter] = React.useState(0)
//   const [fetched, setFetched] = React.useState([])
//   // const [name, setName] = React.useState(null)
//   const [page, setPageNumber] = React.useState(1)

//   const fetchUserData = () => {
//     fetchData(page).then((data) => {
//       // const array = [...fetched, ...data.results]
//       console.log('data: ' + JSON.stringify(data));
//       // setFetched(array)
//       let array = [...fetched, ...data.results]
//       // setFetched(data.results)
//       setFetched(array)
//       // setName({firstName: data.results[0].name.first, lastName: data.results[0].name.last})
//       setPageNumber(data.info.page + 1)
//     })
//   }
  
//   React.useEffect(() => {
//     fetchUserData()
//   }, [])
  
//   // React.useEffect(() => {
//   //   retrieveData().then((data) => {
//   //     setFirstName(data.results)
//   //   })
//   // })
  
//   // function getAPI() {
//   //   axios.get('https://randomuser.me/api').then(function({data}) {
//   //     let array = []
//   //     array.push(JSON.stringify(data))
//   //     setFetched(array)
  
//   //   }).catch((err) => {
//   //     console.log(err);
//   //   })
//   // }
//   //data.results[0].picture.medium

//   return (
//     <div className="App">
//       <div>
//         <button onClick={() => setCounter(counter + 1)}> Click Me </button>
//         <button onClick={() => fetchData()}>Fetch Data</button>
//         <button onClick={() => fetchUserData()}>Fetch The nExt Ones</button>
//         <h1>{counter}</h1>
//         <div className="hello">
//         </div>
//         <div>
//           HEllo, this is great: 
//           {fetched ? fetched.map((element, index) => {
//             return (
//               <div key={index}>
//                 <img src={element.picture.medium} alt="" />
//                 <p> {getFullUserName(element)}</p>
//               </div>
              
//               )
//             }) : null}
//           {/* {name ? ` ${name.firstName} ${name.lastName}` : null} */}
//         </div>
//         <div>
//         </div>
//         <div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;






