const wrapper = document.getElementsByClassName("wrapper")[0]
const button = document.getElementsByClassName("btn")[0]
const parent = document.getElementsByClassName("parent")[0]

const modalDiv = document.getElementsByClassName("modalDiv")[0]
const crossBox = document.getElementsByClassName("crossBox")[0]
const acceptBtn = document.getElementsByClassName("acceptBtn")[0]
const acceptedOffer = document.getElementsByClassName("acceptedOffer")[0]


if (crossBox) {
  crossBox.addEventListener('click', () => {
    console.log('asdfasdfasd')
    parent.style.display = "block"
    modalDiv.style.display = "none"
    acceptedOffer.style.display = "none"
  })
}

if (acceptBtn) {
  acceptBtn.addEventListener('click', () => {
    modalDiv.style.display = "none"
    acceptedOffer.style.display = "block"
  })
}

button.addEventListener('click', () => {
  parent.style.display = "none"
  modalDiv.style.display = "block"
  acceptedOffer.style.display = "none"
})
