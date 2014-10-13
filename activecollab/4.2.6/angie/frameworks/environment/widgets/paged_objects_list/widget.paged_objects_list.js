(function($){var public_methods={init:function(s){return this.each(function(){var wrapper=$(this);var wrapper_dom=this;var variables=_variables(wrapper);variables.settings=$.extend({paged:true,load_more_url:null,items_per_load:10,watch_url:null,watch_interval:60000,items:{},total_items:0,on_add_item:function(){throw"on_add_item callback not provided"},clean_columns:true,list_items_are:"article",list_item_attributes:null,listen:{create:null,update:null,"delete":null},listen_scope:"content",listen_constraint:null,direction:"asc",columns:null,show_columns:true,sort_by:null,empty_message:App.lang("List is empty"),timestamp:Math.round(new Date().getTime()/1000),additional_links:null,init:null},s);initialize_wrapper.apply(this);if(App.isForeachable(variables.settings["items"])){$.each(variables.settings["items"],function(index,item){add_existing_item.apply(wrapper_dom,[item,true])})}refresh.apply(this);delete variables.settings["items"];if(variables.settings["init"]&&typeof(variables.settings["init"])=="function"){variables.settings["init"].apply(this)}})},get_item:function(id){return get_item.apply(this[0],[id])},get_loaded_items:function(){return get_loaded_items.apply(this[0])},add_items:function(items,existing){return this.each(function(){for(var i in items){if(existing){add_existing_item.apply(this,[item[i],true])}else{add_item.apply(this,[item[i]])}}if(existing){refresh.apply(this)}})},add_item:function(item){return this.each(function(){add_item.apply(this,[item])})},add_existing_item:function(item,bulk){return this.each(function(){add_existing_item.apply(this,[item,bulk])})},update_item:function(item){return this.each(function(){update_item.apply(this,[item])})},delete_item:function(item,bulk){if(typeof(item)=="object"&&item){var item_id=item.id}else{var item_id=item}return this.each(function(){delete_item.apply(this,[item_id,bulk])})},delete_item_by_id:function(item_id,bulk){return this.each(function(){delete_item.apply(this,[item_id,bulk])})},delete_all_items:function(bulk){var all=get_loaded_items.apply(this[0]);var wrapper=this;all.each(function(index,item){if(typeof(item)=="object"&&item){delete_item.apply(wrapper,[$(item).attr("list_item_id"),bulk])}})}};var initialize_wrapper=function(){var wrapper=$(this).addClass("paged_objects_list");var variables=_variables(wrapper);if(variables.settings["list_items_are"]=="tr"){variables.items_container=$('<table class="common auto list_items'+(variables.settings["class"]?" "+variables.settings["class"]:"")+'" cellspacing="0"><thead></thead><tfoot></tfoot><tbody></tbody></table>').appendTo(wrapper);var column_count=0;if(typeof(variables.settings["columns"])=="object"){var head=variables.items_container.find("thead");var head_row=$("<tr></tr>").appendTo(head);for(var column in variables.settings["columns"]){if(variables.settings["show_columns"]){if(variables.settings["clean_columns"]){head_row.append('<th class="'+column+'">'+App.clean(variables.settings["columns"][column])+"</th>")}else{head_row.append('<th class="'+column+'">'+variables.settings["columns"][column]+"</th>")}}column_count++}if(!variables.settings["show_columns"]){variables.items_container.find("thead").remove()}}else{variables.items_container.find("thead").remove()}variables.load_more=$('<tr class="load_more_items" ><td colspan="'+column_count+'"></td></tr>').appendTo(variables.items_container.find("tfoot"));variables.list_break='<tr class="list_break" ><td colspan="'+column_count+'"><hr></td></tr>'}else{variables.items_container=$('<div class="list_items"></div>').appendTo(wrapper);variables.load_more=$('<p class="load_more_items" style="display: none"></p>').appendTo(wrapper);variables.list_break='<div class="list_break"><hr></div>'}if(typeof(variables.settings["empty_message"])=="function"){variables.empty_list_message=$('<p class="empty_page" style="display: none"></p>').append(variables.settings["empty_message"]()).appendTo(wrapper)}else{variables.empty_list_message=$('<p class="empty_page" style="display: none"></p>').text(variables.settings["empty_message"]).appendTo(wrapper)}var prepare_event_names=function(e){var events=e.split(" ");if(jQuery.isArray(events)&&events.length){var result=[];$.each(events,function(i,event){if(variables.settings["listen_scope"]){result.push(event+"."+variables.settings["listen_scope"])}else{result.push(event)}});return result}else{return[(variables.settings["listen_scope"]?e+"."+variables.settings["listen_scope"]:e)]}};var created_event_name=false;var updated_event_name=false;var deleted_event_name=false;if(typeof(variables.settings["listen"])=="string"&&variables.settings["listen"]){created_event_name=variables.settings["listen"]+"_created";updated_event_name=variables.settings["listen"]+"_updated";deleted_event_name=variables.settings["listen"]+"_deleted"}else{if(typeof(variables.settings["listen"])=="object"){if(typeof(variables.settings["listen"]["create"])=="string"){created_event_name=variables.settings["listen"]["create"]}if(typeof(variables.settings["listen"]["update"])=="string"){updated_event_name=variables.settings["listen"]["update"]}if(typeof(variables.settings["listen"]["delete"])=="string"){deleted_event_name=variables.settings["listen"]["delete"]}}}var wrapper_dom=this;if(created_event_name){var event_names=prepare_event_names(created_event_name);$.each(event_names,function(index,event_name){App.Wireframe.Events.bind(event_name,function(event,item){if(typeof(variables.settings["listen_constraint"])=="function"&&variables.settings["listen_constraint"].apply(this,[event,item])===false){return}add_item.apply(wrapper[0],[item])})})}if(updated_event_name){var event_names=prepare_event_names(updated_event_name);$.each(event_names,function(index,event_name){App.Wireframe.Events.bind(event_name,function(event,item){if(typeof(variables.settings["listen_constraint"])=="function"&&variables.settings["listen_constraint"].apply(this,[event,item])===false){return}update_item.apply(wrapper[0],[item])})})}if(deleted_event_name){var event_names=prepare_event_names(deleted_event_name);$.each(event_names,function(index,event_name){App.Wireframe.Events.bind(event_name,function(event,item){if(typeof(variables.settings["listen_constraint"])=="function"&&variables.settings["listen_constraint"].apply(this,[event,item])===false){return}delete_item.apply(wrapper[0],[item.id])})})}};var get_item=function(id){var variables=_variables($(this));if(variables.settings["list_items_are"]=="tr"){var current_item=variables.items_container.find("tbody tr[list_item_id="+id+"]")}else{var current_item=variables.items_container.find("article[list_item_id="+id+"]")}return current_item};var add_item=function(item){var variables=_variables($(this));if(variables.settings["list_items_are"]=="tr"){variables.items_container.find("tbody").append(render_item.apply(this,[item]))}else{variables.items_container.append(render_item.apply(this,[item]))}variables.settings["total_items"]+=1;refresh.apply(this);if(variables.settings["list_items_are"]=="tr"){get_item.apply(this,[item.id]).find("td").highlightFade()}else{get_item.apply(this,[item.id]).highlightFade()}};var add_existing_item=function(item,bulk){var variables=_variables($(this));if(variables.settings["list_items_are"]=="tr"){variables.items_container.find("tbody").append(render_item.apply(this,[item]))}else{variables.items_container.append(render_item.apply(this,[item]))}if(typeof(bulk)=="undefined"||!bulk){refresh.apply(this)}};var add_items=function(items,existing){var variables=_variables($(this));for(var i in items){if(existing){add_existing_item.apply(this,[items[i],true])}else{add_item.apply(this,[items[i],true])}}refresh.apply(this)};var update_item=function(item){var element=get_item.apply(this,[item.id]);if(element.length){var variables=_variables($(this));element.hide().after(render_item.apply(this,[item])).remove();refresh.apply(this);if(variables.settings["list_items_are"]=="tr"){get_item.apply(this,[item.id]).find("td").highlightFade()}else{get_item.apply(this,[item.id]).highlightFade()}}else{throw"Item #"+item.id+" does not exist"}};var delete_item=function(id,bulk){var variables=_variables($(this));var element=get_item.apply(this,[id]);if(element.length){element.remove()}else{throw"Item #"+item.id+" does not exist"}variables.settings["total_items"]-=1;if(typeof(bulk)=="undefined"||!bulk){refresh.apply(this)}};var get_item_selector=function(){var variables=_variables($(this));if(variables.settings["list_items_are"]=="tr"){return selector="tr.list_item"}else{return selector="article.list_item"}};var get_loaded_items=function(){return _variables($(this))["items_container"].find(get_item_selector.apply(this))};var get_loaded_item_ids=function(){var loaded_item_ids=[];get_loaded_items.apply(this).each(function(){loaded_item_ids.push($(this).attr("list_item_id"))});return loaded_item_ids};var count_loaded_items=function(){return _variables($(this))["items_container"].find(get_item_selector.apply(this)).length};var set_list_break=function(){var variables=_variables($(this));variables.items_container.find(".list_break").remove();if(count_loaded_items.apply(this)>0){variables.items_container.find(get_item_selector.apply(this)+":last").after(variables.list_break)}else{variables.items_container.append(variables.list_break)}variables.items_container.find(".list_break hr").attr("title",App.lang("Click to Hide")).click(function(){$(this).parent().remove()})};var refresh=function(){var wrapper=$(this);var variables=_variables(wrapper);var items_count=count_loaded_items.apply(this);if(items_count){variables.items_container.show();variables.empty_list_message.hide();var load_more_content=variables.load_more[0].nodeName=="TR"?variables.load_more.find("td"):variables.load_more;if(items_count<variables.settings["total_items"]){if(variables.settings["total_items"]==1){load_more_content.empty().append('<span class="load_more_items_wrapper">'+App.lang('Showing :loaded of :total item. <a href="#" class="load_more_items">Load More</a>',{loaded:items_count,total:variables.settings["total_items"]})+"</span>")}else{load_more_content.empty().append('<span class="load_more_items_wrapper">'+App.lang('Showing :loaded of :total items. <a href="#" class="load_more_items">Load More</a>',{loaded:items_count,total:variables.settings["total_items"]})+"</span>")}load_more_content.find("a.load_more_items").attr("href",variables.settings["load_more_url"]).click(function(){var link=$(this);load_more_content.find("span.load_more_items_wrapper").hide();load_more_content.append('<img src="'+App.Wireframe.Utils.indicatorUrl()+'" title="'+App.lang("Loading...")+'" />');$.ajax({type:"get",url:App.extendUrl(link.attr("href"),{paged_list:1,paged_list_exclude:get_loaded_item_ids.apply(wrapper[0]).join(","),paged_list_count:variables.settings["items_per_load"],paged_list_timestamp:variables.settings["timestamp"]}),success:function(response){variables.load_more.find("img").remove();if(typeof(response)=="object"&&response){set_list_break.apply(wrapper[0]);App.each(response,function(i,object){add_existing_item.apply(wrapper[0],[object,true])});refresh.apply(wrapper[0]);if(variables.load_more.find("span.load_more_items_wrapper").length){variables.load_more.find("span.load_more_items_wrapper").show()}}else{variables.load_more.find("span.load_more_items_wrapper").show()}},error:function(){App.Wireframe.Flash.error("Failed to load more items");variables.load_more.find("img").remove();variables.load_more.find("span.load_more_items_wrapper").show()}});return false});variables.load_more.show()}else{variables.load_more.hide()}sort.apply(this)}else{variables.items_container.hide();variables.load_more.hide();variables.empty_list_message.show()}};var sort=function(){var variables=_variables($(this));if(variables.settings["list_items_are"]=="tr"&&variables.settings["sort_by"]!==null){variables.items_container.SortBySelector({row_selector:"tr.list_item",value_selector:typeof(variables.settings["sort_by"])=="function"?variables.settings["sort_by"]:"td."+variables.settings["sort_by"]})}};var render_item=function(item){var variables=_variables($(this));var stub=$("<"+variables.settings["list_items_are"]+"></"+variables.settings["list_items_are"]+">").attr({"class":"list_item",list_item_id:typeof(item.id)=="undefined"?"unknown":item.id});if(typeof(variables.settings["list_item_attributes"])=="object"){for(var attribute in variables.settings["list_item_attributes"]){if(attribute=="class"){stub.addClass(variables.settings["list_item_attributes"]["class"])}else{stub.attr(attribute,variables.settings["list_item_attributes"][attribute])}}}if(variables.settings["on_add_item"].apply(stub[0],[item])!==false){if(variables.settings["list_items_are"]=="tr"){variables.items_container.find("tbody").append(stub)}else{variables.items_container.append(stub)}}return stub};var plugin_name="pagedObjectsList";$.fn[plugin_name]=function(method){if(public_methods[method]){return public_methods[method].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof method==="object"||!method){return public_methods.init.apply(this,arguments)}else{$.error("Method "+method+" does not exist on jQuery."+plugin_name)}}};var _variables=function(element){var variables=element.data(plugin_name+"Variables");if(variables){return variables}element.data(plugin_name+"Variables",{});return element.data(plugin_name+"Variables")}})(jQuery);