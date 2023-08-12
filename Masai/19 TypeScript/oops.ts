//  Define the DatabaseModel enum and the IModel interface.
enum DatabaseModel {
    users = 'users',
    videos = 'videos',
    notifications = 'notifications',
}

interface IModel {
    model: DatabaseModel;
    id: number;
}

abstract class Model implements IModel {
    model: DatabaseModel;
    id: number;
    static ID: number = 0;
    constructor(model: DatabaseModel) {
        this.model = model;
        this.id = Model.ID++;
    }
}

interface IUserModel extends IModel {
    name: string;
    email: string;
    type: 'Consumer' | 'Creator';
}

abstract class UserModel extends Model implements IUserModel {
    name: string;
    email: string;
    type: 'Consumer' | 'Creator';

    constructor(name: string, email: string, type: 'Consumer' | 'Creator') {
        super(DatabaseModel.users);
        this.name = name;
        this.email = email;
        this.type = type;
    }
}

interface ICreatorModel extends IUserModel {
    noOfSubscribers: number;
}

class CreatorModel extends UserModel implements ICreatorModel {
    noOfSubscribers: number;
    constructor(name: string, email: string) {
        super(name, email, 'Creator');
        this.noOfSubscribers = 0;
        Database.connect().create(DatabaseModel.users, this);
    }

    uploadVideo(link: string, title: string, categories: string[]) {
        new VideoModel(link, title, categories, this.id);

        // Create Notifications
        const cID = this.id;
        const cName = this.name;
        Database.connect()
            .getUsers()
            .forEach((user) => {
                if (user.type === 'Consumer') {
                    if (user.subscibedChannels.includes(cID)) {
                        new NotificationModel(
                            `New Video Uploaded`,
                            `$-${cName}-$ #-${title}-#`,
                            user.id
                        );
                    }
                }
            });
    }
}

interface IConsumerModel extends IUserModel {
    isPremium: boolean;
    subscibedChannels: number[];
}

class ConsumerModel extends UserModel implements IConsumerModel {
    isPremium: boolean;
    subscibedChannels: number[];

    constructor(name: string, email: string) {
        super(name, email, 'Consumer');
        this.isPremium = false;
        this.subscibedChannels = [];
        Database.connect().create(DatabaseModel.users, this);
    }

    viewNotifications(): INotificationModel[] {
        const userID = this.id;
        let notiArr: INotificationModel[] = [];
        Database.connect()
            .getNotifications()
            .forEach(function (noti) {
                if (noti.userID === userID && noti.hasRead === false) {
                    noti.hasRead = true;
                    Database.connect().upsert(
                        DatabaseModel.notifications,
                        noti
                    );
                    notiArr.push(noti);
                }
            });
        return notiArr;
    }

    subscribe(creator: CreatorModel) {
        this.subscibedChannels.push(creator.id);
        Database.connect().upsert(DatabaseModel.users, this);
    }
}

interface IVideoModel extends IModel {
    link: string;
    title: string;
    categories: string[];
    views: number;
    likes: number;
    dislikes: number;
    userID: number;
}

class VideoModel extends Model implements IVideoModel {
    link: string;
    title: string;
    categories: string[];
    views: number;
    likes: number;
    dislikes: number;
    userID: number;

    constructor(
        link: string,
        title: string,
        categories: string[],
        userID: number
    ) {
        super(DatabaseModel.videos);
        this.link = link;
        this.title = title;
        this.categories = categories;
        this.userID = userID;
        this.likes = 0;
        this.dislikes = 0;
        this.views = 0;
        Database.connect().create(DatabaseModel.videos, this);
    }
}

interface INotificationModel extends IModel {
    title: string;
    description: string;
    userID: number;
    hasRead: boolean;
}

class NotificationModel extends Model implements INotificationModel {
    title: string;
    description: string;
    userID: number;
    hasRead: boolean;

    constructor(title: string, description: string, userID: number) {
        super(DatabaseModel.notifications);
        this.title = title;
        this.description = description;
        this.userID = userID;
        this.hasRead = false;
        Database.connect().create(DatabaseModel.notifications, this);
    }
}

class Database {
    static Instance: Database | null = null;
    private users: any[];
    private videos: IVideoModel[];
    private notifications: INotificationModel[];

    private constructor() {
        this.users = [];
        this.videos = [];
        this.notifications = [];
    }

    static connect() {
        if (Database.Instance === null) {
            Database.Instance = new Database();
        }
        return Database.Instance;
    }
    get Users() {
        return this.users;
    }

    get Videos() {
        return this.videos;
    }

    get Notifications() {
        return this.notifications;
    }

    getUsers() {
        return this.users;
    }

    getNotifications() {
        return this.notifications;
    }

    //  CREATE
    create(model: DatabaseModel, data: any) {
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
    }

    // UPSERT
    upsert(model: DatabaseModel, data: any) {
        switch (model) {
            case DatabaseModel.users:
                const i = this.users.findIndex(function (user) {
                    return user.id === data.id;
                });
                if (i !== -1) {
                    this.users[i] = data;
                } else {
                    this.create(model, data);
                }
                break;

            case DatabaseModel.videos:
                const i2 = this.videos.findIndex(function (video) {
                    return video.id === data.id;
                });

                if (i2 !== -1) {
                    this.videos[i2] = data;
                } else {
                    this.create(model, data);
                }
                break;

            case DatabaseModel.notifications:
                const i3 = this.notifications.findIndex(function (noti) {
                    return noti.id === data.id;
                });

                if (i3 !== -1) {
                    this.notifications[i3] = data;
                } else {
                    this.create(model, data);
                }
                break;

            default:
                throw new Error('Invalid Model');
        }
    }

    // DELETE
    delete(model: DatabaseModel, data: any) {
        switch (model) {
            case DatabaseModel.users:
                const i = this.users.findIndex(function (user) {
                    return user.id === data.id;
                });
                if (i === -1) return;
                this.users.splice(i, 1);
                break;

            case DatabaseModel.videos:
                const i2 = this.videos.findIndex(function (video) {
                    return video.id === data.id;
                });
                if (i2 === -1) return;
                this.videos.splice(i2, 1);
                break;

            case DatabaseModel.notifications:
                const i3 = this.notifications.findIndex(function (noti) {
                    return noti.id === data.id;
                });
                if (i3 === -1) return;
                this.notifications.splice(i3, 1);
                break;

            default:
                throw new Error('Invalid Model');
        }
    }
}

let creator1 = new CreatorModel('CodePlusPlus', 'codecode@gmail.com');
let creator2 = new CreatorModel('NewsLive', 'newslive@gmail.com');

let consumer1 = new ConsumerModel('Arpit jana', 'aj@gmail.com');
let consumer2 = new ConsumerModel('Sourav Das', 'sd@gmail.com');

consumer1.subscribe(creator1);
consumer1.subscribe(creator2);
consumer2.subscribe(creator2);

creator1.uploadVideo('youtube.com', 'Learn JavaScript in 5 Hours', ['code']);
creator2.uploadVideo('youtube.com', 'Massive Earthqueake in Japan', ['news']);

// console.log(consumer1.viewNotifications());
console.log(consumer2.viewNotifications());
