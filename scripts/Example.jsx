'use strict'

var ExampleBasic = React.createClass({
    render : function() {
        return <Translate from="BASIC" />
    }
});

React.render(<ExampleBasic />, document.getElementById("basic-example-render"));

var ExampleDefaultLang = React.createClass({
    render : function() {
        return <Translate from="DEFAULTLANG" lang="en_US" />
    }
});

React.render(<ExampleDefaultLang />, document.getElementById("default-lang-example-render"));

var ExampleDomElement = React.createClass({
    render : function() {
        return <Translate from="DOMELEMENT" element="h1" />
    }
});

React.render(<ExampleDomElement />, document.getElementById("dom-element-example-render"));
