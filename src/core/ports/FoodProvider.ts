import { FoodInformation } from '../data/FoodInformation';

export interface FoodProvider {
    getInfo(barcode: string): Promise<FoodInformation | null>;
}

const FoodProviderType = Symbol.for('FoodProvider');
export { FoodProviderType };
