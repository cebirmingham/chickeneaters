
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
console.log('what is e******* ' , e);
const sliders = document.querySelectorAll('.chickenRange');
[ ...sliders].forEach(el => {
	el.addEventListener('input', onChange)
	el.dispatchEvent(e)
});

// Todo: Form validation, e.g. missing required fields
function onSubmit() {
  //alert('Error! Please select a value!');
}
const form = document.getElementById('form');
form.addEventListener('submit', onSubmit);
