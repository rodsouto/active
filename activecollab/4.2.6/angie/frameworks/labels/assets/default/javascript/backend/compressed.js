/* Minified: main.js */
App.Wireframe["Utils"]["dataFilters"]["prepareSelectLabels"]=function(submit_as,criterion,filter,data,get_name,get_value){var options=[];App.each(data.labels,function(k,v){options.push(v.name)});var picker_wrapper=$('<div class="autocomplete_wrapper"></div>').appendTo(this);var picker=$('<input type="text" name="'+submit_as+"["+get_name(criterion)+']">').appendTo(picker_wrapper).attr("value",get_value(filter,criterion)).focus();picker.multicomplete({source:options,appendTo:picker_wrapper,position:{my:"left bottom",at:"left bottom",of:picker}});picker_wrapper.width(picker.width())};
