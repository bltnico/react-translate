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

var LangSwitcher = React.createClass({

    handleChange : function(e) {
        return Translate.updateTranslation(e.target.value);
    },

    render : function() {
        return (
            <div>
                <select onChange={this.handleChange}>
                    {Translate.getAvailableLocale().map(function(l,i){
                        return <option selected={Translate.getLocale() == l ? true : false} value={l}>{l}</option>
                    })}
                </select>
            </div>
        )
    }

});

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
                <LangSwitcher />
            </div>
        )
    }

});

React.render(<Menu />, document.getElementById("menu-react-render"));
