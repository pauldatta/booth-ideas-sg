document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const repo = 'pauldatta/booth-ideas-sg';

    async function fetchIdeas() {
        try {
            // Fetch all open issues from the repository
            const issuesResponse = await fetch(`https://api.github.com/repos/${repo}/issues?state=open`);
            if (!issuesResponse.ok) throw new Error(`HTTP error! status: ${issuesResponse.status}`);
            const issues = await issuesResponse.json();

            const targetDate = '2025-08-28';
            let ideasFound = false;

            for (const issue of issues) {
                // Filter for issues created on the specific date of the event
                if (issue.created_at.startsWith(targetDate)) {
                    ideasFound = true;
                    // Fetch comments for the issue to find the bot's comment with the branch name
                    const commentsResponse = await fetch(issue.comments_url);
                    if (!commentsResponse.ok) continue; // Skip if comments can't be fetched
                    const comments = await commentsResponse.json();

                    // Find the specific comment from our bot
                    const botComment = comments.find(c => c.user.login === 'gemini-cli[bot]');
                    if (botComment) {
                        // Extract the branch name from the bot's comment body
                        const branchMatch = botComment.body.match(/git checkout (\S+)/);
                        if (branchMatch && branchMatch[1]) {
                            createCard(issue, branchMatch[1]);
                        }
                    }
                }
            }

            if (!ideasFound) {
                galleryContainer.innerHTML = '<p>No ideas from August 28th found. Check back later!</p>';
            }

        } catch (error) {
            console.error("Failed to fetch ideas:", error);
            galleryContainer.innerHTML = '<p>Could not load the idea gallery. Please try again later.</p>';
        }
    }

    function createCard(issue, branchName) {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h2');
        title.textContent = issue.title;

        const links = document.createElement('div');
        links.className = 'links';

        const branchLink = document.createElement('a');
        branchLink.href = `https://github.com/${repo}/tree/${branchName}`;
        branchLink.textContent = 'View Code';
        branchLink.target = '_blank';
        branchLink.rel = 'noopener noreferrer';

        const issueLink = document.createElement('a');
        issueLink.href = issue.html_url;
        issueLink.textContent = 'View Issue';
        issueLink.target = '_blank';
        issueLink.rel = 'noopener noreferrer';

        links.appendChild(branchLink);
        links.appendChild(issueLink);
        card.appendChild(title);
        card.appendChild(links);
        galleryContainer.appendChild(card);
    }

    fetchIdeas();
});
