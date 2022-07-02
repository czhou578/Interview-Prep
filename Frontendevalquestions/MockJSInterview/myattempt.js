// implement promise.all

function promisesAll(promise) {
  let result = [];
  let counter = 0;
  return new Promise((resolve, reject) => {
    promise
      .forEach((element) => {
        element.then((data) => {
          result[counter] = data;
          counter++;

          if (counter === promise.length) {
            resolve(result);
          }
        });
      })
      .catch(reject);
  });
}

const arr = [
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.resolve(12),
  Promise.reject(1),
];

console.log(promisesAll(arr).then(console.log));

/**
 * 1st attempt
 *
 * failed to use for each
 * failed to catch for reject
 * didn't use resolve
 */
