const closeButton = document.querySelector('.form__close');
const addButton = document.querySelector('.button__add')
const popup = document.querySelector('.form');
const form = document.getElementById('form__book')
const myLibrary = [{
  "name": "A simple way to live in parts",
  "author": "Armor Ramsey",
  "totalPage": 200,
  "progressPage": 87,
  "image": "./assets/img/Group 298.png",
  "read": false
},{
  "name": "Great travel a desert",
  "author": "Sanchit Howdy",
  "totalPage": 145,
  "progressPage": 87,
  "image": "./assets/img/book3 4.png",
  "read": false
},{
  "name": "The lady beauty Scarlett",
  "author": "Arthur Doyle",
  "totalPage": 145,
  "progressPage": 20,
  "image": "./assets/img/book16 1.png",
  "read": false
}
]


closeButton.addEventListener('click',function () {
  popup.classList.add('hidden')
})

addButton.addEventListener('click',function () {
  popup.classList.remove('hidden')
})

const fileInputLabel = document.querySelector('.custom__download');

fileInputLabel.addEventListener('dragenter', function(event) {
  event.preventDefault();
  fileInputLabel.classList.add('dragover'); 
});

fileInputLabel.addEventListener('dragover', function(event) {
  event.preventDefault();
  fileInputLabel.classList.add('dragover'); 
});

fileInputLabel.addEventListener('dragleave', function(event) {
  fileInputLabel.classList.remove('dragover'); 
});

function statusButton(index) {
  myLibrary[index].read =  !myLibrary[index].read
  updateBook();
}

function deleteButton(index) {
  myLibrary.splice(index,1);
  updateBook();
}


function addDeleteEvent() {
  const deleteButtons = document.querySelectorAll('.button__delete')

  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const bookIndex = parseInt(button.getAttribute('data-index'));
      deleteButton(bookIndex);
    })
  })
}

function addStatusEvent() {
  const statusButtons = document.querySelectorAll('.button__status')

  statusButtons.forEach(button => {
    button.addEventListener('click', function() {
      const bookIndex = parseInt(button.getAttribute('data-index'));
      statusButton(bookIndex)
    })
  })
}


function updateBook() {
  const booksBlock = document.querySelector('.books__main')

  booksBlock.innerHTML = '';
  
  for (let i=0; i < myLibrary.length; i++) {
    booksBlock.innerHTML += `<div class="book"> <div class="book__background"> <img class="book__background-img" src="${myLibrary[i].image}" alt=""> </img> </div >
                    <div class="book__name">${myLibrary[i].name}</div>
                    <div class="book__author">${myLibrary[i].author}</div>
                    <div class="book__progres">Прогресс: ${ progress(myLibrary[i].totalPage,myLibrary[i].progressPage)}%</div>
                    <div class="book__status book__progres">Статус: ${myLibrary[i].read ? 'Прочитана' : 'Читаю'}</div>
                    <div class="center"><button class="button__delete" data-index="${i}">УДАЛИТЬ</button><button class="button__status" data-index="${i}">ИЗМЕНИТЬ СТАТУС</button></div>
                </div>`
  }
  addDeleteEvent();
  addStatusEvent();
}

function Book(name,author,totalPage,progressPage,image,result) {
  this.name = name;
  this.author = author;
  this.totalPage = totalPage;
  this.progressPage = progressPage;
  this.image = result_photo || './assets/img/no_img.jpg'
  this.read = false
}

function progress(totalPages,progress) {
  return Math.round(progress/(totalPages/100))
}

function resetForm() {
  result_photo = '';
  document.querySelector('.green').classList.add('hidden')
}


let result_photo = '';
function upload(file) {
  if (!file || !file.type.match(/image.*/)) return;
  document.body.className = "uploading";
  var fd = new FormData();
  fd.append("image", file);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://api.imageban.ru/v1");
  xhr.onload = function() {
    const done = document.querySelector('.green')
      result_photo = JSON.parse(xhr.responseText).data.link;
      if (result_photo) {
        document.querySelector('.green').classList.remove('hidden')
      }
  }
  xhr.setRequestHeader('Authorization', 'TOKEN rxiQ3wzxyxSg9gcPbdOg');
  xhr.send(fd);
}

window.addEventListener('dragover', function(event) {
  event.preventDefault();
})

window.addEventListener('drop', function(event) {
  event.preventDefault();
  upload(event.dataTransfer.files[0]);
})

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
  resetForm();


})


updateBook()