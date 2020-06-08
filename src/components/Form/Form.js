import React, { Component } from 'react';
import axios from 'axios';
import './Form.css';

class Form extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			img: '',
			content: '',
		};
	}

	handleChange(ev) {
		this.setState({
			[ev.target.name]: ev.target.value,
		});
	}

	createPost(ev) {
		ev.preventDefault();
		const { title, img, content } = this.state;
		axios
			.post(`api/post/`, { title, img, content })
			.then(() => {
				this.props.history.push('/dashboard');
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div className='Form'>
				<form onSubmit={(ev) => this.createPost(ev)}>
					<div id='formPageBox'>
						<h2>New Post</h2>
						<p>Title:</p>
						<input
							id='inputs'
							type='text'
							placeholder='Title'
							name='title'
							value={this.state.title}
							onChange={(ev) => this.handleChange(ev)}
						/>
						<img
							alt='post'
							placeholder='https://upload.wikimedia.org/wikipedia/commons/1/11/Hinweiszeichen_17a_empty.jpg'
							src={
								!this.state.img
									? `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQF5RfHInnf_05Fwa01_3R1BnOidC6zm0ZyHd8zhplP0LKGbkNo&usqp=CAU`
									: this.state.img
							}
						/>
						<p>Image URL:</p>
						<input
							id='inputs'
							type='text'
							placeholder='image URL'
							name='img'
							value={this.state.img}
							onChange={(ev) => this.handleChange(ev)}
						/>
						<p>Content:</p>
						<textarea
							className='contentInput'
							type='text'
							placeholder='Enter comments here'
							name='content'
							onChange={(ev) => this.handleChange(ev)}
						/>
						<input id='submitBtn' type='submit' value='Submit' />
					</div>
				</form>
			</div>
		);
	}
}

export default Form;
