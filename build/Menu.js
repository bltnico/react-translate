'use strict'

var MenuList = {
    "Components" : [
        "Basic",
        "With defaut lang",
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
    ]
};

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
                )
            )
        )
    }

});

React.render(React.createElement(Menu, null), document.getElementById("menu-react-render"));
