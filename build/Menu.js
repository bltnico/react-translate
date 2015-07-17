'use strict'

var MenuList = {
    "Components" : [
        "Basic",
        "With default lang",
        "With DOM element",
        "With custom React component",
        "With props"
    ],
    "Methods" : [
        "bla",
        "bla",
        "bla",
        "bla",
        "bla"
    ],
    "Other" : [
        "LangSwitcher"
    ]
};

var LangSwitcher = React.createClass({displayName: "LangSwitcher",

    handleChange : function(e) {
        return Translate.updateTranslation(e.target.value);
    },

    render : function() {
        return (
            React.createElement("div", null, 
                React.createElement("select", {onChange: this.handleChange}, 
                    Translate.getAvailableLocale().map(function(l,i){
                        return React.createElement("option", {selected: Translate.getLocale() == l ? true : false, value: l}, l)
                    })
                )
            )
        )
    }

});

var Menu = React.createClass({displayName: "Menu",

    render : function() {
        return (
            React.createElement("div", null, 
                React.createElement("ul", null, 
                    MenuList.Components.map(function(m,i){
                        return (
                            React.createElement("li", null, 
                                React.createElement("a", {href: "#" + (m.replace(/\s/g,"-")).toLowerCase(), target: "_self"}, m)
                            )
                        )
                    })
                ), 
                React.createElement("ul", null, 
                    MenuList.Methods.map(function(m,i){
                        return (
                            React.createElement("li", null, 
                                React.createElement("a", {href: "#" + (m.replace(/\s/g,"-")).toLowerCase(), target: "_self"}, m)
                            )
                        )
                    })
                ), 
                React.createElement("ul", null, 
                    MenuList.Other.map(function(m,i){
                        return (
                            React.createElement("li", null, 
                                React.createElement("a", {href: "#" + (m.replace(/\s/g,"-")).toLowerCase(), target: "_self"}, m)
                            )
                        )
                    })
                ), 
                React.createElement(LangSwitcher, null)
            )
        )
    }

});

React.render(React.createElement(Menu, null), document.getElementById("menu-react-render"));
