// ============================================================
// CONFIG — edit your links here
// ============================================================
const contacts = [
    { label: 'Behance',  text: '↗ Behance', url: 'https://www.behance.net/ilyaboomin' },
    { label: 'LinkedIn', text: '↗ LinkedIn', url: 'https://www.linkedin.com/in/ilya-bakhmutov/' },
    { label: 'Telegram', text: '↗ Telegram', url: 'http://t.me/ilyabakhmutov' },
];

function getContactUrl(label) {
    return contacts.find(contact => contact.label === label)?.url || '#';
}

// ============================================================
// Projects Data
// ============================================================
const projects = [
    {
        title: 'Ссылка для кандидата',
        subline: 'Яндекс Эйчартех 2025',
        image: 'assets/case-link-candidate.mp4',
        mediaType: 'video',
        height: '400px'
    },
    {
        title: 'Расписание интервьюера',
        subline: 'Яндекс Эйчартех 2025',
        image: 'assets/case-interviewer-schedule.png',
        mediaType: 'image',
        height: 'auto'
    },
    {
        title: 'Поповер назначенной секции',
        subline: 'Расписание интервьюера · Яндекс Эйчартех',
        image: 'assets/case-assigned-section-popover.png',
        mediaType: 'image',
        height: 'auto',
        aspectRatio: '74 / 69'
    }
];

// ============================================================
// Experience Data
// ============================================================
const experience = [
    {
        company: 'Альфа-Банк',
        period: '2025–сейчас',
        role: 'Дизайнер цифровых продуктов'
    },
    {
        company: 'Яндекс',
        period: '2024–2025',
        role: 'Старший продуктовый дизайнер'
    },
    {
        company: 'Mail.ru (ВК)',
        period: '2022–2024',
        role: 'Ведущий продуктовый дизайнер'
    },
    {
        company: 'ВТБ',
        period: '2021–2022',
        role: 'Старший продуктовый дизайнер'
    }
];

// ============================================================
// Tools Data
// ============================================================
const tools = [
    { name: 'Figma', icon: 'assets/tools/figma.svg?v=3' },
    { name: 'ChatGPT', icon: 'assets/tools/chatgpt.svg?v=3' },
    { name: 'Jitter', icon: 'assets/tools/jitter.svg?v=3' },
    { name: 'Mobbin', icon: 'assets/tools/mobbin.svg?v=3' },
];

let pendingProjectsRender = false;

// ============================================================
// renderNav — injects sticky nav + contact popover
// Detects current page by filename to set is-active correctly
// ============================================================
function renderNav() {
    const mount = document.getElementById('app-nav');
    if (!mount) return;

    const page = window.location.pathname.split('/').pop() || 'index.html';
    const isAbout = page === 'about.html';

    mount.innerHTML = `
        <div class="ui-nav-container">
            <nav class="ui-segmented-control">
                <a class="ui-segmented-control__btn ${!isAbout ? 'is-active' : ''}"
                   href="index.html">Главная</a>
                <a class="ui-segmented-control__btn ${isAbout ? 'is-active' : ''}"
                   href="about.html">О себе</a>
            </nav>

            <div class="ui-contact-popover" id="contact-popover">
                <div class="ui-popover-links">
                    ${contacts.map(c => `
                    <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="ui-body-m"
                       style="color: var(--text-primary);">↗ ${c.label}</a>
                    `).join('')}
                </div>
                <div class="ui-body-m-accent" style="color: var(--text-secondary);">Контакты</div>
            </div>
        </div>
    `;
}

// ============================================================
// renderContacts — injects contact links on about.html
// ============================================================
function renderContacts() {
    const mount = document.getElementById('about-contacts');
    if (!mount) return;

    mount.innerHTML = `
        <div class="ui-contacts-section">
            <h2 class="ui-contacts-title ui-h2">Контакты</h2>
            <div class="ui-contacts-list">
                ${contacts.map((contact, index) => `
                    <a class="ui-contact-link ui-body-l" href="${contact.url}" target="_blank" rel="noopener noreferrer">${contact.text}</a>
                    ${index < contacts.length - 1 ? '<div class="ui-divider"></div>' : ''}
                `).join('')}
            </div>
        </div>
    `;
}

// ============================================================
// renderExperience — injects work experience on about.html
// ============================================================
function renderExperience() {
    const mount = document.getElementById('about-experience');
    if (!mount) return;

    mount.innerHTML = `
        <div class="ui-experience-section">
            <h2 class="ui-experience-title ui-h2">Опыт</h2>
            <div class="ui-experience-list">
                ${experience.map((item, index) => `
                    <article class="ui-experience-item">
                        <div class="ui-experience-label">
                            <h3 class="ui-body-l">${item.company}</h3>
                            <div class="ui-experience-period ui-body-l">${item.period}</div>
                        </div>
                        <p class="ui-body-s">${item.role}</p>
                    </article>
                    ${index < experience.length - 1 ? '<div class="ui-divider"></div>' : ''}
                `).join('')}
            </div>
        </div>
    `;
}

