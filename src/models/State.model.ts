import { UserDetailsModel } from "./UserDetails.model";

export interface StateModel {
    userDetails: UserDetailsModel,
    userLoggedIn: boolean;
}
