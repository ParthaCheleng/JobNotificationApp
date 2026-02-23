export function calculateMatchScore(job, preferences) {
    let score = 0;

    // 1. +25 if any roleKeyword appears in job.title (case-insensitive)
    if (preferences.roleKeywords && preferences.roleKeywords.trim() !== '') {
        const keywords = preferences.roleKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
        const titleLower = job.title.toLowerCase();
        const hasTitleMatch = keywords.some(keyword => titleLower.includes(keyword));
        if (hasTitleMatch) {
            score += 25;
        }

        // 2. +15 if any roleKeyword appears in job.description
        const descLower = job.description.toLowerCase();
        const hasDescMatch = keywords.some(keyword => descLower.includes(keyword));
        if (hasDescMatch) {
            score += 15;
        }
    }

    // 3. +15 if job.location matches preferredLocations
    if (preferences.preferredLocations && preferences.preferredLocations.length > 0) {
        if (preferences.preferredLocations.includes(job.location)) {
            score += 15;
        } else if (job.mode === 'Remote' && preferences.preferredMode && preferences.preferredMode.includes('Remote')) {
            // Remote jobs theoretically fit anyone choosing Remote, but we stick to exact rules. 
            // Rule says: +15 if job.location matches preferredLocations.
            // So no silent bonuses here to stick perfectly to spec.
        }
    }

    // 4. +10 if job.mode matches preferredMode
    if (preferences.preferredMode && preferences.preferredMode.length > 0) {
        if (preferences.preferredMode.includes(job.mode)) {
            score += 10;
        }
    }

    // 5. +10 if job.experience matches experienceLevel
    if (preferences.experienceLevel && preferences.experienceLevel !== '') {
        if (job.experience === preferences.experienceLevel) {
            score += 10;
        }
    }

    // 6. +15 if overlap between job.skills and user.skills (any match)
    if (preferences.skills && preferences.skills.trim() !== '') {
        const userSkills = preferences.skills.split(',').map(s => s.trim().toLowerCase()).filter(s => s);
        const jobSkills = job.skills.map(s => s.toLowerCase());

        const hasSkillOverlap = userSkills.some(userSkill => jobSkills.includes(userSkill));
        if (hasSkillOverlap) {
            score += 15;
        }
    }

    // 7. +5 if postedDaysAgo <= 2
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 8. +5 if source is LinkedIn
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    // Cap score at 100
    return Math.min(score, 100);
}
