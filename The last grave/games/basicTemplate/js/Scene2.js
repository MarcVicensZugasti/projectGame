class Scene2 extends Phaser.Scene{
	constructor(){
		super("jugarAlJoc")
	}

	create(){

		//Crearem els fons del joc amb la unió de 5 imatges i el seu escalat.
        var fons1 = this.add.image(400,300,"1");
        fons1.scaleX = 2.5;
        fons1.scaleY = 3;

        var fons2 = this.add.image(400,300,"2");
        fons2.scaleX = 2.5;
        fons2.scaleY = 3;

        var fons3 = this.add.image(400,300,"3");
        fons3.scaleX = 2.5;
        fons3.scaleY = 3;

        var fons4 = this.add.image(400,300,"4");
        fons4.scaleX = 2.5;
        fons4.scaleY = 3;

        var fons5 = this.add.image(400,300,"5");
        fons5.scaleX = 2.5;
        fons5.scaleY = 3; 

        //Afegirem les plataformes del primer nivell.
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(800, 610, "terra").setScale().refreshBody();
        this.platforms.create(500, 610, "terraSaltar").setScale(1.2).refreshBody();

        //Afegim el personatge principal del joc.
        this.player = this.physics.add.sprite(150, 500, "personatgeQuiet");
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(280);
        this.physics.add.collider(this.player, this.platforms);

        //Habilitar funcions del teclat.
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            
        //Afegim el grup de projectils.    
        this.projectiles = this.add.group();

        //Afegim la imatge del cor inicial per treure d'ell les animacions
        this.vidaImatge = this.physics.add.sprite(15, 45, "corIndividual");
        this.vidaImatge.body.setAllowGravity(false);
        this.vidaImatge.setCollideWorldBounds(true);

        //Les dues animacions de l'enemic, una per cada direcció.
        this.anims.create({
        key: "dinosaureGroc",
        frames: this.anims.generateFrameNumbers("dinosaureDreta"),
        frameRate: 15,
        repeat: -1,
        });

        this.anims.create({
        key: "dinosaureGrocCanvi",
        frames: this.anims.generateFrameNumbers("dinosaureEsquerra"),
        frameRate: 15,
        repeat: -1 
        });

        //El generador d'enemics.
        this.enemy = this.physics.add.group();
        var maxEnemics = 1;
        for (var i = 0; i <= maxEnemics; i++){
            var enemic = this.physics.add.sprite(20, 22, "dinosaureDreta");
            this.enemy.add(enemic);
            enemic.setRandomPosition(0, 0, this.game.config.width, this.game.config.height > 60);
            enemic.play("dinosaureGroc");
            enemic.setVelocity(50, 100);
            enemic.setCollideWorldBounds(true);
            enemic.setBounce(0);
            enemic.setScale(1);
        }

        //Afegim les noves colisions.
        this.physics.add.collider(this.enemy, this.platforms);  

        this.physics.add.overlap(this.projectiles, this.enemy, this.hitEnemy, null, this);

        this.physics.add.overlap(this.player, this.enemy, this.hurtPlayer, null, this);

        this.physics.add.overlap(this.enemy, this.platforms, this.direccioEnemic, null, this);


        //Crearem la puntuació.
        this.puntuacio = 0;
        this.etiquetaPuntuacio = this.add.bitmapText(10, 5, "pixelFont", "PUNTUACIO ", 20);

        this.vida = 5; 
        this.etiquetaVida = this.add.bitmapText(10, 20, "pixelFont", "VIDES ", 20);

	}

    //Detectar la colisió entre el projectil i l'enemic.
    hitEnemy(projectil, enemic) {
        var explosion = new Explosion(this, enemic.x, enemic.y);
        enemic.destroy();
        projectil.destroy();
        this.puntuacio += 15;
        var puntuacioFormatejada = this.zeroPad(this.puntuacio, 6);
        this.etiquetaPuntuacio.text = "PUNTUACIO " + puntuacioFormatejada;
    }

    resetPlayer(){
        var x = this.game.config.width / 2 - 8;
        var y = this.game.config.height + 64;
        this.player.enableBody(true, x, y, true, true);
        this.player.alpha = 0.5;
        var tween = this.tweens.add({
            targets: this.player,
            y: this.game.config.height - 64,
            ease: 'Power1',
            duration: 1500,
            repeat: 0,
            onComplete: function(){
                this.player.alpha = 1;
            },
            callbackScope: this
        });        
    }

    //Impacte directe del jugador amb un enemic.
    hurtPlayer(player, enemic) {
        this.resetPlayerPos(player);
        if(this.player.alpha < 1){
            return;
        }
        player.disableBody(true, true);
        this.resetPlayer();
        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        });

        //Creació d'un text sota la puntuació que ens permet veure la vida que té el player.
        this.vida -= 1;
        var vidaFormatejada = this.zeroPad(this.vida, 1);
        this.etiquetaVida.text = "VIDES " + vidaFormatejada;

        //Animació del factor 'vida'.
        if(vidaFormatejada == 4){
            this.vidaImatge.play("corsVida1");
        }else if(vidaFormatejada == 3){
            this.vidaImatge.play("corsVida2");
        }else if(vidaFormatejada == 2){
            this.vidaImatge.play("corsVida3");
        }else if(vidaFormatejada == 1){
            this.vidaImatge.play("corsVida4");
        }

        //Acabar la partida si les vides arriben a 0.
        if(vidaFormatejada == 0){
            this.vidaImatge.play("corsVida5");
            this.physics.pause();
            this.game.gameOver = true;
        }
    }


    //Crear la numeració de la puntuació.
    zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }
	
    update() {

	//Moviment del personatge que configurem a movePlayerManager.
    this.movePlayerManager();

    if(this.cursorKeys.left.isDown && Phaser.Input.Keyboard.JustDown(this.spacebar)){
        if(this.player.active){
        this.dispararFoc();
    }
    }

    if(this.cursorKeys.right.isDown && Phaser.Input.Keyboard.JustDown(this.spacebar)){
        if(this.player.active){
        this.dispararFoc2();
    }
    }
    
    //Generem els projectils per l'esquerra.
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
        var foc = this.projectiles.getChildren()[i];
        var foc2 = this.projectiles.getChildren()[i];
        foc.update();
        foc2.update();
    }

    //Fi de l'Update.
    }
    
    resetPlayerPos(player) {
        player.x = 150;
    }

    //Disparar cap a la dreta.
    dispararFoc2(){
        var foc2 = new Foc2(this);
    }

    //Disparar cap a l'esquerra.
    dispararFoc(){
        var foc = new Foc(this);
    }

    //Configuració del moviment del personatge.
    movePlayerManager(){

    if (this.cursorKeys.left.isDown){
        this.player.setVelocityX(-160);
        this.player.anims.play("left", true);
    }
    else if (this.cursorKeys.right.isDown){
        this.player.setVelocityX(160);
        this.player.anims.play("right", true);
    }
    else{
        this.player.setVelocityX(0);
        this.player.anims.play("turn", true);
    }
    if (this.cursorKeys.up.isDown && this.player.body.touching.down){
        this.player.setVelocityY(-330);
        this.player.setVelocityX(100);
    }

    }

}