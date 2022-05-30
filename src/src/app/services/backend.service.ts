import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DBOutBoundData } from './data.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import firestore from 'firebase/compat/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  configData: any;
  authState: any = null;

  constructor(public afAuth: AngularFireAuth, private _afs: AngularFirestore, private _storage: AngularFireStorage,
    private _http: HttpClient) {
    this.afAuth.authState.subscribe(authState => {
      this.authState = authState;
    })
  }

  getConfig(configType: string) {
    configType == "social" ? this.configData = environment.social : "";
    configType == "helpText" ? this.configData = environment.helpText : "";
    configType == "checkoutBaseAPIUrl" ? this.configData = environment.checkoutBaseAPIUrl : "";
    configType == "checkoutBaseEmbedUrl" ? this.configData = environment.checkoutBaseEmbedUrl : "";

    return this.configData;
  }
  createUser(formData: DBOutBoundData) {
    return this.afAuth.createUserWithEmailAndPassword(formData.data.email, formData.data.password);
  }
  loginEmail(formData: DBOutBoundData) {
    return this.afAuth.signInWithEmailAndPassword(formData.data.email, formData.data.password);
  }

  loginSocialAuth(formType: string) {
    return formType == 'FB' ? this.afAuth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()) : this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  // CRUD functions
  get timestamp() {
    const d = new Date();
    return d;
    // return firebase.firestore.FieldValue.serverTimestamp();
  }
  getCollUrls(coll: any) {
    let _coll = "USERS";
    if (coll == "AD") { _coll = "AD"; }
    if (coll == "INVOICE") { _coll = "INVOICE"; }
    if (coll == "REVENUE") { _coll = "REVENUE"; }
    return _coll;
  }

  // updateFileUpload(coll: string, docId: string, filePath: any) {
  //   const timestamp = this.timestamp;
  //   const docRef = this._afs.collection(this.getCollUrls(coll)).doc(docId);
  //   return docRef.update({
  //     files: firestore.firestore.FieldValue.arrayUnion(filePath),
  //     updatedAt: timestamp,
  //     // username: this.afAuth.auth.currentUser.displayName,
  //     // useremail: this.afAuth.auth.currentUser.email,
  //     // author: this.afAuth.auth.currentUser.uid
  //     username: this.authState.displayName,
  //     useremail: this.authState.email,
  //     author: this.authState.uid
  //   });
  // }
  // getFileDownloadUrl(url: any) {
  //   const ref = this._storage.ref(url);
  //   return ref.getDownloadURL();
  // }
  deleteDoc(coll: string, docId: string) {
    const timestamp = this.timestamp
    var docRef = this._afs.collection(this.getCollUrls(coll)).doc(docId);
    return docRef.delete().then((res) => { return true });
  }
  getDoc(coll: string, docId: string) {
    return this._afs.collection(this.getCollUrls(coll)).doc(docId).valueChanges();
  }
  getDocs(coll: string, formData?: any) {
    if (formData) {
      if (formData.code) {
        return this._afs.collection(this.getCollUrls(coll), ref => ref.where('code', '>=', formData.code)).valueChanges();
      } else {
        return this._afs.collection(this.getCollUrls(coll), ref => ref.where('descr', '>=', formData.descr)).valueChanges();
      }
    } else { // no search criteria - fetch all docs
      return this._afs.collection(this.getCollUrls(coll)).valueChanges();
    }
  }
  setDoc(coll: string, data: any, docId?: any) {
    const id = this._afs.createId();
    const item = { id, name };
    if (docId) { item.id = docId; }
    const timestamp = this.timestamp
    var docRef = this._afs.collection(this.getCollUrls(coll)).doc(item.id);
    return docRef.set({
      ...data,
      _id: id,
      updatedAt: timestamp,
      createdAt: timestamp,
      // username: this.afAuth.auth.currentUser.displayName,
      // useremail: this.afAuth.auth.currentUser.email,
      // author: this.afAuth.auth.currentUser.uid
      // username: this.authState.currentUser.displayName,
      username: this.authState.displayName,
      useremail: this.authState.email,
      author: this.authState.uid
    }).then((res) => { return true });
  }
  updateDoc(coll: string, docId: string, data: any) {
    const timestamp = this.timestamp
    var docRef = this._afs.collection(this.getCollUrls(coll)).doc(docId);
    return docRef.update({
      ...data,
      updatedAt: timestamp,
      // username: this.afAuth.auth.currentUser.displayName,
      // useremail: this.afAuth.auth.currentUser.email,
      // author: this.afAuth.auth.currentUser.uid
      username: this.authState.displayName,
      useremail: this.authState.email,
      author: this.authState.uid
    }).then((res) => { return true });
  }

  getFileDownloadUrl(url: any) {
    const ref = this._storage.ref(url);
    return ref.getDownloadURL();
  }
  updateFileUpload(coll: string, docId: string, filePath: string) {
    const timestamp = this.timestamp;
    const docRef = this._afs.collection(this.getCollUrls(coll)).doc(docId);
    return docRef.update({
      files: firestore.firestore.FieldValue.arrayUnion(filePath),
      updatedAt: timestamp,
      // username: this.afAuth.auth.currentUser.displayName,
      // useremail: this.afAuth.auth.currentUser.email,
      // author: this.afAuth.auth.currentUser.uid
      username: this.authState.displayName,
      useremail: this.authState.email,
      author: this.authState.uid
    });
  }

  // Rapyd Payment API
  getRapydSignature(body: any) {
    var CryptoJS = require("crypto-js");
    var http_method = "get";
    var url_path = "/v1/data/countries";
    var salt = CryptoJS.lib.WordArray.random(12);
    var timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();
    var access_key = environment.rapyd_access_key;
    var secret_key = environment.rapyd_secret_key;
    // var body = "";

    var to_sign = http_method + url_path + salt + timestamp + access_key + secret_key + body;
    var signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(to_sign, secret_key));
    signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));
    return signature;
  }

  getRapydSignature2(body: any) {
    var CryptoJS = require("crypto-js");
    var http_method = "get";
    var url_path = "/v1/data/countries";
    //    var salt = CryptoJS.lib.WordArray.random(12);
    // var timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();
    var access_key = environment.rapyd_access_key;
    var secret_key = environment.rapyd_secret_key;
    // var body = "";


    var salt: 'Oac/iU3wivthSAIvTJdE/A==';
    var timestamp: '1575812352';

    var to_sign = http_method + url_path + 'Oac/iU3wivthSAIvTJdE/A==' + '1575812352' + access_key + secret_key + body;
    var signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(to_sign, secret_key));
    signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));
    return signature;
  }

  getRapydSignatureFinal(bd: string) {
    // Note: Install the crypto-js module.
    var CryptoJS = require("crypto-js");

    var http_method = 'post';                // get|put|post|delete - must be lowercase.
    var url_path = '/v1/data/countries';    // Portion after the base URL. Hardkeyed for this example.
    var salt = CryptoJS.lib.WordArray.random(12);  // Randomly generated for each request.
    var timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();
    // Current Unix time (seconds).
    var access_key = environment.rapyd_access_key;     // The access key received from Rapyd.
    var secret_key = environment.rapyd_secret_key;     // Never transmit the secret key by itself.
    var body = '';                          // JSON body goes here. Always empty for GET; 
    // strip nonfunctional whitespace.

    // if (JSON.stringify(request.data) !== '{}' && request.data !== '') {
    //   body = JSON.stringify(JSON.parse(request.data));
    // }

    var to_sign = http_method + url_path + salt + timestamp + access_key + secret_key + bd;

    var signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(to_sign, secret_key));

    signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));
    return signature;

  }

  getCheckOutId(bd: any) {
    // var bd = { "amount": 100, country: "US", currency: "USD" };
    let _url = environment.checkoutBaseAPIUrl + "/checkout";
    // this._http.post(_url, bd).forEach((item) => console.log(item));
    return this._http.post(_url, bd);
  }
}
