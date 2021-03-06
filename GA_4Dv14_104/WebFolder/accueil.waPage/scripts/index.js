﻿
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
	var login = {};	// @login
// @endregion// @endlock

//	var componentPath = "/components/detailTemps.waComponent";

	function componentChoice (userProfil)
	{		
		if (userProfil === undefined) {
			var sessionInfos = ds.Intervenant.getSessionInfos ();
			userProfil = sessionInfos.userProfil;
		}	

		var componentPath = "/components/";
		if (userProfil <= 2) { //admin
			componentPath += "detailTemps.waComponent";
//			componentPath += "admin.waComponent";
		} else { 
			componentPath += "detailTemps.waComponent";
		}
		return componentPath;
	};
	

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
//		debugger;
		if (WAF.directory.currentUser() == null) {
			$$("splashImage").show(200);
		} else {

			var sessionInfos = ds.Intervenant.getSessionInfos ();
			if (sessionInfos.logStatus === 0) {
				$$("splashImage").show(200);
			} else {
				$$("splashImage").hide(200);
				$$("mainComponent").loadComponent(componentChoice (sessionInfos.userProfil));
//				$$("componentMain").loadComponent(componentPath);
			}
		}
	};// @lock

	login.logout = function login_logout (event)// @startlock
	{// @endlock
		ds.Detail_Temps.clearCache();
		ds.DosPosInt_A.clearCache();
		ds.DosPos_A.clearCache();
		ds.Semaine.clearCache();
		ds.Dossier.clearCache();
		ds.Poste.clearCache();
		ds.Societe.clearCache();
//		ds.Type_Societe.clearCache();
//		ds.Statut_Societe.clearCache();
		ds.Intervenant.clearCache();
//		ds.Type_Intervenant.clearCache();
//		ds.Statut_Intervenant.clearCache();

		$$("mainComponent").removeComponent(componentChoice ());
//		$$("componentMain").loadComponent(componentPath);
		$$("splashImage").show(200);

	};// @lock

	login.login = function login_login (event)// @startlock
	{// @endlock
		$$("splashImage").hide(200);
		$$("mainComponent").loadComponent(componentChoice ());

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("login", "logout", login.logout, "WAF");
	WAF.addListener("login", "login", login.login, "WAF");
// @endregion
};// @endlock
