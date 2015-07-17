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
    ]
};

var Menu = React.createClass({

    render : function() {
        return (
            <div>
                <ul>
                    {MenuList.Components.map(function(m,i){
                        return (
                            <li>
                                <a href={"#" + (m.replace(/\s/g,"-")).toLowerCase()} target="_self">{m}</a>
                            </li>
                        )
                    })}
                </ul>
                <ul>
                    {MenuList.Methods.map(function(m,i){
                        return (
                            <li>
                                <a href={"#" + (m.replace(/\s/g,"-")).toLowerCase()} target="_self">{m}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

});

React.render(<Menu />, document.getElementById("menu-react-render"));
