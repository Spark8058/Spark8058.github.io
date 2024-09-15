
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
    overlay.classList.toggle('open');
}

const menu = document.getElementById('menu');
const overlay = document.querySelector('overlay');

// document.addEventListener('click', function(event) {
//     const menuBtn = document.querySelector('.menu-button');
//     if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
//       menu.classList.remove('open');
//       overlay.classList.remove('open');
//     }
// });


document.addEventListener('DOMContentLoaded', () => {
    loadPreviousScoutings();
    setupMenuCloseHandler();
});

function setupMenuCloseHandler() {
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');
    const menuBtn = document.querySelector('.menu-button');

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
            menu.classList.remove('open');
            overlay.classList.remove('open');
        }
    });
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');
    menu.classList.toggle('open');
    overlay.classList.toggle('open');
}


function showScoutingForm() {
    // document.getElementById('scouting-form').style.display = 'flex';
    window.location.href = 'scout.html';
    if(screen.width <=700) {
        window.location.href = 'mobile.html';
        document.location ='mobile.html';
    }
    // document.getElementById('previous-scoutings').style.display = 'none';

    toggleMenu();
}

function showTeams() {
    window.location.href = 'teams.html';
}

function showPreviousScoutings() {

    // window.location.href = 'index.html';
    // document.getElementById('scouting-form').style.display = 'none';
    // document.getElementById('previous-scoutings').style.display = 'flex';
    
    window.location.href = 'previous.html';

    loadPreviousScoutings();
    toggleMenu();
}

function showPitScouting() {
    // document.getElementById('scouting-form').style.display = 'flex';
    window.location.href = 'pit.html';

    toggleMenu();
}

function showGame() {
    window.location.href = 'game.html';
}

// function PreviousPage() {
//     window.location.href = 'previous.html';
// }

function adjustPoints(id, delta) {
    const input = document.getElementById(id);
    const currentValue = parseInt(input.value);
    if (currentValue + delta >= 0) {
        input.value = currentValue + delta;
    }
}

function submitData() {
    const scouterName = document.getElementById('scouterName').value;
    const teamNumber = document.getElementById('teamNumber').value;
    const matchNumber = document.getElementById('matchNumber').value;
    const ampPointsAuto = document.getElementById('autoAmpPoints').value;
    const speakerPointsAuto = document.getElementById('autoSpeakerPoints').value;
    const notesMissed = document.getElementById('autoSpeakerMissed').value;
    const foulPointsAuto = document.getElementById('autoFoulPoints').value;
    const coopertition = document.getElementById('coopertition').checked ? "Yes" : "No";
    const ampPointsTeleop = document.getElementById('teleopAmpPoints').value;
    const speakerPointsTeleop = document.getElementById('teleopSpeakerPoints').value;
    const foulPointsTeleop = document.getElementById('teleopFoulPoints').value;
    const endPosition = document.getElementById('endPosition').value;
    const noteInTrap = document.getElementById('noteInTrap').checked ? "Yes" : "No";
    const offense = document.getElementById('offense').value;
    const defense = document.getElementById('defense').value;
    const driverSkill = document.getElementById('driverSkill').value;
    const card = document.getElementById('card').value;
    const comments = document.getElementById('comments').value;


    const scoutingData = {
        scouterName,
        teamNumber,
        matchNumber,
        ampPointsAuto,
        speakerPointsAuto,
        notesMissed,
        foulPointsAuto,
        coopertition,
        ampPointsTeleop,
        speakerPointsTeleop,
        foulPointsTeleop,
        endPosition,
        noteInTrap,
        offense,
        defense,
        driverSkill,
        card,
        comments,
    };

    let scoutings = JSON.parse(localStorage.getItem('scoutings')) || [];
    scoutings.push(scoutingData);
    scoutings.sort((a, b) => a.teamNumber - b.teamNumber);
    localStorage.setItem('scoutings', JSON.stringify(scoutings));

    alert('Data submitted! Check the previous ones for details.');
    resetForm();
}

