import { User } from "./user";

export interface SignupSuccessResponse {
    user: User;
    access_token: string;
}
