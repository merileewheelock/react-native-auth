import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null };

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

		// this event handler handles signing in AND signing out
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<Button onPress={() => firebase.auth().signOut()}>
						Log Out
					</Button>
				);
			case false:
				return <LoginForm />
			default:
				return (
					<View>
						<Spinner size="large" />
					</View>
				);
		}

		// if (this.state.loggedIn) {
		// 	return (
		// 		<Button>
		// 			Log Out
		// 		</Button>
		// 	);
		// }
		// return <LoginForm />
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		)
	}
}

export default App;