// ============================================================
// renderTools — injects working tools on about.html
// ============================================================
function renderTools() {
    const mount = document.getElementById('about-tools');
    if (!mount) return;

    mount.innerHTML = `
        <div class="ui-tools-section">
            <h2 class="ui-h2">Инструменты</h2>
            <div class="ui-tools-tray">
                ${tools.map(tool => `
                    <img class="ui-tool-icon" src="${tool.icon}" alt="${tool.name}" width="48" height="48">
                `).join('')}
            </div>
        </div>
    `;
}

// ============================================================
// renderFooter — injects shared footer
// ============================================================
function renderFooter() {
    const mount = document.getElementById('app-footer');
    if (!mount) return;

    mount.innerHTML = `
        <footer class="ui-footer">
            <p class="ui-body-m" style="color: var(--text-secondary);">© 2026. Навайбкодил</p>
        </footer>
    `;
}

// ============================================================
// renderProjects — injects case cards (index.html only)
// ============================================================
function renderProjectCard(project, index) {
    const mediaStyle = project.aspectRatio
        ? ` style="aspect-ratio: ${project.aspectRatio};"`
        : project.height === 'auto'
            ? ''
            : ` style="height: ${project.height};"`;

    return `
        <div class="case-card" role="button" tabindex="0" data-project-index="${index}" aria-label="Открыть кейс ${project.title}">
            <div class="case-card__media"${mediaStyle}>
                ${project.mediaType === 'video'
                    ? `<video src="${project.image}" aria-label="${project.title}" autoplay muted loop playsinline></video>`
                    : `<img src="${project.image}" alt="${project.title}">`}
            </div>
            <div class="case-card__content">
                <div class="case-card__title ui-body-m">${project.title}</div>
                <div class="case-card__subline ui-body-s">${project.subline}</div>
            </div>
        </div>
    `;
}

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const isDesktop = window.matchMedia('(min-width: 700px)').matches;

    if (!isDesktop) {
        grid.innerHTML = projects.map(renderProjectCard).join('');
        return;
    }

    const columns = [[], []];
    projects.forEach((project, index) => {
        columns[index % 2].push({ project, index });
    });

    grid.innerHTML = columns.map(column => `
        <div class="projects-column">
            ${column.map(({ project, index }) => renderProjectCard(project, index)).join('')}
        </div>
    `).join('');
}

function bindHeroLinks() {
    const telegramLink = document.getElementById('hero-telegram-link');
    if (!telegramLink) return;

    telegramLink.href = getContactUrl('Telegram');
}

function createProjectMedia(project) {
    if (project.mediaType === 'video') {
        const video = document.createElement('video');
        video.src = project.image;
        video.setAttribute('aria-label', project.title);
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        return video;
    }

    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.title;
    return image;
}