function resetForm() {
    document.getElementById('scouterName').value = '';
    document.getElementById('teamNumber').value = '';
    document.getElementById('matchNumber').value = '';
    document.getElementById('autoAmpPoints').value = 0;
    document.getElementById('autoSpeakerPoints').value = 0;
    document.getElementById('autoSpeakerMissed').value = 0;
    document.getElementById('autoFoulPoints').value = 0;
    document.getElementById('coopertition').checked = '';
    document.getElementById('teleopAmpPoints').value = 0;
    document.getElementById('teleopSpeakerPoints').value = 0;
    document.getElementById('teleopFoulPoints').value = 0;
    document.getElementById('endPosition').value = 'None';
    document.getElementById('noteInTrap').checked = '';
    document.getElementById('offense').value = 6;
    document.getElementById('defense').value = 6;
    document.getElementById('driverSkill').value = 6;
    document.getElementById('card').value = 'No Card';
    document.getElementById('comments').value = '';
}

function showTeamStatistics(teamNumber) {
    const scoutings = JSON.parse(localStorage.getItem('scoutings')) || [];
    const teamStatistics = scoutings.filter(scouting => scouting.teamNumber === teamNumber);
  
    // Get the modal elements
    const modal = document.getElementById("teamStatsModal");
    const modalTeamNumber = document.getElementById("modal-teamNumber");
    const teamStats = document.getElementById("team-stats");
  
    // Set modal content
    modalTeamNumber.textContent = teamNumber;
  
    // Generate team statistics string using template literals
    let statisticsString = "";
    for (const stat in teamStatistics[0]) {
      if (stat !== "scouterName") {
        statisticsString += `${stat}: `;
        for (const entry of teamStatistics) {
          statisticsString += `${entry[stat]}, `;
        }
        // Remove the trailing comma and space
        statisticsString = statisticsString.slice(0, -2) + "\n";
      }
    }
  
    teamStats.textContent = statisticsString;
  
    // Toggle modal visibility
    modal.style.display = "block";
  
    // Add a close button functionality (optional)
    const closeModal = document.getElementsByClassName("close-modal")[0];
    closeModal.addEventListener("click", function() {
      modal.style.display = "none";
    });
  }

function showTeamStatistics(teamNumber) {
    window.location.href = `stat.html?teamNumber=${teamNumber}`;
}

