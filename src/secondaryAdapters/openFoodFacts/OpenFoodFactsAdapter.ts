import { Inject, Injectable } from '@nestjs/common';
import * as https from 'https';
import { FoodInformation } from '../../core/data/FoodInformation';
import { FoodProvider } from '../../core/ports/FoodProvider';
import { FoodFacts } from './data/FoodFacts';
import { FoodInformationMapper, FoodInformationMapperType } from './mappers/FoodInformationMapper';

@Injectable()
export class OpenFoodFactsAdapter implements FoodProvider {
    constructor(
        @Inject(FoodInformationMapperType)
        private readonly foodInformationMapper: FoodInformationMapper,
    ) { }

    public async getInfo(barcode: string): Promise<FoodInformation | null> {
        const link = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

        const foodInformation: FoodFacts | null = await new Promise((resolve, reject) => {
            https.get(link, (resp) => {
                let data = '';
                resp.on('data', chunk => data += chunk);
                resp.on('end', () => {
                    const parsedData = JSON.parse(data);
                    return parsedData['status'] ? resolve(FoodFacts.fromObject(parsedData)) : resolve(null);
                });
            }).on('error', err => reject('Error: ' + err.message));
        });
        return foodInformation ? this.foodInformationMapper.map(foodInformation) : null;
    }
}
