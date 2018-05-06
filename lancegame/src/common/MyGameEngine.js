'use strict';

import GameEngine from 'lance/GameEngine';
import SimplePhysicsEngine from 'lance/physics/SimplePhysicsEngine';
import PlayerAvatar from './PlayerAvatar';
import TwoVector from 'lance/serialize/TwoVector';
import Paddle from './Paddle';
import Ball from './Ball';
const PADDING = 20;
const WIDTH = 400;
const HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 50;

export default class MyGameEngine extends GameEngine {

    constructor(options) {
        super(options);
        this.physicsEngine = new SimplePhysicsEngine({ gameEngine: this });
    }

    registerClasses(serializer) {
        serializer.registerClass(PlayerAvatar);
        serializer.registerClass(Paddle);
        serializer.registerClass(Ball);
    }

    start() {

        super.start();


        this.on('postStep', () => { this.postStepHandleBall(); });
        this.on('objectAdded', (object) => {
            if (object.class === Ball) {
                this.ball = object;
            } else if (object.playerId === 1) {
                this.paddle1 = object;
            } else if (object.playerId === 2) {
                this.paddle2 = object;
            }
        });

    }


    processInput(inputData, playerId) {

        super.processInput(inputData, playerId);

        // get the player's primary object
        let playerPaddle = this.world.queryObject({ playerId });

        if (playerPaddle) {
            console.log(`player ${playerId} pressed ${inputData.input}`);
            if (inputData.input === 'up') {
                playerPaddle.position.y -= 5;
            } else if (inputData.input === 'down') {
                playerPaddle.position.y += 5;
            }
        }
    }

    initGame() {

        // create the paddle objects
        this.addObjectToWorld(new Paddle(this, null, { position: new TwoVector(PADDING, 0), playerId: 1 }));
        this.addObjectToWorld(new Paddle(this, null, { position: new TwoVector(WIDTH - PADDING, 0), playerId: 2 }));
        this.addObjectToWorld(new Ball(this, null, { position: new TwoVector(WIDTH / 2, HEIGHT / 2) }));
    }

    postStepHandleBall() {
        if (!this.ball)
            return;

        // CHECK LEFT EDGE:
        if (this.ball.position.x <= PADDING + PADDLE_WIDTH &&
            this.ball.position.y >= this.paddle1.y && this.ball.position.y <= this.paddle1.position.y + PADDLE_HEIGHT &&
            this.ball.velocity.x < 0) {

            // ball moving left hit player 1 paddle
            this.ball.velocity.x *= -1;
            this.ball.position.x = PADDING + PADDLE_WIDTH + 1;
        } else if (this.ball.position.x <= 0) {

            // ball hit left wall
            this.ball.velocity.x *= -1;
            this.ball.position.x = 0;
            console.log(`player 2 scored`);
        }

        // CHECK RIGHT EDGE:
        if (this.ball.position.x >= WIDTH - PADDING - PADDLE_WIDTH &&
            this.ball.position.y >= this.paddle2.position.y && this.ball.position.y <= this.paddle2.position.y + PADDLE_HEIGHT &&
            this.ball.velocity.x > 0) {

            // ball moving right hits player 2 paddle
            this.ball.velocity.x *= -1;
            this.ball.position.x = WIDTH - PADDING - PADDLE_WIDTH - 1;
        } else if (this.ball.position.x >= WIDTH) {

            // ball hit right wall
            this.ball.velocity.x *= -1;
            this.ball.position.x = WIDTH - 1;
            console.log(`player 1 scored`);
        }

        // ball hits top
        if (this.ball.position.y <= 0) {
            this.ball.position.y = 1;
            this.ball.velocity.y *= -1;
        } else if (this.ball.position.y >= HEIGHT) {
            // ball hits bottom
            this.ball.position.y = HEIGHT - 1;
            this.ball.velocity.y *= -1;
        }

    }

}


