import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';

class Nav extends Component {
	render() {
		return (
			<div id='Nav'>
				{this.props.isLoggedIn ? (
					<div>
						<img alt='profile pic' src={this.props.profilePic} />
						<h3>{this.props.username}</h3>
						<Link to='/dashboard'>
							<button>Home</button>
						</Link>
						<Link to='/new'>
							<button>New Post</button>
						</Link>
						<Link to='/'>
							<button>Logout</button>
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

export default connect(mapStateToProps)(Nav);
