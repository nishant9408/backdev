"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Health = void 0;
class Health {
    static fromObject(builder) {
        const data = new Health();
        data.id = builder.id || null;
        data.userId = builder.userId;
        data.dateOfBirth = builder.dateOfBirth;
        data.gender = builder.gender;
        data.stepCount = builder.stepCount;
        data.workoutCount = builder.workoutCount;
        data.updatedAt = builder.updatedAt || null;
        data.createdAt = builder.createdAt || null;
        return data;
    }
}
exports.Health = Health;
//# sourceMappingURL=Health.js.map