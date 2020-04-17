// 161 INOUT AND CHANGE EVENTS 5:35
const cardName = document.getElementById('name'),
	cardDate = document.getElementById('date'),
	cardCvv = document.getElementById('cvv'),
	cardFront = document.querySelector('.card__side--front'),
	cardBack = document.querySelector('.card__side--back'),
	cardNum = document.querySelectorAll('.card__num'),
	cardMonth = document.querySelector('.month'),
	cardYear = document.querySelector('.year'),
	numberInput = document.getElementById('cardNumber'),
	nameInput = document.getElementById('cardHolder'),
	monthInput = document.getElementById('month'),
	yearInput = document.getElementById('year'),
	cvvInput = document.getElementById('cvv-input'),
	form = document.querySelector('.form');

//////////////////////////////////////////////////////////
// INPUT CHECKING
////////////////////////////////////////////////////////////

function checkRequired(inputArr) {
	inputArr.forEach(function(input) {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
}

function isEmpty(input) {
	if (input.value.trim() === '') {
		showError(input, `${getFieldName(input)} is required`);

		return true;
	} else {
		return false;
	}
}
// Checks only contains letters and spaces
function checkOnlyLetters(input) {
	const letters = /^[a-zA-Z\s]*$/;
	if (input.value.trim().match(letters)) {
		return true;
	} else {
		showError(input, `${getFieldName(input)} can only contain letters`);
		return false;
	}
}

function showSuccess(input) {
	input.classList.add('form__text-input--success');
	input.classList.remove('form__text-input--failure');
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	small.innerText = '';
}

//Show input error message
function showError(input, message) {
	input.classList.add('form__text-input--failure');
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	small.innerText = message;
}

//Get field name
function getFieldName(input) {
	return input.parentElement.querySelector('label').innerText;
}

//////////////////////////////////////////////////////////
// CHECK LENGTH
////////////////////////////////////////////////////////////

function checkLength(input, value) {
	let length = input.value.replace(/\D/g, '').length;
	console.log('length', length, 'value', value);
	if (length != value) {
		console.log('not equal');
		showError(input, `${getFieldName(input)} must be ${value} characters`);
		return true;
	} else {
		return false;
	}
}

//////////////////////////////////////////////////////////
// FLIP CARD
////////////////////////////////////////////////////////////
const flipCard = function() {
	if (this === document.activeElement) {
		frontRotate = 'rotateY(-180deg)';
		backRotate = 'rotateY(0deg)';
	} else {
		frontRotate = 'rotateY(0deg)';
		backRotate = 'rotateY(180deg)';
	}
	cardFront.style.transform = frontRotate;
	cardBack.style.transform = backRotate;
};

//////////////////////////////////////////////////////////
// LONG NUMBER INPUT
////////////////////////////////////////////////////////////

const manageNum = function() {
	let number = numberInput.value;
	//Remove Letters
	number = number.replace(/\D/g, '');
	//Format Numbers
	number = numSpacing(number);
	// Limit to 8 digits
	numberInput.value = number;
	// Update Card number
	visualNumberUpdate();
};

const visualNumberUpdate = function() {
	let input = numberInput.value.replace(/\D/g, '');
	for (let i = 0; i < cardNum.length; i++) {
		if (input[i] != undefined) {
			// console.log(numberInput.value[i])
			cardNum[i].innerText = input[i];
		} else {
			cardNum[i].innerText = '#';
		}
	}
};

const numSpacing = function(number) {
	number = number.replace(/[\W\s\._\-]+/g, '');
	const split = 4;
	let chunk = [];
	for (let i = 0; i < number.length; i += split) {
		chunk.push(number.substr(i, split));
	}

	return chunk.join('-');
};

const checkNumber = function() {
	if (!isEmpty(numberInput)) {
		if (!checkLength(numberInput, 16)) {
			showSuccess(numberInput);
		}
	}
};

//////////////////////////////////////////////////////////
// LONG NUMBER INPUT
////////////////////////////////////////////////////////////
const manageName = function() {
	if (nameInput.value === '') {
		cardName.innerText = 'John Doe';
	} else {
		cardName.innerText = nameInput.value;
	}
};

const checkName = function() {
	if (!isEmpty(nameInput)) {
		if (checkOnlyLetters(nameInput)) {
			showSuccess(nameInput);
		}
	}
};

//////////////////////////////////////////////////////////
// CVV INPUT
////////////////////////////////////////////////////////////
const manageCvv = function() {
	let cvv = cvvInput.value;
	cvv = cvv.replace(/\D/g, '');
	cvvInput.value = cvv;
	//update card cvv
	cardCvv.value = cvv;
};

const checkCvv = function() {
	if (!isEmpty(cvvInput)) {
		if (!checkLength(cvvInput, 3)) {
			showSuccess(cvvInput);
		}
	}
};

//////////////////////////////////////////////////////////
// DATE INPUT
////////////////////////////////////////////////////////////

const manageDate = function() {
	let input = this.name;
	if (this.value === 'invalid') {
		input === 'month' ? (cardMonth.innerText = 'MM') : (cardYear.innerText = 'YY');
	} else {
		const months = {
			January: '01',
			February: '02',
			March: '03',
			April: '04',
			May: '05',
			June: '06',
			July: '07',
			August: '08',
			September: '09',
			October: '10',
			November: '11',
			December: '12'
		};

		function trimYear(year) {
			return year.slice(2,4);
		}

		input === 'month' ? cardMonth.innerText = months[this.value] : cardYear.innerText = trimYear(this.value);
		
	}
};
// REUQIRES REFACTORING
const checkDate = function(){
	if(monthInput.value === 'invalid' && yearInput.value === 'invalid'){
		showError(monthInput, `${getFieldName(monthInput)} is required`);
		showError(yearInput, `${getFieldName(monthInput)} is required`);
	} else if (monthInput.value != 'invalid' && yearInput.value === 'invalid') {
		showSuccess(monthInput);
		showError(yearInput, ``);
	} else if(monthInput.value === 'invalid' && yearInput.value != 'invalid') {
		showError(monthInput, ``);
		showSuccess(yearInput);
	} else {
		showSuccess(yearInput);
		showSuccess(monthInput);
	}

}

//////////////////////////////////////////////////////////
// EVENT LISTENERS
////////////////////////////////////////////////////////////

cvvInput.addEventListener('focus', flipCard);
cvvInput.addEventListener('blur', flipCard);
numberInput.addEventListener('input', manageNum);
nameInput.addEventListener('input', manageName);
cvvInput.addEventListener('input', manageCvv);
monthInput.addEventListener('input', manageDate);
yearInput.addEventListener('input', manageDate);
form.addEventListener('submit', (e) => {
	e.preventDefault();
	checkNumber();
	checkName();
	checkCvv();
	checkDate();
});
