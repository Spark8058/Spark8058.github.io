document.addEventListener('DOMContentLoaded', () => {
    loadTeams();
});

function loadTeams() {
    const teamsGrid = document.getElementById('teams-grid');
    const scoutings = JSON.parse(localStorage.getItem('scoutings')) || [];
    const pitScoutings = JSON.parse(localStorage.getItem('pitScoutings')) || [];

    // Use a Set to track team numbers and avoid duplicates
    const uniqueTeams = new Set();

    // Clear the existing grid
    teamsGrid.innerHTML = '';

    // Combine both scoutings and pitScoutings
    const combinedScoutings = [...scoutings, ...pitScoutings];

    const teamsDiv = document.getElementById('teams-grid');
    if(combinedScoutings.length==0) {
        teamsDiv.innerHTML = `<p>No scouting data available</p>`;
    }

    combinedScoutings.sort((a, b) => a.teamNumber - b.teamNumber);

    combinedScoutings.forEach((scouting) => {
        // If the team number is already in the Set, skip adding it again
        if (!uniqueTeams.has(scouting.teamNumber)) {
            uniqueTeams.add(scouting.teamNumber);

            const teamCard = document.createElement('div');
            teamCard.classList.add('team-card');

            // Set the inner HTML of each team card
            teamCard.innerHTML = `
                <h2>Team ${scouting.teamNumber}</h2>
                <button onclick="showTeamStatistics(${scouting.teamNumber})">More</button>
            `;

            // Append the team card to the grid
            teamsGrid.appendChild(teamCard);
        }
    });
}

function showTeamStatistics(teamNumber) {
    // Redirect to a detailed stats page with the team number in the URL
    window.location.href = `stat.html?teamNumber=${teamNumber}`;
}