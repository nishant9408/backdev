export interface FoodFactsBuilder {
    status: number;
    status_verbose: string;
    product: {
        product_name?: string;
        nutriscore_grade?: string;
        image_front_url?: string;
        image_front_small_url?: string;
        image_front_thumb_url?: string;
        compared_to_category?: string;
    };
}

export class FoodFacts {
    status: number;
    status_verbose: string;
    product: {
        product_name: string | null;
        nutriscore_grade: string | null;
        image_front_url: string | null;
        image_front_small_url: string | null;
        image_front_thumb_url: string | null;
        compared_to_category: string | null;
    };

    public static fromObject(builder: FoodFactsBuilder): FoodFacts {
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
