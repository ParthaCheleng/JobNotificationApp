export const LOCATIONS = ["Bengaluru", "Pune", "Hyderabad", "Chennai", "Gurugram", "Noida", "Mumbai", "Delhi", "PAN India"];

const generateJobs = () => {
    const companies = [
        "Infosys", "TCS", "Wipro", "Accenture", "Capgemini",
        "Cognizant", "IBM", "Oracle", "SAP", "Dell",
        "Amazon", "Flipkart", "Swiggy", "Razorpay", "PhonePe",
        "Paytm", "Zoho", "Freshworks", "Juspay", "CRED",
        "Groww", "Zerodha", "Khatabook", "Udaan", "ShareChat"
    ];

    const roles = [
        "SDE Intern", "Graduate Engineer Trainee", "Junior Backend Developer",
        "Frontend Intern", "QA Intern", "Data Analyst Intern",
        "Java Developer", "Python Developer", "React Developer",
        "Full Stack Developer", "Backend Engineer", "Frontend Engineer",
        "Software Engineer I", "Cloud Support Associate", "Product Analyst"
    ];

    const modes = ["Remote", "Hybrid", "Onsite"];
    const experiences = ["Fresher", "0-1", "1-3", "3-5"];
    const sources = ["LinkedIn", "Naukri", "Indeed"];
    const salaries = ["3-5 LPA", "6-10 LPA", "10-18 LPA", "15k-40k/month Internship"];

    const skillsPool = [
        "React", "Node.js", "Python", "Java", "C++", "AWS", "SQL", "MongoDB",
        "Docker", "Kubernetes", "TypeScript", "JavaScript", "HTML/CSS",
        "Spring Boot", "Django", "Machine Learning", "Data Analysis", "Testing"
    ];

    const descriptions = [
        "We are looking for a passionate developer to join our growing team. You will be responsible for building scalable applications and working closely with product managers. Great learning environment and mentorship provided.",
        "Join our core engineering team to build the next generation of our flagship product. Experience with modern web frameworks is required. We offer a competitive salary and excellent benefits.",
        "An exciting opportunity for fresh talent to kickstart their career. You will be part of a dynamic agile team focusing on delivering high-quality software solutions. Strong problem-solving skills are a must.",
        "Looking for analytical minds to help us make data-driven decisions. You will work with large datasets and create impactful visualizations. Proficiency in SQL and scripting languages is expected.",
        "We need a meticulous QA professional to ensure the reliability of our systems. You will design and execute automated test scripts. Collaboration with the development team is essential."
    ];

    const jobs = [];

    for (let i = 1; i <= 60; i++) {
        // Generate deterministic but varied data using modulo and primes
        const company = companies[i % companies.length];

        // Add specific modifiers to roles based on experience
        let roleName = roles[(i * 3) % roles.length];
        const exp = experiences[(i * 7) % experiences.length];

        if (exp === "Fresher" && !roleName.includes("Intern") && !roleName.includes("Trainee")) {
            roleName = `${roleName} (Fresher)`;
        } else if (exp === "0-1" && !roleName.includes("(0-1)")) {
            roleName = `${roleName} (0-1)`;
        } else if (exp === "1-3" && !roleName.includes("(1-3)")) {
            roleName = `${roleName} (1-3)`;
        }

        const mode = modes[(i * 5) % modes.length];
        // If remote, location is often PAN India or anywhere, but let's keep a base location for hybrid/onsite
        const location = mode === "Remote" ? "PAN India" : LOCATIONS[(i * 11) % LOCATIONS.length];

        // Pick 3 random skills deterministically
        const skill1 = skillsPool[i % skillsPool.length];
        const skill2 = skillsPool[(i + 5) % skillsPool.length];
        const skill3 = skillsPool[(i + 13) % skillsPool.length];
        const jobSkills = [...new Set([skill1, skill2, skill3])];

        const source = sources[(i * 17) % sources.length];
        const postedDaysAgo = i % 11; // 0 to 10

        let salaryRange = salaries[(i * 19) % salaries.length];
        if (roleName.includes("Intern")) {
            salaryRange = "15k-40k/month Internship";
        } else if (exp === "3-5" && salaryRange === "15k-40k/month Internship") {
            salaryRange = "10-18 LPA";
        } else if ((exp === "Fresher" || exp === "0-1") && salaryRange === "10-18 LPA") {
            salaryRange = "3-5 LPA";
        }

        const description = descriptions[i % descriptions.length];
        const applyUrl = `https://example.com/jobs/${company.toLowerCase()}/${i}`;

        jobs.push({
            id: `job-${i}-${company.substring(0, 3).toLowerCase()}`,
            title: roleName,
            company: company,
            location: location,
            mode: mode,
            experience: exp,
            skills: jobSkills,
            source: source,
            postedDaysAgo: postedDaysAgo,
            salaryRange: salaryRange,
            applyUrl: applyUrl,
            description: description
        });
    }

    return jobs;
};

export const jobs = generateJobs();
