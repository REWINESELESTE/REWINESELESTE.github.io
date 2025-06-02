document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    
    // List of all project paths
    const projectPaths = [
        '/works/rains',
        '/works/hostile-terrain-94',
        '/works/railway',
        '/works/pipe',
        '/works/street-spirit',
        '/works/loltrax001',
        '/works/collective_memoir',
        '/works/third_eye',
        '/works/urgent_sessions'
    ];

    // Hide works button on works page and all project pages
    if (path.startsWith('/works')) {
        document.body.classList.add('hide-works-button');
    } else if (path === '/info') {
        document.body.classList.add('info-page');
    }
}); 