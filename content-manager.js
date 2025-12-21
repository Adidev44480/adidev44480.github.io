// Content Manager - Handles localStorage and content manipulation

// Default content structure
const defaultContent = {
    hero: {
        name: "Aditya Pandey",
        tagline: "learning to make sense of uncertain worlds",
        intro: "I'm pursuing an M.Sc. in Statistics (ASI) at IIT Bombay, after completing a B.Sc. (Hons) in Statistics from Banaras Hindu University. I enjoy problems where uncertainty, behaviour, and risk meet — whether that's who might buy insurance, how a disease progresses, or what people really express in their comments.",
        imageUrl: "C:\\Users\\Aditya pandey\\Desktop\\WhatsApp Image 2025-12-05 at 08.28.03_eea1ef07.jpg"
    },
    about: {
        content: "My foundation lies in core statistics — probability, inference, linear models, regression, and time series — but I'm happiest when these tools meet real-world data.\n\nI've worked on projects ranging from predicting insurance uptake and modelling Parkinson's disease progression to analyzing time series patterns and classifying comments from online credit card discussions. These problems blend human behaviour with data, something I find fascinating.\n\nAlongside academics, I've contributed to student life as a Student Companion (ISCP), mentoring juniors, and as an Interview Coordinator (IPT), helping organize placement processes. I also enjoy photography — winning first place in the \"Campus Kaleidoscope\" competition — as well as table tennis, chess, carrom, and swimming."
    },
    projects: [
        {
            title: "Insurance Uptake Classification",
            subtitle: "understanding customer behaviour - Classification",
            description: "Built a classification model to predict customers who would be interested in buying insurance. My work included data cleaning, feature engineering, comparing different models, evaluating metrics for imbalanced data, and interpreting model insights to support more focused outreach.",
            summaryLink: "https://github.com/Adidev44480/Insurance-Uptake-Classification/blob/main/README.md",
            codeLink: "https://github.com/Adidev44480/Insurance-Uptake-Classification/blob/main/5_1_Health_Insurance_Uptake_Prediction.ipynb"
        },
        {
            title: "Parkinson's Disease Progression Prediction",
            subtitle: "healthcare modelling - Regression",
            description: "Modelled the progression of Parkinson's disease using patient-level features. Compared regression approaches and evaluated predictions through clinically relevant error metrics. The work highlights the challenges and opportunities in modelling longitudinal health data.",
            summaryLink: "https://github.com/Adidev44480/Parkinson-s-Disease-Progression-Prediction/blob/main/README.md",
            codeLink: "https://github.com/Adidev44480/Parkinson-s-Disease-Progression-Prediction/blob/main/Parkinson's%20Disease%20Progression%20Analysis.ipynb"
        }
    ],
    experiences: [
        {
            date: "Summer 2024",
            role: "Summer Research Intern",
            institution: "MIT WPU · Under Prof. Hemant Kulkarni",
            responsibilities: [
                "Conducted research-oriented statistical analysis.",
                "Worked with real datasets and applied modelling techniques.",
                "Learned full cycle from research question to interpretation."
            ]
        },
        {
            date: "2023–2025",
            role: "Student Companion (ISCP)",
            institution: "IIT Bombay",
            responsibilities: [
                "Mentored juniors in academic and non-academic matters.",
                "Provided support in transitioning to institute life."
            ]
        }
    ],
    contacts: {
        email: "mailto:your@email.com",
        linkedin: "https://linkedin.com/in/yourprofile",
        github: "https://github.com/yourusername",
        resume: "https://drive.google.com/file/..."
    }
};

// Current edit state
let currentProjectIndex = -1;
let currentExperienceIndex = -1;

// Initialize content on page load
function initContent() {
    const stored = localStorage.getItem('portfolioContent');
    if (!stored) {
        localStorage.setItem('portfolioContent', JSON.stringify(defaultContent));
    }
}

// Load content into editor
function loadContent() {
    initContent();
    const content = JSON.parse(localStorage.getItem('portfolioContent'));

    // Hero
    document.getElementById('heroName').value = content.hero.name;
    document.getElementById('heroTagline').value = content.hero.tagline;
    document.getElementById('heroIntro').value = content.hero.intro;
    document.getElementById('heroImage').value = content.hero.imageUrl;

    // About (single content field)
    document.getElementById('aboutContent').value = content.about.content || content.about.paragraphs?.join('\n\n') || '';

    // Contacts
    document.getElementById('contactEmail').value = content.contacts.email;
    document.getElementById('contactLinkedIn').value = content.contacts.linkedin;
    document.getElementById('contactGitHub').value = content.contacts.github;
    document.getElementById('contactResume').value = content.contacts.resume;

    // Projects
    renderProjects(content.projects);

    // Experiences
    renderExperiences(content.experiences);
}

