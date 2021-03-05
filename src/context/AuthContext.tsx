import React from "react";

type Dispatch = {
	signInSuccess: Function;
	profileSetupSuccess: Function;
};

export const AuthContext = React.createContext<Dispatch>({} as Dispatch);
