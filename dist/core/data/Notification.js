"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.NotificationPriority = void 0;
var NotificationPriority;
(function (NotificationPriority) {
    NotificationPriority["NORMAL"] = "normal";
    NotificationPriority["HIGH"] = "high";
})(NotificationPriority = exports.NotificationPriority || (exports.NotificationPriority = {}));
class Notification {
    static fromObject(builder) {
        const notification = new Notification();
        notification.token = builder.token;
        notification.apnsPriority = builder.apnsPriority || null;
        notification.body = builder.body || null;
        notification.title = builder.title || null;
        notification.data = builder.data || null;
        return notification;
    }
}
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map