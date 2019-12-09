window.onload=function()
{
	var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [SceneMain, Scene2],
        parent: 'phaser-game',
        physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    }
}
    var game = new Phaser.Game(config);
    }

