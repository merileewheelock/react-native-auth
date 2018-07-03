import React, { Component } from 'react';
import { Text } from 'react-native'; // Replaced TextInput with Input.js
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
	state = { email: '', password: '', error: '', loading: false };

	onButtonPress() {
		const { email, password } = this.state;

		this.setState({ error: '', loading: true });
		// clear error message

		firebase.auth().signInWithEmailAndPassword(email, password)
			// promise, if success:
			// onLoginSuccess to be called in the future and we don't know conditions,
			// so we need to bind to this
			.then(this.onLoginSuccess.bind(this))
			// promise, if fails:
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(this.onLoginSuccess.bind(this))
					.catch(this.onLoginFail.bind(this));
			});
	}

	onLoginFail() {
		this.setState({
			error: 'Authentication Failed',
			loading: false
		});
	}

	// 1) clear out error messages
	// 2) loading now success (no more spinner)
	// 3) clean our form (reset state)
	onLoginSuccess() {
		this.setState({
			email: '',
			password: '',
			loading: false,
			error: ''
		});
	}

	// decide if button or spinner should be shown
	renderButton() {
		if (this.state.loading) {
			return <Spinner size="small" />;
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Log in
			</Button>
		);
	}

	render() {
		return (
			<Card>
				<CardSection>
					{/* By default, text inputs do not have a height and width */}
					{/* when we call setState, component immediately rerenders */}
					{/* TextInput doesn't know it's value, it learn it from this.state.text */}
					<Input
						placeholder="user@email.com"
						label="Email"
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
					/>
				</CardSection>

				<CardSection>
					<Input
						placeholder="password"
						label= "Password"
						secureTextEntry
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>

				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

export default LoginForm;