jQuery.fn.addUserProjectsSelect=function(s){var settings=jQuery.extend({projects:null,name:null},s);return this.each(function(){var wrapper=$(this).addClass("add_user_projects_select").disableSelection();if(settings.projects.length){var group='<div class="project_group"><label><input type="checkbox" name="" class="group_checkbox"> '+App.lang("Select All")+"</label><ul>";App.each(settings.projects,function(project_id,project_name){group+='<li class="group_project"><input type="checkbox" name="'+settings.name+'[]" class="project_checkbox" value="'+project_id+'"> <span class="project_label">'+App.clean(project_name)+"</span></li>"});wrapper.append(group+"</ul></div>")}var select_project=function(project){if(project.find("input.project_checkbox:checked").length<1){project.find("input.project_checkbox").prop("checked",true)}};var deselect_project=function(project){if(project.find("input.project_checkbox:checked").length==1){project.find("input.project_checkbox").prop("checked",false)}};var update_group_checkbox=function(group){if(group.find("input.project_checkbox").length==group.find("input.project_checkbox:checked").length){group.find("input.group_checkbox").prop("checked",true)}else{group.find("input.group_checkbox").prop("checked",false)}};wrapper.find("div.project_group").each(function(){var group=$(this);group.find("input.group_checkbox").click(function(){var group_selected=this.checked;group.find("li.group_project").each(function(){if(group_selected){select_project($(this))}else{deselect_project($(this))}})});group.find("li.group_project").each(function(){var project=$(this);project.find("input.project_checkbox").click(function(){if(this.checked){select_project(project)}else{deselect_project(project)}update_group_checkbox(group)});project.find("span.project_label").click(function(){if(!$(this).prev().is(":checked")){select_project(project)}else{deselect_project(project)}update_group_checkbox(group)})})});wrapper.find("div.project_group").each(function(){update_group_checkbox($(this))})})};