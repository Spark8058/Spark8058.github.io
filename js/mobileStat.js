function goBack() {
    window.location.href = 'mobile.html'; // when clicked go back, it returns to first page
}

function getTeamStatistics(teamNumber) {
    const scoutings = JSON.parse(localStorage.getItem('scoutings')) || [];
    return scoutings.filter(scouting => scouting.teamNumber === teamNumber);
}

function displayStatistics(teamNumber) {
    const teamStats = getTeamStatistics(teamNumber);
    const statsDiv = document.getElementById('team-stats');
    statsDiv.innerHTML = '';
    teamStats.sort((a, b) => a.matchNumber - b.matchNumber); // sort by the match numbers from low to high

    if (teamStats.length === 0) {
        statsDiv.innerHTML = `<p>No data available for team ${teamNumber}</p>`;
        return;
    }

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
                    <th>Speaker Points Amplified</th>
                    <th>Foul Points (Teleop)</th>
                    <th>End Position</th>
                    
                    <th>Notes</th>
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
                        <td>${stats.speakerPointsTeleopAmp}</td>
                        <td>${stats.foulPointsTeleop}</td>
                        <td>${stats.endPosition}</td>
                        
                        <td>${stats.notes}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    
    // Calculate summary statistics
    const summary = calculateSummary(teamStats);

    displaySummaryChart(summary);

    const avgAuto = summary.autonomousPoints.reduce((sum, val) => sum + val, 0) / summary.autonomousPoints.length;
    const avgTeleop = summary.teleopPoints.reduce((sum, val) => sum + val, 0) / summary.teleopPoints.length;
    const avgAcc = summary.accuracy.reduce((sum, val) => sum + val, 0) / summary.accuracy.length;

    document.getElementById('average-auto').textContent = avgAuto.toFixed(2);
    document.getElementById('average-teleop').textContent = avgTeleop.toFixed(2);
    document.getElementById('average-acc').textContent = `${avgAcc.toFixed(2)}%`;
}

function calculateAverage (teamStats) {
    const avgAuto = []; // arr for each
    const avgTeleop = [];
    const avgAcc = [];

    teamStats.forEach(match => {
        avgAuto.push(parseInt(match.speakerPointsAuto));
        avgTeleop.push(parseInt(match.speakerPointsTeleop)+parseInt(match.speakerPointsTeleopAmp));
        avgAcc.push(parseInt(match.speakerPointsAuto) / (parseInt(match.speakerPointsAuto)+parseInt(match.notesMissed)) * 100);
    });

    let autoAvg = findAverage(avgAuto);
    let teleopAvg = findAverage(avgTeleop);
    let accAvg = findAverage(avgAcc);

    document.getElementById('average-auto').textContent = autoAvg.toFixed(2);
    document.getElementById('average-teleop').textContent = teleopAvg.toFixed(2);
    document.getElementById('average-acc').textContent = accAvg.toFixed(2);

    
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

    teamStats.forEach(match => {
        matchNumbers.push(match.matchNumber);
        autonomousPoints.push(parseInt(match.speakerPointsAuto));
        teleopPoints.push(parseInt(match.speakerPointsTeleop)+parseInt(match.speakerPointsTeleopAmp));
        accuracy.push(parseInt(match.speakerPointsAuto) / (parseInt(match.speakerPointsAuto)+parseInt(match.notesMissed)) * 100);
    });

    // Sort match numbers and corresponding points
    const sortedData = matchNumbers
        .map((matchNumber, index) => ({
            matchNumber,
            autoPoints: autonomousPoints[index],
            teleopPoints: teleopPoints[index],
            accuracy: accuracy[index]
        }))
        .sort((a, b) => a.matchNumber - b.matchNumber); // sort by match number to show from beginning to end

    return {
        matchNumbers: sortedData.map(data => data.matchNumber),
        autonomousPoints: sortedData.map(data => data.autoPoints),
        teleopPoints: sortedData.map(data => data.teleopPoints),
        accuracy: sortedData.map(data => data.accuracy)
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



document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamNumber = urlParams.get('teamNumber');
    if (teamNumber) {
        displayStatistics(teamNumber);
        document.getElementById('team-title').innerText = `Statistics for Team ${teamNumber}`;
    } else {
        document.getElementById('team-stats').innerText = 'No team number provided.';
    }
});
