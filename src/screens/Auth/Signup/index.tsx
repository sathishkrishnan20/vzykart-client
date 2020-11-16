import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {Col, Grid} from 'react-native-easy-grid';
import {Input} from '../../../components/index';

import {USER_TYPE} from '../../../interfaces/enums';
import styles from '../styles';
import {IS_WEB, BACKGROUND_IMAGE_URL} from '../../../config';
import {SignUpState} from '../../../interfaces/classes/auth';
import {navigateByProp} from '../../../navigation';
import {Radio} from '../../../components/Radio';
import AuthAction from '../../../actions/auth';
import {IRegisterAPI, ILoginAPI} from '../../../interfaces/actions/auth';
import {showToastByResponse, ErrorToast} from '../../../components/Toast';
import {ComponentProp} from '../../../interfaces';
export default class SignUp extends React.Component<
  ComponentProp,
  SignUpState
> {
  screenHeight: number;
  authAction: AuthAction;
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      mobileNumber: '',
      password: '',
      userType: USER_TYPE.USER,
      isLoading: false,
      useEmail: true,
    };
    this.screenHeight = Dimensions.get('window').height - 60;
    this.authAction = new AuthAction();
    this.updateIndex = this.updateIndex.bind(this);
  }
  async doSignUp() {
    try {
      const {email, mobileNumber, userType, password, useEmail} = this.state;
      const registerItem: IRegisterAPI = {
        password: password,
      };
      if (useEmail) {
        registerItem.email = email;
      } else {
        registerItem.mobileNumber = Number(mobileNumber);
      }
      const response = await this.authAction.register(userType, registerItem);
      showToastByResponse(response);
      if (response.success) {
        const loginAPIRequest: ILoginAPI = {
          userEntry: useEmail ? email : mobileNumber,
          password,
        };
        this.authAction.login(userType, loginAPIRequest, this.props);
      }
    } catch (error) {
      ErrorToast({title: 'Failed', message: error.message || error});
    }
  }

  renderTitle() {
    return (
      <View>
        <Text style={styles.heading}>V-Cart</Text>
      </View>
    );
  }
  updateIndex(selectedIndex: number) {
    this.setState({useEmail: selectedIndex === 0});
  }
  renderInputs() {
    const {mobileNumber, email, password, isLoading, useEmail} = this.state;
    return (
      <Card containerStyle={{borderRadius: 10}}>
        <Card.Title>Register account to get Special orders</Card.Title>

        <Radio
          buttons={['Email', 'Mobile Number']}
          selectedIndex={useEmail ? 0 : 1}
          containerWidth={400}
          onPress={(index: number) => this.updateIndex(index)}
        />
        {!useEmail ? (
          <Input
            value={mobileNumber}
            onChangeText={(mobileNumber: string) =>
              this.setState({mobileNumber})
            }
            returnKeyType={'next'}
            autoCapitalize="none"
            keyboardType={'numeric'}
            placeholder="Enter Mobile Number"
            blurOnSubmit={false}
          />
        ) : (
          <Input
            value={email}
            onChangeText={(email: string) => this.setState({email})}
            returnKeyType={'next'}
            keyboardType={'email-address'}
            autoCapitalize="none"
            placeholder="Enter Email"
            blurOnSubmit={false}
          />
        )}
        <Input
          value={password}
          onChangeText={(password: string) => this.setState({password})}
          returnKeyType={'done'}
          autoCapitalize="none"
          placeholder="Enter Password"
          blurOnSubmit={false}
          secureTextEntry={true}
          onSubmitEditing={() => this.doSignUp()}
        />
        <Button
          loading={isLoading}
          onPress={() => this.doSignUp()}
          title="Register"
        />
        <TouchableOpacity onPress={() => navigateByProp(this.props, 'login')}>
          <Card.FeaturedTitle style={styles.newUserRegisterText}>
            Existing User? Login Here
          </Card.FeaturedTitle>
        </TouchableOpacity>
      </Card>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ImageBackground
          source={{
            uri: BACKGROUND_IMAGE_URL,
          }}
          style={[styles.imageBg, {height: this.screenHeight}]}>
          <ScrollView>
            {IS_WEB ? (
              <Grid>
                <Col>{this.renderTitle()}</Col>
                <Col style={{marginTop: 100, marginRight: 20, marginLeft: 20}}>
                  {this.renderInputs()}
                </Col>
              </Grid>
            ) : (
              <View>
                <View>{this.renderTitle()}</View>
                <View style={{marginTop: 80}}>{this.renderInputs()}</View>
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
