import { APIRequestContext } from "@playwright/test";

export class CarsController {
    request: APIRequestContext
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async removeCar(carId: string, sid: string) {
        const response = await this.request.delete(`/api/cars/${carId}`, {
            headers: { Cookie: sid }
        });
        return response;
    }

    async addCar(carData: any, sid: string) {
        const response = await this.request.post('/api/cars', {
            data: carData,
            headers: { 'Cookie': sid }
        });
        return response;
    }

    async getCarBrands() {
        const response = await this.request.get('/api/cars/brands');
        return response;
    }
}