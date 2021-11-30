import { HealthCondition } from '../../../../core/data/HealthCondition';
import { Region } from '../../../../core/data/Region';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { Diet } from '../../../../core/data/Diet';
import { Food } from '../../../../core/data/Food';
import { GenderType } from '../../../../core/data/GenderType';

import { SQLBigIntToNumberValueTransformer } from '../../common/transformers';
import { wrapNullable } from '../../common/utils';

interface UserEntityObject {
    id?: number | null | undefined;
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
    averageSleepingTime: number;
    diet: Diet;
    foods: Food[];
    timezone: string;
    notificationToken: string;
    createdAt?: Date | null | undefined;
    deletedAt?: Date | null | undefined;
    healthCondition: HealthCondition;
    region: Region;
    country: string;
}

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryColumn({
        name: 'id',
        generated: true,
        transformer: new SQLBigIntToNumberValueTransformer(),
    })
    id!: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'age' })
    age: number;

    @Column({ name: 'gender' })
    gender: GenderType;

    @Column({ name: 'height' })
    height: number;

    @Column({ name: 'weight' })
    weight: number;

    @Column({ name: 'target_weight' })
    targetWeight: number;

    @Column({ name: 'weight_loss_intensity' })
    weightLossIntensity: number;

    @Column({ name: 'average_sleeping_time' })
    averageSleepingTime: number;

    @Column({ name: 'food_intolerance', array: true, type: 'text' })
    foodIntolerance: string[];

    @Column({ name: 'timezone' })
    timezone: string;

    @Column({ name: 'notification_token' })
    notificationToken: string;

    @Column({ name: 'diet', type: 'enum', enum: Diet })
    diet: Diet;

    @Column({ name: 'foods', array: true, type: 'enum', enum: Food })
    foods: Food[];

    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date = new Date();

    @CreateDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null = null;

    @Column({ name: 'healthcondition', type: 'enum', enum: HealthCondition })
    healthCondition: HealthCondition;

    @Column({ name: 'region', type: 'enum', enum: Region })
    region: Region;

    @Column({ name: 'country' })
    country: string;

    public static fromObject(builder: UserEntityObject): UserEntity {
        const newUser = new UserEntity();
        newUser.id = wrapNullable(builder.id);
        newUser.notificationToken = builder.notificationToken;
        newUser.timezone = builder.timezone;
        newUser.name = builder.name;
        newUser.email = builder.email;
        newUser.password = wrapNullable(builder.password);
        newUser.age = wrapNullable(builder.age);
        newUser.gender = builder.gender;
        newUser.foodIntolerance = builder.foodIntolerance;
        newUser.foods = builder.foods;
        newUser.averageSleepingTime = builder.averageSleepingTime;
        newUser.diet = builder.diet;
        newUser.height = builder.height;
        newUser.weightLossIntensity = builder.weightLossIntensity;
        newUser.weight = builder.weight;
        newUser.targetWeight = builder.targetWeight;
        if (builder.deletedAt != null) {
            newUser.deletedAt = builder.deletedAt;
        }
        if (builder.createdAt != null) {
            newUser.createdAt = builder.createdAt;
        }
        newUser.healthCondition = builder.healthCondition;
        newUser.region = builder.region;
        newUser.country = builder.country;
        
        return newUser;
    }
}
