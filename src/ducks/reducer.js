const initialState = {
	username: '',
	id: null,
	profilePic: '',
	isLoggedIn: false,
};

const LOGIN_ACCOUNT = 'LOGIN_ACCOUNT';

export function login(id, username, profilePic) {
	return {
		type: LOGIN_ACCOUNT,
		payload: { id, username, profilePic },
	};
}

export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN_ACCOUNT:
			return { ...state, ...action.payload, isLoggedIn: true };
		default:
			return state;
	}
}
