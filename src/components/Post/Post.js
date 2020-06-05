import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			img: '',
			content: '',
			username: '',
			profilePic: '',
		};
	}

	getPost() {
		axios
			.get(`api/post/${this.props.match.params.postId}`)
			.then((res) => {
				const { title, img, content, username, profile_pic } = res.data[0];
				this.setState({
					title: title,
					img: img,
					content: content,
					username: username,
					profilePic: profile_pic,
				});
			})
			.catch((err) => console.log(err));
	}

	componentDidMount() {
		this.getPost();
	}
	render() {
		const { title, img, content, username, profilePic } = this.state;
		return (
			<div>
				<div>
					<img alt='profile pic' src={profilePic} />
					<h3>{username}</h3>
				</div>
				<div>
					<h4>{title}</h4>
					<img alt='post' src={img} />
					<span>{content}</span>
				</div>
			</div>
		);
	}
}

export default Post;