// Save all content
function saveAll() {
    const content = {
        hero: {
            name: document.getElementById('heroName').value,
            tagline: document.getElementById('heroTagline').value,
            intro: document.getElementById('heroIntro').value,
            imageUrl: document.getElementById('heroImage').value
        },
        about: {
            content: document.getElementById('aboutContent').value
        },
        projects: collectProjects(),
        experiences: collectExperiences(),
        contacts: {
            email: document.getElementById('contactEmail').value,
            linkedin: document.getElementById('contactLinkedIn').value,
            github: document.getElementById('contactGitHub').value,
            resume: document.getElementById('contactResume').value
        }
    };

    localStorage.setItem('portfolioContent', JSON.stringify(content));
    showSuccess();
}

// Show success message
function showSuccess() {
    const msg = document.getElementById('successMessage');
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 3000);
}

// Projects Management
function renderProjects(projects) {
    const list = document.getElementById('projectsList');
    list.innerHTML = projects.map((proj, idx) => `
        <div class="item" data-index="${idx}">
            <div class="item-header">
                <div class="item-title">${proj.title}</div>
                <div class="item-actions">
                    <button class="btn btn-secondary btn-small" onclick="editProject(${idx})">
                        <i class="fa-solid fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteProject(${idx})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="item-content">${proj.subtitle}</div>
        </div>
    `).join('');
}

function addProject() {
    currentProjectIndex = -1;
    document.getElementById('projectModalTitle').textContent = 'Add New Project';
    document.getElementById('editProjectTitle').value = '';
    document.getElementById('editProjectSubtitle').value = '';
    document.getElementById('editProjectDescription').value = '';
    document.getElementById('editProjectSummary').value = '#';
    document.getElementById('editProjectCode').value = '#';
    document.getElementById('projectModal').style.display = 'block';
}

function editProject(index) {
    const content = JSON.parse(localStorage.getItem('portfolioContent'));
    const proj = content.projects[index];

    currentProjectIndex = index;
    document.getElementById('projectModalTitle').textContent = 'Edit Project';
    document.getElementById('editProjectTitle').value = proj.title;
    document.getElementById('editProjectSubtitle').value = proj.subtitle;
    document.getElementById('editProjectDescription').value = proj.description;
    document.getElementById('editProjectSummary').value = proj.summaryLink;
    document.getElementById('editProjectCode').value = proj.codeLink;
    document.getElementById('projectModal').style.display = 'block';
}

function saveProjectEdit() {
    const content = JSON.parse(localStorage.getItem('portfolioContent'));

    const projectData = {
        title: document.getElementById('editProjectTitle').value,
        subtitle: document.getElementById('editProjectSubtitle').value,
        description: document.getElementById('editProjectDescription').value,
        summaryLink: document.getElementById('editProjectSummary').value,
        codeLink: document.getElementById('editProjectCode').value
    };

    if (!projectData.title.trim()) {
        alert('Project title is required!');
        return;
    }

    if (currentProjectIndex >= 0) {
        content.projects[currentProjectIndex] = projectData;
    } else {
        content.projects.push(projectData);
    }

    localStorage.setItem('portfolioContent', JSON.stringify(content));
    closeProjectModal();
    loadContent();
    showSuccess();
}

function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
    currentProjectIndex = -1;
}

function deleteProject(index) {
    if (!confirm("Delete this project?")) return;

    const content = JSON.parse(localStorage.getItem('portfolioContent'));
    content.projects.splice(index, 1);
    localStorage.setItem('portfolioContent', JSON.stringify(content));
    loadContent();
}

function collectProjects() {
    const content = JSON.parse(localStorage.getItem('portfolioContent'));
    return content.projects;
}

