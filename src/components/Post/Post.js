import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Post.css';

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
						className='deleteBtn'
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
			<div className='Post'>
				<div className='postPageBox'>
					<div id='topicBox'>
						<h4>{title}</h4>
						<div>
							<h3>{username}</h3>
							<img
								id='profilePic'
								alt='profile pic'
								src={`https://robohash.org/${this.state.username}.png`}
							/>
						</div>
					</div>
					<div className='contentBox'>
						<img id='postImg' alt='post' src={img} />
						<span>{content}</span>
					</div>
					{delBtn}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Post);
