import Phaser from 'phaser'

class Game extends Phaser.Scene {
  preload() {

  }
  create() {
    this.add.circle(400, 250, 10, 0xffffff, 1)
  }
}

export default Game