function loadPreviousScoutings() {
    const scoutings = JSON.parse(localStorage.getItem('scoutings')) || [];
    console.log('Loaded scoutings:', scoutings); // Debugging: log the scoutings

    const tbody = document.getElementById('scouting-table-body');
    console.log('Tbody element:', tbody);

    if (!tbody) {
        console.error('Tbody element not found');
        return;
    }

    tbody.innerHTML = '';
    console.log(scoutings);

    scoutings.forEach((scouting, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${scouting.scouterName}</td>
            <td><span class="team-number" onclick="showTeamStatistics(${scouting.teamNumber})">${scouting.teamNumber}</span></td>
            <td>${scouting.matchNumber}</td>
            <td>${scouting.ampPointsAuto}</td>
            <td>${scouting.speakerPointsAuto}</td>
            <td>${scouting.foulPointsAuto}</td>
            <td>${scouting.notesMissed}</td>
            <td>${scouting.coopertition}</td>
            <td>${scouting.ampPointsTeleop}</td>
            <td>${scouting.speakerPointsTeleop}</td>
            <td>${scouting.foulPointsTeleop}</td>
            <td>${scouting.endPosition}</td>
            <td>${scouting.noteInTrap}</td>
            <td>${scouting.offense}</td>
            <td>${scouting.defense}</td>
            <td>${scouting.driverSkill}</td>
            <td>${scouting.card}</td>
            <td>${scouting.comments}</td>
            <td><button class="delete-button" onclick="deleteScouting(${index})">Delete</button></td>
        `;
        tbody.appendChild(row);

    });

    // Add a button to clear all scoutings
    const clearAllButton = document.createElement('button');
    clearAllButton.textContent = 'Clear All';
    clearAllButton.onclick = clearAllScoutings;
    const clearAllRow = document.createElement('tr');
    const clearAllCell = document.createElement('td');
    clearAllCell.setAttribute('colspan', '19'); // span all columns
    clearAllCell.appendChild(clearAllButton);
    clearAllRow.appendChild(clearAllCell);
    tbody.appendChild(clearAllRow);
}


function clearAllScoutings() {
    if (confirm("Are you sure you want to clear all scoutings?")) {
        localStorage.removeItem('scoutings');
        localStorage.removeItem('pitScoutings');
        loadPreviousScoutings();
    }
}

function deleteScouting(index) {
    const scoutings = JSON.parse(localStorage.getItem('scoutings')) || [];
    scoutings.splice(index, 1);
    localStorage.setItem('scoutings', JSON.stringify(scoutings));
    loadPreviousScoutings();
}

document.addEventListener('DOMContentLoaded', () => {
    loadPreviousScoutings();
});



function filterTable() {
    const input = document.getElementById("filterInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("scouting-table");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[1]; // Change index based on the column you want to filter
        if (td) {
            const txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}



// document.addEventListener('DOMContentLoaded', () => {
//     // Any initialization if needed
// });

// function submitPitScoutingData() {
//     const teamNumber = document.getElementById('teamNumber').value;
//     const photo = document.getElementById('photo').files[0]; // Get the uploaded photo file
//     const amp = document.getElementById('amp').checked;
//     const speaker = document.getElementById('speaker').checked;
//     const trap = document.getElementById('trap').checked;
//     const driveTrain = document.getElementById('driveTrain').value;
//     const autonomous = document.getElementById('autonomous').value;

//     const pitScoutingData = {
//         teamNumber,
//         photo: photo ? URL.createObjectURL(photo) : null, // Store photo URL if uploaded
//         amp,
//         speaker,
//         trap,
//         driveTrain,
//         autonomous
//     };

//     let pitScoutings = JSON.parse(localStorage.getItem('pitScoutings')) || [];
//     pitScoutings.push(pitScoutingData);
//     pitScoutings.sort((a, b) => a.teamNumber - b.teamNumber);
//     localStorage.setItem('pitScoutings', JSON.stringify(pitScoutings));

//     alert('Pit scouting data submitted!');
//     resetPitForm();
// }


function submitPitScoutingData() {

    
    const teamNumber = document.getElementById('teamNumber').value;
    const photo = document.getElementById('photo').files[0]; // Get the uploaded photo file
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        photo =reader.result;
    });
    reader.readAsDataURL(this.files[0]);



    const amp = document.getElementById('amp').checked;
    const speaker = document.getElementById('speaker').checked;
    const trap = document.getElementById('trap').checked;
    const driveTrain = document.getElementById('driveTrain').value;
    const autonomous = document.getElementById('autonomous').value;

    const pitScoutingData = {
        teamNumber,
        photo, // Store photo URL if uploaded
        amp,
        speaker,
        trap,
        driveTrain,
        autonomous
    };

    let pitScoutings = JSON.parse(localStorage.getItem('pitScoutings')) || [];
    pitScoutings.push(pitScoutingData);
    pitScoutings.sort((a, b) => a.teamNumber - b.teamNumber);
    localStorage.setItem('pitScoutings', JSON.stringify(pitScoutings));

    alert('Pit scouting data submitted!');
    resetPitForm();
}




function resetPitForm() {
    document.getElementById('teamNumber').value = '';
    document.getElementById('photo').value = '';
    document.getElementById('amp').checked = false;
    document.getElementById('speaker').checked = false;
    document.getElementById('trap').checked = false;
    document.getElementById('driveTrain').value = '';
    document.getElementById('autonomous').value = '';
}






// function exportData() {
//     // Get the scouting table
//     var table = document.getElementById("scouting-table");
//     var rows = table.querySelectorAll("tr");
    
//     // Initialize CSV content
//     var csvContent = "";
    
//     // Loop through rows to build CSV
//     rows.forEach(function (row) {
//         var cols = row.querySelectorAll("th, td");
//         var csvRow = [];
        
//         cols.forEach(function (col) {
//             csvRow.push('"' + col.innerText.replace(/"/g, '""') + '"'); // Handle quotes
//         });
        
//         csvContent += csvRow.join(",") + "\n";
//     });

//     // Create a downloadable CSV file
//     var blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     var url = URL.createObjectURL(blob);
//     var downloadLink = document.createElement("a");
//     downloadLink.setAttribute("href", url);
//     downloadLink.setAttribute("download", "scouting_data.csv");
//     downloadLink.style.display = "none";
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
// };


function exportTableToExcel() {
    // Clone the table to avoid modifying the original one
    var tableClone = document.getElementById('scouting-table').cloneNode(true);

    // Remove columns with buttons (delete and clear all) from the cloned table
    var rows = tableClone.querySelectorAll('tr');
    rows.forEach(row => {
        var cells = row.querySelectorAll('td, th');
        cells.forEach((cell, index) => {
            if (cell.querySelector('button')) {
                row.removeChild(cells[index]);
            }
        });
    });

    // Convert the modified table to an Excel workbook and export
    var wb = XLSX.utils.table_to_book(tableClone, { sheet: "Scouting Data" });
    XLSX.writeFile(wb, "scouting_data.xlsx");
}


