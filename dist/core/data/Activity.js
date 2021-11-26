"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
class Activity {
    static fromObject(builder) {
        const data = new Activity();
        data.calories = builder.calories;
        return data;
    }
}
exports.Activity = Activity;
//# sourceMappingURL=Activity.js.map