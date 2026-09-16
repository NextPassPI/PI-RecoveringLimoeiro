const nav = document.querySelector('.navbar-nav');
const navLinks = nav?.querySelectorAll('.nav-link');
const indicator = nav?.querySelector('.nav-indicator');

function moveIndicator(link) {
	if (!nav || !indicator || !link) return;

	const navBounds = nav.getBoundingClientRect();
	const linkBounds = link.getBoundingClientRect();

	nav.style.setProperty('--indicator-width', `${linkBounds.width}px`);
	nav.style.setProperty('--indicator-height', `${linkBounds.height}px`);
	nav.style.setProperty('--indicator-x', `${linkBounds.left - navBounds.left}px`);
	nav.style.setProperty('--indicator-y', `${linkBounds.top - navBounds.top}px`);
}

if (nav && navLinks?.length && indicator) {
	let selectedLink = nav.querySelector('.nav-link.active') ?? navLinks[0];

	navLinks.forEach((link) => {
		link.addEventListener('mouseenter', () => moveIndicator(link));
		link.addEventListener('click', (event) => {
			if (link.getAttribute('href') === '#') event.preventDefault();

			navLinks.forEach((navLink) => {
				navLink.classList.remove('active', 'text-success');
				navLink.classList.add('text-white');
			});

			link.classList.add('active', 'text-success');
			link.classList.remove('text-white');
			selectedLink = link;
			moveIndicator(selectedLink);
		});
	});

	nav.addEventListener('mouseleave', () => moveIndicator(selectedLink));
	window.addEventListener('resize', () => moveIndicator(selectedLink));
	moveIndicator(selectedLink);
}

const filterButtons = document.querySelectorAll('.filter-card');

filterButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const selectedFilter = button.dataset.filter;

		filterButtons.forEach((filterButton) => {
			const isSelected = filterButton === button;

			filterButton.classList.toggle('is-selected', isSelected);
			filterButton.setAttribute('aria-pressed', String(isSelected));
		});

		document.querySelectorAll('[data-category]').forEach((item) => {
			const isVisible = selectedFilter === 'todos' || item.dataset.category === selectedFilter;

			item.hidden = !isVisible;
		});
	});
});
