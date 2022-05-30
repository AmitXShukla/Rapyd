// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'b2brapyd',
    appId: '1::web:',
    storageBucket: 'b2brapyd.appspot.com',
    locationId: 'us-west2',
    apiKey: '',
    authDomain: 'b2brapyd.firebaseapp.com',
    messagingSenderId: '',
  },
  social: {
    fblink: 'https://www.facebook.com/elishconsulting',
    linkedin: 'https://www.linkedin.com/in/elishconsulting/',
    github: 'https://github.com/AmitXShukla',
    emailid: 'info@elishconsulting.com',
    twitter: 'https://twitter.com/ashuklax',
    website: 'http://elishconsulting.com',
    copyright: 'PoweredBy @copyright elishconsulting.com',
    company: "elishconsulting.com"
  },
  helpText: {
    about: "About us page descirbes an overview of Rapyd Payment solutions. These solutions are meant to serve B2B (business to business), B2C (business to customers).",
    login: "Login/Signup pages allow users to use social authentication logins like GMAIL, or user can sign up with their existing email IDs. In future, this app will also include Twitter, FB and GitHub social authentications.",
    ad: "Smart ad page allows user to view, create, update & delete all ads in one place.",
    invoice: "Smart invoice page allows user to view, create, update & delete all Invoices in one place."
  },
  socialAuthEnabled: true,
  rapyd_access_key: "",
  rapyd_secret_key: "",
  // checkoutBaseAPIUrl: "http://localhost:3000",
  checkoutBaseAPIUrl: "https://testtmp-3cf1f.web.app",
  // checkoutBaseEmbedUrl: "http://localhost:4200",
  checkoutBaseEmbedUrl: "http://b2brapyd.web.app",
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
