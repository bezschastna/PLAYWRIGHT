
import { test, expect } from '@playwright/test';
import { AuthController } from '../api/controllers/AuthController';
import { CarsController } from '../api/controllers/CarsController';
import { testUsers } from '../test-data/users';

let carsController: CarsController;

test.describe('POST requests', () => {
    let sid: string;
    let createdCar: any;
    let authController: AuthController;

    test.beforeAll('Sign in and check SID cookie', async ({ request }) => {

        authController = new AuthController(request);

        const responseAuth = await authController.signIn(testUsers.email, testUsers.password);
        sid = responseAuth;
    });

    test.beforeEach(async ({ request }) => {
        carsController = new CarsController(request);
    });

    test.afterEach(async () => {

        if (createdCar) {
            let createdCarId = createdCar.data.id;
            const responseCars = await carsController.removeCar(createdCarId, sid);
            expect(responseCars.status()).toBe(200);
            createdCar = undefined;
        }
    });

    test('Verify possibility to add car', async () => {
        const newCar = {
            carBrandId: 3,
            carModelId: 12,
            mileage: 777,
        };

        const response = await carsController.addCar(newCar, sid);
        expect(response.status()).toBe(201);
        createdCar = await response.json();
        expect(createdCar.data.brand).toBe('Ford');
        expect(createdCar.data.model).toBe('Focus');
    });

    test('Verify possibility to add car with maximum valid mileage', async () => {
        const newCar = {
            carBrandId: 3,
            carModelId: 12,
            mileage: 999999
        };

        const response = await carsController.addCar(newCar, sid);

        expect(response.status()).toBe(201);
        createdCar = await response.json();
        console.log(createdCar);
        expect(createdCar.data.mileage).toBe(999999);
    });

    test('Impossible to create car with invalid mileage', async () => {
        const invalidCar = {
            carBrandId: 3,
            carModelId: 12,
            mileage: 1000000
        };

        const response = await carsController.addCar(invalidCar, sid);

        expect(response.status()).toBe(400);
        const body = await response.json();
        console.log(body);
        expect(body.message).toContain('Mileage has to be from 0 to 999999');
    });

    test('Impossible to add car without entering mileage', async () => {
        const invalidCar = {
            carBrandId: 3,
            carModelId: 12
        };

        const response = await carsController.addCar(invalidCar, sid);

        expect(response.status()).toBe(400);
        const body = await response.json();
        console.log(body);
        expect(body.message).toContain('Mileage is required');
    });

});

test.describe('GET requests', () => {

    test.beforeEach(async ({ request }) => {
        carsController = new CarsController(request);
    });

    test('Verify that count of brand is 5', async () => {
        const response = await carsController.getCarBrands();
        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.data.length).toBe(5);
        expect(response.status()).toBe(200);
    });

});

