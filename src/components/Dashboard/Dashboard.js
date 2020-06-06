import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

	getPosts() {
		axios
			.get(
				`api/posts/?includeMyPosts=${this.state.includeMyPosts}&search=${this.state.search}`
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

export default Dashboard;
