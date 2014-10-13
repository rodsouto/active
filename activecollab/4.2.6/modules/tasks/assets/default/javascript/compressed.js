/* Minified: inspector.properties.RelatedTasks.js */
App.Inspector.Properties.RelatedTasks=function(object,client_interface){var wrapper=$(this);var wrapper_row=wrapper.parents("div.property:first");if(object.has_related_tasks){var check_string=[];$.each(object.related_tasks,function(index,item){check_string.push(item.id)});check_string=check_string.join("-")}else{var check_string="no_related_tasks"}if(wrapper.attr("check_string")==check_string){return true}wrapper.attr("check_string",check_string).empty();var to_append=[];if(object.has_related_tasks){var related_tasks_list=[];$.each(object.related_tasks,function(index,item){if(item.is_completed){related_tasks_list.push('<del><a href="'+App.clean(item.url)+'" title="'+App.clean(item.name)+'" class="quick_view_item quick_view_item_invert">#'+item.task_id+"</a></del>")}else{related_tasks_list.push('<a href="'+App.clean(item.url)+'" title="'+App.clean(item.name)+'" class="quick_view_item quick_view_item_invert">#'+item.task_id+"</a>")}});related_tasks_list=related_tasks_list.join(", ")}else{var related_tasks_list="<span>"+App.lang("No related tasks")+"</span>"}var trigger_wrapper=$('<span class="inspector_edit_wrapper"></span>').append(related_tasks_list).appendTo(wrapper);if(client_interface=="default"){if(object.permissions["can_edit"]){$('<a href="'+object.urls["related_tasks"]+'" class="editor_trigger" title="'+App.lang("Manage Related Tasks")+'"><img src="'+App.Wireframe.Utils.imageUrl("icons/12x12/inspector-edit.png","environment")+'"></a>').flyout({width:900}).appendTo(trigger_wrapper)}else{$('<a href="'+object.urls["related_tasks"]+'" class="editor_trigger" title="'+App.lang("Show Details")+'"><img src="'+App.Wireframe.Utils.imageUrl("icons/12x12/preview.png","environment")+'"></a>').flyout({title:App.lang("Related Tasks"),width:900}).appendTo(trigger_wrapper)}}if(!object.permissions["can_edit"]&&!object.has_related_tasks){wrapper_row.hide()}};