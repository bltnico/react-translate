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

var LangSwitcher = React.createClass({
    handleChange : function(e) {
        Translate.updateTranslation(e.target.value);
    },
    render : function() {
        return (
            <select onChange={this.handleChange}>
                <option value="fr_FR">Français</option>
                <option value="en_US">Anglais</option>
            </select>
        )
    }
});

var Test = React.createClass({
    render : function() {
        return (
            <div>
                <Translate from="REACT" element="h1"/>
                <p><Translate from="TEST" /></p>
                <div>
                    <Translate from="TITLE" element="b" />
                    <div>
                        <LangSwitcher />
                    </div>
                    <button><Translate from="START_WITH" /></button>
                    <Translate from="START_WITH" element="input" />
                </div>
            </div>
        )
    }
});

React.render(<Test />, document.body);
