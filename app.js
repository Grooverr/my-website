// Minimal interactivity for the portfolio site
document.addEventListener('DOMContentLoaded', function(){
	console.log('Site loaded');

	// populate current year
	const yearEl = document.getElementById('year');
	if(yearEl) yearEl.textContent = new Date().getFullYear();

	// nav toggle for mobile
		const toggle = document.querySelector('.nav-toggle');
		const navLinks = document.querySelector('.nav-links');
		const nav = document.querySelector('.nav');
		if(toggle && navLinks){
			const openMenu = ()=>{
				navLinks.setAttribute('data-state','open');
				toggle.setAttribute('aria-expanded','true');
				toggle.setAttribute('aria-label','Close menu');
			};
			const closeMenu = ()=>{
				navLinks.setAttribute('data-state','closed');
				toggle.setAttribute('aria-expanded','false');
				toggle.setAttribute('aria-label','Open menu');
			};

			toggle.addEventListener('click', ()=>{
				const isOpen = navLinks.getAttribute('data-state') === 'open';
				if(isOpen) closeMenu(); else openMenu();
			});

			// Close on Escape key
			document.addEventListener('keydown', (e)=>{
				if(e.key === 'Escape' && navLinks.getAttribute('data-state') === 'open'){
					closeMenu();
					toggle.focus();
				}
			});

			// Close when clicking outside nav on mobile
			document.addEventListener('click', (e)=>{
				if(navLinks.getAttribute('data-state') !== 'open') return;
				const target = e.target;
				if(!nav.contains(target)){
					closeMenu();
				}
			});
		}

	// smooth scrolling for internal links
	document.querySelectorAll('a[href^="#"]').forEach(a=>{
		a.addEventListener('click', function(e){
			const href = this.getAttribute('href');
			if(href === '#') return;
			const target = document.querySelector(href);
			if(target){
				e.preventDefault();
				target.scrollIntoView({behavior:'smooth', block:'start'});
											// close mobile menu after navigation (uses data-state API)
											if(navLinks && navLinks.getAttribute('data-state') === 'open'){
												navLinks.setAttribute('data-state','closed');
												if(toggle) toggle.setAttribute('aria-expanded','false');
											}
			}
		});
	});
});
