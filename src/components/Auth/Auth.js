import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../../ducks/reducer';

class Auth extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
		};
	}
	handleChange = (ev) => {
		this.setState({
			[ev.target.name]: ev.target.value,
		});
	};
	register = () => {
		const { username, password } = this.state;
		axios
			.post('auth/register', { username, password })
			.then((res) => console.log(res.data))
			.catch((err) => alert(err.response.request.response));
	};

	login = (ev) => {
		ev.preventDefault();
		const { username, password } = this.state;
		axios
			.post('auth/login', { username, password })
			.then((res) => {
				const { id, username, profile_pic } = res.data[0];
				this.props.login(id, username, profile_pic);
				this.props.history.push('/dashboard');
			})
			.catch((err) => alert(err.response.request.response));
	};

	render() {
		const { username, password } = this.state;
		return (
			<div>
				<form onSubmit={(ev) => this.login(ev)}>
					<input
						type='text'
						placeholder='username'
						name='username'
						value={username}
						onChange={(ev) => this.handleChange(ev)}
					/>
					<input
						type='password'
						placeholder='password'
						name='password'
						value={password}
						onChange={(ev) => this.handleChange(ev)}
					/>
					<input type='submit' value='Login' />
					<input
						type='button'
						value='Register'
						onClick={() => this.register()}
					/>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { login })(Auth);
