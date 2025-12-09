export const templates = [
    {
        id: "blank",
        label: "Blank Document",
        imgurl: "/blank-document.svg",
        initialContent: ``
    },
    {
        id: "software-proposal",
        label: "Software development proposal",
        imgurl: "/software-proposal.svg",
        initialContent: `
            <h1>Software Development Proposal</h1>
            
            <h2>1. Executive Summary</h2>
            <p>Provide a high-level overview of the project, including the main objective and the value proposition for the client.</p>
            
            <h2>2. Problem Statement</h2>
            <p>Define the specific problems or challenges the current system faces that this software aims to resolve.</p>
            
            <h2>3. Proposed Solution</h2>
            <p>Describe the technical approach and architecture proposed to solve the problem.</p>
            <ul>
                <li><strong>Frontend:</strong> [e.g., React, Next.js, Tailwind CSS]</li>
                <li><strong>Backend:</strong> [e.g., Node.js, Python, Go]</li>
                <li><strong>Database:</strong> [e.g., PostgreSQL, MongoDB]</li>
            </ul>

            <h2>4. Scope of Work</h2>
            <ul>
                <li>Requirement Analysis and Design</li>
                <li>Core Feature Implementation</li>
                <li>Testing and QA</li>
                <li>Deployment and CI/CD Setup</li>
            </ul>

            <h2>5. Timeline & Milestones</h2>
            <table>
                <thead>
                    <tr>
                        <th>Phase</th>
                        <th>Deliverable</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Phase 1</td>
                        <td>UI/UX Prototypes</td>
                        <td>2 Weeks</td>
                    </tr>
                    <tr>
                        <td>Phase 2</td>
                        <td>MVP Development</td>
                        <td>4 Weeks</td>
                    </tr>
                </tbody>
            </table>
        `
    },
    {
        id: "project-proposal",
        label: "Project Proposal",
        imgurl: "/project-proposal.svg",
        initialContent: `
            <h1>Project Proposal</h1>

            <h2>1. Introduction</h2>
            <p>Briefly introduce the project background and the context necessary to understand the proposal.</p>

            <h2>2. Objectives</h2>
            <p>List the primary and secondary objectives of the project.</p>
            <ul>
                <li>Objective 1</li>
                <li>Objective 2</li>
                <li>Objective 3</li>
            </ul>

            <h2>3. Methodology</h2>
            <p>Explain the methods, processes, or workflows that will be used to achieve the objectives.</p>

            <h2>4. Resources Required</h2>
            <p>Detail the personnel, equipment, software, and budget required for successful execution.</p>

            <h2>5. Expected Outcomes</h2>
            <p>Describe the deliverables and the impact the project is expected to have upon completion.</p>
        `
    },
    {
        id: "resume",
        label: "Resume",
        imgurl: "/resume.svg",
        initialContent: `
            <h1>[Your Name]</h1>
            <p>
                <strong>Email:</strong> email@example.com | 
                <strong>Phone:</strong> (123) 456-7890 | 
                <strong>Portfolio:</strong> yourwebsite.com
            </p>

            <h2>Professional Summary</h2>
            <p>A concise summary of your professional background, key skills, and career goals.</p>

            <h2>Experience</h2>
            <h3>Job Title - Company Name</h3>
            <p><em>Month Year – Present</em></p>
            <ul>
                <li>Accomplishment or responsibility 1.</li>
                <li>Accomplishment or responsibility 2.</li>
                <li>Accomplishment or responsibility 3.</li>
            </ul>

            <h3>Job Title - Company Name</h3>
            <p><em>Month Year – Month Year</em></p>
            <ul>
                <li>Accomplishment or responsibility 1.</li>
                <li>Accomplishment or responsibility 2.</li>
            </ul>

            <h2>Education</h2>
            <h3>Degree Name</h3>
            <p>University Name, Location — <em>Year of Graduation</em></p>

            <h2>Skills</h2>
            <ul>
                <li>Skill 1</li>
                <li>Skill 2</li>
                <li>Skill 3</li>
            </ul>
        `
    },
    {
        id: "letter",
        label: "Letter",
        imgurl: "/letter.svg",
        initialContent: `
            <p>[Your Name]<br>
            [Your Address]<br>
            [City, State, Zip Code]<br>
            [Email Address]<br>
            [Phone Number]</p>

            <p>[Date]</p>

            <p>[Recipient Name]<br>
            [Title]<br>
            [Company Name]<br>
            [Company Address]</p>

            <p><strong>Subject: [Subject of the Letter]</strong></p>

            <p>Dear [Recipient Name],</p>

            <p>I am writing to you regarding [state the purpose of your letter clearly in the first paragraph].</p>

            <p>[Body Paragraph: Provide details, context, and any necessary information to support your purpose. Keep it clear and professional.]</p>

            <p>[Closing Paragraph: State the next steps, call to action, or express gratitude.]</p>

            <p>Sincerely,</p>
            <br>
            <p>[Your Name]</p>
        `
    }
]