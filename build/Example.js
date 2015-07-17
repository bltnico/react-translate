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

var ExampleProps = React.createClass({displayName: "ExampleProps",
    render : function() {
        var props = {
            disabled : true,
            style : {
                padding : "10px 14px",
                backgroundColor : "#eee",
                border : "1px solid #ddd"
            }
        }
        return React.createElement(Translate, {from: "WITHPROPS", props: props, element: "button"})
    }
});

React.render(React.createElement(ExampleProps, null), document.getElementById("props-example-render"));
