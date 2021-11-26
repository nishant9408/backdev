"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodFacts = void 0;
class FoodFacts {
    static fromObject(builder) {
        const food = new FoodFacts();
        food.status = builder.status;
        food.status_verbose = builder.status_verbose;
        food.product = {
            nutriscore_grade: builder.product.nutriscore_grade || null,
            product_name: builder.product.product_name || null,
            image_front_url: builder.product.image_front_url || null,
            image_front_small_url: builder.product.image_front_small_url || null,
            image_front_thumb_url: builder.product.image_front_thumb_url || null,
            compared_to_category: builder.product.compared_to_category || null,
        };
        return food;
    }
}
exports.FoodFacts = FoodFacts;
//# sourceMappingURL=FoodFacts.js.map