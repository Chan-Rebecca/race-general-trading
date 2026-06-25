// script for nav
    const navToggle = document.getElementById("navToggle");
    const mainNav   = document.getElementById("mainNav");

    if (navToggle && mainNav) 
    {
        navToggle.addEventListener("click", () => 
        {
            const isOpen = mainNav.classList.toggle("is-open");
            navToggle.classList.toggle("is-active", isOpen);
            navToggle.setAttribute("aria-expanded", isOpen);
        });

        document.querySelectorAll(".main-nav a").forEach(l => 
        {
            l.addEventListener("click", () => 
            {
                mainNav.classList.remove("is-open");
                navToggle.classList.remove("is-active");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

// script for header scroll and back to top
    const header    = document.getElementById("siteHeader");
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => 
    {
        if (header)    header.classList.toggle("is-scrolled", window.scrollY > 12);
        if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 600);
    });

    if (backToTop) 
    {
        backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

// script for contact page only
    const form = document.getElementById("contactForm");

    if (form) 
    {
        /* Pre-fill from sessionStorage (set by services page) */
        const stored = sessionStorage.getItem("quoteService");
        if (stored) 
        {
            const sel = document.getElementById("service");
            if (sel) sel.value = stored;
            sessionStorage.removeItem("quoteService");
        }

        /* Pre-fill from URL param */
        const params = new URLSearchParams(location.search);
        if (params.get("service")) 
        {
            const sel = document.getElementById("service");
            if (sel) sel.value = params.get("service");
        }

        /* Quick-service tag links */
        document.querySelectorAll(".svc-tag-link").forEach(tag => 
        {
            tag.addEventListener("click", e => 
            {
                e.preventDefault();
                const sel = document.getElementById("service");
                if (sel) 
                { 
                    sel.value = tag.dataset.service; sel.focus(); 
                }

                form.scrollIntoView(
                { 
                    behavior: "smooth", 
                    block: "center" 
                });
            });
        });

        /* Client-side validation */
        function validateField(field) 
        {
            const errorEl = field.closest(".form-field")?.querySelector(".field-error");
            if (!errorEl) return true;
            if (field.validity.valueMissing) 
            {
                errorEl.textContent = "This field is required.";
                field.classList.add('is-invalid');
                return false;
            }

            if (field.type === "email" && field.validity.typeMismatch) 
            {
                errorEl.textContent = "Please enter a valid email address.";
                field.classList.add("is-invalid");
                return false;
            }

            errorEl.textContent = "";
            field.classList.remove("is-invalid");
            return true;
        }

        form.querySelectorAll("input[required], textarea[required]").forEach(field => 
        {
            field.addEventListener("blur",  () => validateField(field));
            field.addEventListener("input", () => validateField(field));
        });

        form.addEventListener("submit", async e => 
        {
            e.preventDefault();
            const fields = [...form.querySelectorAll("input[required], textarea[required]")];
            const valid  = fields.map(validateField).every(Boolean);
            if (!valid) { fields.find(f => f.classList.contains("is-invalid"))?.focus(); return; }

            const btn   = document.getElementById("submitBtn");
            const label = btn.querySelector(".btn-label");
            btn.disabled = true;
            label.textContent = "Sending . . .";

            try 
            {
                /* await fetch('/api/contact', { method: 'POST', body: new FormData(form) }); */
                await new Promise(r => setTimeout(r, 800));
                document.getElementById("formSuccess").hidden = false;
                form.reset();
            } 
            catch 
            {
                document.getElementById("formError").hidden = false;
            } 
            finally 
            {
                btn.disabled = false;
                label.textContent = "Send Message";
            }
        });
    }

// script for services page only
    const quoteLinks = document.querySelectorAll(".svc-quote-link");

    if (quoteLinks.length) 
    {
        quoteLinks.forEach(link => 
        {
            link.addEventListener("click", () => 
            {
                const url = new URL(link.href, location.href);
                sessionStorage.setItem("quoteService", url.searchParams.get("service"));
            });
        });
    }