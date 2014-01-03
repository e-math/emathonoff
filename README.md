Emathonoff
==============

See the [demo page](http://e-math.github.io/emathonoff).

What?
-----
A small wiget to show fancier on/off toggle instead of normal checkbox input.

How?
----
Emathonoff is a jQuery-plugin and can be used on any web page
by including `jquery.emathonoff.js`-file and converting input-elements
with type checkbox to emathonoff-widgets: `$('input[type="checkbox"]').emathonoff()`.

Emathequationarray depends on external JavaScript libraries:
* jQuery

Who?
----
The widget was developed in EU-funded [E-Math -project](http://emath.eu) by
* Petri Salmela
* Petri Sallasmaa
and the copyrights are owned by [Four Ferries oy](http://fourferries.fi).

License?
--------
The tool is licensed under [GNU AGPL](http://www.gnu.org/licenses/agpl-3.0.html).
The tool depends on some publicly available open source components with other licenses:
* [jQuery](http://jquery.com) (MIT-license)



Usage
======
Initing an emathonoff
----
Init a new emathonoff with default values (texts: "on" and "off", colors: "white" and "blue".)
```javascript
jQuery('input[type="checkbox"]').emathonoff();
```

Init a new emathonoff with given settings:
```javascript
jQuery('#lights').emathonoff({
    texts: ["Lights on", "Lights off"],
    coloron: "green",
    coloroff: "red"
});
```
