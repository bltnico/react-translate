# React Translate

### How install ?

Easy use with bower : `bower install react-component-translate --save`

### How it work ?

*Components :*

```
/* Simple translation*/
<Translate from="TRANSLATION_ONE" />

/* Translation with h1 node element */
<Translate from="TRANSLATION_TWO" element="h1" />

/* Translation with p element node and force locale "en_US" */
<Translate from="TRANSLATION_THREE" element="p" locale="en_US" />

/* Translation with input element node and add React props */
<Translate from="TRANSLATION_FOUR" element="input" props={{ required : "true",  type : "email", value : "Default value" }} />
```

*Methods :*

* `Translate.initTranslation();`

* `Translate.registerTranslation();`

* `Translate.autoDetectLocale();`

* `Translate.setLocale();`

* `Translate.getLocale();`

* `Translate.setDefaultLocale();`

* `Translate.setFallbackLocale();`

* `Translate.setAvailableLocales();`

* `Translate.getAvailableLocale();`

* `Translate.updateTranslation();`

* `Translate.useLocalStorage();`

### Dev test

Compile jsx with cmd `jsx src/ dist/` (add `--watch` for jsx auto compile)

### Release

Run `grunt`
