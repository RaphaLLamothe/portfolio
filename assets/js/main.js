/***************************************************
==================== JS INDEX ======================
****************************************************
// Smooth Scroll Without Hash
// Data Attributes (BG Image & Color)
// Sticky Header
// Hamburger Menu
// Portfolio Filter (Multi-selection)
// Modal Image Viewer
// Project Popup
// Competence Cards Interaction
// Contact Section Padding
// Progress Bars Animation
// WoW Animation
****************************************************/

(function ($) {
	"use strict";

	/*------------------------------------------------------
	/ SMOOTH SCROLL WITHOUT HASH IN URL
	/------------------------------------------------------*/
	function smoothScrollTo(targetId) {
		const target = document.querySelector(targetId);
		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			// Empêche l'ajout du # dans l'URL
			history.pushState(null, null, ' ');
		}
	}

	// Gestion des liens de navigation (header + footer)
	document.addEventListener('DOMContentLoaded', function() {
		// Tous les liens de navigation avec href="#..."
		document.querySelectorAll('a[href^="#"]').forEach(link => {
			link.addEventListener('click', function(e) {
				e.preventDefault();
				const targetId = this.getAttribute('href');
				if (targetId && targetId !== '#') {
					smoothScrollTo(targetId);
				}
			});
		});

		// Logo link - scroll vers #intro
		const logoLink = document.getElementById('logo-link');
		if (logoLink) {
			logoLink.addEventListener('click', function(e) {
				e.preventDefault();
				// Bloquer le logo si le menu est ouvert
				if ($('.header-menu').hasClass('opened')) return;
				smoothScrollTo('#intro');
			});
		}
	});

	/*------------------------------------------------------
	/ DATA ATTRIBUTES
	/------------------------------------------------------*/
	$("[data-bg-image]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-bg-image") + ")");
	});

	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});

	/*------------------------------------------------------
	/ DOCUMENT READY
	/------------------------------------------------------*/
	$(document).ready(function () {

		/*------------------------------------------------------
		/ STICKY HEADER
		/------------------------------------------------------*/
		let lastScrollTop = 0;
		$(window).scroll(function () {
			const scroll = $(window).scrollTop();
			if (scroll > 300) {
				$(".tj-header-area.header-sticky").addClass("sticky");
				$(".tj-header-area.header-sticky").removeClass("sticky-out");
			} else if (scroll < lastScrollTop && scroll < 500) {
				$(".tj-header-area.header-sticky").addClass("sticky-out");
				$(".tj-header-area.header-sticky").removeClass("sticky");
			} else {
				$(".tj-header-area.header-sticky").removeClass("sticky");
			}
			lastScrollTop = scroll;
		});

		// Header 2 Sticky
		const header = document.querySelector('.tj-header-area.header-2');
		if (header) {
			let lastScroll = 0;
			window.addEventListener('scroll', () => {
				const currentScroll = window.scrollY;
				if (currentScroll > lastScroll && currentScroll > 50) {
					header.classList.add('sticky');
				} else if (currentScroll < lastScroll && currentScroll <= 50) {
					header.classList.remove('sticky');
				}
				lastScroll = currentScroll;
			});
		}

		/*------------------------------------------------------
		/ HAMBURGER MENU
		/------------------------------------------------------*/
		$(".menu-bar").on("click", function () {
			$(".menu-bar").toggleClass("menu-bar-toggeled");
			$(".header-menu").toggleClass("opened");
			$("body").toggleClass("overflow-hidden");
		});

		$(".header-menu ul li a").on("click", function () {
			$(".menu-bar").removeClass("menu-bar-toggeled");
			$(".header-menu").removeClass("opened");
			$("body").removeClass("overflow-hidden");
		});

		/*------------------------------------------------------
		/ PORTFOLIO FILTER (Multi-selection avec Isotope)
		/------------------------------------------------------*/
		const $grid = $('.projects-grid').isotope({
			itemSelector: '.project-item',
			layoutMode: 'masonry',
			masonry: {
				columnWidth: '.project-item',
				gutter: 30
			}
		});

		// Gestion des filtres
		$('.filter-button-group').on('click', 'button', function() {
			const $this = $(this);
			const isAll = $this.data('filter') === '*';
			
			$this.toggleClass('tj-active-filter');
			
			if (isAll) {
				$('.filter-button-group button').not(this).removeClass('tj-active-filter');
			} else {
				$('.filter-button-group button[data-filter="*"]').removeClass('tj-active-filter');
			}
			
			const filters = [];
			$('.tj-active-filter').each(function() {
				filters.push($(this).data('filter').replace(' ', '.'));
			});
			
			if (filters.length === 0) {
				$('.filter-button-group button[data-filter="*"]').addClass('tj-active-filter');
				filters.push('*');
			}
			
			const filterValue = filters.length ? filters.join(', ') : '*';
			$grid.isotope({ filter: filterValue });
		});

		// Réinitialisation après chargement
		$(window).on('load', function() {
			$grid.isotope('layout');
		});

		/*------------------------------------------------------
		/ MODAL IMAGE VIEWER
		/------------------------------------------------------*/
		const unlockScroll = () => {
			const doc = document.documentElement;
			doc.style.removeProperty('overflow');
			document.body.style.removeProperty('overflow');
			document.body.style.removeProperty('margin-right');
			document.body.classList.remove('mfp-helper', 'modal-image-open');
			
			requestAnimationFrame(() => {
				doc.style.removeProperty('overflow');
				document.body.style.removeProperty('overflow');
				document.body.style.removeProperty('margin-right');
				document.body.classList.remove('modal-image-open');
			});
		};

		const modalImageViewer = (() => {
			let viewer, viewerImage, viewerCaption;

			const closeViewer = () => {
				if (!viewer || !viewer.classList.contains('is-active')) return;
				viewer.classList.remove('is-active');
				viewer.setAttribute('aria-hidden', 'true');
				document.body.classList.remove('modal-image-open');
			};

			const ensureViewer = () => {
				if (viewer) return viewer;

				viewer = document.createElement('div');
				viewer.className = 'modal-image-viewer';
				viewer.setAttribute('aria-hidden', 'true');
				viewer.innerHTML = `
					<div class="modal-image-viewer__backdrop"></div>
					<div class="modal-image-viewer__content" role="dialog" aria-modal="true">
						<button class="modal-image-viewer__close" type="button" aria-label="Fermer l'image"></button>
						<img class="modal-image-viewer__img" src="" alt="" />
						<p class="modal-image-viewer__caption"></p>
					</div>
				`;
				document.body.appendChild(viewer);

				viewerImage = viewer.querySelector('.modal-image-viewer__img');
				viewerCaption = viewer.querySelector('.modal-image-viewer__caption');
				const closeButton = viewer.querySelector('.modal-image-viewer__close');

				const handleClose = (event) => {
					event.preventDefault();
					closeViewer();
				};

				viewer.addEventListener('click', (event) => {
					if (event.target === viewer || event.target.classList.contains('modal-image-viewer__backdrop')) {
						event.preventDefault();
						closeViewer();
					}
				});

				closeButton.addEventListener('click', handleClose);

				document.addEventListener('keydown', (event) => {
					if (event.key === 'Escape' && viewer.classList.contains('is-active')) {
						closeViewer();
					}
				});

				viewer.addEventListener('transitionend', (event) => {
					if (event.propertyName === 'opacity' && !viewer.classList.contains('is-active')) {
						viewerImage.src = '';
						viewerCaption.textContent = '';
					}
				});

				return viewer;
			};

			const openViewer = (src, altText) => {
				const target = ensureViewer();
				viewerImage.src = src;
				viewerImage.alt = altText || '';
				viewerCaption.textContent = altText || '';
				target.classList.add('is-active');
				target.setAttribute('aria-hidden', 'false');
				document.body.classList.add('modal-image-open');
			};

			return {
				open: openViewer,
				close: closeViewer
			};
		})();

		// Attacher les événements aux images de galerie
		document.querySelectorAll('.modal-gallery-item').forEach((item) => {
			const img = item.querySelector('img');
			if (!img) return;

			item.addEventListener('click', (event) => {
				event.preventDefault();

				const tempImg = new Image();
				tempImg.src = img.src;

				tempImg.onload = () => {
					const isVertical = tempImg.naturalHeight > tempImg.naturalWidth;
					modalImageViewer.open(img.src, img.alt);

					setTimeout(() => {
						const viewerImg = document.querySelector('.modal-image-viewer img');
						if (!viewerImg) return;

						if (isVertical) {
							viewerImg.style.width = "auto";
							viewerImg.style.height = "85vh";
						} else {
							viewerImg.style.width = "85vw";
							viewerImg.style.height = "auto";
						}

						viewerImg.style.objectFit = "contain";
						viewerImg.style.maxWidth = "100%";
						viewerImg.style.maxHeight = "100%";
					}, 1);
				};
			});
		});

		/*------------------------------------------------------
		/ PROJECT POPUP (Magnific Popup)
		/------------------------------------------------------*/
		$(".project-card").magnificPopup({
			type: "inline",
			fixedContentPos: true,
			fixedBgPos: true,
			overflowY: "auto",
			closeBtnInside: true,
			preloader: false,
			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			callbacks: {
				beforeOpen: function() {
					$.magnificPopup.close();
				},
				open: function() {
					$('.modal-gallery-item').each(function(i) {
						$(this).delay(i * 150).animate({
							opacity: 1,
							transform: 'translateY(0)'
						}, 400);
					});
				},
				beforeClose: function() {
					modalImageViewer.close();
					const mfp = $.magnificPopup.instance;
					if (mfp && mfp.wrap) {
						mfp.wrap.css('pointer-events', 'none');
					}
					unlockScroll();
				},
				close: function() {
					unlockScroll();
					modalImageViewer.close();
					const mfp = $.magnificPopup.instance;
					if (mfp && mfp.wrap) {
						mfp.wrap.css('pointer-events', '');
					}
				}
			}
		});

		/*------------------------------------------------------
		/ COMPETENCE CARDS INTERACTION
		/------------------------------------------------------*/
		const competenceCards = document.querySelectorAll('.competence-card');
		
		competenceCards.forEach(card => {
			card.addEventListener('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				requestAnimationFrame(() => {
					this.classList.toggle('active');
					updateCardStates();
				});
			});
		});

		document.addEventListener('click', function(e) {
			if (!e.target.closest('.competence-card')) {
				requestAnimationFrame(() => {
					competenceCards.forEach(card => card.classList.remove('active'));
					updateCardStates();
				});
			}
		});

		function updateCardStates() {
			const activeCards = document.querySelectorAll('.competence-card.active');
			competenceCards.forEach(card => {
				if (!card.classList.contains('active')) {
					card.classList.toggle('mleave', activeCards.length > 0);
				} else {
					card.classList.remove('mleave');
				}
			});
		}

		// Animation à l'apparition
		function animateCards() {
			competenceCards.forEach((card, index) => {
				requestAnimationFrame(() => {
					setTimeout(() => {
						card.style.opacity = '1';
						card.style.transform = 'scale(0.95)';
					}, index * 100);
				});
			});
		}

		// Initialisation
		competenceCards.forEach(card => {
			card.style.opacity = '0';
			card.style.transform = 'scale(0.9)';
		});

		setTimeout(animateCards, 300);

		/*------------------------------------------------------
		/ PROGRESS BARS ANIMATION
		/------------------------------------------------------*/
		const progressBars = document.querySelectorAll('.progress-bar');
		progressBars.forEach(bar => {
			const width = bar.getAttribute('aria-valuenow') + '%';
			bar.style.setProperty('--progress-width', width);
		});

		/*------------------------------------------------------
		/ CONTACT SECTION PADDING
		/------------------------------------------------------*/
		const contactContainer = document.querySelector('#contact-section .container');
		const contactList = contactContainer?.querySelector('.contact-info-list');

		function updatePadding() {
			if (!contactContainer || !contactList) return;

			const containerStyle = getComputedStyle(contactContainer);
			const marginLeft = parseInt(containerStyle.marginLeft, 10);
			let padding = 12;

			if (marginLeft === 0) {
				padding = 120;
				const listStyle = getComputedStyle(contactList);
				const listWidth = contactList.offsetWidth - parseFloat(listStyle.paddingLeft) - parseFloat(listStyle.paddingRight);
				const viewportWidth = window.innerWidth;

				if (listWidth + 2 * padding > viewportWidth) {
					padding = Math.max((viewportWidth - listWidth) / 2, 12);
				}
			}

			contactList.style.paddingLeft = `${padding}px`;
			contactList.style.paddingRight = `${padding}px`;
		}

		if (contactContainer && contactList) {
			updatePadding();
			window.addEventListener('resize', updatePadding);
		}
	});

	/*------------------------------------------------------
	/ WOW ANIMATION ON LOAD
	/------------------------------------------------------*/
	$(window).on("load", function () {
		const wow = new WOW({
			boxClass: "wow",
			animateClass: "animated",
			offset: 100,
			mobile: true,
			live: true,
		});
		wow.init();
	});

})(jQuery);

