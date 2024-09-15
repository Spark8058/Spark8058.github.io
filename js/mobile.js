// function toggleMenu() {
//     const menu = document.getElementById('menu');
//     menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
// }







// function toggleMenu() {
//     const menu = document.getElementById('menu');
//     menu.classList.toggle('open');
//     overlay.classList.toggle('open');
// }

// const menu = document.getElementById('menu');
// const overlay = document.querySelector('overlay');

// document.addEventListener('click', function(event) {
//     const menuBtn = document.querySelector('.menu-button');
//     if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
//       menu.classList.remove('open');
//       overlay.classList.remove('open');
//     }
// });


// function showTeams() {
//     window.location.href = 'teams.html';
// }

// function showPitScouting() {
//     // document.getElementById('scouting-form').style.display = 'flex';
//     window.location.href = 'pit.html';

//     toggleMenu();
// }




// document.addEventListener('DOMContentLoaded', () => {
//     loadPreviousScoutings();
//     setupMenuCloseHandler();
// });

// function setupMenuCloseHandler() {
//     const menu = document.getElementById('menu');
//     const overlay = document.getElementById('overlay');
//     const menuBtn = document.querySelector('.menu-button');

//     document.addEventListener('click', function(event) {
//         if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
//             menu.classList.remove('open');
//             overlay.classList.remove('open');
//         }
//     });
// }

// function toggleMenu() {
//     const menu = document.getElementById('menu');
//     const overlay = document.getElementById('overlay');
//     menu.classList.toggle('open');
//     overlay.classList.toggle('open');
// }

// toggle.onclick = function() {
//     toggle.classList.toggle('active');
//     sidebar.classList.toggle('active')
// }

// const toggle = document.getElementById('menu');
// const sidebar = document.getElementById('sidebar');

// document.onclick = function(e) {
//     const menu = document.getElementById('menu');
//     if(e.target.id !== 'menu' && e.target.id !== 'overlay') {
//         // menu.classList.remove('close');
//         // overlay.classList.remove('close')
//         toggleMenu()
//     }
// }

// document.addEventListener('click', function(e) {
//     // const menu = document.getElementById('menu');
//     // if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
//     //   menu.classList.remove('open');
//     //   overlay.classList.remove('open');
//     // }
// });

// document.addEventListener('click', function(event) {
//     const menu = document.getElementById('menu');
//     const menuBtn = document.getElementById('menu-button');

//     // Check if the clicked element is the menu or menu button
//     const isClickInsideMenu = menu.contains(event.target);
//     const isClickInsideMenuBtn = menuBtn.contains(event.target);

//     // If the click is outside the menu and not the menu button, close the menu
//     if (!isClickInsideMenu && !isClickInsideMenuBtn) {
//         menu.style.display = 'none';
//     }
// });

// document.body.addEventListener('click', function(event) {
//     if (!menu.contains(event.target) && event.target !== menuBtn) {
//       menu.style.display = 'none';
//     }
//   });

// function showScoutingForm() {
//     window.location.href = 'index.html';
//     document.getElementById('scouting-form').style.display = 'flex';
//     document.getElementById('previous-scoutings').style.display = 'none';
//     toggleMenu();
// }

// function showPreviousScoutings() {
//     document.getElementById('scouting-form').style.display = 'none';
//     document.getElementById('previous-scoutings').style.display = 'flex';
//     loadPreviousScoutings();
//     toggleMenu();
// }

function showPreviousScoutings() {
    window.location.href = 'mobilePrevious.html';
}

function adjustPoints(id, delta) {
    const input = document.getElementById(id);
    const currentValue = parseInt(input.value);
    if (currentValue + delta >= 0) {
        input.value = currentValue + delta;
    }
}

function submitData() {
    const scouterName = document.getElementById('scouter-name').value;
    const teamNumber = document.getElementById('team-number').value;
    const matchNumber = document.getElementById('match-number').value;
    const ampPointsAuto = document.getElementById('amp-points-auto').value;
    const speakerPointsAuto = document.getElementById('speaker-points-auto').value;
    const notesMissed = document.getElementById('notes-missed').value;
    const foulPointsAuto = document.getElementById('foul-points-auto').value;
    const ampPointsTeleop = document.getElementById('amp-points-teleop').value;
    const speakerPointsTeleop = document.getElementById('speaker-points-teleop').value;
    const speakerPointsTeleopAmp = document.getElementById('speaker-points-teleop-amp').value;
    const foulPointsTeleop = document.getElementById('foul-points-teleop').value;
    const endPosition = document.getElementById('end-position').value;
    // const harmony = document.getElementById('harmony').value;
    const notes = document.getElementById('notes').value;
    const coopertition = document.getElementById('coopertition').checked ? "Yes" : "No";

    const scoutingData = {
        scouterName,
        teamNumber,
        matchNumber,
        ampPointsAuto,
        speakerPointsAuto,
        notesMissed,
        foulPointsAuto,
        ampPointsTeleop,
        speakerPointsTeleop,
        speakerPointsTeleopAmp,
        foulPointsTeleop,
        endPosition,
        // harmony,
        notes,
        coopertition,
    };

    let scoutings = JSON.parse(localStorage.getItem('scoutings')) || [];
    scoutings.push(scoutingData);
    scoutings.sort((a, b) => a.teamNumber - b.teamNumber);
    localStorage.setItem('scoutings', JSON.stringify(scoutings));

    alert('Data submitted! Check the previous ones for details.');
    resetForm();
}

