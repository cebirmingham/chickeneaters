
function onChange(event) {
	const chickenRangeLabel = event.target.parentElement.querySelector('.chickenRangeLabel');
	const rating = event.target.value
	chickenRangeLabel.innerHTML = rating;

	const chickenRangeParent = event.target.parentElement;
	const chickenRangeParentClasses = [...chickenRangeParent.classList ];
	const chickenRangeClasses = chickenRangeParentClasses.filter(chickClass => !chickClass.startsWith('nugget-'))

	chickenRangeParent.className = `${chickenRangeClasses.join(' ')} nugget-${rating}`;
}
const e = new Event('input');
const sliders = document.querySelectorAll('.chickenRange');
[ ...sliders].forEach(el => {
	el.addEventListener('input', onChange)
	el.dispatchEvent(e)
});


// Todo: Form validation, e.g. missing required fields
function onSubmit(event) {
	event.preventDefault(); // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
	const elements = event.target.querySelectorAll('input, textarea');
	const data = [...elements].map(element => {
		const { name, value } = element
		return {name, value}
	});

	fetch('http://localhost:3000/api/sendToNeo', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	.catch(err => console.log('I AM THE ERROR',err));
}

const form = document.getElementById('form');
form.addEventListener('submit', onSubmit);
