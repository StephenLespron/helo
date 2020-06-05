import axios from 'axios';

const initialState = {
	username: '',
	id: null,
	profilePic: '',
	isLoggedIn: false,
};

const LOGIN_ACCOUNT = 'LOGIN_ACCOUNT',
	LOGOUT_ACCOUNT = 'LOGOUT_ACCOUNT',
	GET_USER = 'GET_USER';

export function login(id, username, profilePic) {
	return {
		type: LOGIN_ACCOUNT,
		payload: { id, username, profilePic },
	};
}

export function logout() {
	return {
		type: LOGOUT_ACCOUNT,
		payload: initialState,
	};
}

// export function getUser() {
// 	const user = axios.get('auth/user');

// 	return { type: GET_USER, payload: user };
// }

export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN_ACCOUNT:
			return { ...state, ...action.payload, isLoggedIn: true };
		case LOGOUT_ACCOUNT:
			return { ...action.payload, isLoggedIn: false };
		default:
			return state;
	}
}
