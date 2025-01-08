const closeButton = document.querySelector('.form__close');
const addButton = document.querySelector('.button__add')
const popup = document.querySelector('.form');

closeButton.addEventListener('click',function () {
  popup.classList.add('hidden')
})

addButton.addEventListener('click',function () {
  popup.classList.remove('hidden')
})


const myLibrary = [];


function Book(name,author,totalPage,progressPage,image) {
    this.name = name;
    this.author = author;
    this.totalPage = totalPage;
    this.progressPage = progressPage;
    this.image = image || 'no_img.jpg'
}

function addBookToLibrary() {
  // do stuff here
}