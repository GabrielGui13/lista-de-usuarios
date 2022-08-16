import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

export interface AuthUser {
	name: string;
}

interface AuthContextState {
	user: AuthUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

interface AuthContextType extends AuthContextState {
	login: (data: AuthUser) => void;
	logout: () => void;
}

const initialState: AuthContextState = {
	user: null,
	isAuthenticated: false,
	isLoading: true,
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = (props: PropsWithChildren) => {
	const [state, setState] = useState(initialState)
	const navigate = useNavigate()

	useEffect(() => {
		const checkAuthentication = localStorage.getItem('user')

		if (checkAuthentication) {
			setState({
				user: JSON.parse(checkAuthentication),
				isAuthenticated: true,
				isLoading: false
			})
		} else {
			setState({
				user: null,
				isAuthenticated: false,
				isLoading: false
			})
		}
	}, [])

	const login = (data: AuthUser) => {
		setState({
			user: data,
			isAuthenticated: true,
			isLoading: false
		})
		localStorage.setItem('user', JSON.stringify(data))
		navigate('/home')
	}

	const logout = () => {
		setState({
			user: null,
			isAuthenticated: false,
			isLoading: false
		})
		localStorage.removeItem('user')
		navigate('/')
	}
	
	return (
		<AuthContext.Provider value={{ ...state, login, logout }}>
			{props.children}
		</AuthContext.Provider>
	)
}