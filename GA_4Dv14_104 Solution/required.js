﻿function loginHandler(userName, passwordOrKey, secondIsAKey) {//	debugger;		var errLogin = {error: 1024, errorMessage: "Utilisateur ou mot de passe invalide"},		    user = ds.Intervenant.find("INT_Identifiant_acces = :1", userName); //use data from the project for login		if (user !== null) { // if a user was found		if (user.validatePassword (passwordOrKey)) {		// TODO : use a key and passwordIsValid() instead pw        //if (user.passwordIsValid(passwordOrKey, secondIsAKey)) {					var userProfil = user.INT_Profil,		        theGroups = ["", "GA_SuperUtilisateur", "GA_Admin", "GA_User", "GA_WEB_Only"], //Roles            	userGroup = [theGroups[userProfil]];			return {				name: userName, //user.INT_Identifiant_acces, 				fullName:user.INT_Prenom + " " +user.INT_Nom, 				belongsTo: userGroup, //functional only if group defined in wa.Directory ?				storage: {					ID: user.getKey(),					profil: userProfil				}					};		} else {			return errLogin;		}	} else {			return errLogin;		}		//return false;};