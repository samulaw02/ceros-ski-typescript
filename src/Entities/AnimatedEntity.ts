/**
 * Abstract base class for animated entities in the game.
 * Provides functionality for managing animations and state changes.
 */
import { Entity } from "./Entity";
import { Animation } from "../Core/Animation";
import { ANIMATION_FRAME_SPEED_MS } from "../Constants";


export abstract class AnimatedEntity extends Entity {
    /**
     * The animation that the entity is currently using. Typically matches the state the animated entity is in.
     */
    curAnimation: Animation | null = null;

    /**
     * The current frame of the current animation the entity is on.
     */
    curAnimationFrame: number = 0;

    /**
     * The current frame of the current animation the entity is on.
     */
    curAnimationFrameTime: number = Date.now();

    /**
     * Stores all of the animations available for the different states of the skier.
     */
    animations: { [key: string]: Animation } = {};


    /**
     * Stores all of the animations available for the different states of the skier.
     */
    abstract setupAnimations(): void;


    /**
     * state of the animated entity.
     */
    abstract state: string
    
    /**
     * Set the state and then set a new current animation based upon that state.
     */
    setState(newState: string) {
        this.state = newState;
        this.setAnimation();
    }

    /**
     * Set the current animation, reset to the beginning of the animation and set the proper image to display.
     */
    setAnimation() {
        this.curAnimation = this.animations[this.state];
        if (!this.curAnimation) {
            return;
        }

        this.curAnimationFrame = 0;

        const animateImages = this.curAnimation.getImages();
        this.imageName = animateImages[this.curAnimationFrame];
    }


    /**
     * Advance to the next frame in the current animation if enough time has elapsed since the previous frame.
     */
    animate(gameTime: number) {
        if (!this.curAnimation) {
            return;
        }
        if (gameTime - this.curAnimationFrameTime > ANIMATION_FRAME_SPEED_MS) {
            this.nextAnimationFrame(gameTime);
        }
    }


    /**
     * Increase the current animation frame and update the image based upon the sequence of images for the animation.
     * If the animation isn't looping, then finish the animation instead.
     */
    nextAnimationFrame(gameTime: number) {
        if (!this.curAnimation) {
            return;
        }

        const animationImages = this.curAnimation.getImages();

        this.curAnimationFrameTime = gameTime;
        this.curAnimationFrame++;
        if (this.curAnimationFrame >= animationImages.length) {
            if (!this.curAnimation.getLooping()) {
                this.finishAnimation();
                return;
            }
            this.curAnimationFrame = 0;
        }

        this.imageName = animationImages[this.curAnimationFrame];
    }


    /**
     * The current animation wasn't looping, so finish it by clearing out the current animation and firing the callback.
     */
    finishAnimation() {
        if (!this.curAnimation) {
            return;
        }

        const animationCallback = this.curAnimation.getCallback();
        this.curAnimation = null;

        if (animationCallback) {
            animationCallback.apply(null);
        }
    }
}