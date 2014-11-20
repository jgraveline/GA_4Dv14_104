
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var	socIdInputfield = getHtmlId('socIdInputfield'),
		societeListContainer = getHtmlId('societeListContainer'),
		societeDetailContainer = getHtmlId('societeDetailContainer');

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'societe';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		setTimeout(function() {
			$$(societeDetailContainer).hide();
			$$(societeListContainer).show();
		}, 200);

	// @region namespaceDeclaration// @startlock
	var dataGrid1 = {};	// @dataGrid
	var buttonCancel = {};	// @button
	var buttonSave = {};	// @button
	var buttonAdd = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		$$(societeListContainer).hide();
		$$(societeDetailContainer).show();
	};// @lock

	buttonCancel.click = function buttonCancel_click (event)// @startlock
	{// @endlock
		if ($comp.sources.societe.isNewElement()) {
			$comp.sources.societe.removeCurrentReference();
		}
		
		$$(societeDetailContainer).hide();
		$$(societeListContainer).show();
	};// @lock

	buttonSave.click = function buttonSave_click (event)// @startlock
	{// @endlock
		$$(societeDetailContainer).hide();
		$$(societeListContainer).show();
	
		$comp.sources.societe.save({
			onSuccess: function(event) {
				//
			}
		});

	};// @lock

	buttonAdd.click = function buttonAdd_click (event)// @startlock
	{// @endlock
		$comp.sources.societe.addNewElement();
		$comp.sources.societe.serverRefresh({
			onSuccess: function(event) {
				$$(societeListContainer).hide();
				$$(societeDetailContainer).show();
				$$(socIdInputfield).focus();
			}
		});
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_buttonCancel", "click", buttonCancel.click, "WAF");
	WAF.addListener(this.id + "_buttonSave", "click", buttonSave.click, "WAF");
	WAF.addListener(this.id + "_buttonAdd", "click", buttonAdd.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
