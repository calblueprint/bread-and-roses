# Installing Webfonts
Follow these simple Steps.

## 1.
Put `bespoke-sans/` Folder into a Folder called `fonts/`.

## 2.
Put `bespoke-sans.css` into your `css/` Folder.

## 3. (Optional)
You may adapt the `url('path')` in `bespoke-sans.css` depends on your Website Filesystem.

## 4.
Import `bespoke-sans.css` at the top of you main Stylesheet.

```
@import url('bespoke-sans.css');
```

## 5.
You are now ready to use the following Rules in your CSS to specify each Font Style:
```
font-family: BespokeSans-Light;
font-family: BespokeSans-LightItalic;
font-family: BespokeSans-Regular;
font-family: BespokeSans-Italic;
font-family: BespokeSans-Medium;
font-family: BespokeSans-MediumItalic;
font-family: BespokeSans-Bold;
font-family: BespokeSans-BoldItalic;
font-family: BespokeSans-Extrabold;
font-family: BespokeSans-ExtraboldItalic;
font-family: BespokeSans-Variable;
font-family: BespokeSans-VariableItalic;

```
## 6. (Optional)
Use `font-variation-settings` rule to controll axes of variable fonts:
wght 800.0

Available axes:
'wght' (range from 300.0 to 800.0

