import { Obstacle } from '../src/Entities/Obstacles/Obstacle';
import { IMAGE_NAMES } from '../src/Constants';

// Mock the Canvas and ImageManager classes for testing purposes.
jest.mock('../src/Core/Canvas');
jest.mock('../src/Core/ImageManager');

// Create a mock Canvas instance.
const canvasMock = new (require('../src/Core/Canvas').Canvas)();

// Create a mock ImageManager instance.
const imageManagerMock = new (require('../src/Core/ImageManager').ImageManager)();


describe('Obstacle Tests', () => {
    let generatedObstacleTypes: IMAGE_NAMES[];

    beforeEach(() => {
        generatedObstacleTypes = [];
    });

    afterEach(() => {
        // Clean up any resources if needed
    });

    function generateObstaclesAndTrackTypes(numObstacles: number) {
        const generatedTypes: IMAGE_NAMES[] = [];
        for (let i = 0; i < numObstacles; i++) {
            const obstacle = new Obstacle(0, 0, imageManagerMock, canvasMock);
            generatedTypes.push(obstacle.imageName);
        }
        return generatedTypes;
    }

    it('should generate at least one jump ramp obstacle', () => {
        // Act
        generatedObstacleTypes = generateObstaclesAndTrackTypes(100);

        // Assert
        const jumpRampGenerated = generatedObstacleTypes.includes(IMAGE_NAMES.JUMP_RAMP);
        expect(jumpRampGenerated).toBe(true);
    });

    it('should generate the specified number of obstacles', () => {
        // Arrange
        const numObstaclesToGenerate = 50;

        // Act
        generatedObstacleTypes = generateObstaclesAndTrackTypes(numObstaclesToGenerate);

        // Assert
        expect(generatedObstacleTypes.length).toBe(numObstaclesToGenerate);
    });

    // Add more tests as needed...
});