function resetForm() {
    document.getElementById('scouter-name').value = '';
    document.getElementById('team-number').value = '';
    document.getElementById('match-number').value = '';
    document.getElementById('amp-points-auto').value = 0;
    document.getElementById('speaker-points-auto').value = 0;
    document.getElementById('notes-missed').value = 0;
    document.getElementById('foul-points-auto').value = 0;
    document.getElementById('amp-points-teleop').value = 0;
    document.getElementById('speaker-points-teleop').value = 0;
    document.getElementById('speaker-points-teleop-amp').value = 0;
    document.getElementById('foul-points-teleop').value = 0;
    document.getElementById('end-position').value = 'None';
    // document.getElementById('harmony').value = '0';
    document.getElementById('notes').value = '';
    document.getElementById('coopertition').checked = '';
}

function showTeamStatistics(teamNumber) {
    const scoutings = JSON.parse(localStorage.getItem('scoutings')) || [];
    const teamStatistics = scoutings.filter(scouting => scouting.teamNumber === teamNumber);
  
    // Get the modal elements
    const modal = document.getElementById("teamStatsModal");
    const modalTeamNumber = document.getElementById("modal-team-number");
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
  


// function loadPreviousScoutings() {
//     const scoutings = JSON.parse(localStorage.getItem('scoutings')) || [];
//     const tbody = document.getElementById('scouting-table-body');
//     tbody.innerHTML = '';

//     scoutings.forEach((scouting, index) => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${scouting.scouterName}</td>
//             <td>${scouting.teamNumber}</td>
//             <td>${scouting.matchNumber}</td>
//             <td>${scouting.ampPointsAuto}</td>
//             <td>${scouting.speakerPointsAuto}</td>
//             <td>${scouting.foulPointsAuto}</td>
//             <td>${scouting.coopertition}</td>
//             <td>${scouting.ampPointsTeleop}</td>
//             <td>${scouting.speakerPointsTeleop}</td>
//             <td>${scouting.foulPointsTeleop}</td>
//             <td>${scouting.endPosition}</td>
//             <td>${scouting.harmony}</td>
//             <td>${scouting.notes}</td>
            
//             <td><button class="delete-button" onclick="deleteScouting(${index})">Delete</button></td>
//         `;
//         tbody.appendChild(row);
//         console.log(scouting.coopertition);
//     });
//     const clearAllButton = document.createElement('button');
//     clearAllButton.textContent = 'Clear All';
//     clearAllButton.onclick = clearAllScoutings;
//     const clearAllRow = document.createElement('tr');
//     const clearAllCell = document.createElement('td');
//     clearAllCell.setAttribute('colspan', '14'); // span all columns
//     clearAllCell.appendChild(clearAllButton);
//     clearAllRow.appendChild(clearAllCell);
//     tbody.appendChild(clearAllRow);
// }
// function deleteScouting(index) {
//     let scoutings = JSON.parse(localStorage.getItem('scoutings')) || [];
//     scoutings.splice(index, 1);
//     localStorage.setItem('scoutings', JSON.stringify(scoutings));
//     loadPreviousScoutings();
// }

// function clearAllScoutings() {
//     localStorage.removeItem('scoutings');
//     loadPreviousScoutings();
// }


// function showTeamStatistics(teamNumber) {
//     window.location.href = `team-statistics.html?teamNumber=${teamNumber}`;
// }

// function loadPreviousScoutings() {
//     const scoutings = JSON.parse(localStorage.getItem('scoutings')) || [];
//     const tbody = document.getElementById('scouting-table-body');
//     tbody.innerHTML = '';

//     scoutings.forEach((scouting, index) => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td><span class="team-number" onclick="showTeamStatistics(${scouting.teamNumber})">${scouting.teamNumber}</span></td>
//             <td>${scouting.scouterName}</td>
//             <td>${scouting.matchNumber}</td>
//             <td>${scouting.ampPointsAuto}</td>
//             <td>${scouting.speakerPointsAuto}</td>
//             <td>${scouting.foulPointsAuto}</td>
//             <td>${scouting.coopertition}</td>
//             <td>${scouting.ampPointsTeleop}</td>
//             <td>${scouting.speakerPointsTeleop}</td>
//             <td>${scouting.foulPointsTeleop}</td>
//             <td>${scouting.endPosition}</td>
//             <td>${scouting.harmony}</td>
//             <td>${scouting.notes}</td>
//             <td><button onclick="deleteScouting(${index})">Delete</button></td>
//         `;
//         tbody.appendChild(row);
//     });
// }

function showTeamStatistics(teamNumber) {
    window.location.href = `mobileStat.html?teamNumber=${teamNumber}`;
}

function loadPreviousScoutings() {
    const scoutings = JSON.parse(localStorage.getItem('scoutings')) || [];
    const tbody = document.getElementById('scouting-table-body');
    tbody.innerHTML = '';

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
            <td>${scouting.speakerPointsTeleopAmp}</td>
            <td>${scouting.foulPointsTeleop}</td>
            <td>${scouting.endPosition}</td>
            
            <td>${scouting.notes}</td>
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
    clearAllCell.setAttribute('colspan', '16'); // span all columns
    clearAllCell.appendChild(clearAllButton);
    clearAllRow.appendChild(clearAllCell);
    tbody.appendChild(clearAllRow);
}

function clearAllScoutings() {
    if (confirm("Are you sure you want to clear all scoutings?")) {
        localStorage.removeItem('scoutings');
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



function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
    overlay.classList.toggle('open');
}

const menu = document.getElementById('menu');
const overlay = document.querySelector('overlay');

document.addEventListener('click', function(event) {
    const menuBtn = document.querySelector('.menu-button');
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
      menu.classList.remove('open');
      overlay.classList.remove('open');
    }
});


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
    // window.location.href = 'index.html';
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
    window.location.href = 'mobilePrevious.html';

    loadPreviousScoutings();
    toggleMenu();
}

function showPitScouting() {
    // document.getElementById('scouting-form').style.display = 'flex';
    window.location.href = 'pit.html';

    toggleMenu();
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