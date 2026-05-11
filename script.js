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
        title: 'SaaS Dashboard',
        subline: 'Проектирование сложной аналитической системы',
        image: 'assets/case-1.png',
        mediaType: 'image',
        height: '400px'
    },
    {
        title: 'Fintech App',
        subline: 'Мобильное приложение для инвестиций',
        image: 'assets/case-2.png',
        mediaType: 'image',
        height: '480px'
    },
    {
        title: 'Nexus Landing',
        subline: 'Корпоративный сайт для технологической компании',
        image: 'assets/case-3.png',
        mediaType: 'image',
        height: '420px'
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
            <h2 class="ui-h2">Рабочие инструменты</h2>
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
function renderProjectCard(project) {
    return `
        <div class="case-card">
            <div class="case-card__media" style="height: ${project.height};">
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
        columns[index % 2].push(project);
    });

    grid.innerHTML = columns.map(column => `
        <div class="projects-column">
            ${column.map(renderProjectCard).join('')}
        </div>
    `).join('');
}

function bindHeroLinks() {
    const telegramLink = document.getElementById('hero-telegram-link');
    if (!telegramLink) return;

    telegramLink.href = getContactUrl('Telegram');
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

    window.addEventListener('resize', renderProjects);
});
