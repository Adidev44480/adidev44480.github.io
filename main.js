// Dynamic year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Subtle parallax grid background
const grid = document.getElementById("gridBG");
if (grid) {
    document.addEventListener("mousemove", e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        grid.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Load dynamic content from localStorage
function loadDynamicContent() {
    const content = localStorage.getItem('portfolioContent');
    if (!content) return; // Use hardcoded content if none in storage

    const data = JSON.parse(content);

    // Update Hero Section
    if (data.hero) {
        const heroName = document.querySelector('.hero-title');
        const heroTagline = document.querySelector('.hero-sub');
        const heroIntro = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-img');

        if (heroName) heroName.textContent = data.hero.name;
        if (heroTagline) heroTagline.textContent = data.hero.tagline;
        if (heroIntro) heroIntro.textContent = data.hero.intro;
        if (heroImage && data.hero.imageUrl) heroImage.src = data.hero.imageUrl;
    }

    // Update About Section
    if (data.about) {
        const aboutContainer = document.querySelector('#about .container');
        if (aboutContainer) {
            // Find all <p> tags after the section title
            const paragraphs = aboutContainer.querySelectorAll('p');
            // Remove existing paragraphs
            paragraphs.forEach(p => p.remove());

            // Add new paragraphs from content
            const content = data.about.content || '';
            const newParagraphs = content.split('\n\n').filter(p => p.trim());

            newParagraphs.forEach(text => {
                const p = document.createElement('p');
                p.textContent = text.trim();
                aboutContainer.appendChild(p);
            });
        }
    }

    // Update Projects Section
    if (data.projects && data.projects.length > 0) {
        const projectsContainer = document.querySelector('#projects .container');
        if (projectsContainer) {
            // Remove all existing project divs
            projectsContainer.querySelectorAll('.project').forEach(p => p.remove());

            // Add new projects
            data.projects.forEach(proj => {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project';
                projectDiv.innerHTML = `
                    <h3 class="project-title">${proj.title}</h3>
                    <div class="project-sub">${proj.subtitle}</div>
                    <p class="project-desc">${proj.description}</p>
                    <div class="project-buttons">
                        <a class="btn" href="${proj.summaryLink}">Summary</a>
                        <a class="btn" href="${proj.codeLink}">Code</a>
                    </div>
                `;
                projectsContainer.appendChild(projectDiv);
            });
        }
    }

    // Update Experience Section
    if (data.experiences && data.experiences.length > 0) {
        const experienceTimeline = document.querySelector('.timeline');
        if (experienceTimeline) {
            // Remove all existing timeline items
            experienceTimeline.querySelectorAll('.timeline-item').forEach(item => item.remove());

            // Add new experiences
            data.experiences.forEach(exp => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'timeline-item';

                const responsibilities = exp.responsibilities.map(r => `<li>${r}</li>`).join('');

                itemDiv.innerHTML = `
                    <div class="timeline-date">${exp.date}</div>
                    <div class="timeline-role">${exp.role}</div>
                    <div class="timeline-meta">${exp.institution}</div>
                    ${responsibilities ? `<ul class="timeline-list">${responsibilities}</ul>` : ''}
                `;
                experienceTimeline.appendChild(itemDiv);
            });
        }
    }

    // Update Contact Links
    if (data.contacts) {
        const contactLinks = document.querySelectorAll('.contact-icon-link');
        if (contactLinks.length >= 4) {
            contactLinks[0].href = data.contacts.email || '#';
            contactLinks[1].href = data.contacts.linkedin || '#';
            contactLinks[2].href = data.contacts.github || '#';
            contactLinks[3].href = data.contacts.resume || '#';
        }
    }
}

// Load content when page loads
document.addEventListener('DOMContentLoaded', loadDynamicContent);
