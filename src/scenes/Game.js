import Phaser from 'phaser'

class Game extends Phaser.Scene {
  init() {
    this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0)

    this.leftScore = 0
    this.rightScore = 0
  }

  preload() {

  }
  create() {
    this.physics.world.setBounds(-100, 0, 1000, 500)
    // Create ball and settings
    this.ball = this.add.circle(400, 250, 10, 0xffffff, 1)
    this.physics.add.existing(this.ball)
    this.ball.body.setCollideWorldBounds(true, 1, 1)
    this.ball.body.setBounce(1, 1)
    // Create ball path
    this.resetBall()
    // Create paddles and settings
    this.paddleLeft = this.add.rectangle(40, 250, 30, 100, 0xffffff, 1)
    this.physics.add.existing(this.paddleLeft, true)
    this.paddleRight = this.add.rectangle(760, 250, 30, 100, 0xffffff, 1)
    this.physics.add.existing(this.paddleRight, true)
    // Create collider
    this.physics.add.collider(this.paddleLeft, this.ball)
    this.physics.add.collider(this.paddleRight, this.ball)
    // Create scores
    const scoreStyle = {
      fontSize: 48
    }
    this.leftScoreLabel = this.add.text(300, 125, this.leftScore, scoreStyle).setOrigin(0.5, 0.5)
    this.rightScoreLabel = this.add.text(500, 125, this.rightScore, scoreStyle).setOrigin(0.5, 0.5)
    // Create movement
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    // Move player paddle with up and down key strokes
    /** @type {Phaser.Physics.Arcade.StaticBody} */
    const body = this.paddleLeft.body
    if (this.cursors.up.isDown) {
      this.paddleLeft.y -= 5
    }
    if (this.cursors.down.isDown) {
      this.paddleLeft.y += 5
    }
    body.updateFromGameObject()
    // Move computer paddle
    const diff = this.ball.y - this.paddleRight.y
    if (Math.abs(diff) < 10) {
      return
    }
    const aiSpeed = 0
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

    if (this.ball.x <= -30) {
      // scored on the left side
      this.resetBall()
      this.incrementRightScore()
    }
    else if (this.ball.x >= 830) {
      // scored on the right side
      this.resetBall()
      this.incrementLeftScore()
    }
  }

  incrementLeftScore() {
    this.leftScore += 1
    this.leftScoreLabel.text = this.leftScore
  }

  incrementRightScore() {
    this.rightScore += 1
    this.rightScoreLabel.text = this.rightScore
  }
  
  resetBall() {
    this.ball.setPosition(400,250)
    const angle = Phaser.Math.Between(0, 360)
    const vec = this.physics.velocityFromAngle(angle, 200)
    this.ball.body.setVelocity(vec.x, vec.y)
  }
}

export default Game