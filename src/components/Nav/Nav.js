import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { logout, getAccount } from '../../ducks/reducer';
import { connect } from 'react-redux';
import './Nav.css';

class Nav extends Component {
	componentDidUpdate() {
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
			<div>
				{this.props.isLoggedIn ? (
					<div id='Nav'>
						<div id='topNavBox'>
							<img
								alt='profile pic'
								src={`https://robohash.org/${this.props.username}.png`}
							/>
							<h3>{this.props.username}</h3>
							<Link to='/dashboard'>
								<input type='button' className='homeBtn' />
							</Link>
							<Link to='/new'>
								<input type='button' className='newPostBtn' />
							</Link>
						</div>
						<div>
							<Link to='/'>
								<input
									type='button'
									className='logoutBtn'
									onClick={() => this.logout()}
								/>
							</Link>
						</div>
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
