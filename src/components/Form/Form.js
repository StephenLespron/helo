import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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
		console.log(this.props.id);
		const { title, img, content } = this.state;
		axios
			.post(`api/post/${this.props.id}`, { title, img, content })
			.then(() => {
				this.props.history.push('/dashboard');
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div>
				<form onSubmit={(ev) => this.createPost(ev)}>
					<input
						type='text'
						placeholder='Title'
						name='title'
						value={this.state.title}
						onChange={(ev) => this.handleChange(ev)}
					/>
					<input
						type='text'
						placeholder='image URL'
						name='img'
						value={this.state.img}
						onChange={(ev) => this.handleChange(ev)}
					/>

					<img alt='post' src={this.state.img} />
					<input
						type='text'
						placeholder='Enter comments here'
						name='content'
						onChange={(ev) => this.handleChange(ev)}
					/>
					<input type='submit' value='Submit' />
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Form);
