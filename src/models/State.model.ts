import { RouletteDetailsModel } from "./RouletteDetails.model";
import { UserDetailsModel } from "./UserDetails.model";

export interface StateModel {
    userDetails: UserDetailsModel,
    userLoggedIn: boolean;
    rouletteDetails: RouletteDetailsModel,
}
