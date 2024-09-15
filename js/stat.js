    function goBack() {
        history.back();
        // window.location.href = 'scout.html'; // when clicked go back, it returns to the first page
    }

    function getTeamStatistics(teamNumber) {
        const scoutings = JSON.parse(localStorage.getItem('scoutings')) || [];
        return scoutings.filter(scouting => scouting.teamNumber === teamNumber);
    }

    function getPitScouting(teamNumber) {
        const pitScoutings = JSON.parse(localStorage.getItem('pitScoutings')) || [];
        return pitScoutings.find(scouting => scouting.teamNumber === teamNumber);
    }

    function displayStatistics(teamNumber) {
        const teamStats = getTeamStatistics(teamNumber);
        const statsDiv = document.getElementById('team-stats');
        statsDiv.innerHTML = '';

        // Check if there are match stats available
        if (teamStats.length === 0) {
            statsDiv.innerHTML = `<p>No match data available for team ${teamNumber}</p>`;
        } else {
            teamStats.sort((a, b) => a.matchNumber - b.matchNumber); // sort by match numbers from low to high

            statsDiv.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Scouter Name</th>
                            <th>Match Number</th>
                            <th>Amp Points (Auto)</th>
                            <th>Speaker Points (Auto)</th>
                            <th>Notes Missed</th>
                            <th>Foul Points (Auto)</th>
                            <th>Coopertition</th>
                            <th>Amp Points (Teleop)</th>
                            <th>Speaker Points (Teleop)</th>
                            <th>Foul Points (Teleop)</th>
                            <th>End Position</th>
                            <th>Note In Trap</th>
                            <th>Offense</th>
                            <th>Defense</th>
                            <th>Driver Skill</th>
                            <th>Card</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${teamStats.map(stats => `
                            <tr>
                                <td>${stats.scouterName}</td>
                                <td>${stats.matchNumber}</td>
                                <td>${stats.ampPointsAuto}</td>
                                <td>${stats.speakerPointsAuto}</td>
                                <td>${stats.notesMissed}</td>
                                <td>${stats.foulPointsAuto}</td>
                                <td>${stats.coopertition}</td>
                                <td>${stats.ampPointsTeleop}</td>
                                <td>${stats.speakerPointsTeleop}</td>
                                <td>${stats.foulPointsTeleop}</td>
                                <td>${stats.endPosition}</td>
                                <td>${stats.noteInTrap}</td>
                                <td>${stats.offense}</td>
                                <td>${stats.defense}</td>
                                <td>${stats.driverSkill}</td>
                                <td>${stats.card}</td>
                                <td>${stats.comments}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

            // Calculate summary statistics and display charts if match data is available
            const summary = calculateSummary(teamStats);
            displaySummaryChart(summary);

            const avgAuto = summary.autonomousPoints.reduce((sum, val) => sum + val, 0) / summary.autonomousPoints.length;
            const avgTeleop = summary.teleopPoints.reduce((sum, val) => sum + val, 0) / summary.teleopPoints.length;
            const avgAcc = summary.accuracy.reduce((sum, val) => sum + val, 0) / summary.accuracy.length;
            const avgDefense = summary.defense.reduce((sum, val) => sum + val, 0) / summary.defense.length;

            document.getElementById('average-auto').textContent = avgAuto.toFixed(2);
            document.getElementById('average-teleop').textContent = avgTeleop.toFixed(2);
            document.getElementById('average-acc').textContent = `${avgAcc.toFixed(2)}%`;
            document.getElementById('average-defense').textContent = avgDefense.toFixed(2);
        }

        // Load pit scouting data
        loadPitScoutingData(teamNumber);
    }

    function findAverage(arr) { 
        let sum = 0; 
        for (let i = 0; i < arr.length; i++) { 
        sum += arr[i]; 
        } 
        return sum / arr.length; 
    } 

    function calculateSummary(teamStats) {
        const autonomousPoints = []; // arr for each
        const teleopPoints = [];
        const matchNumbers = [];
        const accuracy = [];
        const defense = [];

        teamStats.forEach(match => {
            matchNumbers.push(match.matchNumber);
            autonomousPoints.push(parseInt(match.speakerPointsAuto));
            teleopPoints.push(parseInt(match.speakerPointsTeleop));
            if( (parseInt(match.speakerPointsAuto)+parseInt(match.notesMissed))) {
                accuracy.push(parseInt(match.speakerPointsAuto) /  (parseInt(match.speakerPointsAuto)+parseInt(match.notesMissed)) * 100);
            }
            else {
                accuracy.push(0);
            }
            
            defense.push(parseInt(match.defense));
        });

        // Sort match numbers and corresponding points
        const sortedData = matchNumbers
            .map((matchNumber, index) => ({
                matchNumber,
                autoPoints: autonomousPoints[index],
                teleopPoints: teleopPoints[index],
                accuracy: accuracy[index],
                defense: defense[index]
            }))
            .sort((a, b) => a.matchNumber - b.matchNumber); // sort by match number to show from beginning to end
            
        return {
            matchNumbers: sortedData.map(data => data.matchNumber),
            autonomousPoints: sortedData.map(data => data.autoPoints),
            teleopPoints: sortedData.map(data => data.teleopPoints),
            accuracy: sortedData.map(data => data.accuracy),
            defense: sortedData.map(data => data.defense)
        };
    }

    function displaySummaryChart(summary) {
        const ctxAutonomous = document.getElementById('autonomous-chart').getContext('2d');
        new Chart(ctxAutonomous, {
            type: 'line', // graph type
            data: {
                labels: summary.matchNumbers,
                datasets: [{
                    label: 'Autonomous Speaker Points',
                    data: summary.autonomousPoints,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    lineTension: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Match Number'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Points'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Autonomous Speaker Points Progression',
                    }
                }
            }
        });

        const ctxTeleop = document.getElementById('teleop-chart').getContext('2d');
        new Chart(ctxTeleop, {
            type: 'line',
            data: {
                labels: summary.matchNumbers,
                datasets: [{
                    label: 'Teleop Speaker Points',
                    data: summary.teleopPoints,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: false,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    lineTension: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Match Number'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Points'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Teleop Speaker Points Progression',
                    }
                }
            }
        });

        const ctxAccuracy = document.getElementById('accuracy-chart').getContext('2d');
        new Chart(ctxAccuracy, {
            type: 'line',
            data: {
                labels: summary.matchNumbers,
                datasets: [{
                    label: 'Auto Accuracy',
                    data: summary.accuracy,
                    borderColor: 'rgba(200, 54, 108, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: false,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    lineTension: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Match Number'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Accuracy'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Accuracy Progression',
                    }
                }
            }
        });
    }

    function loadPitScoutingData(teamNumber) {
        const pitScouting = getPitScouting(teamNumber);
        if (pitScouting) {
            document.getElementById('pit-photo').src = pitScouting.photo || 'img/placeholder.png';
            document.getElementById('pit-amp').textContent = pitScouting.amp ? 'Yes' : 'No';
            document.getElementById('pit-speaker').textContent = pitScouting.speaker ? 'Yes' : 'No';
            document.getElementById('pit-trap').textContent = pitScouting.trap ? 'Yes' : 'No';
            document.getElementById('pit-drive-train').textContent = pitScouting.driveTrain;
            document.getElementById('pit-autonomous').textContent = pitScouting.autonomous;
        } else {
            document.getElementById('pit-scouting-info').textContent = 'No pit scouting data available for this team.';
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const teamNumber = urlParams.get('teamNumber');
        if (teamNumber) {
            document.getElementById('team-title').innerText = `Statistics for Team ${teamNumber}`;
            displayStatistics(teamNumber);
            // document.getElementById('team-title').innerText = `Statistics for Team ${teamNumber}`;
        } else {
            document.getElementById('team-stats').innerText = 'No team number provided.';
        }
    });



    function exportToPDF() {
        // Get the document elements to be captured in the PDF
        const teamTitle = document.getElementById('team-title');
        const teamStats = document.getElementById('team-stats');
        const averageStats = document.getElementById('average-stats');
        const chartsContainer = document.querySelector('.charts-container');
        const pitContainer = document.querySelector('.pit-container');
        const footer = document.getElementById('footer');
        const sign = document.querySelector('.sign');

        const urlParams = new URLSearchParams(window.location.search);
        const teamNumber = urlParams.get('teamNumber') || 'XXXX'; // Default to 'XXXX' if not found


        // Create a new jsPDF instance
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', [297, 210]);

        function addBackground(doc) {
            doc.setFillColor(255, 234, 153); // Yellow background
            doc.rect(0, 0, 210, 297, 'F'); // A4 size in mm

            // Add logo image as a background with adjusted size
            const logoWidth = 50; // Width in mm
            const logoHeight = 65; // Height in mm
            const logoX = 105 - (logoWidth / 2); // Center horizontally
            const logoY = 148 - (logoHeight / 2); // Center vertically

            doc.addImage('img/transparentLogo.png', 'PNG', logoX, logoY, logoWidth, logoHeight);
        }

        function addContentToPDF() {
            let position = 10;

            const sections = [
                teamTitle,
                teamStats,
                averageStats,
                chartsContainer,
                pitContainer,
                footer,
                sign
            ];

            function processSection(section, position) {
                return html2canvas(section, { backgroundColor: null }).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = 190;
                    const imgHeight = canvas.height * imgWidth / canvas.width;
                    // let heightLeft = imgHeight;

                    doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

                    // if (heightLeft < 0) {
                    //     doc.addPage();
                    //     position = 0;
                    // } else {
                    //     position += imgHeight + 5;
                    // }
                    position += imgHeight + 5;

                    return position;
                });
            }

            let promise = Promise.resolve(position);

            sections.forEach(section => {
                promise = promise.then(position => processSection(section, position));
            });

            return promise;
        }

        // Add background and then capture and add content
        addBackground(doc);
        addContentToPDF().then(() => {
            const filename = `${teamNumber}_team_stats.pdf`; // Construct the filename with the team number
            doc.save(filename);
            // doc.save('team_stats.pdf');
        }).catch(err => {
            console.error('Error generating PDF:', err);
        });
    }



////  AI PART

// AIzaSyAkoihbhzpKET-L50IvgyxZT_kcNMtCU2E   API KEY

// Replace 'YOUR_API_KEY' with your actual API key
const API_KEY = 'AIzaSyAkoihbhzpKET-L50IvgyxZT_kcNMtCU2E';

async function getAIComment(teamData) {
    try {
        const response = await fetch('https://api.example.com/get-comment', { // Replace with your API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AIzaSyAkoihbhzpKET-L50IvgyxZT_kcNMtCU2E}`
            },
            body: JSON.stringify({
                team: teamData
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.comment; // Assuming the AI API returns a 'comment' field
    } catch (error) {
        console.error('Error fetching AI comment:', error);
        return 'Sorry, there was an error getting the comment.';
    }
}

async function displayAIComment(teamData) {
    const comment = await getAIComment(teamData);
    document.getElementById('ai-comment').innerText = comment; // Assuming you have a div with id 'ai-comment'
}

function getAI() {
    const selectedTeam = this.value;
    const teamData = getTeamData(selectedTeam); // Replace with your method to get team data
    displayAIComment(teamData);
};
