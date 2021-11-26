export interface ActivityBuilder {
    calories: number;
}

export class Activity {
    calories: number;

    public static fromObject(builder: ActivityBuilder): Activity {
        const data = new Activity();
        data.calories = builder.calories;
        return data;
    }
}
