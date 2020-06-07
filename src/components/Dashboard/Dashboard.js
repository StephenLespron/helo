import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			search: '',
			includeMyPosts: true,
			posts: [],
		};

		this.deletePost = this.deletePost.bind(this);
	}

	getPosts(includeMyPosts, search) {
		axios
			.get(`api/posts/?includeMyPosts=${includeMyPosts}&search=${search}`)
			.then((res) =>
				this.setState({
					posts: res.data,
				})
			)
			.catch((err) => err.response.request.response);
	}
	componentDidMount() {
		this.getPosts(true, ``);
		console.log('remounted');
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.posts !== this.state.posts) {
			// this.getPosts();
			console.log(prevState.posts, this.state.posts);
		}
	}

	changeIncludePosts() {
		if (this.state.includeMyPosts) {
			this.setState({
				includeMyPosts: false,
				posts: this.state.posts.filter(
					(elem) => elem.username === this.props.username
				),
			});
		} else {
			this.setState(
				{
					includeMyPosts: true,
				},
				() => {
					this.getPosts(true, this.state.search);
				}
			);
		}
	}

	changeSearch(ev) {
		ev.preventDefault();
		this.setState({
			search: ev.target.value,
		});
	}

	resetSearch() {
		this.setState({
			search: '',
			includeMyPosts: true,
		});
	}

	deletePost(id) {
		axios
			.delete(`api/post/${id}`)
			.then(() => console.log('post deleted'))
			.catch((err) => console.log(err));
	}

	render() {
		const posts = this.state.posts.map((elem) => {
			return (
				<div key={elem.id}>
					<Link
						to={{
							pathname: `post/${elem.id}`,
							state: { deletePost: this.deletePost },
						}}>
						<h3>{elem.title}</h3>
					</Link>
					<h4>{elem.username}</h4>
					<img
						alt='profile pic'
						src={`https://robohash.org/${elem.username}.png`}
					/>
				</div>
			);
		});
		return (
			<div>
				<form
					onSubmit={(ev) => {
						ev.preventDefault();
						this.getPosts(this.state.includeMyPosts, this.state.search);
					}}>
					<input
						type='text'
						placeholder='Search posts'
						name='search'
						value={this.state.search}
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
						value={this.state.includeMyPosts}
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
