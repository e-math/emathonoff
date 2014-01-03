//{{{
/*
 * OnOff-button
 * OnOff-look for checkbox. jQuery-plugin
 *
 * Petri Salmela (pesalmel@abo.fi)
 * Petri Sallasmaa (pekasa@utu.fi)
 *
 * License: LGPL 2.0 or later
 */

(function($){
    // jQuery plugin
    $.fn.emathonoff = function(options){
        // Test for options
        if (typeof(options) !== 'object'){
            options = {};
            // Placeholder variable for returning value.
        }
        // Extend default settings with user given options.
        var settings = $.extend(true, {
            texts: ['on','off'],
            coloron: 'blue',
            coloroff: 'gray'
        }, options);

        // Return this so that methods of jQuery element can be chained.
        return this.each(function(){
            if ($(this).is('input[type="checkbox"]')){
                // Create new OnOff object.
                var onoff = new OnOff(this, settings);
                // Init the examplepicture
                onoff.init();
            }
        });
    }
    
    var OnOff = function(place, settings){
        this.checkbox = $(place);
        this.texts = settings.texts;
        this.coloron = settings.coloron;
        this.coloroff = settings.coloroff;
    }
    
    OnOff.prototype.init = function(){
        this.checkbox.hide();
        this.onoff = $('<div class="emathonoff"></div>');
        this.checkbox.after(this.onoff);
        this.onoff.html('<div class="emathonoff-on"><span>'+this.texts[0]+'</span></div><div class="emathonoff-block emathonoff-grayroundgrad"><span>&nbsp;</span></div><div class="emathonoff-off"><span>'+this.texts[1]+'</span></div>');
        if ($('head style#emathonoffcss').length < 1){
            $('head').append('<style id="emathonoffcss" type="text/css">'+this.strings.css+'</style>');
        }
        this.on = this.onoff.find('.emathonoff-on');
        this.off = this.onoff.find('.emathonoff-off');
        this.block = this.onoff.find('.emathonoff-block');
        this.width = Math.max(this.on.width(), this.off.width());
        this.on.width(this.width);
        this.off.width(this.width);
        this.on.css('margin-left',(this.checkbox.is(':checked') ? 0: -1*this.width));
        this.off.css('margin-right', (this.checkbox.is(':checked') ? -1*this.width : 0));
        this.block.css({'width': '0.7em'});
        this.on.addClass('emathonoff-'+this.coloron+'grad');
        this.off.addClass('emathonoff-'+this.coloroff+'grad');
        if (this.checkbox.is(':checked')){
            this.onoff.addClass('ison');
        }
        this.initEvents();
    }
    
    OnOff.prototype.initEvents = function(){
        var widget = this;
        this.onoff.click(function(){
            if (widget.checkbox.is(':checked')){
                widget.onoff.removeClass('ison');
                widget.on.animate({'margin-left': -1*widget.width}, 'fast');
                widget.off.animate({'margin-right': 0}, 'fast');
                widget.block.animate({'margin-left': 0, 'margin-right': '-0.3em'}, 'fast');
                widget.checkbox.click();
            } else {
                widget.onoff.addClass('ison');
                widget.off.animate({'margin-right': -1*widget.width}, 'fast');
                widget.on.animate({'margin-left': 0}, 'fast');
                widget.block.animate({'margin-right': 0, 'margin-left': '-0.3em'}, 'fast');
                widget.checkbox.click();
            }
        });
    }
    
    OnOff.prototype.strings = {
        css: [
            '.emathonoff {border: 1px solid #555; border-radius: 0.6em; background-color: black; margin: 0.5em 1em; padding: 0; position: relative;  overflow: hidden; cursor: pointer; vertical-align: middle;}',
            '.emathonoff, .emathonoff .emathonoff-on, .emathonoff .emathonoff-block, .emathonoff .emathonoff-off {display: inline-block; position: relative;}',
            '.emathonoff .emathonoff-on, .emathonoff .emathonoff-off { margin: -1px 0 -2px 0; padding: 0; text-align: center; z-index:1; overflow: hidden; box-shadow: inset 2px 2px 2px rgba(0,0,0,0.5);}',
            '.emathonoff .emathonoff-on span, .emathonoff .emathonoff-off span, .emathonoff .emathonoff-block span {margin: 0; padding: 0.3em 0.5em; display: inline-block;}',
            '.emathonoff .emathonoff-on span {padding: 0.3em 0.8em 0.3em 0.5em;}',
            '.emathonoff .emathonoff-off span {padding: 0.3em 0.5em 0.3em 0.8em;}',
            '.emathonoff .emathonoff-block {margin: -1px -0.3em -2px 0; z-index: 2; border: 1px solid white; border-radius: 0.8em; background-color: #444; overflow: hidden; box-shadow: 2px 2px 2px rgba(0,0,0,0.5);}',
            '.emathonoff.ison .emathonoff-block {margin-right: 0; margin-left: -0.3em;}',
            '.emathonoff .emathonoff-on {background-color: blue;}',
            '.emathonoff .emathonoff-off {background-color: #aaa; color: black;}',
            '.emathonoff-bluegrad {color: black!important; font-weight: bold; text-shadow: 0 0 1px white; background: #05abe0;',
                'background: -moz-linear-gradient(top,  #05abe0 0%, #53cbf1 60%, #87e0fd 100%);',
                'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#05abe0), color-stop(60%,#53cbf1), color-stop(100%,#87e0fd));',
                'background: -webkit-linear-gradient(top,  #05abe0 0%,#53cbf1 60%,#87e0fd 100%);',
                'background: -o-linear-gradient(top,  #05abe0 0%,#53cbf1 60%,#87e0fd 100%);',
                'background: -ms-linear-gradient(top,  #05abe0 0%,#53cbf1 60%,#87e0fd 100%);',
                'background: linear-gradient(to bottom,  #05abe0 0%,#53cbf1 60%,#87e0fd 100%);',
                'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#05abe0\', endColorstr=\'#87e0fd\',GradientType=0 );}',
            '.emathonoff-graygrad {color: black!important; font-weight: bold; text-shadow: 0 0 1px white; background: #e2e2e2;',
                'background: -moz-linear-gradient(top, #e2e2e2 0%, #dbdbdb 50%, #d1d1d1 51%, #fefefe 100%);',
                'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#e2e2e2), color-stop(50%,#dbdbdb), color-stop(51%,#d1d1d1), color-stop(100%,#fefefe));',
                'background: -webkit-linear-gradient(top, #e2e2e2 0%,#dbdbdb 50%,#d1d1d1 51%,#fefefe 100%);',
                'background: -o-linear-gradient(top, #e2e2e2 0%,#dbdbdb 50%,#d1d1d1 51%,#fefefe 100%);',
                'background: -ms-linear-gradient(top, #e2e2e2 0%,#dbdbdb 50%,#d1d1d1 51%,#fefefe 100%);',
                'background: linear-gradient(to bottom, #e2e2e2 0%,#dbdbdb 50%,#d1d1d1 51%,#fefefe 100%);',
                'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#e2e2e2\', endColorstr=\'#fefefe\',GradientType=0 );}',
            '.emathonoff-grayroundgrad {background: rgb(181,189,200);',
                'background: -moz-radial-gradient(center, ellipse cover,  rgba(181,189,200,1) 0%, rgba(130,140,149,1) 36%, rgba(40,52,59,1) 100%);',
                'background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(181,189,200,1)), color-stop(36%,rgba(130,140,149,1)), color-stop(100%,rgba(40,52,59,1)));',
                'background: -webkit-radial-gradient(center, ellipse cover,  rgba(181,189,200,1) 0%,rgba(130,140,149,1) 36%,rgba(40,52,59,1) 100%);',
                'background: -o-radial-gradient(center, ellipse cover,  rgba(181,189,200,1) 0%,rgba(130,140,149,1) 36%,rgba(40,52,59,1) 100%);',
                'background: -ms-radial-gradient(center, ellipse cover,  rgba(181,189,200,1) 0%,rgba(130,140,149,1) 36%,rgba(40,52,59,1) 100%);',
                'background: radial-gradient(ellipse at center,  rgba(181,189,200,1) 0%,rgba(130,140,149,1) 36%,rgba(40,52,59,1) 100%);',
                'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#b5bdc8\', endColorstr=\'#28343b\',GradientType=1 );}',
            '.emathonoff-redgrad {color: white!important; font-weight: bold; text-shadow: 0 0 1px black; background: rgba(207,4,4,1);',
                'background: -moz-linear-gradient(top,  rgba(207,4,4,1) 0%,rgba(255,48,25,1)  100%);',
                'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(207,4,4,1)), color-stop(100%,rgba(255,48,25,1)));',
                'background: -webkit-linear-gradient(top,  rgba(207,4,4,1) 0%,rgba(255,48,25,1) 100%);',
                'background: -o-linear-gradient(top,  rgba(207,4,4,1) 0%,rgba(255,48,25,1) 100%);',
                'background: -ms-linear-gradient(top,  rgba(207,4,4,1) 0%,rgba(255,48,25,1) 100%);',
                'background: linear-gradient(to bottom,  rgba(207,4,4,1) 0%,rgba(255,48,25,1) 100%);',
                'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#cf0404\', endColorstr=\'#ff3019\',GradientType=0 );}',
            '.emathonoff-greengrad {color: white!important; font-weight: bold; text-shadow: 0 0 1px black; background: rgba(117,137,12,1);',
                'background: -moz-linear-gradient(top,  rgba(117,137,12,1) 0%, rgba(164,179,87,1) 100%);',
                'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(117,137,12,1)), color-stop(100%,rgba(164,179,87,1)));',
                'background: -webkit-linear-gradient(top,  rgba(117,137,12,1) 0%,rgba(164,179,87,1) 100%);',
                'background: -o-linear-gradient(top,  rgba(117,137,12,1) 0%,rgba(164,179,87,1) 100%);',
                'background: -ms-linear-gradient(top,  rgba(117,137,12,1) 0%,rgba(164,179,87,1) 100%);',
                'background: linear-gradient(to bottom, rgba(117,137,12,1) 0%,rgba(164,179,87,1) 100%);',
                'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#75890c\', endColorstr=\'#a4b357\',GradientType=0 );}',
            '.emathonoff-yellowgrad {color: black!important; font-weight: bold; text-shadow: 0 0 1px white; background: rgb(241,218,54);',
                'background: -moz-linear-gradient(top,  rgba(241,218,54,1) 0%, rgba(254,252,234,1) 100%);',
                'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(241,218,54,1)), color-stop(100%,rgba(254,252,234,1)));',
                'background: -webkit-linear-gradient(top,  rgba(241,218,54,1) 0%,rgba(254,252,234,1) 100%);',
                'background: -o-linear-gradient(top,  rgba(241,218,54,1) 0%,rgba(254,252,234,1) 100%);',
                'background: -ms-linear-gradient(top,  rgba(241,218,54,1) 0%,rgba(254,252,234,1) 100%);',
                'background: linear-gradient(to bottom,  rgba(241,218,54,1) 0%,rgba(254,252,234,1) 100%);',
                'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#f1da36\', endColorstr=\'#fefcea\',GradientType=0 );}'
        ].join(' ')
    }

})(jQuery);
//}}}