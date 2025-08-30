document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const statusLog = document.getElementById('status-log');
    const repo = 'pauldatta/booth-ideas-sg';

    function log(message) {
        console.log(message);
        statusLog.textContent += message + '\n';
    }

    async function fetchIdeas() {
        try {
            log('Starting to fetch ideas...');
            const issuesResponse = await fetch(`https://api.github.com/repos/${repo}/issues?state=open`);
            log(`GitHub API response status: ${issuesResponse.status}`);
            if (!issuesResponse.ok) throw new Error(`HTTP error! status: ${issuesResponse.status}`);
            
            const issues = await issuesResponse.json();
            log(`Found a total of ${issues.length} open issues.`);

            const targetDate = '2025-08-28';
            log(`Filtering for issues created on: ${targetDate}`);
            let ideasFoundOnDate = 0;

            for (const issue of issues) {
                // Filter for issues created on the specific date, regardless of author
                if (issue.created_at.startsWith(targetDate)) {
                    ideasFoundOnDate++;
                    log(`Found issue #${issue.number}: "${issue.title}". Fetching comments...`);
                    
                    const commentsResponse = await fetch(issue.comments_url);
                    if (!commentsResponse.ok) {
                        log(`  -> Could not fetch comments for issue #${issue.number}. Creating card without code link.`);
                        createCard(issue, null); // Create card even if comments fail
                        continue;
                    }
                    const comments = await commentsResponse.json();
                    log(`  -> Found ${comments.length} comments.`);

                    const botComment = comments.find(c => c.user.login === 'github-actions');
                    let branchName = null;

                    if (botComment) {
                        log(`  -> Found bot comment.`);
                        const branchMatch = botComment.body.match(/git checkout (\S+)/);
                        if (branchMatch && branchMatch[1]) {
                            branchName = branchMatch[1];
                            log(`  -> Extracted branch name: ${branchName}.`);
                        } else {
                            log(`  -> Bot comment did not contain a branch name.`);
                        }
                    } else {
                        log(`  -> No comment from 'gemini-cli[bot]' found.`);
                    }
                    
                    log(`  -> Creating card for issue #${issue.number}.`);
                    createCard(issue, branchName);
                }
            }

            if (ideasFoundOnDate === 0) {
                log(`No issues found for the target date: ${targetDate}.`);
                galleryContainer.innerHTML = '<p>No ideas from August 28th found. Check back later!</p>';
            }

        } catch (error) {
            log(`ERROR: ${error.message}`);
            galleryContainer.innerHTML = '<p>Could not load the idea gallery. Please check the status log for details.</p>';
        }
    }

    function createCard(issue, branchName) {
        const card = document.createElement('div');
        card.className = 'card';
        const title = document.createElement('h2');
        title.textContent = issue.title;
        const links = document.createElement('div');
        links.className = 'links';

        // Only add the "View Code" link if a branch name was found
        if (branchName) {
            const branchLink = document.createElement('a');
            branchLink.href = `https://github.com/${repo}/tree/${branchName}`;
            branchLink.textContent = 'View Code';
            branchLink.target = '_blank';
            branchLink.rel = 'noopener noreferrer';
            links.appendChild(branchLink);
        }
        
        const issueLink = document.createElement('a');
        issueLink.href = issue.html_url;
        issueLink.textContent = 'View Issue';
        issueLink.target = '_blank';
        issueLink.rel = 'noopener noreferrer';
        links.appendChild(issueLink);

        card.appendChild(title);
        card.appendChild(links);
        galleryContainer.appendChild(card);
    }

    fetchIdeas();
});
