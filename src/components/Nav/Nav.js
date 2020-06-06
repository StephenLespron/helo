import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { logout, getAccount } from '../../ducks/reducer';
import { connect } from 'react-redux';
import './Nav.css';

class Nav extends Component {
	componentDidMount() {
		this.props.getAccount();
	}

	logout() {
		axios
			.post('auth/logout')
			.then(() => {
				this.props.logout();
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div id='Nav'>
				{this.props.isLoggedIn ? (
					<div>
						<img
							alt='profile pic'
							src={`https://robohash.org/${this.props.username}.png`}
						/>
						<h3>{this.props.username}</h3>
						<Link to='/dashboard'>
							<button>Home</button>
						</Link>
						<Link to='/new'>
							<button>New Post</button>
						</Link>
						<Link to='/'>
							<button onClick={() => this.logout()}>Logout</button>
						</Link>
					</div>
				) : (
					<div></div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { logout, getAccount })(Nav);
