function foo() {
  console.log('hello');
}

var f1 = new foo() //bind to f1
console.log(f1);

//------------------------------------------------


//-----Closures------

function outerFunction(test) {
  return function innerFunction(innerVar) {
    console.log('innerVar :' + innerVar);
  }
}

const newFunction = outerFunction('hello')
newFunction('cr7')

//new function gets reassigned to inner function, which remembers the outer function's parameter.

//-----------------------Inheritance
const obj1 = {
  'name': 'colin'
}

//-------prototypes

var obj2 = Object.create(obj1) //creates a new object from its old prototype.

function defineSinger(name) {
  this.name = 'yamaguchi_ m'
  this.active = 'false'
}

defineSinger.prototype.mom = function () { // adding new methods to prototypes, which future objects can be created from
  this.mom = true
}

var userOne = new defineSinger('leslie')


//-------------------------Hoisting-----------
store('momoe')

function store(singer) {
  console.log(singer);
}

console.log(num); // Returns 'undefined' from hoisted var declaration (not 6)
var num = 6; // Initialization and declaration.
console.log(num); // Returns 6 after the line with initialization is executed.

console.log(number)
console.log(constant);
let number = 5
let constant = 6


//-------------------Currying----------------

//can be used to manipulate dom, trigger event listeners, create single argument functions

function favSinger(greet) {
  return function (name) {
    return function (age) {
      return `${greet} ${name} ${age}`
    }
  }
}

favSinger('hello')('christopher wong')('61')

//------high function, can take in additional function as parameter. filter, map etc..


