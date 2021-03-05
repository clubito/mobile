import React from "react";

type Dispatch = {
	signInSuccess: Function;
	logOutSuccess: Function;
};

export const AuthContext = React.createContext<Dispatch>({} as Dispatch);
