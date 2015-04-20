if(window.ReactTranslate !== undefined) throw Error("[ReactTranslate] ReactTranslate is already definded.");
window.ReactTranslate = {};
window.ReactTranslate.defaultLocale = "en";
window.ReactTranslate.currentLocale = "";
window.ReactTranslate.fallbackLocale = "en";
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

var Translate = React.createClass({
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
                if(availables[locale] != undefined) {
                    return window.ReactTranslate.currentLocale = locale;
                }
            } else {
                return window.ReactTranslate.currentLocale = locale;
            }
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
        return React.createElement(this.state.element, null, translation);
    }
});


/** Test React Translate **/

Translate.registerTranslation("fr", {
    "TEST" : "Ceci est un test",
    "TITLE" : "Un titre"
});

Translate.registerTranslation("en", {
    "TEST" : "This is a test",
    "TITLE" : "Wow title !"
});

Translate.autoDetectLocale(true);
Translate.setAvailableLocales(['fr','en']);

var LangSwitcher = React.createClass({
    handleChange : function(e) {
        Translate.setLocale(e.target.value);
        onTranslationChange.locale = e.target.value;
        document.dispatchEvent(onTranslationChange);
    },
    render : function() {
        return (
            <select onChange={this.handleChange}>
                <option value="fr">Français</option>
                <option value="en">Anglais</option>
            </select>
        )
    }
});

var Test = React.createClass({
    render : function() {
        return (
            <div>
                <h1>Non traduit</h1>
                <p><Translate from="TEST" /></p>
                <div>
                    <Translate from="TITLE" element="b" />
                    <div>
                        <LangSwitcher />
                    </div>
                </div>
            </div>
        )
    }
});

React.render(<Test />, document.body);
