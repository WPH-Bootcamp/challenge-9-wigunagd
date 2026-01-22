export interface IAuthState {
    isLoggedin: boolean;
    userName: string;
    avatar: string;
    accessToken: string;
}

export interface IRegisterBody {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface ILoginBody {
    email: string;
    password: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface ILoginData {
    user: IUser;
    token: string;
}

export interface ILoginResponse {
    data: ILoginData
}

export interface IRegErrorResponseDetails {
    msg: string;
    path: string;
}

export interface IRegErrorResponse {
    response: {
        data: {
            message: string;
            errors?: IRegErrorResponseDetails[];
        }
    }
}

