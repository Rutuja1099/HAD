// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { en, fr, hi, mr, kn, te } from "./index";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const STORE_LANGUAGE_KEY = "settings.lang";

// const languageDetectorPlugin = {
//     type: "languageDetector",
//     async: true,
//     init: () => { },
//     detect: async function (callback) {
//         try {
//             // get stored language from Async storage
//             // put your own language detection logic here
//             await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
//                 if (language) {
//                     //if language was stored before, use this language in the app
//                     return callback(language);
//                 } else {
//                     //if language was not stored yet, use english
//                     return callback("en");
//                 }
//             });
//         } catch (error) {
//             console.log("Error reading language", error);
//         }
//     },
//     cacheUserLanguage: async function (language) {
//         try {
//             //save a user's language choice in Async storage
//             await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
//         } catch (error) { }
//     },
// };

// const resources = {
//     en: {
//         translation: en,
//     },
//     fr: {
//         translation: fr,
//     },
//     hi: {
//         translation: hi,
//     },
//     mr: {
//         translation: mr,
//     },
//     kn: {
//         translation: kn,
//     },
//     te: {
//         translation: te,
//     },
// };

// i18n.use(initReactI18next).use(languageDetectorPlugin).init({
//     resources,
//     compatibilityJSON: 'v3',
//     // fallback language is set to english
//     fallbackLng: "en",
//     interpolation: {
//         escapeValue: false,
//     },
// });

// export default i18n;




import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { useState } from "react";
import STORE_LANGUAGE_KEY from "../configurations/Multilingual";

// export const translations = {
//   en: {
//     Login: "Login",
//     "username": "Usernameeeee",
//     "Enter Your Username": "Enter Your Username",
//     "Enter Your Password": "Enter Your Password",
//     "Forgot Password?": "Forgot Password?",
//     "Login Successful": "Login Successful",
//     "Login Failure": "Login Failure",
//     "Register Patient": "Register Patient",
//     "Missed Followup": "Missed Followup",
//     "Sync Data": "Sync Data",
//     "Follow-up Schedule": "Follow-up Schedule",
//     "First Name": "First Name",
//     Address: "Address",
//     Status: "Status",
//     "Change Password": "Change Password",
//     "Enter Your Old Password": "Enter Your Old Password",
//     "Enter Your New Password": "Enter Your New Password",
//     "Search Prescription":"Search Prescription"
//     // Add more key-value pairs for English here
//   },
//   hi: {
//     Login: "लॉगिन",
//     "Enter Your Username": "अपना उपयोगकर्ता नाम दर्ज करें",
//     "Enter Your Password": "अपना पासवर्ड दर्ज करें",
//     "Forgot Password?": "पासवर्ड भूल गए?",
//     "Login Successful": "लॉगिन सफल",
//     "Login Failure": "लॉगिन विफल",
//     "Register Patient": "रोगी का पंजीकरण",
//     "Missed Followup": "फॉलोअप छूट गया",
//     "Sync Data": "डेटा सिंक्रनाइज़ करें",
//     "Follow-up Schedule": "फॉलो-अप अनुसूची",
//     "First Name": "नाम",
//     Address: "पता",
//     Status: "स्थिति",
//     "Change Password": "पासवर्ड बदलें",
//     "Enter Your Old Password": "अपना पुराना पासवर्ड दर्ज करें",
//     "Enter Your New Password": "अपना नया पासवर्ड दर्ज करें",
//     "Search Prescription":"पासवर्ड"
//     // Add more key-value pairs for Hindi here
//   },
// };


const translations = {
    en: en,
    fr: fr,
    hi: hi,
    mr: mr,
    kn: kn,
    te: te,
};


const i18n = new I18n(translations);

// Get the first locale detected
// const [asyncValue, setAsyncValue] = useState();

const changeLang = async () => {
    const lang = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
    // setAsyncValue(lang);
    // const locale = Localization.getLocales()[0];
    const locale = lang

    console.log("Locale In i18n: ",locale);
    I18n.translations = translations;
    I18n.locale = locale.languageCode;
    I18n.enableFallback = true; // Enable fallback mechanism

}

changeLang();

// const locale = Localization.getLocales()[0];
// const locale = asyncValue

// console.log("Locale In i18n: ",locale);
// I18n.translations = translations;
// I18n.locale = locale.languageCode;
// I18n.enableFallback = true; // Enable fallback mechanism

// console.log("Locale:", locale);
// console.log("Translations:", translations);
// console.log("Translated 'Login':", i18n.t("Login"));

export default i18n;