import { User } from "./user";

export interface LoginSuccessResponse {
    user: User;
    access_token: string;
    error ?: string;
}