// Experience Management
function renderExperiences(experiences) {
    const list = document.getElementById('experienceList');
    list.innerHTML = experiences.map((exp, idx) => `
        <div class="item" data-index="${idx}">
            <div class="item-header">
                <div class="item-title">${exp.role}</div>
                <div class="item-actions">
                    <button class="btn btn-secondary btn-small" onclick="editExperience(${idx})">
                        <i class="fa-solid fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteExperience(${idx})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="item-content">${exp.institution} • ${exp.date}</div>
        </div>
    `).join('');
}

function addExperience() {
    currentExperienceIndex = -1;
    document.getElementById('experienceModalTitle').textContent = 'Add New Experience';
    document.getElementById('editExpDate').value = '';
    document.getElementById('editExpRole').value = '';
    document.getElementById('editExpInstitution').value = '';
    renderResponsibilities([]);
    document.getElementById('experienceModal').style.display = 'block';
}

function editExperience(index) {
    const content = JSON.parse(localStorage.getItem('portfolioContent'));
    const exp = content.experiences[index];

    currentExperienceIndex = index;
    document.getElementById('experienceModalTitle').textContent = 'Edit Experience';
    document.getElementById('editExpDate').value = exp.date;
    document.getElementById('editExpRole').value = exp.role;
    document.getElementById('editExpInstitution').value = exp.institution;
    renderResponsibilities(exp.responsibilities || []);
    document.getElementById('experienceModal').style.display = 'block';
}

function renderResponsibilities(responsibilities) {
    const list = document.getElementById('responsibilitiesList');
    list.innerHTML = responsibilities.map((resp, idx) => `
        <div class="responsibility-item" style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
            <input type="text" value="${resp}" data-resp-index="${idx}" style="flex: 1;" placeholder="Responsibility/achievement...">
            <button class="btn btn-danger btn-small" onclick="removeResponsibility(${idx})" style="padding: 0.5rem 0.75rem;">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');

    if (responsibilities.length === 0) {
        addResponsibility();
    }
}

function addResponsibility() {
    const list = document.getElementById('responsibilitiesList');
    const idx = list.children.length;
    const item = document.createElement('div');
    item.className = 'responsibility-item';
    item.style.cssText = 'display: flex; gap: 0.5rem; margin-bottom: 0.5rem;';
    item.innerHTML = `
        <input type="text" value="" data-resp-index="${idx}" style="flex: 1;" placeholder="Responsibility/achievement...">
        <button class="btn btn-danger btn-small" onclick="removeResponsibility(${idx})" style="padding: 0.5rem 0.75rem;">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;
    list.appendChild(item);
}

function removeResponsibility(index) {
    const list = document.getElementById('responsibilitiesList');
    if (list.children.length <= 1) {
        alert('At least one responsibility is required!');
        return;
    }
    list.children[index].remove();
    // Re-index
    Array.from(list.children).forEach((child, idx) => {
        const input = child.querySelector('input');
        input.setAttribute('data-resp-index', idx);
        const btn = child.querySelector('button');
        btn.setAttribute('onclick', `removeResponsibility(${idx})`);
    });
}

function saveExperienceEdit() {
    const content = JSON.parse(localStorage.getItem('portfolioContent'));

    const responsibilities = Array.from(document.querySelectorAll('#responsibilitiesList input'))
        .map(input => input.value.trim())
        .filter(r => r);

    const experienceData = {
        date: document.getElementById('editExpDate').value,
        role: document.getElementById('editExpRole').value,
        institution: document.getElementById('editExpInstitution').value,
        responsibilities: responsibilities
    };

    if (!experienceData.role.trim()) {
        alert('Role/Position is required!');
        return;
    }

    if (currentExperienceIndex >= 0) {
        content.experiences[currentExperienceIndex] = experienceData;
    } else {
        content.experiences.push(experienceData);
    }

    localStorage.setItem('portfolioContent', JSON.stringify(content));
    closeExperienceModal();
    loadContent();
    showSuccess();
}

function closeExperienceModal() {
    document.getElementById('experienceModal').style.display = 'none';
    currentExperienceIndex = -1;
}

function deleteExperience(index) {
    if (!confirm("Delete this experience?")) return;

    const content = JSON.parse(localStorage.getItem('portfolioContent'));
    content.experiences.splice(index, 1);
    localStorage.setItem('portfolioContent', JSON.stringify(content));
    loadContent();
}

function collectExperiences() {
    const content = JSON.parse(localStorage.getItem('portfolioContent'));
    return content.experiences;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadContent);
