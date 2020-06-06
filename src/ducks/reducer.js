import axios from 'axios';

const initialState = {
	username: '',
	profilePic: '',
	isLoggedIn: false,
};

const LOGIN_ACCOUNT = 'LOGIN_ACCOUNT',
	LOGOUT_ACCOUNT = 'LOGOUT_ACCOUNT',
	GET_ACCOUNT = 'GET_ACCOUNT';

export function login(username, profilePic) {
	return {
		type: LOGIN_ACCOUNT,
		payload: { username, profilePic },
	};
}

export function logout() {
	return {
		type: LOGOUT_ACCOUNT,
		payload: initialState,
	};
}

export function getAccount() {
	let account;
	axios
		.get('auth/me')
		.then((res) => (account = res.data))
		.catch((err) => console.log('Not logged in'));

	return { type: GET_ACCOUNT, payload: account };
}

export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN_ACCOUNT:
			return { ...state, ...action.payload, isLoggedIn: true };
		case LOGOUT_ACCOUNT:
			return { ...state, ...action.payload };
		case GET_ACCOUNT + '_PENDING':
			return state;
		case GET_ACCOUNT + '_FULFILLED':
			return { ...state, ...action.payload, isLoggedIn: true };
		case GET_ACCOUNT + '_REJECTED':
			return { initialState };
		default:
			return initialState;
	}
}