function createCloseIcon() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
    `;
}

function getProjectAspectValue(project) {
    if (!project.aspectRatio) return 4 / 3;

    const [width, height] = project.aspectRatio.split('/').map(Number);
    return width && height ? width / height : 4 / 3;
}

function getProjectMaxWidth(project) {
    const viewerChromeHeight = window.matchMedia('(min-width: 700px)').matches ? 112 : 104;
    const maxWidthByHeight = (window.innerHeight - viewerChromeHeight) * getProjectAspectValue(project);
    return Math.max(240, Math.min(1280, maxWidthByHeight));
}

function openCaseViewer(card) {
    if (document.querySelector('.case-viewer')) return;

    const project = projects[Number(card.dataset.projectIndex)];
    const sourceMedia = card.querySelector('.case-card__media');
    if (!project || !sourceMedia) return;

    const sourceRect = sourceMedia.getBoundingClientRect();
    const viewer = document.createElement('div');
    viewer.className = 'case-viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.setAttribute('aria-label', project.title);

    viewer.innerHTML = `
        <header class="case-viewer__header">
            <div class="case-viewer__spacer" aria-hidden="true"></div>
            <div class="case-viewer__title-group">
                <h2 class="case-viewer__title ui-body-l">${project.title}</h2>
                <p class="case-viewer__subline ui-body-s">${project.subline}</p>
            </div>
            <button class="case-viewer__close" type="button" aria-label="Закрыть">${createCloseIcon()}</button>
        </header>
        <div class="case-viewer__stage">
            <div class="case-viewer__media-shell"></div>
        </div>
    `;

    const mediaShell = viewer.querySelector('.case-viewer__media-shell');
    const closeButton = viewer.querySelector('.case-viewer__close');
    const header = viewer.querySelector('.case-viewer__header');

    if (project.aspectRatio) {
        mediaShell.style.aspectRatio = project.aspectRatio;
    } else if (project.height === 'auto') {
        mediaShell.style.aspectRatio = '4 / 3';
    }
    mediaShell.style.setProperty('--case-max-width', `${getProjectMaxWidth(project)}px`);

    mediaShell.append(createProjectMedia(project));
    document.body.append(viewer);
    document.body.classList.add('case-viewer-open');
    closeButton.focus();

    const targetRect = mediaShell.getBoundingClientRect();
    const startTransform = `translate(${sourceRect.left - targetRect.left}px, ${sourceRect.top - targetRect.top}px) scale(${sourceRect.width / targetRect.width}, ${sourceRect.height / targetRect.height})`;
    const animationOptions = {
        duration: 420,
        easing: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
        fill: 'both'
    };

    viewer.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 180,
        easing: 'ease-out',
        fill: 'both'
    });

    header.animate([
        { opacity: 0, transform: 'translateY(-8px)' },
        { opacity: 1, transform: 'translateY(0)' }
    ], {
        duration: 220,
        delay: 120,
        easing: 'ease-out',
        fill: 'both'
    });

    mediaShell.animate([
        { transform: startTransform },
        { transform: 'translate(0, 0) scale(1)' }
    ], animationOptions);

    const closeViewer = () => closeCaseViewer(viewer, card);
    closeButton.addEventListener('click', closeViewer);
    viewer.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeViewer();
    });
}

function closeCaseViewer(viewer, card) {
    if (viewer.classList.contains('is-closing')) return;

    const mediaShell = viewer.querySelector('.case-viewer__media-shell');
    const header = viewer.querySelector('.case-viewer__header');
    const sourceMedia = card.querySelector('.case-card__media');
    if (!mediaShell || !sourceMedia) {
        viewer.remove();
        document.body.classList.remove('case-viewer-open');
        if (pendingProjectsRender) {
            pendingProjectsRender = false;
            renderProjects();
        }
        return;
    }

    const sourceRect = sourceMedia.getBoundingClientRect();
    const targetRect = mediaShell.getBoundingClientRect();
    const endTransform = `translate(${sourceRect.left - targetRect.left}px, ${sourceRect.top - targetRect.top}px) scale(${sourceRect.width / targetRect.width}, ${sourceRect.height / targetRect.height})`;

    viewer.classList.add('is-closing');
    header.animate([
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-8px)' }
    ], {
        duration: 160,
        easing: 'ease-in',
        fill: 'both'
    });

    viewer.animate([
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: 220,
        delay: 120,
        easing: 'ease-in',
        fill: 'both'
    });

    const mediaAnimation = mediaShell.animate([
        { transform: 'translate(0, 0) scale(1)' },
        { transform: endTransform }
    ], {
        duration: 360,
        easing: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
        fill: 'both'
    });

    mediaAnimation.addEventListener('finish', () => {
        viewer.remove();
        document.body.classList.remove('case-viewer-open');
        if (pendingProjectsRender) {
            pendingProjectsRender = false;
            renderProjects();
        }
        card.focus();
    }, { once: true });
}

function bindCaseViewer() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.addEventListener('click', (event) => {
        const card = event.target.closest('.case-card');
        if (!card) return;
        openCaseViewer(card);
    });

    grid.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        const card = event.target.closest('.case-card');
        if (!card) return;

        event.preventDefault();
        openCaseViewer(card);
    });
}

function bindProjectsBreakpoint() {
    const breakpoint = window.matchMedia('(min-width: 700px)');
    const handleBreakpointChange = () => {
        if (document.querySelector('.case-viewer')) {
            pendingProjectsRender = true;
            return;
        }

        renderProjects();
    };

    if (breakpoint.addEventListener) {
        breakpoint.addEventListener('change', handleBreakpointChange);
    } else {
        breakpoint.addListener(handleBreakpointChange);
    }
}

// ============================================================
// Boot
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderProjects();
    renderContacts();
    renderExperience();
    renderTools();
    renderFooter();
    bindHeroLinks();
    bindCaseViewer();
    bindProjectsBreakpoint();

    // Contact Popover — runs after renderNav() so element exists
    const popover = document.getElementById('contact-popover');
    if (popover) {
        popover.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') return;
            popover.classList.toggle('is-expanded');
        });

        document.addEventListener('click', (e) => {
            if (!popover.contains(e.target) && popover.classList.contains('is-expanded')) {
                popover.classList.remove('is-expanded');
            }
        });
    }

});
