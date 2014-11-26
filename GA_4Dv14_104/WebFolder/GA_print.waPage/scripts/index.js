
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock


// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//TODO : récupérer la sélection courante
		//var DTprintContainerDomId = document.getElementById('DTprintContainer');
		debugger;
		var dtCollection = sources.intervenant.getSessionInfo('dtCollection');
		var printHtml = '';

		sources.detail_Temps.setSelection(dtCollection);
		printHtml = sources.detail_Temps.print (); 
		
//		var dtSet = sources.detail_Temps.query("DET_Date >= 2012-10-01 AND DET_Date <= 2012-10-07 order by DET_Date, DPI_ID");
//		printHtml = dtSet.print ();		
//		printHtml = sources.detail_Temps.print ();

//		sources.detail_Temps.query("DET_Date >= 2012-10-01 AND DET_Date <= 2012-10-07 order by DET_Date, DPI_ID",{
//			onSuccess: function(event)
//	        {
//    		    var dtCollection = event.entityCollection;
//				printHtml = dtCollection.print (); //sources.detail_Temps.print ();
//	        },
//	        onError: function (error)
//	        {
//	        	printHtml = '<p>Error : ' + error + '</p>';
//	    	}
//	    });
		
		$('#' + 'DTprintContainer').html(printHtml);

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
