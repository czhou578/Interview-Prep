
// function promisesAllUtility(promises) {
//   const outputs = []
//   let settledPromiseCounter = 0;

//   return new Promise((resolve, reject) => {
//     promises.forEach((promise, i) => {
//       promise.then((value) => {
//         outputs[i] = value
//         settledPromiseCounter++
//         if (settledPromiseCounter === promises.length) {
//           resolve(outputs)
//         }
//       }).catch(reject)
//     });
//   })
// }

// const promises = [
//   Promise.resolve(2),
//   Promise.reject('3')
// ]

// console.log(promisesAllUtility(promises).then(console.log))

function deepEquals(valueOne, valueTwo) {
  //handling primitives
  if (typeof valueOne !== "object" || typeof valueTwo !== "object") {
    const isNaNOne = isNaN(valueOne) && typeof valueOne !== 'string'
    const isNaNTwo = isNaN(valueTwo) && typeof valueTwo !== 'string'
    
    return valueOne === valueTwo
  }

  if (typeof valueOne !== typeof valueTwo) return false
  if (valueOne === null && valueTwo === null) return true
  if (valueOne === null || valueTwo === null) return false

  if (valueOne === valueTwo) return true
  

  if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
    if (valueOne.length !== valueTwo.length) return false

    for (let i = 0; i < valueOne.length; i++) {
      if (!deepEquals(valueOne[i],valueTwo[i])) return false
    }

    return true
  }

  if (Array.isArray(valueOne) || Array.isArray(valueTwo)) return false

  const valueOneKeys = Object.keys(valueOne)
  const valueTwoKeys = Object.keys(valueTwo)

  if (valueOneKeys.length !== valueTwoKeys.length) return false
  if (!deepEquals(valueOneKeys, valueTwoKeys)) return false //min 38:00 roughly for why this fails

  if (!deepEquals(valueOneKeys, valueTwoKeys)) return false

  for (let i = 0; i < valueOneKeys.length; i++) {
    const key = valueOneKeys[i]
    const valueOneValue = valueOne[key]
    const valueTwoValue = valueTwo[key]
    if (!deepEquals(valueOneValue, valueTwoValue)) return false  
  }

  return true

  //Colin's approach: flatten object
  //compare all keys and values of both objects, and if they are the same, then return true
}

console.log(deepEquals([], {}))
console.log(deepEquals(null, 4))
console.log(deepEquals(undefined, undefined))

function getTimer(isoDate, timerInfo) {
  const date = new Date(isoDate)

  setInterval(() => {
    const timeTillDate = date - Date.now()
    const seconds = Math.floor(timeTillDate / 60)
    const minutes = Math.floor(seconds/ 60)
    const hours = Math.floor(minutes / 60)

    timerInfo.seconds = seconds % 60
    timerInfo.minutes = minutes % 60
    timerInfo.hours = hours % 60
  
    // timerInfo = {
    //   seconds: seconds % 60,
    //   minutes: minutes % 60,
    //   hours
    // }
  }, 500);

}

// const 
