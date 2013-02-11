String.prototype.pad=function(a){for(var b=this;b.length<a;)b="0"+b;return b};
(function(a){a.fn.toLargestWidth=function(){var b=0;return this.each(function(){a(this).width()>b&&(b=a(this).width())}).each(function(){a(this).width(b)})};a.fn.toSmallestWidth=function(){var b=2E3;return this.each(function(){a(this).width()<b&&(b=a(this).width())}).each(function(){a(this).width(b)})};a.fn.reverse=[].reverse;a.fn.alphanumeric=function(b){b=a.extend({ichars:"!@#$%^&*()+=[]\\';,/{}|\":<>?~`.- ",nchars:"",allow:""},b);return this.each(function(){b.nocaps&&(b.nchars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ");
b.allcaps&&(b.nchars+="abcdefghijklmnopqrstuvwxyz");for(var c=b.allow.split(""),d=0;d<c.length;d++)-1!=b.ichars.indexOf(c[d])&&(c[d]="\\"+c[d]);b.allow=c.join("|");var e=b.ichars+b.nchars,e=e.replace(RegExp(b.allow,"gi"),"");a(this).keypress(function(a){var b;b=a.charCode?String.fromCharCode(a.charCode):String.fromCharCode(a.which);e.indexOf(b)!=-1&&a.preventDefault();a.ctrlKey&&b=="v"&&a.preventDefault()});a(this).bind("contextmenu",function(){return false})})};a.fn.numeric=function(b){var c="abcdefghijklmnopqrstuvwxyz",
c=c+c.toUpperCase(),b=a.extend({nchars:c},b);return this.each(function(){a(this).alphanumeric(b)})};a.fn.alpha=function(b){b=a.extend({nchars:"1234567890"},b);return this.each(function(){a(this).alphanumeric(b)})};a.fn.capitalizeStart=function(a){a||(a=1);var c=this.contents().filter(function(){return 3==this.nodeType}).first(),d=c.text(),a=d.split(" ",a).join(" ");c.length&&(c[0].nodeValue=d.slice(a.length),c.before('<span class="capitalize">'+a+"</span>"))}})(jQuery);/*
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
var gui,printO;$(document).ready(function(){setSettings();gui=new GUI;gui.init();"undefined"==typeof console&&(console={log:function(){}});"undefined"==typeof window.console.debug&&(console.debug=console.log);settings.debug||(window.console.log=function(){},window.console.debug=function(){});settings.touch?(Modernizr.touch=!0,$("html").addClass("touch")):!1===settings.touch&&(Modernizr.touch=!1,$("html").removeClass("touch"));printO=new Print});
function setSettings(){var a,b,c=[{q:"return",s:"returnURL"},{q:"showbranch",s:"showBranch"},{q:"debug",s:"debug"},{q:"touch",s:"touch"},{q:"server",s:"serverURL"},{q:"form",s:"formURL"},{q:"id",s:"formId"}];for(a=0;a<c.length;a++)b=getQueryVar(c[a].q),settings[c[a].s]=null!==b?b:"undefined"!==typeof settings[c[a].s]?settings[c[a].s]:null}function GUI(){}
GUI.prototype.init=function(){this.nav.setup();this.pages.init();this.setEventHandlers();"function"===typeof this.setCustomEventHandlers&&this.setCustomEventHandlers();$(".dialog [title]").tooltip({});Modernizr.borderradius&&(Modernizr.boxshadow&&Modernizr.csstransitions&&Modernizr.opacity)&&$(document).trigger("browsersupport","fancy-visuals");$("footer").detach().appendTo("#container");this.positionPageAndBar()};GUI.prototype.setup=function(){$(window).trigger("resize")};
GUI.prototype.setEventHandlers=function(){var a=this;$(document).on("click","#feedback-bar .close",function(){a.feedbackBar.hide();return!1});$(document).on("click",".touch #feedback-bar",function(){a.feedbackBar.hide()});$(document).on("click","#page .close",function(){a.pages.close();return!1});$("button.print").on("click",function(){printO.printForm()});$(document).on("click",'a[href^="#"]:not([href="#"]):not(nav ul li a)',function(a){var c=$(this).attr("href");console.log("captured click to nav page, href="+
c);"#"!==c&&(a.preventDefault(),$('nav li a[href="'+c+'"]').click())});$('nav ul li a[href^="#"]').click(function(b){b.preventDefault();b=$(this).attr("href").substr(1);a.pages.open(b);$(this).closest("li").addClass("active").siblings().removeClass("active")});$(window).on("onlinestatuschange",function(b,c){a.updateStatus.connection(c)});$(document).on("edit","form.jr",function(b,c){a.updateStatus.edit(c)});$(document).on("browsersupport",function(b,c){a.updateStatus.support(c)});$("#page, #feedback-bar").on("change",
function(){a.positionPageAndBar()});$(document).on("xpatherror",function(b,c){var d=settings.supportEmail;a.alert('A formula evaluation error occurred. Please contact <a href="mailto:'+d+"?subject=xpath errors for: "+location.href+"&body="+c+'" target="_blank" >'+d+'</a> with this error:<ul class="error-list"><li>'+c+"</li></ul>","Formula Error")})};
GUI.prototype.nav={setup:function(){$("article.page").each(function(){var a,b="",c;c=$(this).attr("id");a=$(this).attr("data-display")?$(this).attr("data-display"):c;b=$(this).attr("data-title")?$(this).attr("data-title"):c;c=$(this).attr("data-ext-link")?$(this).attr("data-ext-link"):"#"+c;$('<li class=""><a href="'+c+'" title="'+b+'" >'+a+"</a></li>").appendTo($("nav ul"))})},reset:function(){$("nav ul li").removeClass("active")}};
GUI.prototype.pages={init:function(){this.$pages=$("<pages></pages>");$("article.page").detach().appendTo(this.$pages)},get:function(a){var b=this.$pages.find('article[id="'+a+'"]');return b=0<b.length?b:$('article[id="'+a+'"]')},isShowing:function(a){return 0<$("#page article.page"+("undefined"!==typeof a?'[id="'+a+'"]':"")).length},open:function(a){$("header");this.isShowing(a)||(a=this.get(a),1!==a.length?console.error("page not found"):(this.isShowing()&&this.close(),$("#page .content").prepend(a.show()).trigger("change"),
$("#page").show(),$(window).bind("resize.pageEvents",function(){$("#page").trigger("change")})))},close:function(){var a=$("#page .page").detach();0<a.length&&(this.$pages.append(a),$("#page").trigger("change"),$("nav ul li").removeClass("active"),$("#overlay, header").unbind(".pageEvents"),$(window).unbind(".pageEvents"))}};
GUI.prototype.feedbackBar={show:function(a,b){var c,b=b?1E3*b:1E4;$("#feedback-bar p").eq(1).remove();$("#feedback-bar p").html()!==a&&(c=$("<p></p>"),c.append(a),$("#feedback-bar").append(c));$("#feedback-bar").show().trigger("change");setTimeout(function(){typeof c!=="undefined"&&c.remove();$("#feedback-bar").trigger("change")},b)},hide:function(){$("#feedback-bar p").remove();$("#feedback-bar").trigger("change")}};
GUI.prototype.feedback=function(a,b,c,d){c=c||"Information";"fixed"===$("header").css("position")?this.feedbackBar.show(a,b):d?this.confirm({msg:a,heading:c},d,b):this.alert(a,c,"info",b)};
GUI.prototype.alert=function(a,b,c,d){var e,f=$("#dialog-alert"),c=c||"error",c="normal"===c?"":"alert alert-block alert-"+c;f.find(".modal-header h3").text(b||"Alert");f.find(".modal-body p").removeClass().addClass(c).html(a).capitalizeStart();f.modal({keyboard:!0,show:!0});f.on("hidden",function(){f.find(".modal-header h3, .modal-body p").html("");clearInterval(e)});if("number"===typeof d){var g=d.toString();f.find(".self-destruct-timer").text(g);e=setInterval(function(){g--;f.find(".self-destruct-timer").text(g)},
1E3);setTimeout(function(){clearInterval(e);f.find(".close").click()},1E3*d)}};
GUI.prototype.confirm=function(a,b,c){var d,e,f,g,h;"string"===typeof a?d=a:"string"===typeof a.msg&&(d=a.msg);d="undefined"!==typeof d?d:"Please confirm action";e="undefined"!==typeof a.heading?a.heading:"Are you sure?";f="undefined"!==typeof a.errorMsg?a.errorMsg:"";a="undefined"!==typeof a.dialog?a.dialog:"confirm";b="undefined"!==typeof b?b:{};b.posButton=b.posButton||"Confirm";b.negButton=b.negButton||"Cancel";b.posAction=b.posAction||function(){return false};b.negAction=b.negAction||function(){return false};
b.beforeAction=b.beforeAction||function(){};g=$("#dialog-"+a);g.find(".modal-header h3").text(e);g.find(".modal-body .msg").html(d).capitalizeStart();g.find(".modal-body .alert-error").html(f).show();f||g.find(".modal-body .alert-error").hide();g.modal({keyboard:!0,show:!0});g.on("shown",function(){b.beforeAction.call()});g.find("button.positive").on("click",function(){b.posAction.call();g.modal("hide")}).text(b.posButton);g.find("button.negative").on("click",function(){b.negAction.call();g.modal("hide")}).text(b.negButton);
g.on("hide",function(){g.off("shown hidden hide");g.find("button.positive, button.negative").off("click")});g.on("hidden",function(){g.find(".modal-body .msg, .modal-body .alert-error, button").text("")});if("number"===typeof c){var i=c.toString();g.find(".self-destruct-timer").text(i);h=setInterval(function(){i--;g.find(".self-destruct-timer").text(i)},1E3);setTimeout(function(){clearInterval(h);g.find(".close").click()},1E3*c)}};
GUI.prototype.showLoadErrors=function(a,b){var c='<ul class="error-list"><li>'+a.join("</li><li>")+"</li></ul",d="* "+a.join("* "),e=1<a.length?"s":"",f=settings.supportEmail;this.alert("<p>Error"+e+" occured during the loading of this form. "+(b||"")+'</p><br/><p>Please contact <a href="mailto:'+f+"?subject=loading errors for: "+location.href+"&body="+d+'" target="_blank" >'+f+"</a> with the link to this page and the error message"+e+" below:</p>"+c,"Loading Error"+e)};
GUI.prototype.updateStatus={connection:function(){},edit:function(a){a?$("header #status-editing").removeClass().addClass("ui-icon ui-icon-pencil").attr("title","Form is being edited."):$("header #status-editing").removeClass().attr("title","")},support:function(){},offlineLaunch:function(a){$(".drawer #status-offline-launch").text(a?"Offline Launch: Yes":"Offline Launch: No")}};
GUI.prototype.fillHeight=function(a){var b=$(window).height(),c=$("header").outerHeight(!0),a=a.outerHeight()-a.height();return b-c-a};
GUI.prototype.positionPageAndBar=function(){console.log("positionPageAndBar called");var a,b;a=$("header");b=a.outerHeight();var c=$("#feedback-bar"),d=0<c.find("p").length?!0:!1,e=c.outerHeight(),f=$("#page"),g=this.pages.isShowing(),h=f.outerHeight();f.css({position:a.css("position")});if("fixed"!==a.css("position"))return d||c.hide(),g||f.hide(),!1;a=!d?0-e:b;b=!g?0-h:d?a+e:b;c.css("top",a);f.css("top",b)};
GUI.prototype.setSettings=function(a){var b,c=this;console.log("gui updateSettings() started");$.each(a,function(a,e){b=e?c.pages.get("settings").find('input[name="'+a+'"][value="'+e+'"]'):c.pages.get("settings").find('input[name="'+a+'"]');0<b.length&&b.attr("checked",e?!0:!1).trigger("change")})};
GUI.prototype.parseFormlist=function(a,b,c){var d,e="";if($.isEmptyObject(a))b.addClass("empty"),c||(e='<p class="alert alert-error">Error occurred during creation of form list or no forms found</p>');else{for(d in a)e+='<li><a class="btn btn-block btn-info" id="'+d+'" title="'+a[d].title+'" href="'+a[d].url+'" data-server="'+a[d].server+'" >'+a[d].name+"</a></li>";b.removeClass("empty")}b.find("ul").empty().append(e)};
function getQueryVar(a){for(var b=window.location.search.substring(1).split("&"),c=0;c<b.length;c++){var d=b[c].split("=");if(d[0].toLowerCase()===a.toLowerCase())return a=encodeURI(d[1]),"true"===a?!0:"false"===a?!1:a}return null}function Print(){this.setStyleSheet();this.setDpi()}Print.prototype.setDpi=function(){var a,b=document.body.appendChild(document.createElement("DIV"));b.style.width="1in";b.style.padding="0";a=b.offsetWidth;b.parentNode.removeChild(b);this.dpi=a};
Print.prototype.setStyleSheet=function(){this.styleSheet=this.getStyleSheet();this.$styleSheetLink=$('link[media="print"]:eq(0)')};Print.prototype.getStyleSheet=function(){for(var a=0;a<document.styleSheets.length;a++)if("print"===document.styleSheets[a].media.mediaText)return document.styleSheets[a];return null};Print.prototype.styleToAll=function(){this.styleSheet||this.setStyleSheet();this.styleSheet.media.mediaText="all";this.$styleSheetLink.attr("media","all")};
Print.prototype.styleReset=function(){this.styleSheet.media.mediaText="print";this.$styleSheetLink.attr("media","print")};Print.prototype.printForm=function(){this.removePageBreaks();this.removePossiblePageBreaks();this.styleToAll();this.addPageBreaks();this.styleReset();window.print()};Print.prototype.removePageBreaks=function(){$(".page-break").remove()};Print.prototype.removePossiblePageBreaks=function(){$(".possible-break").remove()};
Print.prototype.addPossiblePageBreaks=function(){var a=$("<hr>",{"class":"possible-break"});this.removePossiblePageBreaks();$("form.jr").before(a.clone()).after(a.clone()).find("fieldset>legend, label:not(.geo)>input:not(input:radio, input:checkbox), label>select, label>textarea, .trigger>*, h4>*, h3>*, .jr-appearance-field-list>*").parent().each(function(){var b,c;b=$(this);return(c=b.prev().get(0))&&("H3"===c.nodeName||"H4"===c.nodeName)||$(c).hasClass("repeat-number")||0<b.parents("#jr-calculated-items, #jr-preload-items").length||
0<b.parents(".jr-appearance-field-list").length?null:b.before(a.clone())});$(".possible-break").each(function(){if($(this).prev().hasClass("possible-break"))return $(this).remove()})};
Print.prototype.addPageBreaks=function(){var a,b,c,d,e,f,g,h;g=9.5*this.dpi;d=function(a,b){this.begin=$(a);this.begin_top=this.begin.offset().top;this.end=$(b);this.end_top=this.end.offset().top;this.h=this.end_top-this.begin_top;if(0>this.h)throw console.debug("begin (top: "+this.begin_top+")",a),console.debug("end (top: "+this.end_top+")",b),Error("A question group has an invalid height.");};d.prototype.break_before=function(){var a,b;b=(a=this.begin.prev().get(0))?["after",a]:["before",this.begin.parent().get(0)];
a=b[0];return $(b[1])[a]("<hr class='page-break' />")};this.removePageBreaks();this.addPossiblePageBreaks();c=$(".possible-break");b=[];for(a=1;a<c.length;a++)b.push(new d(c[a-1],c[a]));d=0;c=[];a=[];f=0;for(h=b.length;f<h;f++)e=b[f],d+e.h>g?(a.push(c),c=[e],d=e.h):(c.push(e),d+=e.h);a.push(c);console.debug("pages: ",a);g=1;for(c=a.length;g<c;g++)b=a[g],0<b.length&&b[0].break_before();return $(".possible-break").remove()};/*
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
function Connection(){var a=this;this.CONNECTION_URL="/checkforconnection.php";this.SUBMISSION_URL="/data/submission";this.GETSURVEYURL_URL="/launch/get_survey_url";this.currentOnlineStatus=null;this.uploadOngoing=!1;this.oRosaHelper=new this.ORosaHelper(this);this.init=function(){this.checkOnlineStatus();a=this;window.setInterval(function(){a.checkOnlineStatus()},15E3);$(window).on("offline online",function(){console.log("window network event detected");a.setOnlineStatus(a.getOnlineStatus())});$(window).trigger("online")}}
Connection.prototype.checkOnlineStatus=function(){var a,b=this;navigator.onLine?$.ajax({type:"GET",url:this.CONNECTION_URL,cache:!1,dataType:"json",timeout:3E3,complete:function(c){a="undefined"!==typeof c.responseText&&"connected"===c.responseText;b.setOnlineStatus(a)}}):this.setOnlineStatus(!1)};Connection.prototype.getOnlineStatus=function(){return this.currentOnlineStatus};
Connection.prototype.setOnlineStatus=function(a){a!==this.currentOnlineStatus&&(console.log("online status changed to: "+a+", triggering window.onlinestatuschange"),$(window).trigger("onlinestatuschange",a));this.currentOnlineStatus=a};
Connection.prototype.uploadRecords=function(a,b,c){b="undefined"!==typeof b?b:!1;a="object"===typeof a&&!$.isArray(a)?[a]:a;c="undefined"===typeof c?null:c;if(0===a.length)return!1;this.uploadOngoing||(this.uploadResult={win:[],fail:[]},this.uploadQueue=a,this.forced=b,console.debug("upload queue length: "+this.uploadQueue.length),this.uploadOne(c));return!0};
Connection.prototype.uploadOne=function(a){var b,c,d,e=this,a="undefined"===typeof a||!a?{complete:function(a){$(document).trigger("submissioncomplete");e.processOpenRosaResponse(a.status,b.name,d);e.uploadOne()},error:function(a,b){"timeout"===b?console.debug("submission request timed out"):console.error("error during submission, textStatus:",b)},success:function(){}}:a;0<this.uploadQueue.length&&(b=this.uploadQueue.pop(),!0!==this.getOnlineStatus()?this.processOpenRosaResponse(0,b.name,!0):(this.uploadOngoing=
!0,c=new FormData,c.append("xml_submission_data",b.data),c.append("Date",(new Date).toUTCString()),d=0===this.uploadQueue.length?!0:!1,this.setOnlineStatus(null),$(document).trigger("submissionstart"),$.ajax(this.SUBMISSION_URL,{type:"POST",data:c,cache:!1,contentType:!1,processData:!1,timeout:6E4,complete:function(b,c){e.uploadOngoing=!1;a.complete(b,c)},error:a.error,success:a.success})))};
Connection.prototype.processOpenRosaResponse=function(a,b,c){var d,e="";d=[];var f="Contact "+settings.supportEmail+" please.",g="Sorry, the enketo server is down or being maintained. Please try again later or contact "+settings.supportEmail+" please.",f={"0":{success:!1,msg:"undefined"!==typeof jrDataStrToEdit?"Uploading of data failed. Please try again.":"Uploading of data failed (maybe offline) and will be tried again later."},200:{success:!1,msg:"Data server did not accept data. "+f},201:{success:!0,
msg:""},202:{success:!0,msg:b+" may have had errors. Contact the survey administrator please."},"2xx":{success:!1,msg:"Unknown error occurred when submitting data. "+f},400:{success:!1,msg:"Data server did not accept data. Contact the survey administrator please."},403:{success:!1,msg:"You are not allowed to post data to this data server. Contact the survey administrator please."},404:{success:!1,msg:"Submission service on data server not found or not properly configured."},"4xx":{success:!1,msg:"Unknown submission problem on data server."},
413:{success:!1,msg:"Data is too large. Please export the data and contact "+settings.supportEmail+"."},500:{success:!1,msg:g},503:{success:!1,msg:g},"5xx":{success:!1,msg:g}};console.debug("submission results for "+b+" => status: "+a);"undefined"!==typeof f[a]?!0===f[a].success?($(document).trigger("submissionsuccess",b),this.uploadResult.win.push([b,f[a].msg])):!1===f[a].success&&this.uploadResult.fail.push([b,f[a].msg]):500<a?(console.error("Error during uploading, received unexpected statuscode: "+
a),this.uploadResult.fail.push([b,f["5xx"].msg])):400<a?(console.error("Error during uploading, received unexpected statuscode: "+a),this.uploadResult.fail.push([b,f["4xx"].msg])):200<a&&(console.error("Error during uploading, received unexpected statuscode: "+a),this.uploadResult.fail.push([b,f["2xx"].msg]));if(!0===c){console.debug("forced: "+this.forced+" online: "+this.currentOnlineStatus,this.uploadResult);if(0<this.uploadResult.win.length){for(a=0;a<this.uploadResult.win.length;a++)d.push(this.uploadResult.win[a][0]),
e="undefined"!==typeof this.uploadResult.win[a][2]?e+this.uploadResult.win[a][1]+" ":"";a=1<a?" were":" was";d=d.join(", ");gui.feedback(d.substring(0,d.length)+a+" successfully uploaded. "+e);this.setOnlineStatus(!0)}if(0<this.uploadResult.fail.length){if(!0===this.forced&&!1!==this.currentOnlineStatus){for(a=0;a<this.uploadResult.fail.length;a++)e+=this.uploadResult.fail[a][0]+": "+this.uploadResult.fail[a][1]+"<br />";gui.alert(e,"Failed data submission")}this.setOnlineStatus(!1)}}};
Connection.prototype.isValidURL=function(a){return/^(https?:\/\/)(([\da-z\.\-]+)\.([a-z\.]{2,6})|(([0-9]{1,3}\.){3}[0-9]{1,3}))([\/\w \.\-]*)*\/?[\/\w \.\-\=\&\?]*$/.test(a)};Connection.prototype.getFormlist=function(a,b){b=this.getCallbacks(b);this.isValidURL(a)?$.ajax("/forms/get_list",{type:"GET",data:{server_url:a},cache:!1,contentType:"json",timeout:6E4,success:b.success,error:b.error,complete:b.complete}):b.error(null,"validationerror","not a valid URL")};
Connection.prototype.getSurveyURL=function(a,b,c){c=this.getCallbacks(c);!a||!this.isValidURL(a)?c.error(null,"validationerror","not a valid server URL"):!b||0===b.length?c.error(null,"validationerror","not a valid formId"):$.ajax({url:this.GETSURVEYURL_URL,type:"POST",data:{server_url:a,form_id:b},cache:!1,timeout:6E4,dataType:"json",success:c.success,error:c.error,complete:c.complete})};
Connection.prototype.getTransForm=function(a,b,c,d,e){var f=new FormData,e=this.getCallbacks(e),a=a||null,b=b||null,d=d||null,c=c||new Blob;0===c.size&&(!a||!b)&&!d?e.error(null,"validationerror","No form file or URLs provided"):0===c.size&&!this.isValidURL(a)&&!this.isValidURL(d)?e.error(null,"validationerror","Not a valid server or form url"):0===c.size&&!d&&(!b||0===b.length)?e.error(null,"validationerror","No form id provided"):(f.append("server_url",a),f.append("form_id",b),f.append("form_url",
d),f.append("xml_file",c),console.debug("form file: ",c),$.ajax("/transform/get_html_form",{type:"POST",cache:!1,contentType:!1,processData:!1,dataType:"xml",data:f,success:e.success,error:e.error,complete:e.complete}))};Connection.prototype.validateHTML=function(a,b){var c=new FormData,b=this.getCallbacks(b);c.append("level","error");c.append("content",a);$.ajax("/html5validate/",{type:"POST",data:c,contentType:!1,processData:!1,success:b.success,error:b.error,complete:b.complete})};
Connection.prototype.ORosaHelper=function(a){this.fragToServerURL=function(b,c){var d;d="";if(!c)return console.log("nothing to do"),null;console.debug("frag: "+c);if(a.isValidURL(c))return c;switch(b){case "http":case "https":d=/^http(|s):\/\//.test(c)?"":b+"://";d+=c;break;case "formhub_uni":case "formhub":d="https://formhub.org/"+c;break;case "appspot":d="https://"+c+".appspot.com"}if(!a.isValidURL(d))return console.error("not a valid url: "+d),null;console.log("server_url: "+d);return d}};
Connection.prototype.getNumberFormsLaunched=function(a){a=this.getCallbacks(a);$.ajax({url:"/front/get_number_launched_everywhere",dataType:"json",success:a.success,error:a.error,complete:a.complete})};Connection.prototype.loadGoogleMaps=function(a){var b=settings.mapsDynamicAPIKey||"",c=document.createElement("script");window.googleMapsInit=a;c.type="text/javascript";c.src="http://maps.googleapis.com/maps/api/js?v=3.exp&key="+b+"&sensor=false&libraries=places&callback=googleMapsInit";document.body.appendChild(c)};
Connection.prototype.getCallbacks=function(a){a=a||{};a.error=a.error||function(a,c,d){console.error(c+" : "+d)};a.complete=a.complete||function(){};a.success=a.success||function(){console.log("success!")};return a};