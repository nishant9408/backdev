import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { SQLBigIntToNumberValueTransformer } from '../../common/transformers';
import { wrapNullable } from '../../common/utils';
import { UserEntity } from '../../user/data/UserEntity';

interface InviteTokenEntityBuilder {
    id?: number | null;
    token: string;
    userId: number;
    user: UserEntity;
    createdAt?: Date | null;
    isUsed: boolean;
}

@Entity({ name: 'invite_token' })
export class InviteTokenEntity {
    @PrimaryColumn({
        name: 'id',
        generated: true,
        transformer: new SQLBigIntToNumberValueTransformer(),
    })
    id: number;

    @Column({ name: 'token' })
    token: string;

    @Column({ name: 'user_id', transformer: new SQLBigIntToNumberValueTransformer() })
    userId: number;

    @Column({ name: 'is_used' })
    isUsed: boolean = false;

    @ManyToOne(type => UserEntity, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date = new Date();

    public static fromObject(builder: InviteTokenEntityBuilder): InviteTokenEntity {
        const newToken = new InviteTokenEntity();
        newToken.id = wrapNullable(builder.id);
        newToken.token = builder.token;
        newToken.user = builder.user;
        newToken.userId = builder.userId;
        newToken.isUsed = builder.isUsed;
        if (builder.createdAt != null) {
            newToken.createdAt = builder.createdAt;
        }
        return newToken;
    }
}