/*------------------------------------------------------
/ HELPER FUNCTIONS (VANILLA JS)
/------------------------------------------------------*/

// Parse competence list from string
const parseCompetenceList = (value = '') => value
	.split(',')
	.map(item => item.trim().toLowerCase())
	.filter(Boolean);

// Handle competence click from project cards
function handleCompetenceClick(e) {
	e.preventDefault();
	e.stopPropagation();

	const competencesAttr = e.currentTarget.dataset.competences;
	if (!competencesAttr) {
		console.error("Missing data-competences attribute.");
		return;
	}

	const competenceSet = new Set(parseCompetenceList(competencesAttr));
	if (!competenceSet.size) return;

	const section = document.getElementById('competences-section');
	if (!section) {
		console.error("Section 'competences-section' not found.");
		return;
	}

	section.scrollIntoView({ behavior: 'smooth', block: 'start' });

	document.querySelectorAll('.competence-card').forEach(card => {
		const title = card.querySelector('.competence-title')?.innerText.trim().toLowerCase() || '';
		card.classList.toggle('active', competenceSet.has(title));
	});

	document.querySelectorAll('.project-card').forEach(projectCard => {
		const projectCompetencesAttr = projectCard.dataset.competences;
		const source = projectCompetencesAttr 
			? projectCompetencesAttr 
			: Array.from(projectCard.querySelectorAll('.competence-tag')).map(tag => tag.innerText);
		
		const projectCompetences = Array.isArray(source) 
			? source.map(item => item.trim().toLowerCase()).filter(Boolean) 
			: parseCompetenceList(source);
		
		const isActive = projectCompetences.some(label => competenceSet.has(label));
		projectCard.classList.toggle('active', isActive);
	});

	setTimeout(() => {
		document.querySelectorAll('.competence-card.active, .project-card.active').forEach(card => {
			card.style.transform = 'translateY(0)';
			card.style.opacity = '1';
		});
	}, 500);
}

// Filter projects by category
function filterProjects(element) {
	const filter = element.getAttribute('data-filter');
	const filterButton = document.querySelector(`.filter-button-group button[data-filter="${filter}"]`);
	
	if (filterButton) {
		filterButton.click();
	}

	// Smooth scroll to projects section
	const projectsSection = document.querySelector('#projects-section');
	if (projectsSection) {
		projectsSection.scrollIntoView({ behavior: 'smooth' });
	}
}
