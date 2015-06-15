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
Translate.initTranslation("fr_FR");

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
                    React.createElement(Translate, {from: "START_WITH", element: "input"}),
                    React.createElement(Translate, {from: "START_WITH", element: "button", props : { disabled : "true" } })
                )
            )
        )
    }
});

React.render(React.createElement(Test, null), document.body);
