"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodInformationMapperType = exports.FoodInformationMapper = void 0;
const FoodInformation_1 = require("../../../core/data/FoodInformation");
const FoodScore_1 = require("../../../core/data/FoodScore");
class FoodInformationMapper {
    map(from) {
        const { product } = from;
        return FoodInformation_1.FoodInformation.fromObject({
            nutritionScore: product.nutriscore_grade ? FoodScore_1.FoodScore[product.nutriscore_grade.toUpperCase()] : null,
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
exports.FoodInformationMapper = FoodInformationMapper;
const FoodInformationMapperType = Symbol.for('FoodInformationMapper');
exports.FoodInformationMapperType = FoodInformationMapperType;
//# sourceMappingURL=FoodInformationMapper.js.map