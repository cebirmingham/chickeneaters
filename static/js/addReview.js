
function onChange(event) {
	const chickenRangeLabel = event.target.parentElement.querySelector('.chickenRangeLabel');
	const rating = event.target.value
	chickenRangeLabel.innerHTML = rating;

	const chickenRange = event.target;
	const chickenRangeParent = chickenRange.parentElement;

	// const chickenRange = event.target.parentElement.querySelector('.chickenRange');
	// chickenRange.className = `chickenRange nugget-${rating}`;

	const chickenRangeParentClasses = [...chickenRange.parentElement.classList ];

	chickenRangeParentClasses.unshift(`nugget-${rating}`)
	chickenRangeParent.className = chickenRangeParentClasses.join(' ');
}
const sliders = document.querySelectorAll('.chickenRange');
[ ...sliders].forEach(el => el.addEventListener('input', onChange));

// Todo: Form validation, e.g. missing required fields
function onSubmit() {
  //alert('Error! Please select a value!');
}
const form = document.getElementById('form');
form.addEventListener('submit', onSubmit);
