import React, { Component } from 'react';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			search: '',
			includeMyPosts: true,
			posts: [],
		};
	}

	changeIncludePosts() {
		this.state.includeMyPosts
			? this.setState({
					includeMyPosts: false,
			  })
			: this.setState({ includeMyPosts: true });
	}

	render() {
		const posts = this.state.posts.map((elem) => {
			return (
				<div key={elem.id}>
					<h3>{elem.title}</h3>
					<h4>{elem.username}</h4>
					<img alt='profile pic' src={elem.profile_pic} />
				</div>
			);
		});
		return (
			<div>
				<form>
					<input
						type='text'
						placeholder='Search posts'
						name='search'
						value={this.state.search}
					/>
					<button>Search</button>
					<button>Reset</button>
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
