
function promisesAllUtility(promises) {
  const outputs = []
  let settledPromiseCounter = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, i) => {
      promise.then((value) => {
        outputs[i] = value
        settledPromiseCounter++
        if (settledPromiseCounter === promises.length) {
          resolve(outputs)
        }
      }).catch(reject)
    });
  })
}

const promises = [
  Promise.resolve(2),
  Promise.reject('3')
]

console.log(promisesAllUtility(promises).then(console.log))

function deepEquals(valueOne, valueTwo) {
  //handling primitives
  if (typeof valueOne !== "object" || typeof valueTwo !== "object") {
    const isNaNOne = isNaN(valueOne) && typeof valueOne !== 'string'
    const isNaNTwo = isNaN(valueTwo) && typeof valueTwo !== 'string'
    
    return valueOne === valueTwo
  }

  if (typeof valueOne !== typeof valueTwo) return false

  if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
    if (valueOne.length !== valueTwo.length) return false

    for (let i = 0; i < valueOne.length; i++) {
      if (!deepEquals(valueOne[i],valueTwo[i])) return false
    }
  }

  // if (Array.isArray(valueOne) || Array.isArray(valueTwo)) return false

  const valueOneKeys = Object.keys(valueOne)
  const valueTwoKeys = Object.keys(valueTwo)

  if (valueOneKeys.length !== valueTwoKeyvalueOneKeys.length) return false

  if (!deepEquals(valueOneKeys, valueTwoKeyvalueOneKeys)) return false

  for (let i = 0; i < valueOneKeys.length; i++) {
    const key = valueOneKeys[i]
    if (!deepEquals(valueOne[key], valueTwo[key])) return false  
  }

  return true

  //Colin's approach: flatten object
  //compare all keys and values of both objects, and if they are the same, then return true
}