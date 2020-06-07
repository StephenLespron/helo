import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Post extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			img: '',
			content: '',
			username: '',
			profilePic: '',
			authorId: null,
			sessionId: null,
		};
	}

	getPost() {
		axios
			.get(`api/post/${this.props.match.params.postId}`)
			.then((res) => {
				const {
					title,
					img,
					content,
					username,
					profile_pic,
					author_id,
					accountId,
				} = res.data[0];
				this.setState({
					title: title,
					img: img,
					content: content,
					username: username,
					profilePic: profile_pic,
					authorId: author_id,
					sessionId: accountId,
				});
			})
			.catch((err) => console.log(err));
	}

	componentDidMount() {
		this.getPost();
	}
	render() {
		const del = () => {
			if (+this.state.sessionId === +this.state.authorId) {
				return (
					<input
						type='button'
						value='Delete'
						onClick={() => {
							this.props.location.state.deletePost(
								+this.props.match.params.postId
							);
							this.props.history.push('/dashboard');
						}}
					/>
				);
			} else {
				return <div></div>;
			}
		};

		const delBtn = del();
		const { title, img, content, username } = this.state;
		return (
			<div>
				<div>
					<img
						alt='profile pic'
						src={`https://robohash.org/${this.state.username}.png`}
					/>
					<h3>{username}</h3>
				</div>
				<div>
					<h4>{title}</h4>
					<img alt='post' src={img} />
					<span>{content}</span>
				</div>
				{delBtn}
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Post);
