import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false, 
    },
    returnObjects: true,
    
    backend: {
     
      //loadPath: `${process.env.REACT_APP_API_URL}i18/{{lng}}`,
    },
    saveMissing: true,
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      const params = { lng, ns, key, fallbackValue };
      const message = `Entrée de traduction manquante: "${ns}.${key}"`;
      
     
    }
  });
export default i18n;



// import i18next from "i18next";
// //import HttpBackend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
// import { initReactI18next } from "react-i18next";
// import en from "./locales/en.json";
// import fr from "./locales/fr.json";
// import de from "./locales/de.json";
// import es from "./locales/es.json";
// import it from "./locales/it.json";


// const resources = {
//   en: { translation: en },
//   fr: { translation: fr },
//   es: { translation: es },
//   it: { translation: it },
//   de: { translation: de }
// }

// i18next
//   //.use(HttpBackend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources: resources,
//     fallbackLng: "fr",
//     // interpolation: {
//     //   escapeValue: false
//     // },

//     /*ns: ["global","menu","userList","user","invoiceList","dashboard","clientList","client","supplier","logs","settings"],
//     defaultNS: "global",*/
//     keySeparator: ":",
//     supportedLngs: ["fr","en","de","it","es"],
    
//     detection: {
//       order: [ 'localStorage', 'path', 'cookie','navigator', 'htmlTag']
//     }
//   })