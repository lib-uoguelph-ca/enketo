/*
 Copyright 2012 Martijn van de Rijdt

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
var gui,DEFAULT_SETTINGS={};$(document).ready(function(){gui=new GUI;gui.init();"undefined"==typeof console&&(console={log:function(){}});"undefined"==typeof window.console.debug&&(console.debug=console.log);"true"!==getGetVariable("debug")&&(window.console.log=function(){},window.console.debug=function(){})});function GUI(){}
GUI.prototype.init=function(){this.nav.setup();this.pages().init();this.setEventHandlers();"function"===typeof this.setCustomEventHandlers&&this.setCustomEventHandlers();$(".dialog [title]").tooltip();Modernizr.borderradius&&(Modernizr.boxshadow&&Modernizr.csstransitions&&Modernizr.opacity)&&$(document).trigger("browsersupport","fancy-visuals");$("footer").detach().appendTo("#container")};GUI.prototype.setup=function(){$(window).trigger("resize")};
GUI.prototype.setEventHandlers=function(){var b=this;$("#feedback-bar-close").button({icons:{primary:"ui-icon-closethick"},text:!1}).click(function(a){a.preventDefault();b.hideFeedback()});$("#page-close").button({icons:{primary:"ui-icon-closethick"},text:!1}).click(function(a){a.preventDefault();b.pages().close()});$("#feedback-bar-close, #page-close").removeClass().addClass("custom-button ui-widget-header ui-corner-all");$(document).on("click",'a[href^="#"]:not([href="#"]):not(nav ul li a)',function(a){var b=
$(this).attr("href");"#"!==b&&(a.preventDefault(),$('nav li a[href="'+b+'"]').click())});$('nav ul li a[href^="#"]').click(function(a){a.preventDefault();a=$(this).attr("href").substr(1);b.pages().open(a);$(this).closest("li").addClass("nav-state-active")});$(window).on("onlinestatuschange",function(a,c){b.updateStatus.connection(c)});$(document).on("edit","form.jr",function(a,c){b.updateStatus.edit(c)});$(document).on("browsersupport",function(a,c){b.updateStatus.support(c)});$("#page, #feedback-bar").on("change",
function(){b.display()});$("header #status-connection").click(function(a){b.showFeedback($(this).attr("title"));a.stopPropagation()});$(window).resize(function(){$("#container").css("top",$("header").outerHeight());$("body:not(.no-scroll) #container").height($(window).height()-$("header").outerHeight()-$("#form-controls.bottom").outerHeight());var a=$("nav").offset().left,b=$("#logo").offset().left+$("#logo").outerWidth();a<b?$("#logo").css("visibility","hidden"):$("#logo").css("visibility","visible")})};
GUI.prototype.nav={setup:function(){$("article.page").each(function(){var b,a="",c;c=$(this).attr("id");b=$(this).attr("data-display")?$(this).attr("data-display"):c;a=$(this).attr("data-title")?$(this).attr("data-title"):c;c=$(this).attr("data-ext-link")?$(this).attr("data-ext-link"):"#"+c;$('<li class="ui-corner-tl ui-corner-tr"><a href="'+c+'" title="'+a+'" >'+b+"</a></li>").appendTo($("nav ul"))})},reset:function(){$("nav ul li").removeClass("nav-state-active")}};
GUI.prototype.pages=function(){this.init=function(){this.$pages=$("<pages></pages>");$("article.page").detach().appendTo(this.$pages)};this.get=function(b){var a=this.$pages.find('article[id="'+b+'"]');return a=0<a.length?a:$('article[id="'+b+'"]')};this.isShowing=function(b){return 0<$("#page article.page"+("undefined"!==typeof b?'[id="'+b+'"]':"")).length};this.open=function(b){var a;if(!this.isShowing(b)){a=this.get(b);if(1!==a.length)return console.error("page not found");this.isShowing()&&this.close();
$("#page-content").prepend(a.show()).trigger("change");$("#overlay").show();setTimeout(function(){a.find(".scroll-list").addScrollBar();$("#overlay, header").bind("click.pageEvents",function(){$("#page-close").trigger("click")})},50);$(window).bind("resize.pageEvents",function(){$("#page").trigger("change")})}};this.close=function(){var b;b=$("#page .page").detach();this.$pages.append(b);$("#page").trigger("change");this.nav.reset();$("#overlay").hide();$("#overlay, header").unbind(".pageEvents");
$(window).unbind(".pageEvents")};return this};GUI.prototype.showFeedback=function(b,a){var c,a=a?1E3*a:1E4;$("#feedback-bar p").eq(1).remove();$("#feedback-bar p").html()!==b&&(c=$("<p></p>"),c.text(b),$("#feedback-bar").prepend(c));$("#feedback-bar").trigger("change");setTimeout(function(){typeof c!=="undefined"&&c.remove();$("#feedback-bar").trigger("change")},a)};GUI.prototype.hideFeedback=function(){$("#feedback-bar p").remove();$("#feedback-bar").trigger("change")};
GUI.prototype.alert=function(b,a,c){var d=$("#dialog-alert"),a=a||"Alert",c=c||"ui-icon-alert";d.find("p .ui-icon:eq(0)").removeClass().addClass("ui-icon "+c);c=function(){d.dialog("destroy");d.find("#dialog-alert-msg").text("")};d.find("#dialog-alert-msg").html(b).capitalizeStart();d.dialog({title:a,modal:!0,resizable:!1,closeOnEscape:!0,buttons:{Ok:c},beforeClose:c,width:500})};
GUI.prototype.confirm=function(b,a){var c,d,e,g,f;"string"===typeof b?c=b:"string"===typeof b.msg&&(c=b.msg);c="undefined"!==typeof c?c:"Please confirm action";d="undefined"!==typeof b.heading?b.heading:"Are you sure?";g="undefined"!==typeof b.dialog?b.dialog:"confirm";a="undefined"!==typeof a?a:{};a.posButton=a.posButton||"Confirm";a.negButton=a.negButton||"Cancel";a.posAction=a.posAction||function(){return false};a.negAction=a.negAction||function(){return false};a.beforeAction=a.beforeAction||function(){};
e=function(){f.dialog("destroy");f.find(".dialog-msg, .dialog-error").text("");console.debug("dialog destroyed")};f=$("#dialog-"+g);f.find(".dialog-msg").html(c).capitalizeStart();f.dialog({open:a.beforeAction,title:d,resizable:!1,modal:!0,closeOnEscape:!0,buttons:[{text:a.posButton,click:function(){a.posAction.call();f.find(".dialog-error").text().length===0&&e.call()}},{text:a.negButton,click:function(){a.negAction.call();e.call()}}],width:500,beforeClose:e})};
GUI.prototype.updateStatus={connection:function(b){console.log("updating online status in menu bar to:");console.log(b);b?$("header #status-connection").removeClass().addClass("ui-icon ui-icon-signal-diag").attr("title","It appears there is currently an Internet connection available."):$("header #status-connection").removeClass().addClass("ui-icon ui-icon-cancel").attr("title","It appears there is currently no Internet connection")},edit:function(b){b?$("header #status-editing").removeClass().addClass("ui-icon ui-icon-pencil").attr("title",
"Form is being edited."):$("header #status-editing").removeClass().attr("title","")},support:function(b){var a=gui.pages().get("settings");0<a.length&&(console.debug("updating browser support for "+b),a.find("#settings-browserSupport-"+b+" span.ui-icon").addClass("ui-icon-check"))}};
GUI.prototype.display=function(){var b,a;a=$("header");var c=$("#feedback-bar"),d=$("#page");0<c.find("p").length?(b=a.outerHeight(),a=this.pages().isShowing()?a.outerHeight()+c.outerHeight():a.outerHeight()+c.outerHeight()-d.outerHeight()):(b=a.outerHeight()-c.outerHeight(),a=this.pages().isShowing()?a.outerHeight():a.outerHeight()-d.outerHeight());c.css("top",b);d.css("top",a)};
GUI.prototype.setSettings=function(b){var a,c=this;console.log("gui updateSettings() started");$.each(b,function(b,e){a=e?c.pages().get("settings").find('input[name="'+b+'"][value="'+e+'"]'):c.pages().get("settings").find('input[name="'+b+'"]');0<a.length&&a.attr("checked",e?!0:!1).trigger("change")})};function getGetVariable(b){for(var a=window.location.search.substring(1).split("&"),c=0;c<a.length;c++){var d=a[c].split("=");if(d[0]==b)return encodeURI(d[1])}return!1}
String.prototype.pad=function(b){for(var a=this;a.length<b;)a="0"+a;return a};
(function(b){b.fn.equalWidth=function(){var a=0;return this.each(function(){b(this).width()>a&&(a=b(this).width())}).each(function(){b(this).width(a)})};b.fn.reverse=[].reverse;b.fn.alphanumeric=function(a){a=b.extend({ichars:"!@#$%^&*()+=[]\\';,/{}|\":<>?~`.- ",nchars:"",allow:""},a);return this.each(function(){a.nocaps&&(a.nchars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ");a.allcaps&&(a.nchars+="abcdefghijklmnopqrstuvwxyz");for(var c=a.allow.split(""),d=0;d<c.length;d++)-1!=a.ichars.indexOf(c[d])&&(c[d]="\\"+
c[d]);a.allow=c.join("|");var e=a.ichars+a.nchars,e=e.replace(RegExp(a.allow,"gi"),"");b(this).keypress(function(a){var b;b=a.charCode?String.fromCharCode(a.charCode):String.fromCharCode(a.which);e.indexOf(b)!=-1&&a.preventDefault();a.ctrlKey&&b=="v"&&a.preventDefault()});b(this).bind("contextmenu",function(){return false})})};b.fn.numeric=function(a){var c="abcdefghijklmnopqrstuvwxyz",c=c+c.toUpperCase(),a=b.extend({nchars:c},a);return this.each(function(){b(this).alphanumeric(a)})};b.fn.alpha=function(a){a=
b.extend({nchars:"1234567890"},a);return this.each(function(){b(this).alphanumeric(a)})};b.fn.capitalizeStart=function(a){a||(a=1);var b=this.contents().filter(function(){return 3==this.nodeType}).first(),d=b.text(),a=d.split(" ",a).join(" ");b.length&&(b[0].nodeValue=d.slice(a.length),b.before('<span class="capitalize">'+a+"</span>"))};b.fn.addScrollBar=function(){return this.each(function(){var a=b(this),c=b(this).find("ol");a.css("overflow","hidden");var d=c.height()-a.height();if(0<d){var e=d/
c.height(),e=Math.round((1-e)*a.height()),e=e-e%2;b("#records .column.middle").html('<div id="slider-wrap" class="ui-corner-all"><div id="slider-vertical"></div></div>');b("#slider-wrap").height(a.outerHeight());b("#slider-vertical").slider({orientation:"vertical",range:"max",min:0,max:100,value:100,slide:function(a,b){c.css({top:-((100-b.value)*d/100)})}});b("#slider-wrap").css("margin-top",b("#records-saved h3").outerHeight(!0));b(".ui-slider-handle").css({height:e,"margin-bottom":-0.5*e});a=b("#slider-vertical").height();
e=a-e;a=0.5*(a-e);b(".ui-slider").css({height:e,"margin-top":a});b(".ui-slider-range").css({top:-a});b("#slider-wrap").click(function(){b("#slider-vertical").slider("value",0);c.css({top:-d})})}})}})(jQuery);