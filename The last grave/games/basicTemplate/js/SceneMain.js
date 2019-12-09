class SceneMain extends Phaser.Scene {
    constructor() {
        super("carregarJoc");
    }

    preload()
    {
    	this.load.image("1","images/JungleAssetPack/parallaxbackground/1.png");
        this.load.image("2","images/JungleAssetPack/parallaxbackground/2.png");
        this.load.image("3","images/JungleAssetPack/parallaxbackground/3.png");
        this.load.image("4","images/JungleAssetPack/parallaxbackground/4.png");
        this.load.image("5","images/JungleAssetPack/parallaxbackground/5.png");

        this.load.image("terra","images/floor.png");
        this.load.image("terraSaltar","images/jumpingFloor.png");

        this.load.spritesheet("personatgeDreta","images/playerRightMovement.png", 
        {frameWidth: 32, frameHeight: 64});

        this.load.spritesheet("personatgeQuiet","images/playerStandingMovement.png", 
        {frameWidth: 32, frameHeight: 64});

        this.load.spritesheet("personatgeEsquerra","images/playerLeftMovement.png", 
        {frameWidth: 32, frameHeight: 64});

        this.load.spritesheet("focEsquerra","images/fire/Iceball_84x9.png", 
        {frameWidth: 84, frameHeight: 9});

        this.load.spritesheet("focDreta","images/fire/Iceball_84x9_Dreta.png", 
        {frameWidth: 84, frameHeight: 8.7});

        this.load.spritesheet("dinosaureDreta","images/sheets/dinoSpriteYellowRight.png",
        {frameWidth: 48, frameHeight: 48});

        this.load.spritesheet("dinosaureEsquerra","images/sheets/dinoSpriteYellowLeft.png",
        {frameWidth: 48, frameHeight: 48});

        this.load.spritesheet("explosioAnimacio","images/particles/explosionSheet.png",
        {frameWidth: 100, frameHeight: 100});
        
        this.load.bitmapFont("pixelFont", "images/font/font.png", "images/font/font.xml");
        
        this.load.image("piramide", "images/piramide.png");

        this.load.spritesheet("cor", "images/heart_animated_1.png", 
        {frameWidth: 17, frameHeight: 17});

        this.load.image("corIndividual", "images/corIndividual.png");
    }


    create() {

        this.scene.start("jugarAlJoc");

        this.anims.create({
        key: "dispararDreta",
        frames: this.anims.generateFrameNumbers("focDreta"),
        frameRate: 20,
        repeat: -1    
        });

        this.anims.create({
        key: "dispararEsquerra",
        frames: this.anims.generateFrameNumbers("focEsquerra"),
        frameRate: 20,
        repeat: -1    
        });

        this.anims.create({
        key: "turn",
        frames: this.anims.generateFrameNumbers("personatgeQuiet"),
        frameRate: 5,
        repeat: -1
        });

        this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("personatgeEsquerra"),
        frameRate: 10,
        repeat: -1
        });

        this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("personatgeDreta"),
        frameRate: 10,
        repeat: -1
        }); 

        this.anims.create({
        key: "explosio",
        frames: this.anims.generateFrameNumbers("explosioAnimacio"),
        frameRate: 25,
        repeat: 0
        });

        this.anims.create({
        key: "corsVida1",
        frames: this.anims.generateFrameNumbers("cor", {start: 0, end: 1}),
        frameRate: 10,
        repeat: 0
        }); 

        this.anims.create({
        key: "corsVida2",
        frames: this.anims.generateFrameNumbers("cor", {start: 1, end: 2}),
        frameRate: 10,
        repeat: 0
        });

        this.anims.create({
        key: "corsVida3",
        frames: this.anims.generateFrameNumbers("cor", {start: 2, end: 3}),
        frameRate: 10,
        repeat: 0
        });

        this.anims.create({
        key: "corsVida4",
        frames: this.anims.generateFrameNumbers("cor", {start: 3, end: 4}),
        frameRate: 10,
        repeat: 0
        });

        this.anims.create({
        key: "corsVida5",
        frames: this.anims.generateFrameNumbers("cor", {start: 4, end: 5}),
        frameRate: 10,
        repeat: 0
        });   
        

    }

    }