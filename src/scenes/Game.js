import Phaser from 'phaser'

class Game extends Phaser.Scene {
  init() {
    this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0)
  }

  preload() {

  }
  create() {
    // Create ball and settings
    this.ball = this.add.circle(200, 250, 10, 0xffffff, 1)
    this.physics.add.existing(this.ball)
    this.ball.body.setCollideWorldBounds(true, 1, 1)
    this.ball.body.setVelocity(Phaser.Math.Between(-200, 400), Phaser.Math.Between(-200, 400))
    this.ball.body.setBounce(1, 1)
    // Create paddles and settings
    this.paddleLeft = this.add.rectangle(40, 250, 30, 100, 0xffffff, 1)
    this.physics.add.existing(this.paddleLeft, true)
    this.paddleRight = this.add.rectangle(760, 250, 30, 100, 0xffffff, 1)
    this.physics.add.existing(this.paddleRight, true)
    // Create collider
    this.physics.add.collider(this.paddleLeft, this.ball)
    this.physics.add.collider(this.paddleRight, this.ball)
    // Create movement
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    // Move player paddle with up and down key strokes
    /** @type {Phaser.Physics.Arcade.StaticBody} */
    const body = this.paddleLeft.body
    if (this.cursors.up.isDown) {
      this.paddleLeft.y -= 10
    }
    if (this.cursors.down.isDown) {
      this.paddleLeft.y += 10
    }
    body.updateFromGameObject()
    // Move computer paddle
    const diff = this.ball.y - this.paddleRight.y
    if (Math.abs(diff) < 10) {
      return
    }
    const aiSpeed = 2
    if (diff < 0) {
    // Ball is above the paddle
      this.paddleRightVelocity.y = -aiSpeed
      if (this.paddleRightVelocity.y < -10) {
        this.paddleRightVelocity.y = -10
      }
    }
    else if (diff > 0) {
      // Ball is below the paddle
      this.paddleRightVelocity.y = aiSpeed
      if (this.paddleRightVelocity.y < 10) {
        this.paddleRightVelocity.y = 10
      }
    }
    this.paddleRight.y += this.paddleRightVelocity.y
    this.paddleRight.body.updateFromGameObject()

  }
}

export default Game