import { Healthcondition } from '../../../data/Healthcondition';
import { Diet } from '../../../data/Diet';
import { Food } from '../../../data/Food';
import { GenderType } from '../../../data/GenderType';
import { Region } from '../../../data/Region';

interface UserBuilder {
    id?: number | undefined | null;
    name: string;
    email: string;
    password: string;
    age: number;
    gender: GenderType;
    height: number;
    weight: number;
    targetWeight: number;
    weightLossIntensity: number;
    foodIntolerance: string[];
    diet: Diet;
    foods: Food[];
    timezone: string;
    healthcondition: Healthcondition;
    region: Region;
    // latitude: number;
    // longitude: number;
    notificationToken: string;
    averageSleepingTime: number;
    createdAt?: Date | null | undefined;
    deletedAt?: Date | null | undefined;
}

export class User {
    id: number | null;
    name: string;
    email: string;
    password: string;
    timezone: string;
    // latitude: number;
    // longitude: number;
    notificationToken: string;
    age: number;
    gender: GenderType;
    height: number;
    weight: number;
    targetWeight: number;
    weightLossIntensity: number;
    foodIntolerance: string[];
    diet: Diet;
    healthcondition: Healthcondition;
    region: Region;
    foods: Food[];
    averageSleepingTime: number;
    createdAt?: Date | null;
    deletedAt?: Date | null;

    public static fromObject(builder: UserBuilder): User {
        const user = new User();
        user.id = builder.id || null;
        user.timezone = builder.timezone;
        // user.latitude = builder.latitude;
        // user.longitude = builder.longitude;
        user.notificationToken = builder.notificationToken;
        user.name = builder.name;
        user.email = builder.email;
        user.age = builder.age;
        user.password = builder.password;
        user.gender = builder.gender;
        user.foodIntolerance = builder.foodIntolerance;
        user.foods = builder.foods;
        user.diet = builder.diet;
        user.healthcondition = builder.healthcondition;
        user.region = builder.region;
        user.height = builder.height;
        user.averageSleepingTime = builder.averageSleepingTime;
        user.weightLossIntensity = builder.weightLossIntensity;
        user.weight = builder.weight;
        user.targetWeight = builder.targetWeight;
        user.createdAt = builder.createdAt || null;
        user.deletedAt = builder.deletedAt || null;
        return user;
    }
}
