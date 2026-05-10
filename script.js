document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const btnMain = document.getElementById('btn-main');
    const btnAbout = document.getElementById('btn-about');
    const heroBtnAbout = document.getElementById('hero-btn-about');
    const viewMain = document.getElementById('view-main');
    const viewAbout = document.getElementById('view-about');

    function switchToMain() {
        btnMain.classList.add('is-active');
        btnAbout.classList.remove('is-active');
        
        viewMain.style.display = 'block';
        viewAbout.style.display = 'none';
    }

    function switchToAbout() {
        btnAbout.classList.add('is-active');
        btnMain.classList.remove('is-active');
        
        viewAbout.style.display = 'block';
        viewMain.style.display = 'none';
    }

    btnMain.addEventListener('click', switchToMain);
    btnAbout.addEventListener('click', switchToAbout);
    if (heroBtnAbout) {
        heroBtnAbout.addEventListener('click', switchToAbout);
    }

    // Contact Popover Logic
    const popover = document.getElementById('contact-popover');
    if (popover) {
        popover.addEventListener('click', (e) => {
            // If clicking on a link, don't toggle (just follow the link)
            if (e.target.tagName === 'A') return;

            popover.classList.toggle('is-expanded');
        });

        // Close popover when clicking outside
        document.addEventListener('click', (e) => {
            if (!popover.contains(e.target) && popover.classList.contains('is-expanded')) {
                popover.classList.remove('is-expanded');
            }
        });
    }
});
