import { Skier } from '../src/Entities/Skier';
import { ImageManager } from '../src/Core/ImageManager';
import { Canvas } from '../src/Core/Canvas'; 
import { IMAGE_NAMES, ANIMATION_FRAME_SPEED_MS } from "../src/Constants";
import { Obstacle } from '../src/Entities/Obstacles/Obstacle';
import { ObstacleManager } from '../src/Entities/Obstacles/ObstacleManager';
import { Rect, intersectTwoRects } from "../src/Core/Utils";

// Mock the Canvas, ImageManager and ObstacleManager classes for testing purposes.
jest.mock('../src/Core/Canvas');
jest.mock('../src/Core/ImageManager');
jest.mock('../src/Entities/Obstacles/ObstacleManager');


describe("Skier", () => {
  let skier: Skier;
  let obstacle: Obstacle

  beforeEach(() => {
    // Create a mock Canvas instance.
    const canvasMock = new (require('../src/Core/Canvas').Canvas)();

    // Create a mock ImageManager instance.
    const imageManagerMock = new (require('../src/Core/ImageManager').ImageManager)();
    
    // Create a mock ObstacleManager instance.
    const obstacleManagerMock = new (require('../src/Entities/Obstacles/ObstacleManager').ObstacleManager)();


    // Create a mock ObstacleManager instance.

    // Initialize the Skier instance with proper dependencies
    skier = new Skier(50, 50, imageManagerMock, obstacleManagerMock, canvasMock);
    obstacle = new Obstacle(50, 50, imageManagerMock, canvasMock);
  });


  it('should perform a flip while jumping', () => {
    // Set the skier's state to "jumping"
    skier.setState('jumping');
  
    // Store the initial image name
    const initialImage = skier.imageName;
  
    // Simulate the first animation frame
    const firstFrameTime = Date.now();

    // Simulate jumping through several frames
    const finalFrameTime = firstFrameTime + ANIMATION_FRAME_SPEED_MS * 5;
    skier.animate(finalFrameTime);
  
    // Get the final image after jumping
    const finalImage = skier.imageName;
  
    // Final image should not be the same as the initial, completing a flip
    expect(finalImage).not.toBe(initialImage);
  });

  
  it("should be able to jump over rocks while jumping", () => {
    skier.setState("jumping");
    obstacle.imageName = IMAGE_NAMES.ROCK1; // or IMAGE_NAMES.ROCK2

    //Simulate jumping through several frames.
    const firstFrameTime = Date.now();
    const finalFrameTime = firstFrameTime + ANIMATION_FRAME_SPEED_MS * 5;
    skier.animate(finalFrameTime);


    // Skier should not crash when jumping over a rock
    expect(skier.isCrashed()).toBe(false);
  });


  it('should detect intersection between two rectangles', () => {
    // Define the coordinates and dimensions of two rectangles
    const rect1 = new Rect(0, 0, 50, 50); // Rect1: Top-left (0, 0), Bottom-right (50, 50)
    const rect2 = new Rect(25, 25, 75, 75); // Rect2: Top-left (25, 25), Bottom-right (75, 75)

    // Check if the two rectangles intersect
    const isIntersecting = intersectTwoRects(rect1, rect2);

    // Expect the result to be true, as the rectangles do intersect
    expect(isIntersecting).toBe(true);
  });
  
  
});