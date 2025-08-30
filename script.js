document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const searchInput = document.getElementById('search-input');

    const ideasData = [{"createdAt":"2025-08-28T08:23:54Z","number":166,"title":"Interactive Planetary Alignment System","url":"https://github.com/pauldatta/booth-ideas-sg/issues/166"},{"createdAt":"2025-08-28T08:10:49Z","number":164,"title":"Event Crowd Flow Tracker","url":"https://github.com/pauldatta/booth-ideas-sg/issues/164"},{"createdAt":"2025-08-28T07:56:45Z","number":162,"title":"Warehouse Material Picking Route Optimizer","url":"https://github.com/pauldatta/booth-ideas-sg/issues/162"},{"createdAt":"2025-08-28T07:01:44Z","number":160,"title":"Matchstick Counter App","url":"https://github.com/pauldatta/booth-ideas-sg/issues/160"},{"createdAt":"2025-08-28T06:34:00Z","number":158,"title":"Primary Math Learning App","url":"https://github.com/pauldatta/booth-ideas-sg/issues/158"},{"createdAt":"2025-08-28T06:02:36Z","number":156,"title":"E-commerce Delivery Driver App","url":"https://github.com/pauldatta/booth-ideas-sg/issues/156"},{"createdAt":"2025-08-28T05:47:55Z","number":154,"title":"Meal Image Nutrition Analyzer","url":"https://github.com/pauldatta/booth-ideas-sg/issues/154"},{"createdAt":"2025-08-28T04:43:31Z","number":152,"title":"Hotel Gym Guest Check-in System","url":"https://github.com/pauldatta/booth-ideas-sg/issues/152"},{"createdAt":"2025-08-28T03:51:06Z","number":150,"title":"Language Translation Application","url":"https://github.com/pauldatta/booth-ideas-sg/issues/150"},{"createdAt":"2025-08-28T02:48:23Z","number":148,"title":"Weekly Spending Budget Planner","url":"https://github.com/pauldatta/booth-ideas-sg/issues/148"},{"createdAt":"2025-08-28T02:47:21Z","number":146,"title":"Digital Counter Application","url":"https://github.com/pauldatta/booth-ideas-sg/issues/146"},{"createdAt":"2025-08-28T02:23:21Z","number":144,"title":"Scalable Image Chunking Web Platform","url":"https://github.com/pauldatta/booth-ideas-sg/issues/144"},{"createdAt":"2025-08-28T02:07:01Z","number":142,"title":"Investment Portfolio Management System with Market Trend Dashboard","url":"https://github.com/pauldatta/booth-ideas-sg/issues/142"},{"createdAt":"2025-08-28T01:59:10Z","number":140,"title":"Car Listing Platform","url":"https://github.com/pauldatta/booth-ideas-sg/issues/140"},{"createdAt":"2025-08-28T01:50:07Z","number":138,"title":"Automated Software Delivery Controls Assurance","url":"https://github.com/pauldatta/booth-ideas-sg/issues/138"},{"createdAt":"2025-08-28T01:47:31Z","number":136,"title":"Street Interview Question Randomizer","url":"https://github.com/pauldatta/booth-ideas-sg/issues/136"},{"createdAt":"2025-08-28T01:43:31Z","number":134,"title":"Personalized Financial Playlist Creator","url":"https://github.com/pauldatta/booth-ideas-sg/issues/134"},{"createdAt":"2025-08-28T01:33:20Z","number":132,"title":"Singapore Single Origin Coffee Roaster Recommendations","url":"https://github.com/pauldatta/booth-ideas-sg/issues/132"},{"createdAt":"2025-08-28T01:15:49Z","number":130,"title":"Retail Food Waste Redistribution System","url":"https://github.com/pauldatta/booth-ideas-sg/issues/130"},{"createdAt":"2025-08-28T00:44:15Z","number":128,"title":"Automated Parking Location Tracker","url":"https://github.com/pauldatta/booth-ideas-sg/issues/128"},{"createdAt":"2025-08-28T00:09:53Z","number":126,"title":"Food Logistics Management Platform","url":"https://github.com/pauldatta/booth-ideas-sg/issues/126"}];

    function renderCards(filter = '') {
        galleryContainer.innerHTML = '';
        const filterText = filter.toLowerCase();

        const filteredIdeas = ideasData.filter(idea => idea.title.toLowerCase().includes(filterText));

        if (filteredIdeas.length === 0) {
            galleryContainer.innerHTML = '<p>No matching ideas found.</p>';
            return;
        }

        filteredIdeas.forEach(idea => {
            const card = document.createElement('div');
            card.className = 'card';

            const title = document.createElement('h2');
            title.textContent = idea.title;

            const info = document.createElement('p');
            info.className = 'info';
            const date = new Date(idea.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            info.textContent = `Issue #${idea.number} • Created on ${date}`;

            const links = document.createElement('div');
            links.className = 'links';

            const issueLink = document.createElement('a');
            issueLink.href = idea.url;
            issueLink.textContent = 'View Details';
            issueLink.target = '_blank';
            issueLink.rel = 'noopener noreferrer';

            links.appendChild(issueLink);
            card.appendChild(title);
            card.appendChild(info);
            card.appendChild(links);
            galleryContainer.appendChild(card);
        });
    }

    searchInput.addEventListener('input', (e) => {
        renderCards(e.target.value);
    });

    // Initial render
    renderCards();
});
