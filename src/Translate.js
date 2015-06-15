if(window.ReactTranslate !== undefined) throw Error("[ReactTranslate] ReactTranslate is already definded.");
window.ReactTranslate = {};
window.ReactTranslate.defaultLocale = "en_US";
window.ReactTranslate.currentLocale = "";
window.ReactTranslate.fallbackLocale = "en_US";
window.ReactTranslate.availableLocale = [];
window.ReactTranslate.detectNavigatorLocale = true;
window.ReactTranslate.useLocalStorage = true;

var onTranslationChange = document.createEvent("Event");
onTranslationChange.initEvent("onTranslationChange", true, true);
onTranslationChange.locale = "";

var TranslateMixin = {

    xhr : function(opts, callback) {
        opts.method = opts.method || "GET";
        opts.url = opts.url || "/";

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                return callback(xhr.responseText);
            }
        }
        xhr.open(opts.method, opts.url, true);
        xhr.send();
    },

    loadExternalFile : function(lang, url) {
        this.xhr({ url : url }, function(translation) {
            window.ReactTranslate[lang] = JSON.parse(translation);
        });
    },

    isValidLocale : function(locale) {
        return window.ReactTranslate.hasOwnProperty(locale);
    },

    getLocale : function() {
        if(window.ReactTranslate.currentLocale !== undefined){
            if(this.isValidLocale(window.ReactTranslate.currentLocale)) {
                return window.ReactTranslate.currentLocale;
            }
        } else {
            if(window.ReactTranslate.fallbackLocale !== undefined) {
                if(this.isValidLocale(window.ReactTranslate.fallbackLocale)) {
                    return window.ReactTranslate.fallbackLocale;
                }
            } else {
                if(window.ReactTranslate.defaultLocale !== undefined) {
                    return window.ReactTranslate.defaultLocale;
                }
            }
        }
    }

};

var Translate = React.createClass({

    mixins : [TranslateMixin],

    statics : {

        /**
         * Init Translation method
         *
         * @param {String} locale
         * @param {Function}
         */
        initTranslation : function(locale) {
            if(window.ReactTranslate.useLocalStorage) {
                if(window.localStorage !== undefined) {
                    if(localStorage.getItem("__react_translate")) {
                        return Translate.setLocale(localStorage.getItem("__react_translate"));
                    }
                }
            } else {
                if(locale) {
                    return Translate.setLocale(locale);
                } else {
                    throw Error("[ReactTranslate] Empty locale for 'initTranslation' method");
                }
            }
        },

        /**
         * Add a new translation lang
         *
         * @param {String} locale
         * @param {Object} translation -> all translation for this locale
         * @return
         */
        registerTranslation : function(locale, translation) {
            return window.ReactTranslate[locale] = translation;
        },

        /**
         * @todo
         */
        registerExternalTranslation : function(lang, url) {
            return TranslateMixin.loadExternalFile(lang, url);
        },

        /**
         * Auto detect locale with browser language
         *
         * @param {Boolean} bool
         * @return
         */
        autoDetectLocale : function(bool) {
            bool = bool || window.ReactTranslate.detectNavigatorLocale || true;
            if(bool) {
                var locale = window.navigator.userLanguage || window.navigator.language;
                return window.ReactTranslate.currentLocale = locale;
            }
            return window.ReactTranslate.detectNavigatorLocale = bool;
        },

        /**
         * Set locale as current lang
         *
         * @param {String} locale
         * @return
         */
        setLocale : function(locale) {
            if(this.getAvailableLocale().length > 0) {
                var availables = this.getAvailableLocale();

                if(window.ReactTranslate.useLocalStorage) {
                    localStorage.setItem("__react_translate", locale);
                }

                return window.ReactTranslate.currentLocale = locale;

                /* if(!availables.indexOf(locale) == -1) {
                    return window.ReactTranslate.currentLocale = locale;
                } */

            } else {
                return window.ReactTranslate.currentLocale = locale;
            }
        },

        /**
         * Get current locale
         * @return {String} current locale
         */
        getLocale : function() {
            return window.ReactTranslate.currentLocale;
        },

        /**
         * @todo : not used
         */
        setDefaultLocale : function(locale) {
            return window.ReactTranslate.defaultLocale = locale;
        },

        /**
         * Set a fallback locale if a locale insn't exist
         *
         * @param {String} locale
         * @return {String} fallback locale
         */
        setFallbackLocale : function(locale) {
            return window.ReactTranslate.fallbackLocale = locale;
        },

        /**
         * Register all availables locales
         *
         * @param {Array} locales
         * @return {Array}
         */
        setAvailableLocales : function(locales) {
            if(typeof locales == "object") {
                return window.ReactTranslate.availableLocale = locales;
            }
        },

        /**
         * Get all availables locales
         *
         * @return {Array}
         */
        getAvailableLocale : function() {
            return window.ReactTranslate.availableLocale;
        },

        /**
         * Update translation with Javascript event
         *
         * @param {String} locale
         * @return {Event}
         */
        updateTranslation : function(locale) {
            if(locale) {
                Translate.setLocale(locale);
                onTranslationChange.locale = locale;
                return document.dispatchEvent(onTranslationChange);
            } else {
                throw Error("[ReactTranslate] Empty locale for 'updateTranslation' method");
            }
        },

        /**
         * Enable localStorage
         *
         * @param {Boolean} bool
         * @return {Boolean}
         */
        useLocalStorage : function(bool) {
            return window.ReactTranslate.useLocalStorage = bool;
        }

    },

    propTypes : {
        element : React.PropTypes.string,
        from : React.PropTypes.string.isRequired
    },

    getDefaultProps: function() {
        return {
            element : 'span'
        };
    },

    getInitialState: function() {
        return {
            element : this.props.element
        };
    },

    componentWillMount: function() {
        if(this.props.locale) {
            if(this.isValidLocale(this.props.locale)) {
                this.setState({ locale: this.props.locale });
            } else {
                throw Error("[ReactTranslate] Unknow locale : '" + this.props.locale + "'");
            }
        } else {
            this.setState({ locale: this.getLocale() });
        }

        var that = this;
        document.addEventListener('onTranslationChange', function(e){
            that.setState({ locale : e.locale });
        }, false);
    },

    render: function(){
        var translation = window.ReactTranslate[this.state.locale][this.props.from];

        if(this.state.element == "input" || this.state.element == "textarea") {
            return React.createElement(this.state.element, { placeholder : translation }, null);
        } else {
            return React.createElement(this.state.element, null, translation);
        }
    }

});
