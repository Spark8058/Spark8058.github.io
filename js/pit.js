document.addEventListener('DOMContentLoaded', () => {
    // Any initialization if needed
});

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
    const photoInput = document.getElementById('photo').files[0];
    const amp = document.getElementById('amp').checked;
    const speaker = document.getElementById('speaker').checked;
    const trap = document.getElementById('trap').checked;
    const driveTrain = document.getElementById('driveTrain').value;
    const autonomous = document.getElementById('autonomous').value;

    if (photoInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const photo = event.target.result; // Base64 encoded string

            const pitScoutingData = {
                teamNumber,
                photo, // Store the Base64 string
                amp,
                speaker,
                trap,
                driveTrain,
                autonomous
            };

            savePitScoutingData(pitScoutingData);
        };
        reader.readAsDataURL(photoInput); // Convert the photo to Base64 string
    } else {
        const pitScoutingData = {
            teamNumber,
            photo: null,
            amp,
            speaker,
            trap,
            driveTrain,
            autonomous
        };

        savePitScoutingData(pitScoutingData);
    }
}

function savePitScoutingData(pitScoutingData) {
    let pitScoutings = JSON.parse(localStorage.getItem('pitScoutings')) || [];
    
    // Find existing entry for the team
    const index = pitScoutings.findIndex(data => data.teamNumber === pitScoutingData.teamNumber);

    if (index > -1) {
        // Replace existing entry
        pitScoutings[index] = pitScoutingData;
    } else {
        // Add new entry if none exists
        pitScoutings.push(pitScoutingData);
    }

    // Sort by teamNumber
    pitScoutings.sort((a, b) => a.teamNumber - b.teamNumber);

    // let pitScoutings = JSON.parse(localStorage.getItem('pitScoutings')) || [];
    // pitScoutings.push(pitScoutingData);
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
