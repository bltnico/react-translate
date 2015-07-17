'use strict'

var ExampleBasic = React.createClass({displayName: "ExampleBasic",
    render : function() {
        return React.createElement(Translate, {from: "BASIC"})
    }
});

React.render(React.createElement(ExampleBasic, null), document.getElementById("basic-example-render"));

var ExampleDefaultLang = React.createClass({displayName: "ExampleDefaultLang",
    render : function() {
        return React.createElement(Translate, {from: "DEFAULTLANG", lang: "en_US"})
    }
});

React.render(React.createElement(ExampleDefaultLang, null), document.getElementById("default-lang-example-render"));

var ExampleDomElement = React.createClass({displayName: "ExampleDomElement",
    render : function() {
        return React.createElement(Translate, {from: "DOMELEMENT", element: "h1"})
    }
});

React.render(React.createElement(ExampleDomElement, null), document.getElementById("dom-element-example-render"));
