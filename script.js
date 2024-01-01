const resumeForm = document.getElementById('resume-form');
const resumeOutput = document.getElementById('resume-output');
const downloadBtn = document.getElementById('download-pdf');
const projectList = document.getElementById('project-list');
const addProjectBtn = document.getElementById('add-project');
const contactLinkedInInput = document.getElementById('contact-linkedin');
const contactGitHubInput = document.getElementById('contact-github');

function downloadResumeAsImage() {
    const element = document.getElementById('resume-output');

    html2canvas(element).then((canvas) => {

        const dataURL = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.download = 'resume.png';
        link.href = dataURL;
        link.click();
    });
}

downloadBtn.addEventListener('click', () => {
    downloadResumeAsImage();
});

resumeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('contact-phone').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;

    let resumeFormat = `
        <h3>${name}</h3>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <h4>Work Experience</h4>
        <p>${experience}</p>
        <h4>Education</h4>
        <p>${education}</p>
        <h4>Skills</h4>
        <p>${skills}</p>
    `;

    const projects = projectList.querySelectorAll('.project-item');
    if (projects.length > 0) {
        resumeFormat += '<h2>Projects</h2>';
        projects.forEach((project) => {
            const projectTitle = project.querySelector('.project-title').value;
            const projectDescription = project.querySelector('.project-description').value;
            const projectLink = project.querySelector('.project-github').value;

            resumeFormat += `
                <h3>${projectTitle}</h3>
                <p>${projectDescription}</p>
                <p><a href="${projectLink}" target="_blank">GitHub Repo</a></p>
            `;
        });
    }

    const contactLinkedIn = contactLinkedInInput.value;
    const contactGitHub = contactGitHubInput.value;

    resumeFormat += `
        <h2>Social Networks</h2>
        <p>LinkedIn: <a href="${contactLinkedIn}" target="_blank">${contactLinkedIn}</a></p>
        <p>GitHub: <a href="${contactGitHub}" target="_blank">${contactGitHub}</a></p>
    `;

    resumeOutput.innerHTML = resumeFormat;
});

addProjectBtn.addEventListener('click', () => {
    const projectTitle = document.getElementById('project-title').value;
    const projectDescription = document.getElementById('project-description').value;
    const projectGitHub = document.getElementById('project-github').value;

    if (projectTitle && projectDescription && projectGitHub) {
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item');
        projectItem.innerHTML = `
            <input type="text" class="project-title" value="${projectTitle}">
            <br>
            <label for="project-description">Project Description:</label>
            <textarea class="project-description">${projectDescription}</textarea>
            <label for="project-github">Project Link:</label>
            <input type="url" class="project-github" value="${projectGitHub}" placeholder="https://project.com" pattern="https://.*">
            <button type="button" class="remove-project">Remove</button>
        `;
        projectList.appendChild(projectItem);

        document.getElementById('project-title').value = '';
        document.getElementById('project-description').value = '';
        document.getElementById('project-github').value = '';

        const removeProjectBtns = document.querySelectorAll('.remove-project');
        removeProjectBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
            });
        });
    } else {
        alert('Please fill all project details.');
    }
});


