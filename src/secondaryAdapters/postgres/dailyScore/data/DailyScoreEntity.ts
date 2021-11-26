import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { SQLBigIntToNumberValueTransformer } from '../../../../core/sharedKernel/SQLBigIntToNumberValueTransformer';
import { wrapNullable } from '../../../../core/sharedKernel/wrapNullable';

interface DailyScoreEntityBuilder {
    id?: string | null;
    userId: number;
    sleep?: number | null;
    alert?: string | null;
    heartRate?: number | null;
    restingHeartRate?: number | null;
    steps?: number | null;
    calories?: number | null;
    score?: number | null;
    lightWorkout?: number | null;
    moderateWorkout?: number | null;
    hardWorkout?: number | null;
    totalActivity?: number | null;
    recommendations: string[];
    recommendedCalories: number;
    createdAt?: Date | null;
}

@Entity({ name: 'daily_score' })
export class DailyScoreEntity {
    @PrimaryColumn({
        name: 'id',
        generated: true,
        transformer: new SQLBigIntToNumberValueTransformer(),
    })
    id!: string;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'alert', type: 'text', nullable: true })
    alert: string | null;

    @Column({
        name: 'sleep',
        nullable: true,
        type: 'bigint',
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    })
    sleep: number;

    @Column({
        name: 'heart_rate',
        nullable: true,
        type: 'bigint',
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    })
    heartRate: number;

    @Column({
        name: 'resting_heart_rate',
        nullable: true,
        type: 'bigint',
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    })
    restingHeartRate: number;

    @Column({
        name: 'steps',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    })
    steps: number;

    @Column({
        name: 'calories',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    })
    calories: number;

    @Column({ name: 'score', nullable: true })
    score: number;

    @Column({
        name: 'light_workout',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    })
    lightWorkout: number;

    @Column({
        name: 'moderate_workout',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    })
    moderateWorkout: number;

    @Column({
        name: 'hard_workout',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    })
    hardWorkout: number;

    @Column({
        name: 'total_activity',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    })
    totalActivity: number;

    @Column({
        name: 'recommendations',
        type: 'text',
        array: true,
    })
    recommendations: string[];

    @Column({
        name: 'recommended_calories',
        nullable: true,
        transformer: {
            to: v => v,
            from: value => parseInt(value, 10),
        },
    })
    recommendedCalories: number;

    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date = new Date();

    public static fromObject(builder: DailyScoreEntityBuilder): DailyScoreEntity {
        const entity = new DailyScoreEntity();
        entity.id = wrapNullable(builder.id);
        entity.userId = builder.userId;
        entity.sleep = wrapNullable(builder.sleep);
        entity.calories = wrapNullable(builder.calories);
        entity.steps = wrapNullable(builder.steps);
        entity.heartRate = wrapNullable(builder.heartRate);
        entity.restingHeartRate = wrapNullable(builder.restingHeartRate);
        entity.score = wrapNullable(builder.score);
        entity.alert = wrapNullable(builder.alert);
        entity.recommendations = builder.recommendations;
        entity.recommendedCalories = wrapNullable(builder.recommendedCalories);
        entity.lightWorkout = wrapNullable(builder.lightWorkout);
        entity.moderateWorkout = wrapNullable(builder.moderateWorkout);
        entity.hardWorkout = wrapNullable(builder.hardWorkout);
        entity.totalActivity = wrapNullable(builder.totalActivity);
        if (builder.createdAt !== null) {
            entity.createdAt = wrapNullable(builder.createdAt);
        }
        return entity;
    }
}
