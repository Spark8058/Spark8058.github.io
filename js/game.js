const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gameContainer',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('speaker', 'img/tbaLogo.png');
    this.load.image('note', 'img/tiktokLogo.png');
    this.load.image('bot', 'img/logo_integra.png');
    this.load.image('noteSource', 'img/linkedinLogo.png');
}

function create() {
    // Set background color to white
    this.cameras.main.setBackgroundColor('#ffffff');

    // Player's goal on the left
    this.playerGoal = this.add.rectangle(50, 300, 20, 100, 0xff0000);
    this.physics.add.existing(this.playerGoal, true);

    // Bot's goal on the right
    this.botGoal = this.add.rectangle(750, 300, 20, 100, 0x0000ff);
    this.physics.add.existing(this.botGoal, true);

    // Player's note source at the bottom left
    this.playerNoteSource = this.physics.add.sprite(100, 550, 'noteSource').setScale(0.5);
    this.playerNoteSource.setAlpha(0.5);

    // Bot's note source at the bottom right
    this.botNoteSource = this.physics.add.sprite(700, 550, 'noteSource').setScale(0.5);
    this.botNoteSource.setAlpha(0.5);

    // Controls for the player
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Player's note inventory
    this.playerNotes = 0;
    this.notesText = this.add.text(16, 100, `Notes: ${this.playerNotes}`, { fontSize: '24px', fill: '#000' });

    // Timer
    this.timeLeft = 30;
    this.timerText = this.add.text(16, 16, `Time: ${this.timeLeft}`, { fontSize: '32px', fill: '#000' });
    this.time.addEvent({ delay: 1000, callback: updateTimer, callbackScope: this, loop: true });

    // Score
    this.playerScore = 0;
    this.botScore = 0;
    this.scoreText = this.add.text(16, 50, `Player: ${this.playerScore} | Bot: ${this.botScore}`, { fontSize: '24px', fill: '#000' });

    // Player's sprite
    this.player = this.physics.add.sprite(150, 300, 'speaker').setScale(0.1);
    this.player.setCollideWorldBounds(true);
    this.playerNote = null;  // Player's current note

    // Bot's sprite
    this.bot = this.physics.add.sprite(650, 300, 'bot').setScale(0.1);
    this.bot.setCollideWorldBounds(true);
    this.botNote = null;  // Bot's current note

    // Group for the notes
    this.notes = this.physics.add.group();

    // Collision detection
    this.physics.add.overlap(this.playerNoteSource, this.player, pickNote.bind(this, 'player'), null, this);
    this.physics.add.overlap(this.botNoteSource, this.bot, pickNote.bind(this, 'bot'), null, this);
    this.physics.add.overlap(this.notes, this.botGoal, scoreGoal.bind(this, 'bot'), null, this);
    this.physics.add.overlap(this.notes, this.playerGoal, scoreGoal.bind(this, 'player'), null, this);

    // Note source timer
    this.time.addEvent({
        delay: 5000,
        callback: () => toggleNoteSource.call(this, 'player'),
        callbackScope: this,
        loop: true
    });

    this.time.addEvent({
        delay: 5000,
        callback: () => toggleNoteSource.call(this, 'bot'),
        callbackScope: this,
        loop: true
    });
}

function update() {
    // Reset velocity before applying new movement
    this.player.setVelocity(0);

    // Player movement
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(200);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(200);
    }

    // Player throws note if they have one and press space
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && this.playerNotes > 0) {
        throwNote.call(this);
    }

    // Bot AI movement
    botMovement.call(this);
}

function pickNote(source) {
    if (source === 'player') {
        if (this.playerNotes === 0) {
            // Player picks up a note
            this.playerNotes += 1;
            this.notesText.setText(`Notes: ${this.playerNotes}`);
            this.playerNoteSource.setAlpha(0);  // Hide the note source
            this.time.addEvent({
                delay: 5000,
                callback: () => this.playerNoteSource.setAlpha(0.5),
                callbackScope: this
            });  // Make the note source visible again after 5 seconds
        }
    } else if (source === 'bot') {
        if (!this.botNote) {
            // Bot picks up a note
            this.botNote = 'note';
            this.botNoteSource.setAlpha(0);  // Hide the note source
            this.time.addEvent({
                delay: 5000,
                callback: () => this.botNoteSource.setAlpha(0.5),
                callbackScope: this
            });  // Make the note source visible again after 5 seconds
        }
    }
}

function throwNote() {
    if (!this.playerNote) {
        // Throw the note towards the mouse position
        const note = this.notes.create(this.player.x, this.player.y, 'note').setScale(0.5);

        // Calculate direction
        const directionX = this.input.x - this.player.x;
        const directionY = this.input.y - this.player.y;
        const length = Math.sqrt(directionX * directionX + directionY * directionY);
        const speed = 300;

        note.setVelocityX((directionX / length) * speed);
        note.setVelocityY((directionY / length) * speed);

        // Decrease player's note inventory
        this.playerNotes -= 1;
        this.notesText.setText(`Notes: ${this.playerNotes}`);
    }
}

function scoreGoal(who, note) {
    note.destroy();
    if (who === 'player') {
        this.playerScore += 10;
    } else {
        this.botScore += 10;
    }
    this.scoreText.setText(`Player: ${this.playerScore} | Bot: ${this.botScore}`);
}

function botMovement() {
    if (!this.botNote) {
        // Bot picks up a note if it doesn't have one
        if (this.botNoteSource.alpha === 0.5) {
            this.physics.moveToObject(this.bot, this.botNoteSource, 100);
        }
    } else {
        // Bot tries to score in the player's goal
        this.physics.moveToObject(this.bot, this.playerGoal, 100);
        // Check if the bot has reached the goal
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.bot.getBounds(), this.playerGoal.getBounds())) {
            this.botNote = null;  // Bot loses the note after scoring
            scoreGoal.call(this, 'bot', this.notes.create(this.bot.x, this.bot.y, 'note'));  // Score in the player's goal
        }
    }
}

function updateTimer() {
    this.timeLeft -= 1;
    this.timerText.setText(`Time: ${this.timeLeft}`);

    if (this.timeLeft <= 0) {
        endGame.call(this);
    }
}

function endGame() {
    this.physics.pause();
    this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#000' }).setOrigin(0.5);
}

function toggleNoteSource(side) {
    if (side === 'player') {
        if (this.playerNoteSource.alpha === 0.5) {
            this.playerNoteSource.setAlpha(0);  // Hide the note source
        }
    } else if (side === 'bot') {
        if (this.botNoteSource.alpha === 0.5) {
            this.botNoteSource.setAlpha(0);  // Hide the note source
        }
    }
}
