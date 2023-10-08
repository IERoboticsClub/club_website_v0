// Astro is static, so loading locales is a bit different than usual.
// for now this is a placeholder for future work, but also to better store the contents
import locales  from './locales.json';

const loadLocale = (locale) => {
    return function (path) {
        return locales[locale][path];
    }
}

export default loadLocale;
