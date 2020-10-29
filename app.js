
//Book Construtor
function Book(title, author, isbn){
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

//UI constructor
function UI() {}


UI.prototype.addBookToList = function(book) {  // -------------Set add Book in row method
	const list = document.getElementById('book-list');
	const row = document.createElement('tr');

	row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete">X</a></td>`;

	list.appendChild(row);
}
UI.prototype.showAlert = function(message, error) {//-------------Shows Error method
	const div = document.createElement('div');
	div.className = `alert ${error}`;
	div.appendChild(document.createTextNode(message));

	const container = document.querySelector('.container');
	const form = document.querySelector('#book-form');

	container.insertBefore(div, form); 

	setTimeout(() => {
		document.querySelector('.alert').remove();
		console.log("hit")
	}, 3000)

}
UI.prototype.deleteBook = function(target) { // ----------------Delete book method
	if(target.className === 'delete') {
		target.parentElement.parentElement.remove();
	}
}

UI.prototype.clearFields = function() { //-----------------------Clear Fields method
	document.getElementById('title').value = "";
	document.getElementById('author').value = "";
	document.getElementById('isbn').value = "";
}

	
//Event listener 
document.getElementById('book-form').addEventListener('submit', onSubmit);

function onSubmit(e) { //-------------------------------------Function when submitted
	//input values
	const title = document.getElementById('title').value,
		  author = document.getElementById('author').value,
		  isbn = document.getElementById('isbn').value;	
	
	const book = new Book(title, author, isbn);
	const ui = new UI();

	//Validation
	if(title === '' || author === '' || isbn === '') {
		ui.showAlert('Please fill in all fields', 'error');

	} else {
		ui.addBookToList(book)
		ui.showAlert('Book Added!', 'success')
		ui.clearFields();
		ui.clearFields();
	}

	//method call with new book object as argument
	
	e.preventDefault();
}
	
// EventListener for delete

document.getElementById('book-list').addEventListener('click', onDelete);

function onDelete(e) {

	const ui = new UI();
	ui.deleteBook(e.target);

	ui.showAlert("Book Removed", 'success');
	e.preventDefault();

}






