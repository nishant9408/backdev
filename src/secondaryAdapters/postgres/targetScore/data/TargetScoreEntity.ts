import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { SQLBigIntToNumberValueTransformer } from '../../../../core/sharedKernel/SQLBigIntToNumberValueTransformer';
import { wrapNullable } from '../../../../core/sharedKernel/wrapNullable';

interface TargetScoreEntityBuilder {
    id?: number | null;
    userId: number;
    planScore: number;
    currentScore: number;
    monthlyScore: number;
    averageCalories: number;
    planCalories: number;
    averageActivity: number;
    period: number;
    recommendations: string[];
    planActivity: number;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}

@Entity({ name: 'target_score' })
export class TargetScoreEntity {
    @PrimaryColumn({
        name: 'id',
        generated: true,
        transformer: new SQLBigIntToNumberValueTransformer(),
    })
    id!: number;

    @Column({ name: 'user_id', transformer: new SQLBigIntToNumberValueTransformer() })
    userId: number;

    @Column({ name: 'plan_score', type: 'double precision' })
    planScore: number;

    @Column({ name: 'current_score', type: 'double precision' })
    currentScore: number;

    @Column({ name: 'monthly_score', type: 'double precision' })
    monthlyScore: number;

    @Column({ name: 'period', type: 'integer' })
    period: number;

    @Column({ name: 'average_calories', type: 'double precision' })
    averageCalories: number;

    @Column({ name: 'plan_calories', type: 'double precision' })
    planCalories: number;

    @Column({ name: 'average_activity', type: 'bigint', transformer: new SQLBigIntToNumberValueTransformer() })
    averageActivity: number;

    @Column({ name: 'plan_activity', type: 'bigint', transformer: new SQLBigIntToNumberValueTransformer() })
    planActivity: number;

    @Column({ name: 'recommendations', type: 'text', array: true })
    recommendations: string[];

    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt?: Date = new Date();

    @CreateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt?: Date = new Date();

    @CreateDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    public static fromObject(builder: TargetScoreEntityBuilder): TargetScoreEntity {
        const entity = new TargetScoreEntity();
        entity.id = wrapNullable(builder.id);
        entity.userId = builder.userId;
        entity.planScore = builder.planScore;
        entity.currentScore = builder.currentScore;
        entity.recommendations = builder.recommendations;
        entity.monthlyScore = builder.monthlyScore;
        entity.period = builder.period;
        entity.averageCalories = builder.averageCalories;
        entity.planCalories = builder.planCalories;
        entity.averageActivity = builder.averageActivity;
        entity.planActivity = builder.planActivity;
        if (builder.createdAt !== null) {
            entity.createdAt = wrapNullable(builder.createdAt);
        }
        if (builder.updatedAt !== null) {
            entity.updatedAt = wrapNullable(builder.updatedAt);
        }
        if (builder.deletedAt !== null) {
            entity.deletedAt = wrapNullable(builder.deletedAt);
        }
        return entity;
    }
}
