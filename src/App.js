import React from 'react';
import routes from './routes';
import Nav from './components/Nav/Nav';
import './App.css';
import './reset.css';

function App(props) {
	return (
		<div className='App'>
			<Nav />
			{routes}
		</div>
	);
}

export default App;
