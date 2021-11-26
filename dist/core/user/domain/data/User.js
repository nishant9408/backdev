"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    static fromObject(builder) {
        const user = new User();
        user.id = builder.id || null;
        user.timezone = builder.timezone;
        user.notificationToken = builder.notificationToken;
        user.name = builder.name;
        user.email = builder.email;
        user.age = builder.age;
        user.password = builder.password;
        user.gender = builder.gender;
        user.foodIntolerance = builder.foodIntolerance;
        user.foods = builder.foods;
        user.diet = builder.diet;
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
exports.User = User;
//# sourceMappingURL=User.js.map