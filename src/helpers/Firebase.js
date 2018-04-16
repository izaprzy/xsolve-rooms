import { Google } from 'expo';
import axios from 'axios';
import firebase from 'firebase';
import moment from 'moment';

import { config } from '../config/firebase';

const androidClientId = '283946213358-26mljge2fer267u1afr2g8lghlrd98r6.apps.googleusercontent.com';
const scopes = [
  'email',
  'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',
  'https://www.googleapis.com/auth/calendar.readonly'];

class Firebase {
  static auth() {
  }

  static init() {
    firebase.initializeApp(config);
    Firebase.auth = firebase.auth;
  }

  static async login() {
    try {
      const {
        idToken, accessToken, refreshToken, type,
      } = await Google.logInAsync({
        androidClientId,
        scopes,
      });

      if (type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        await firebase.auth().signInWithCredential(credential);

        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        const expiresIn = moment().add(3600, 'seconds').valueOf();
        return { accessToken, refreshToken, expiresIn };
      }

      throw new Error();
    } catch (error) {
      throw error;
    }
  }

  static async refreshToken(refreshToken) {
    try {
      const tokens = await axios.post(`https://www.googleapis.com/oauth2/v4/token?grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${androidClientId}`);
      return { accessToken: tokens.data.access_token, expiresIn: moment().add(tokens.data.expires_in, 'seconds').valueOf() };
    } catch (error) {
      throw error.response;
    }
  }
}

export default Firebase;