var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//  Define the DatabaseModel enum and the IModel interface.
var DatabaseModel;
(function (DatabaseModel) {
    DatabaseModel["users"] = "users";
    DatabaseModel["videos"] = "videos";
    DatabaseModel["notifications"] = "notifications";
})(DatabaseModel || (DatabaseModel = {}));
var Model = /** @class */ (function () {
    function Model(model) {
        this.model = model;
        this.id = Model.ID++;
    }
    Model.ID = 0;
    return Model;
}());
var UserModel = /** @class */ (function (_super) {
    __extends(UserModel, _super);
    function UserModel(name, email, type) {
        var _this = _super.call(this, DatabaseModel.users) || this;
        _this.name = name;
        _this.email = email;
        _this.type = type;
        return _this;
    }
    return UserModel;
}(Model));
var CreatorModel = /** @class */ (function (_super) {
    __extends(CreatorModel, _super);
    function CreatorModel(name, email) {
        var _this = _super.call(this, name, email, 'Creator') || this;
        _this.noOfSubscribers = 0;
        Database.connect().create(DatabaseModel.users, _this);
        return _this;
    }
    CreatorModel.prototype.uploadVideo = function (link, title, categories) {
        new VideoModel(link, title, categories, this.id);
        // Create Notifications
        var cID = this.id;
        var cName = this.name;
        Database.connect()
            .getUsers()
            .forEach(function (user) {
            if (user.type === 'Consumer') {
                if (user.subscibedChannels.includes(cID)) {
                    new NotificationModel("New Video Uploaded", "$-".concat(cName, "-$ #-").concat(title, "-#"), user.id);
                }
            }
        });
    };
    return CreatorModel;
}(UserModel));
var ConsumerModel = /** @class */ (function (_super) {
    __extends(ConsumerModel, _super);
    function ConsumerModel(name, email) {
        var _this = _super.call(this, name, email, 'Consumer') || this;
        _this.isPremium = false;
        _this.subscibedChannels = [];
        Database.connect().create(DatabaseModel.users, _this);
        return _this;
    }
    ConsumerModel.prototype.viewNotifications = function () {
        var userID = this.id;
        var notiArr = [];
        Database.connect()
            .getNotifications()
            .forEach(function (noti) {
            if (noti.userID === userID && noti.hasRead === false) {
                noti.hasRead = true;
                Database.connect().upsert(DatabaseModel.notifications, noti);
                notiArr.push(noti);
            }
        });
        return notiArr;
    };
    ConsumerModel.prototype.subscribe = function (creator) {
        this.subscibedChannels.push(creator.id);
        Database.connect().upsert(DatabaseModel.users, this);
    };
    return ConsumerModel;
}(UserModel));
var VideoModel = /** @class */ (function (_super) {
    __extends(VideoModel, _super);
    function VideoModel(link, title, categories, userID) {
        var _this = _super.call(this, DatabaseModel.videos) || this;
        _this.link = link;
        _this.title = title;
        _this.categories = categories;
        _this.userID = userID;
        _this.likes = 0;
        _this.dislikes = 0;
        _this.views = 0;
        Database.connect().create(DatabaseModel.videos, _this);
        return _this;
    }
    return VideoModel;
}(Model));
var NotificationModel = /** @class */ (function (_super) {
    __extends(NotificationModel, _super);
    function NotificationModel(title, description, userID) {
        var _this = _super.call(this, DatabaseModel.notifications) || this;
        _this.title = title;
        _this.description = description;
        _this.userID = userID;
        _this.hasRead = false;
        Database.connect().create(DatabaseModel.notifications, _this);
        return _this;
    }
    return NotificationModel;
}(Model));
var Database = /** @class */ (function () {
    function Database() {
        this.users = [];
        this.videos = [];
        this.notifications = [];
    }
    Database.connect = function () {
        if (Database.Instance === null) {
            Database.Instance = new Database();
        }
        return Database.Instance;
    };
    Object.defineProperty(Database.prototype, "Users", {
        get: function () {
            return this.users;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Database.prototype, "Videos", {
        get: function () {
            return this.videos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Database.prototype, "Notifications", {
        get: function () {
            return this.notifications;
        },
        enumerable: false,
        configurable: true
    });
    Database.prototype.getUsers = function () {
        return this.users;
    };
    Database.prototype.getNotifications = function () {
        return this.notifications;
    };
    //  CREATE
    Database.prototype.create = function (model, data) {
        switch (model) {
            case DatabaseModel.users:
                this.users.push(data);
                break;
            case DatabaseModel.notifications:
                this.notifications.push(data);
                break;
            case DatabaseModel.videos:
                this.videos.push(data);
                break;
            default:
                throw new Error('Invalid Model');
        }
    };
    // UPSERT
    Database.prototype.upsert = function (model, data) {
        switch (model) {
            case DatabaseModel.users:
                var i = this.users.findIndex(function (user) {
                    return user.id === data.id;
                });
                if (i !== -1) {
                    this.users[i] = data;
                }
                else {
                    this.create(model, data);
                }
                break;
            case DatabaseModel.videos:
                var i2 = this.videos.findIndex(function (video) {
                    return video.id === data.id;
                });
                if (i2 !== -1) {
                    this.videos[i2] = data;
                }
                else {
                    this.create(model, data);
                }
                break;
            case DatabaseModel.notifications:
                var i3 = this.notifications.findIndex(function (noti) {
                    return noti.id === data.id;
                });
                if (i3 !== -1) {
                    this.notifications[i3] = data;
                }
                else {
                    this.create(model, data);
                }
                break;
            default:
                throw new Error('Invalid Model');
        }
    };
    // DELETE
    Database.prototype.delete = function (model, data) {
        switch (model) {
            case DatabaseModel.users:
                var i = this.users.findIndex(function (user) {
                    return user.id === data.id;
                });
                if (i === -1)
                    return;
                this.users.splice(i, 1);
                break;
            case DatabaseModel.videos:
                var i2 = this.videos.findIndex(function (video) {
                    return video.id === data.id;
                });
                if (i2 === -1)
                    return;
                this.videos.splice(i2, 1);
                break;
            case DatabaseModel.notifications:
                var i3 = this.notifications.findIndex(function (noti) {
                    return noti.id === data.id;
                });
                if (i3 === -1)
                    return;
                this.notifications.splice(i3, 1);
                break;
            default:
                throw new Error('Invalid Model');
        }
    };
    Database.Instance = null;
    return Database;
}());
var creator1 = new CreatorModel('CodePlusPlus', 'codecode@gmail.com');
var creator2 = new CreatorModel('NewsLive', 'newslive@gmail.com');
var consumer1 = new ConsumerModel('Arpit jana', 'aj@gmail.com');
var consumer2 = new ConsumerModel('Sourav Das', 'sd@gmail.com');
consumer1.subscribe(creator1);
consumer1.subscribe(creator2);
consumer2.subscribe(creator2);
creator1.uploadVideo('youtube.com', 'Learn JavaScript in 5 Hours', ['code']);
creator2.uploadVideo('youtube.com', 'Massive Earthqueake in Japan', ['news']);
// console.log(consumer1.viewNotifications());
console.log(consumer2.viewNotifications());
