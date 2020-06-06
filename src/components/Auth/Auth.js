import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
			.then(() => this.props.login(username, password))
			.catch((err) => alert('Unable to register'));
	};

	login = (ev) => {
		ev.preventDefault();
		const { username, password } = this.state;
		axios
			.post('auth/login', { username, password })
			.then((res) => {
				const { username, profile_pic } = res.data[0];
				this.props.login(username, profile_pic);
				this.props.history.push('/dashboard');
			})
			.catch((err) => alert('Login unsuccessful'));
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
					<Link to='/dashboard'>
						<input
							type='button'
							value='Register'
							onClick={() => this.register()}
						/>
					</Link>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { login })(Auth);
