//Hello World

type HelloWorld = string

//Pick

type MyPick<T, K extends keyof T> = {
  [key in K]: T[key]
}