/* Minified: jquery.backendQuickSearch.js */
jQuery.fn.backendQuickSearch=function(s){var settings=jQuery.extend({search_url:"",quick_search_url:"",quick_search_delay:500},s);return this.each(function(){var wrapper=$(this);var form=$('<form action="'+App.clean(settings.quick_search_url)+'"><input type="text" name="q" autocomplete="off" placeholder="'+App.lang("Search")+'"></form>').appendTo(wrapper);var input=form.find("input[name=q]");var popup=$('<div id="global_search_autocomplete" class="empty" style="display: none"><div id="global_search_autocomplete_results"><div class="message">'+App.lang("Type the search term in the field above to search")+'</div></div><div id="global_search_autocomplete_advanced">'+App.lang('Not finding what you are looking for? Try <a href=":url">advanced search</a>.',{url:settings.search_url})+"</div></div>").appendTo(wrapper);var advanced_search=$("#global_search_autocomplete_advanced a");advanced_search.click(function(){hide_popup()}).flyout({width:800,title:App.lang("Advanced Search"),href:function(){var search_for=jQuery.trim(input.val());if(search_for){return App.extendUrl(settings.search_url,{search_for:search_for})}else{return settings.search_url}}});var results=popup.find("#global_search_autocomplete_results").delegate("tr.search_result","click",function(e){if(e.shiftKey){var row=$(this);var anchor=$('<a class="quick_view_item" href="'+App.clean(row.attr("search_result_url"))+'">'+App.clean(row.find("span.search_result_name").text())+"</a>");clear_results();hide_popup();App.widgets.QuickView.preview(anchor,true)}else{go_to_result($(this).attr("search_result_url"))}e.stopPropagation();return false}).disableSelection();var search_delayed_timer=false;var search=function(){if(search_delayed_timer){clearTimeout(search_delayed_timer)}var search_for=jQuery.trim(input.val());if(search_for){popup.addClass("searching");results.empty().append('<div class="message"><img src="'+App.Wireframe.Utils.indicatorUrl()+'"></div>');$.ajax({url:App.extendUrl(form.attr("action"),{q:search_for}),type:"get",success:function(response){if(jQuery.isArray(response)&&response.length==2){var search_results=response[0];var total_hits=response[1];results.empty();if(total_hits==0){results.append('<div class="message">'+App.lang("Search returned no results. Please try a different term or use advanced search.")+"</div>")}else{var table=$('<table class="search_results common" cellspacing="0"><tbody></tbody></table>').appendTo(results);var tbody=table.find("tbody");var counter=1;App.each(search_results,function(k,search_result){if(typeof(search_result.type)=="string"&&search_result.type&&typeof(search_result.verbose_type)=="string"&&search_result.verbose_type){var object_type_html='<span class="object_type object_type_'+App.clean(search_result.type_underscore)+'">'+App.clean(search_result.verbose_type)+"</span> "}else{var object_type_html=""}if(typeof(search_result.short_name)=="string"&&search_result.short_name){var short_var=search_result.short_name}else{var short_var=""}var is_selected=counter===1?" selected":"";var extra_name_class="";if(search_result.is_crossed_over){extra_name_class+=" crossed_over"}tbody.append('<tr class="search_result'+is_selected+'" search_result_url="'+App.clean(search_result.permalink)+'"><td class="name">'+object_type_html+'<span class="search_result_name'+extra_name_class+'">'+App.clean(search_result.name)+'</span></td><td class="short_name">'+App.clean(short_var)+"</td></tr>");counter++})}}else{}},error:function(){clear_results();App.Wireframe.Flash.error("Failed to execute your search query. Please try again later")}})}else{clear_results()}};var search_delayed=function(){if(search_delayed_timer){clearTimeout(search_delayed_timer)}search_delayed_timer=setTimeout(search,settings.quick_search_delay)};var clear_results=function(){popup.addClass("empty");results.empty().append('<div class="message">'+App.lang("Type the search term in the field above to search")+"</div>")};var next_result=function(){var selected_result=results.find("table.search_results tbody tr.selected");if(selected_result.length==1){var next_result=selected_result.next("tr.search_result");if(next_result.length==1){selected_result.removeClass("selected");next_result.addClass("selected")}}};var prev_result=function(){var selected_result=results.find("table.search_results tbody tr.selected");if(selected_result.length==1){var prev_result=selected_result.prev("tr.search_result");if(prev_result.length==1){selected_result.removeClass("selected");prev_result.addClass("selected")}}};var open_current_link=function(preview){var selected_result=results.find("table.search_results tbody tr.selected");if(selected_result.length>0){if(preview){var anchor=$('<a class="quick_view_item" href="'+selected_result.attr("search_result_url")+'">'+selected_result.find("td.name").text()+"</a>");clear_results();hide_popup();App.widgets.QuickView.preview(anchor,true)}else{go_to_result(selected_result.attr("search_result_url"))}}};var go_to_result=function(url){App.Wireframe.Content.setFromUrl(url);clear_results();hide_popup()};var show_popup=function(){setTimeout(function(){$(window).bind("click.global_search",function(event){if(!event.target){return true}var target=$(event.target);if(!target.parents("#global_search_autocomplete").length&&!target.is(input)){hide_popup()}})},100);popup.show();clear_results();input.addClass("active")};var hide_popup=function(){$(window).unbind("click.global_search");popup.hide();input.removeClass("active").val("").blur()};input.focus(function(){show_popup()});var search_value="";input.keydown(function(event){switch(event.keyCode){case 40:next_result();return false;case 38:prev_result();return false;case 9:hide_popup();return true;case 27:hide_popup();return false;case 13:if(event.shiftKey){open_current_link(true)}else{open_current_link()}return false;default:setTimeout(function(){if(input.val()!=search_value){search_delayed();search_value=input.val()}},30)}})})};