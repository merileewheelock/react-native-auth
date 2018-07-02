import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	componentWillMount() {
		// this lifecycle method automatically runs before App is rendered
		// firebase set up - access firebase server first!
		firebase.initializeApp({
			apiKey: 'AIzaSyBpv3_PBukZPYKGF7YQbyzU9TpxQEZx3IQ',
			authDomain: 'authentication-a80a2.firebaseapp.com',
			databaseURL: 'https://authentication-a80a2.firebaseio.com',
			projectId: 'authentication-a80a2',
			storageBucket: 'authentication-a80a2.appspot.com',
			messagingSenderId: '419831118917'
		});
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				<LoginForm />
			</View>
		)
	}
}

export default App;
