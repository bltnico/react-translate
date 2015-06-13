if(window.ReactTranslate !== undefined) throw Error("[ReactTranslate] ReactTranslate is already definded.");
window.ReactTranslate = {};
window.ReactTranslate.defaultLocale = "en_US";
window.ReactTranslate.currentLocale = "";
window.ReactTranslate.fallbackLocale = "en_US";
window.ReactTranslate.availableLocale = [];
window.ReactTranslate.detectNavigatorLocale = true;

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

var Translate = React.createClass({displayName: "Translate",

    mixins : [TranslateMixin],

    statics : {

        registerTranslation : function(locale, translation) {
            return window.ReactTranslate[locale] = translation;
        },

        registerExternalTranslation : function(lang, url) {
            return TranslateMixin.loadExternalFile(lang, url);
        },

        autoDetectLocale : function(bool) {
            bool = bool || window.ReactTranslate.detectNavigatorLocale || true;
            if(bool) {
                var locale = window.navigator.userLanguage || window.navigator.language;
                return window.ReactTranslate.currentLocale = locale;
            }
            return window.ReactTranslate.detectNavigatorLocale = bool;
        },

        setLocale : function(locale) {
            if(this.getAvailableLocale().length > 0) {
                var availables = this.getAvailableLocale();
                return window.ReactTranslate.currentLocale = locale;

                /* if(!availables.indexOf(locale) == -1) {
                    return window.ReactTranslate.currentLocale = locale;
                } */

            } else {
                return window.ReactTranslate.currentLocale = locale;
            }
        },

        getLocale : function() {
            return window.ReactTranslate.currentLocale;
        },

        setDefaultLocale : function(locale) {
            return window.ReactTranslate.defaultLocale = locale;
        },

        setFallbackLocale : function(locale) {
            return window.ReactTranslate.fallbackLocale = locale;
        },

        setAvailableLocales : function(locales) {
            if(typeof locales == "object") {
                return window.ReactTranslate.availableLocale = locales;
            }
        },

        getAvailableLocale : function() {
            return window.ReactTranslate.availableLocale;
        },

        updateTranslation : function(locale) {
            Translate.setLocale(locale);
            onTranslationChange.locale = locale;
            document.dispatchEvent(onTranslationChange);
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


/** Test React Translate **/

Translate.registerTranslation("fr_FR", {
    "START_WITH" : "Accèder à Oddly",
    "REACT" : "Démonstration",
    "TEST" : "Ceci est un test",
    "TITLE" : "Un titre"
});

Translate.registerTranslation("en_US", {
    "START_WITH" : "Start with Oddly",
    "REACT" : "Demo",
    "TEST" : "This is a test",
    "TITLE" : "Wow title !"
});

Translate.autoDetectLocale(true);
Translate.setAvailableLocales(['fr_FR','en_US']);
Translate.setLocale("fr_FR");

var LangSwitcher = React.createClass({displayName: "LangSwitcher",
    handleChange : function(e) {
        Translate.updateTranslation(e.target.value);
    },
    render : function() {
        return (
            React.createElement("select", {onChange: this.handleChange}, 
                React.createElement("option", {value: "fr_FR"}, "Français"), 
                React.createElement("option", {value: "en_US"}, "Anglais")
            )
        )
    }
});

var Test = React.createClass({displayName: "Test",
    render : function() {
        return (
            React.createElement("div", null, 
                React.createElement(Translate, {from: "REACT", element: "h1"}), 
                React.createElement("p", null, React.createElement(Translate, {from: "TEST"})), 
                React.createElement("div", null, 
                    React.createElement(Translate, {from: "TITLE", element: "b"}), 
                    React.createElement("div", null, 
                        React.createElement(LangSwitcher, null)
                    ), 
                    React.createElement("button", null, React.createElement(Translate, {from: "START_WITH"})), 
                    React.createElement(Translate, {from: "START_WITH", element: "input"})
                )
            )
        )
    }
});

React.render(React.createElement(Test, null), document.body);
