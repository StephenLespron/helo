import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../../ducks/reducer';
import './Auth.css';

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
		if (!username || !password) {
			alert('Please provide a username and password');
		} else {
			axios
				.post('auth/register', { username, password })
				.then(() => {
					this.props.login(username, password);
					this.props.history.push('/dashboard');
				})
				.catch((err) => alert('Unable to register'));
		}
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
			<div className='Auth'>
				<div id='formBox'>
					<img alt='Helo logo' src='./helo_logo.png' />
					<h1 id='helo'>Helo</h1>
					<form onSubmit={(ev) => this.login(ev)}>
						<div>
							Username:
							<input
								className='input'
								type='text'
								placeholder='username'
								name='username'
								value={username}
								onChange={(ev) => this.handleChange(ev)}
							/>
						</div>
						<div>
							<p>Password:</p>
							<input
								className='input'
								type='password'
								placeholder='password'
								name='password'
								value={password}
								onChange={(ev) => this.handleChange(ev)}
							/>
						</div>
						<div id='authBtnBox'>
							<input className='authBtn' type='submit' value='Login' />
							<input
								className='authBtn'
								type='button'
								value='Register'
								onClick={() => this.register()}
							/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { login })(Auth);
