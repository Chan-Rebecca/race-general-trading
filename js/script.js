// script for mobile nav
	const navToggle = document.getElementById("navToggle");
  	const mainNav = document.getElementById("mainNav");
  	navToggle.addEventListener("click", () => 
  	{
    	const isOpen = mainNav.classList.toggle("is-open");
    	navToggle.classList.toggle("is-active", isOpen);
    	navToggle.setAttribute("aria-expanded", isOpen);
  	});

  	document.querySelectorAll(".main-nav a").forEach(link => 
  	{
    	link.addEventListener("click", () => 
    	{
      		mainNav.classList.remove("is-open");
      		navToggle.classList.remove("is-active");
      		navToggle.setAttribute("aria-expanded", "false");
    	});
  	});

// script for site header
	const header = document.getElementById("siteHeader");
  	window.addEventListener("scroll", () => 
  	{
    	header.classList.toggle("is-scrolled", window.scrollY > 12);
  	});

// script for back to top
	const backToTop = document.getElementById("backToTop");
  	window.addEventListener("scroll", () => 
  	{
    	header.classList.toggle("is-scrolled", window.scrollY > 12);
    	backToTop.classList.toggle("is-visible", window.scrollY > 600);
  	});

  	backToTop.addEventListener("click", () => 
  	{
    	window.scrollTo({ top: 0, behavior: "smooth" });
  	});