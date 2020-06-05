import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			search: '',
			includeMyPosts: true,
			posts: [],
		};
	}

	getPosts() {
		axios
			.get(
				`api/posts/${this.props.id}?includeMyPosts=${this.state.includeMyPosts}&search=${this.state.search}`
			)
			.then((res) =>
				this.setState({
					posts: res.data,
				})
			)
			.catch((err) => err.response.request.response);
	}
	componentDidMount() {
		this.getPosts();
	}

	changeIncludePosts() {
		this.state.includeMyPosts
			? this.setState({
					includeMyPosts: false,
			  })
			: this.setState({ includeMyPosts: true });
		this.getPosts();
	}

	changeSearch(ev) {
		this.setState({
			search: ev.target.value,
		});
		this.getPosts();
	}

	resetSearch() {
		this.setState({
			search: '',
		});
		this.getPosts();
	}

	render() {
		const posts = this.state.posts.map((elem) => {
			return (
				<div key={elem.id}>
					<Link to={`post/${elem.id}`}>
						<h3>{elem.title}</h3>
					</Link>
					<h4>{elem.username}</h4>
					<img alt='profile pic' src={elem.profile_pic} />
				</div>
			);
		});
		return (
			<div>
				<form onSubmit={() => this.getPosts()}>
					<input
						type='text'
						placeholder='Search posts'
						name='search'
						onChange={(ev) => this.changeSearch(ev)}
					/>
					<button type='submit'>Search</button>
					<button onClick={() => this.resetSearch()}>Reset</button>
				</form>
				<div>
					My Posts
					<input
						type='checkbox'
						checked={this.state.includeMyPosts}
						onChange={() => this.changeIncludePosts()}
					/>
				</div>
				{posts}
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Dashboard);
