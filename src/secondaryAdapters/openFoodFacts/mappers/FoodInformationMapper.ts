import { FoodInformation } from '../../../core/data/FoodInformation';
import { FoodScore } from '../../../core/data/FoodScore';
import { Mapper } from '../../../core/sharedKernel/interfaces/Mapper';
import { FoodFacts } from '../data/FoodFacts';

export class FoodInformationMapper implements Mapper<FoodFacts, FoodInformation> {
    public map(from: FoodFacts): FoodInformation {
        const { product } = from;

        return FoodInformation.fromObject({
            nutritionScore: product.nutriscore_grade ? FoodScore[product.nutriscore_grade.toUpperCase()]  : null,
            productName: product.product_name,
            images: {
                large: product.image_front_url,
                medium: product.image_front_small_url,
                small: product.image_front_thumb_url,
            },
            basicCategory: product.compared_to_category ? product.compared_to_category.replace(/^.+[:]/gm, '') : null,
        });
    }
}

const FoodInformationMapperType = Symbol.for('FoodInformationMapper');
export { FoodInformationMapperType };
