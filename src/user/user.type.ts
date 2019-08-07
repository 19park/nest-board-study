export type Login = {
    email: string;
    password: string;
};

export type Register = {
    email: string;
    name: string;
    password: string;
};

export type LoginUserInfo ={
    email: string;
    name: string;
    uuid: string;
    lastLogin: Date;
};

export type UserInfo = {
    uuid: string;
    email: string;
    name: string;
};
