const closeButton = document.querySelector('.form__close');
const addButton = document.querySelector('.button__add')
const popup = document.querySelector('.form');
const form = document.getElementById('form__book')
const myLibrary = [{
  "name": "A simple way to live in parts",
  "author": "Armor Ramsey",
  "totalPage": 200,
  "progressPage": 87,
  "image": "./assets/img/Group 298.png"
},{
  "name": "Great travel a desert",
  "author": "Sanchit Howdy",
  "totalPage": 145,
  "progressPage": 87,
  "image": "./assets/img/book3 4.png"
},{
  "name": "The lady beauty Scarlett",
  "author": "Arthur Doyle",
  "totalPage": 145,
  "progressPage": 20,
  "image": "./assets/img/book16 1.png"
}
]


closeButton.addEventListener('click',function () {
  popup.classList.add('hidden')
})

addButton.addEventListener('click',function () {
  popup.classList.remove('hidden')
})

function updateBook() {
  const booksBlock = document.querySelector('.books__main')

  booksBlock.innerHTML = '';
  
  for (let i=0; i < myLibrary.length; i++) {
    booksBlock.innerHTML += `<div class="book"> <div class="book__background"> <img class="book__background-img" src="${myLibrary[i].image}" alt=""> </img> </div >
                    <div class="book__name">${myLibrary[i].name}</div>
                    <div class="book__author">${myLibrary[i].author}</div>
                    <div class="book__progres">Прогресс: ${ progress(myLibrary[i].totalPage,myLibrary[i].progressPage)}%</div>
                </div>`
    console.log(myLibrary[i].Book)
  }
}

function Book(name,author,totalPage,progressPage,image) {
  this.name = name;
  this.author = author;
  this.totalPage = totalPage;
  this.progressPage = progressPage;
  this.image = image || './assets/img/no_img.jpg'
}

function progress(totalPages,progress) {
  return Math.round(progress/(totalPages/100))
}

form.addEventListener('submit',function(event) {
  event.preventDefault()



  const name = form.title.value;
  const author = form.author.value;
  const totalPages = parseInt(form.pages.value);
  const progressPage = parseInt(form.progress.value);
  const image = form.cover.value;

  if (!name || !author || isNaN(totalPages) || isNaN(progressPage) || totalPages <= 0 || progressPage < 0 || progressPage > totalPages) {
    alert('Пожалуйста, заполните все поля корректно.');
    return;
  }

  const book = new Book(name,author,totalPages,progressPage,image)
  myLibrary.push(book)

  updateBook();

  form.reset();


})


function writeForm() {
  
}


function addBookToLibrary() {
  // do stuff here
}


updateBook()