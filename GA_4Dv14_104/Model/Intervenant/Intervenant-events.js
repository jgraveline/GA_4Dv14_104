﻿model.Intervenant.fullName = new Attribute("calculated", "string");model.Intervenant.fullName.onGet = function() { 	return this.INT_Prenom + " " + this.INT_Nom;}model.Intervenant.events.restrict = function(event) {			var result = ds.Intervenant.createEntityCollection(),		currSession = currentSession(),		currUser = currSession.user,		currUserID = sessionStorage.ID,		currUserProfil = sessionStorage.profil,        theGroups = ["", "GA_SuperUtilisateur", "GA_Admin", "GA_User", "GA_WEB_Only"], //Roles        currUserGroup = theGroups[currUserProfil];		//debugger;	if (currUser.name === "default guest") {		result = ds.Intervenant.query("STATINT_ID == 0");  //seuls les intervenants valides peuvent se connecter		//result = ds.Intervenant.all();	} else if (currSession.belongsTo("GA_SuperUtilisateur")) { //functional only if group defined in wa.Directory ?		result = ds.Detail_Temps.all();	} else if (currUserGroup === "GA_SuperUtilisateur") {		result = ds.Detail_Temps.all();//	} else if (currUserGroup === "GA_NoAccess") {//		result = ds.Intervenant.noEntities();					} else if (currUserID != null) {		result = ds.Intervenant.query("INT_ID == :1", currUserID);	} else {		result = ds.Intervenant.noEntities();					}	return result;};