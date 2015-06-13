# React Translate

### How install ?

Easy use with bower : `bower install react-component-translate --save`

### How it work ?

*Components :*

```
<Translate from="MY.TRANSLATION" />
<Translate from="OTHER.TRANSLATION" element="h1" />
<Translate from="FORCE.LOCALE" element="p" locale="en" />
```

*Methods :*

* `Translate.registerTranslation();`

* `Translate.autoDetectLocale();`

* `Translate.setLocale();`

* `Translate.getLocale();`

* `Translate.setDefaultLocale();`

* `Translate.setFallbackLocale();`

* `Translate.setAvailableLocales();`

* `Translate.getAvailableLocale();`

* `Translate.updateTranslation();`

### Dev test

Compile jsx with cmd `jsx src/ dist/` (add `--watch` for jsx auto compile)

### Release

Run `grunt`
