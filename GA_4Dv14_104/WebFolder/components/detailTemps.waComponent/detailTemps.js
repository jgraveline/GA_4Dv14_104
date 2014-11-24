
(function Component (id) {// @lock

// Add the code that needs to be shared between components here
// test

function constructor (id) {
	var DTlistContainer = getHtmlId('DTlistContainer');
	var DTdataGridDomId = getHtmlId('DTdataGrid2');
	var buttonDupliDomId = getHtmlId('buttonDupli');
	var buttonFindDomID = getHtmlId('buttonFind');
	var buttonPrintDomID = getHtmlId('buttonPrint');
	var buttonPrevDomId = getHtmlId('buttonPrev');
	var buttonNextDomId = getHtmlId('buttonNext');
	var textFieldDateSeekDomID = getHtmlId('textFieldDateSeek');
	var comboboxWeek$ = getHtmlObj('comboboxWeek');

	var DTdetailContainer = getHtmlId('DTdetailContainer');
	var textFieldDateInputRef = getHtmlId('textFieldDateInput');
	var textFieldHeuresRef = getHtmlId('textFieldHeures');
	var comboboxDPI$ = getHtmlObj('comboboxDPI');
	
	var dialogFindDomId = getHtmlId('dialogFind');
	var findDateDebutVar = getHtmlId('textFieldFindDateFind1');
	var comboboxFindWeekdomId = getHtmlId('comboboxFindWeek');
	var comboboxFindWeek$ = getHtmlObj('comboboxFindWeek');
	var comboboxfindDossier$ = getHtmlObj('comboboxfindDossier');
	var comboboxfindPoste$ = getHtmlObj('comboboxfindPoste'); 

	var dialogDupliDomId = getHtmlId('dialogDupli');
	var dupliDecalVar = getHtmlId('textFieldDupliDecal');
	
	var DTprintContainerDomId = getHtmlId('DTprintContainer');
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'detailTemps';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var DTprintContainer = {};	// @container
	var buttonPrint = {};	// @button
	var comboWeeksArrEvent = {};	// @dataSource
	var buttonFind = {};	// @button
	var buttonFindOk = {};	// @button
	var buttonFindCancel = {};	// @button
	var buttonDupliCancel = {};	// @button
	var buttonDupliOK = {};	// @button
	var textFieldInputTemps = {};	// @textField
	var buttonAdd = {};	// @button
	var buttonDupli = {};	// @button
	var comboboxDPI = {};	// @combobox
	var dtDateInputVarEvent = {};	// @dataSource
	var comboboxDay = {};	// @combobox
	var DTdataGrid2 = {};	// @dataGrid
	var buttonDelete = {};	// @button
	var buttonNext = {};	// @button
	var buttonPrev = {};	// @button
	var buttonSave = {};	// @button
	var buttonCancel = {};	// @button
	var dtDate_varEvent = {};	// @dataSource
	var detail_TempsEvent = {};	// @dataSource
	// @endregion// @endlock

	Date.prototype.addDays = function(days) {
	this.setDate(this.getDate()+days);
	};

	function addDays (date, days) {
	    var result = new Date(date);
	    result.setDate(date.getDate() + days);
	    return result;
	};

	function jsDateStr2Date (jsDateStr) {
		var	yearStr = jsDateStr.substr(0, 4);
		var monthStr = String(Number(jsDateStr.substr(5, 2)) - 1); //js month 0-11
		var dayStr = jsDateStr.substr(8, 2);
		return new Date(yearStr, monthStr, dayStr);	
	};
	
	function formatDateOnly (dateObject) {
		var currDate = dateObject.getDate();
		var currMonth = dateObject.getMonth();
		currMonth++; // convert month 0-11 in 1-12 
		var currYear = dateObject.getFullYear();
		return currYear + '-' + (currMonth < 10 ? '0' : '') + currMonth + '-' + (currDate < 10 ? '0' : '') + currDate;
	};

	function firstDateOfWeek (dateObject) {
		var currDay = dateObject.getDay() || 7; // Get current day number, converting Sun. to 7
		return new Date(dateObject.getTime() - 60*60*24* currDay*1000); //will return the date of the firstday (ie sunday) of the week
	};

	function comboWeeksFill (dateObject, numberOfWeeks) {
		var currDate = dateObject.getDate();
		var currMonth = dateObject.getMonth();
		var currYear = dateObject.getFullYear();
		var noChoice = 'Aucune';
		waf.ds.Semaine.getWeeksArr(currDate, currMonth, currYear, numberOfWeeks, noChoice, {
			onSuccess: function(event) {
				$comp.sourcesVar.comboWeeksArr = event.result.slice(0);
				$comp.sources.comboWeeksArr.sync();	
				$comp.sources.comboWeeksArr.select(11);
			},
			onError: function(event) {
				WAF.ErrorManager.displayError(event);
			}
		});	
	};
	
	function comboWeeksFindFill(centerDate, numberOfWeeks) {
		var currDate = centerDate.getDate();
		var currMonth = centerDate.getMonth();
		var currYear = centerDate.getFullYear();
		var numberOfWeeks = 21;
		var noChoice = 'Aucune';
		waf.ds.Semaine.getWeeksArr(currDate, currMonth, currYear, numberOfWeeks, noChoice, {
			onSuccess: function(event) {
				$comp.sourcesVar.comboWeeksFindArr = event.result.slice(0);
				$comp.sources.comboWeeksFindArr.sync();	
				$comp.sources.comboWeeksFindArr.select(0);
			},
			onError: function(event) {
				WAF.ErrorManager.displayError(event);
			}
		});			
	}
	
	function comboDossierFindFill () {
		waf.ds.Dossier.getDossierArr({
			onSuccess: function(event) {
				$comp.sourcesVar.comboDossierFindArr = event.result.slice(0);
				$comp.sources.comboDossierFindArr.sync();	
				$comp.sources.comboDossierFindArr.select(0);
			},
			onError: function(event) {
				WAF.ErrorManager.displayError(event);
			}
		});	
	}
	
	function comboPosteFindFill () {
		waf.ds.Poste.getPosteArr({
			onSuccess: function(event) {
				$comp.sourcesVar.comboPosteFindArr = event.result.slice(0);
				$comp.sources.comboPosteFindArr.sync();	
				$comp.sources.comboPosteFindArr.select(0);
			},
			onError: function(event) {
				WAF.ErrorManager.displayError(event);
			}
		});	
	}

	function timeStr2float (timeStr) {
		var timeFloat = 0;
		var integerPart = 0;
		var decimalPart = 0;

//		debugger;

		timeStr = timeStr.replace(/[^0-9.,-hH]/, ""); //enlever les éventuels caractères invalides
		//timeStr = timeStr.replace(/1*?[^0-9-]/, ""); //enlever les éventuels [.,hH] du début (ne marche pas)
		
		if (timeStr.indexOf("h") >= 0) {
			timeStr = timeStr.replace("h", ".");
		} else if (timeStr.indexOf("H") >= 0) {
			timeStr = timeStr.replace("H", ".");
		} else if (timeStr.indexOf(",") >= 0) {
			timeStr = timeStr.replace(",", ".");
		}

		timeFloat = parseFloat(timeStr);

		integerPart = Math.floor(timeFloat),
		decimalPart = ((timeFloat % 1).toFixed(2)) / 0.6; //convertion de minutes en centièmes d'heures			
	
		timeFloat = integerPart + decimalPart;
		return timeFloat;
	}
	
	function timeFloat2Str (timeFloat) {		
		var timeStr = "";
		var integerPart = Math.floor(timeFloat);
		var decimalPart = ((timeFloat % 1).toFixed(2)) * 1;
						
		timeStr = integerPart + 'h';
		
		if (decimalPart !== 0) {
			decimalPart = Math.round(decimalPart * 60); //convertion de centièmes d'heures en minutes
			timeStr += decimalPart; 
		}
		return timeStr;
	};

	function refreshTotalHeures () {
		$comp.sources.detail_Temps.getTotalTime ({
			onSuccess: function(event){
				var resultTotal = event.result;
				$comp.sourcesVar.totalHeures = timeFloat2Str (resultTotal);
				$comp.sources.totalHeures.sync();
				return resultTotal;
			},
			onError: function(event){
				WAF.ErrorManager.displayError(event);
				return 0;
			}
		});
	};
	
	function DTselectByDate (firstDate, lastDate) {
		if ((firstDate !== undefined) && (lastDate !== undefined)) {
			$comp.sources.detail_Temps.query("DET_Date >= :1 AND DET_Date <= :2 order by DET_Date, DPI_ID", firstDate, lastDate);
		} else if (firstDate !== undefined) {
			$comp.sources.detail_Temps.query("DET_Date == :1 order by DET_Date, DPI_ID", firstDate);		
		};

		refreshTotalHeures();
	};

	function comboDayFill () {
		$comp.sourcesVar.comboDayArr = [];
		$comp.sourcesVar.comboDayArr.push({dayName: 'Tous', dayNum: 0});
		$comp.sourcesVar.comboDayArr.push({dayName: 'Lundi', dayNum: 1});
		$comp.sourcesVar.comboDayArr.push({dayName: 'Mardi', dayNum: 2});
		$comp.sourcesVar.comboDayArr.push({dayName: 'Mercredi', dayNum: 3});
		$comp.sourcesVar.comboDayArr.push({dayName: 'Jeudi', dayNum: 4});
		$comp.sourcesVar.comboDayArr.push({dayName: 'Vendredi', dayNum: 5});
		$comp.sourcesVar.comboDayArr.push({dayName: 'Samedi', dayNum: 6});
		$comp.sourcesVar.comboDayArr.push({dayName: 'Dimanche', dayNum: 7});
		
		$comp.sources.comboDayArr.sync();
		$comp.sources.comboDayArr.select(0); //tous les jours de la semaine		
	};
	
	function comboDPIinit (dpiId) {
		//pour chargement comboBoxDPI
		$comp.sources.dosPosInt_A.all();
	};

	function comboDPIload (dpiId) {
		if ($comp.sources.detail_Temps.isNewElement()) {
			comboboxDPI$.find('input').val('');	
		} else {
			$comp.sources.dosPosInt_A1.query("DPI_ID = :1", dpiId, {
				onSuccess: function(event) {
					var inputValue = "";
					if ($comp.sources.dosPosInt_A1.length == 0) {
						inputValue = "périmé";
					} else {
						inputValue = $comp.sources.dosPosInt_A1.SocDosPos_Lib;
					}
					//super Hack to simul selected comboBoxDPI value
					comboboxDPI$.find('input').val(inputValue);	
				}
			});
		}
	};
	
	function resetPrevNextButtons() {
		if ($comp.sources.detail_Temps.isNewElement()) {
			//mask next/previous button if new entity
			$$(buttonPrevDomId).disable();
			$$(buttonNextDomId).disable();
		} else {

			//next button
			if ($comp.sources.detail_Temps.getPosition() === $comp.sources.detail_Temps.length - 1) {
				$$(buttonNextDomId).disable();
			} else {
				$$(buttonNextDomId).enable();
			}
			//previous button
			if ($comp.sources.detail_Temps.getPosition() === 0) {
				$$(buttonPrevDomId).disable();
			} else {
				$$(buttonPrevDomId).enable();
			}
		}
	}
	
	function DTinit () {
		//$comp.sources.dtDate_var = new Date(); //Date courante
		//$comp.sourcesVar.dtDate_var = new Date(2012, 6, 1); //pour tests
		//$comp.sources.dtDate_var.sync();	//mise à jour interface
		//chargement comboBox semaines centrées sur la date choisie
		//comboWeeksFill ($comp.sourcesVar.dtDate_var, 21);
		
		//chargement combobox semaines (n semaines centrées sur la date courante)
		//var currentDate = new Date(); //Date courante

		var currentDate = new Date(2012, 6, 1); //pour tests	
		var numberOfWeeks = 21;
		comboWeeksFill (currentDate, numberOfWeeks);

		//chargement combobox jours de la semaine (liste)
		comboDayFill ();

		//chargement combobox Dossier/Poste (détail)
		comboDPIinit ();
	
		//chargement combobox semaine (recherche)
		comboWeeksFindFill (currentDate, numberOfWeeks);
		//chargement combobox dossier (recherche)
		comboDossierFindFill ();
		//chargement combobox poste (recherche)
		comboPosteFindFill ();

		 
		//sélection des détail temps de la semaine sélectionnée et/ou du jour de la semaine sélectionné
		DTlistLoad ();			
	};
	
	function DTlistLoad () {

		var selDayNum = $comp.sources.comboDayArr.getKey();
		if (selDayNum == 0) {  //tous les jours de la semaine
			//sélection détail temps de la semaine sélectionnée
			DTselectByDate ($comp.sources.comboWeeksArr.dateDebut, $comp.sources.comboWeeksArr.dateFin);	
		} else if ((selDayNum >= 1) && (selDayNum <=7)) {
			selDayNum--;
			//sélection détail temps du jour sélectionné de la semaine sélectionnée
			DTselectByDate (addDays (new Date($comp.sources.comboWeeksArr.dateDebut), selDayNum));	
//			DTselectByDate (addDays (dateObject, selDayNum));	
		};

//		$$(buttonDupliDomId).disable();
//		$$(buttonFindDomId).disable();
//		$$(buttonPrintDomID).disable();
		
		$$(dialogDupliDomId).hide();
		$$(dialogFindDomId).hide();
	};

	function DTlistDupliSelected () {
//		debugger;

		var DT = $comp.sources.detail_Temps;
		var DTselection = DT.getSelection(); // get the current selection
		var DTselectedCount = DTselection.countSelected();
		var DTselectedRows = DTselection.getSelectedRows();
		var msg = '';
		
		if (DTselectedCount > 0) {
			if (DTselectedCount == 1) {
				msg = "Voulez-vous duplliquer l'enregistrement sélectionné ?";
			} else {
				msg = "Voulez-vous dupliquer les " + DTselectedCount + " enregistrements sélectionnés ?";				
			};
			
			$$(dialogDupliDomId).show();

			$comp.sourcesVar.dupliMsgVar = msg;
			$comp.sources.dupliMsgVar.sync();

			$comp.sourcesVar.dupliDecalVar = 0;
			$comp.sources.dupliDecalVar.sync();
			$$(dupliDecalVar).focus();


		}		
	};
		
	function DTlistDeleteSelected () {
		//debugger;

		var DT = $comp.sources.detail_Temps;
		var DTselection = DT.getSelection(); // get the current selection
		var DTselectedCount = DTselection.countSelected();
		var DTselectedRows = DTselection.getSelectedRows();
		var msg = '';
		
		if (DTselectedCount > 0) {
			if (DTselectedCount == 1) {
				msg = "Voulez-vous supprimer l'enregistrement sélectionné ?";
			} else {
				msg = "Voulez-vous supprimer les " + DTselectedCount + " enregistrements sélectionnés ?";				
			};
			if(confirm(msg)) {
	    		var err = DT.deleteSelected(DTselectedRows);
					if (err !== 0)
					{
						alert("La suppression a échouée !" + "(erreur : " + String(err) + ")");
					} else {
						DTlistLoad(); //#TODO : à revoir	
					}
			}
		}		
	};
	
	function DTlistFindDialog () {
		$$(dialogFindDomId).show();

		//debugger;
		//Semaine combobox init
		$comp.sources.comboWeeksFindArr.select(0);
		var initValue = $comp.sourcesVar.comboWeeksFindArr[0].label;
		comboboxFindWeek$.find('input').val('Aucune');	

		//Dates début, fin var int 
		$comp.sourcesVar.findDateDebutVar = '';
		$comp.sources.findDateDebutVar.sync();
		
		$comp.sourcesVar.findDateFinVar = '';
		$comp.sources.findDateFinVar.sync();
	
		//Dossier combobox init
		$comp.sources.comboDossierFindArr.select(0);
		var initValue = $comp.sourcesVar.comboDossierFindArr[0].label;
		comboboxfindDossier$.find('input').val(initValue);			
	
		//Poste combobox init
		$comp.sources.comboPosteFindArr.select(0);
		var initValue = $comp.sourcesVar.comboPosteFindArr[0].label;
		comboboxfindPoste$.find('input').val(initValue);			
	
		$$(findDateDebutVar).focus();
	};
	
	function DTlistFindQuery () {
		//debugger;
		
		var dateDebutWeek = $comp.sources.comboWeeksFindArr.dateDebut;
		var dateFinWeek = $comp.sources.comboWeeksFindArr.dateFin;
		var dateDebut = $comp.sourcesVar.findDateDebutVar;
		var dateFin = $comp.sourcesVar.findDateFinVar;
		var dosId = $comp.sources.comboDossierFindArr.ID;
		var posId = $comp.sources.comboPosteFindArr.ID;
		var dtWeekFilter = "";
		var dtDateFilter = "";
		var dtDossierFilter = "";
		var dtPosteFilter = "";
		var dtFilter = "";
		

		if ((dateDebutWeek !== undefined) && (dateFinWeek !== undefined) && (dateDebutWeek !== "") && (dateFinWeek !== "")) {
			//$comp.sources.detail_Temps.query("DET_Date >= :1 AND DET_Date <= :2 order by DET_Date, DPI_ID", dateDebutWeek, dateFinWeek);
			dtFilter = "DET_Date >= " + formatDateOnly(jsDateStr2Date(dateDebutWeek)) + " AND DET_Date <= " + formatDateOnly(jsDateStr2Date(dateFinWeek));
		}

		if (dateDebut !== "") {
			if (dateFin !== "") {
				//$comp.sources.detail_Temps.query("DET_Date >= :1 AND DET_Date <= :2 order by DET_Date, DPI_ID", dateDebut, dateFin);
				dtDateFilter = "DET_Date >= " + formatDateOnly(dateDebut) + " AND DET_Date <= " + formatDateOnly(dateFin);
			} else {
				//$comp.sources.detail_Temps.query("DET_Date = :1", dateDebut);
				dtDateFilter = "DET_Date = " + formatDateOnly(dateDebut);
			}
			if (dtFilter !== "") {
				dtFilter += " AND " + dtDateFilter;
			} else {
				dtFilter = dtDateFilter;				
			}
		}

		if ((dosId !== undefined) && (dosId !== 0)) {
			//$comp.sources.detail_Temps.query("Lien_DPI_DT.DOS_ID = :1", dosId);
			dtDossierFilter = "Lien_DPI_DT.DOS_ID = " + dosId;
			if (dtFilter !== "") {
				dtFilter += " AND " + dtDossierFilter;
			} else {
				dtFilter = dtDossierFilter;				
			}
		}
		
		if ((posId !== undefined) && (posId !== 0)) {
			//$comp.sources.detail_Temps.query("Lien_DPI_DT.POS_ID = :1", posId);	
			dtPosteFilter = "Lien_DPI_DT.POS_ID = " + posId;	
			if (dtFilter !== "") {
				dtFilter += " AND " + dtPosteFilter;
			} else {
				dtFilter = dtPosteFilter;				
			}
		}
		

		$$(dialogFindDomId).hide();
		
		if (dtFilter.length > 0) {
			$comp.sources.detail_Temps.query(dtFilter + " order by DET_Date, DPI_ID", {onSuccess: function(event){}});

			$comp.sources.comboWeeksArr.select(0);
			comboboxWeek$.find('input').val('Aucune');	
			refreshTotalHeures();
		}	
	
	};
	
	function DTlistPrint_ () {
		debugger;
		var start = 0;
	 	$comp.sources.detail_Temps.getElements(start, {
	        onSuccess: function(event) {
				alert('DTlistPrint getElements onSuccess');
	   	  		var currentDayOfWeek = -1;
	    		var previousDayOfWeek = -1;
				var dayArr = [Dimanche, Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi];
				var cumulDayTime = 0;
				var cumulTotalTime = 0;
				var html = '';
				alert('DTlistPrint getElements onSuccess2');
				
		        debugger;
		        html += '<div class="t1">';
		        html += '<div class="t2">';
				//ligne d'entete avec titre des colonnes
	            html += '<div class="r1">'; // for each array element
				html += '<span class="s1"><b>Jour</b></span>';  //nouvelle colonne
				html += '<span class="s1"><b>Client</b></span>';  //nouvelle colonne
				html += '<span class="s1"><b>Dossier</b></span>';  //nouvelle colonne
				html += '<span class="s1"><b>N°</b></span>';  //nouvelle colonne
				html += '<span class="s1"><b>Temps</b></span>';  //nouvelle colonne
				html += '<span class="s1"><b>Poste</b></span>';  //nouvelle colonne
				html += '<span class="s1"><b>Observations</b></span>';  //nouvelle colonne
                html += '</div>';
				
	            var elems = event.result; //resulting array
				alert('DTlistPrint getElements onSuccess');
		  		var currentDayOfWeek = dt.DET_Date.getDay();
	            elems.forEach(function(dt) {
	            	
		            currentDayOfWeek = dt.DET_Date.getDay();
					
					cumulDayTime += dt.DET_Temps;
					 
	                html += '<div class="r1">'; // for each array element
	                html += '<span class="s1">' + dayArr[currentDayOfWeek] + '&nbsp'+ formatDateOnly(dt.DET_Date) + '</span>'; // Jour
	                html += '<span class="s1">' + dt.Lien_DPI_DT.Lien_DOSPOS_DPI.Lien_DOS_DOSPOS.Lien_SOC_DOSPOS.SOC_RS_Courte + '</span>'; //Client
	                html += '<span class="s1">' + dt.Lien_DPI_DT.Lien_DOSPOS_DPI.Lien_DOS_DOSPOS.DOS_Libelle + '</span>'; //Dossier
	                html += '<span class="s1">' + dt.Lien_DPI_DT.Lien_DOSPOS_DPI.Lien_DOS_DOSPOS.DOS_Numero + '</span>'; //N°
	                html += '<span class="s1">' + dt.DET_heures + '</span>'; //Temps
	                html += '<span class="s1">' + dt.Lien_DPI_DT.Lien_DOSPOS_DPI.Lien_POS_DOSPOS.POS_Code + '</span>'; //Poste
	                html += '<span class="s1">' + dt.DET_Commentaire + '</span>'; //Observation
	                html += '</div>';

					if (currentDayOfWeek = -1) { //premier tour de boucle
	  					var currentDayOfWeek = dt.DET_Date.getDay();
			    		var previousDayOfWeek = currentDayOfWeek;	
					} else if (currentDayOfWeek !== previousDayOfWeek) { //changement de jour
		                html += '<div class="r1">'; // ligne cumul jour
			            html += '<span class="s1">Cumul journalier</span>'; //Temps
			            html += '<span class="s1">' + timeFloat2Str(cumulDayTime) + '</span>'; //Temps
		                html += '</div>';

		                html += '<div class="r1">'; // ligne cumul jour
						html += '<span class="s1"><hr noshade align="center"</span>'; // ligne séparation jour
		                html += '</div>';

		            	previousDayOfWeek = currentDayOfWeek;
			  			currentDayOfWeek = dt.DET_Date.getDay();
			  			cumulTotalTime += cumulDayTime;
						cumulDayTime = 0;
						
		            } else {
		            	
		        	}
		        	
	            });

                html += '<div class="r1">'; // ligne cumul jour
	            html += '<span class="s1">Cumul journalier</span>'; //Temps
	            html += '<span class="s1">' + timeFloat2Str(cumulDayTime) + '</span>'; //Temps
                html += '</div>';

                html += '<div class="r1">'; // ligne cumul jour
				html += '<span class="s1"><hr noshade align="center"</span>'; // ligne séparation jour
                html += '</div>';

	  			cumulTotalTime += cumulDayTime;

                html += '<div class="r1">'; // ligne cumul total
	            html += '<span class="s1">Total heures : ' + timeFloat2Str(cumulTotalTime) + '</span>'; //Temps
                html += '</div>';

	            html +='</div>';
	            html +='</div>';
				$$(containerPrintTestDomId).show();
	            $("#containerPrintTestDomId").html(html);
	        },
			onError: function(event){
				alert('DTlistPrint getElements onError: ' + event);
				WAF.ErrorManager.displayError(event);
				return 0;
			}
	    });		
	};

	function DTlistPrint () {
//		debugger;
		
		//memo current detail_Temps collection
//		var dtSet = $comp.sources.detail_Temps.getEntityCollection();
//		$comp.sources.intervenant.setSessionInfo('dtCollection', dtSet);
		
//		var printWindow = window.open( '/GA_print.waPage/index.html', '_self' );
		
		var printHtml = '';		
		printHtml = $comp.sources.detail_Temps.print ();
		$$(DTlistContainer).hide();
		$$(DTprintContainerDomId).show();
        $('#' + DTprintContainerDomId).html(printHtml);
	};
	
	function DTdetailLoad () {
		if ($comp.sources.detail_Temps.isNewElement()) {
			//new detail_Temps entity
			//date par defaut
			var selDayNum = $comp.sources.comboDayArr.getKey();
			if (selDayNum == 0) {  //tous les jours de la semaine
				//sélection détail temps de la semaine sélectionnée
				var dtDate = new Date($comp.sources.comboWeeksArr.dateDebut);	
			} else if ((selDayNum >= 1) && (selDayNum <=7)) {
				selDayNum--;
				//sélection détail temps du jour sélectionné de la semaine sélectionnée
				var dtDate = new Date(addDays (new Date($comp.sources.comboWeeksArr.dateDebut), selDayNum));	
			};	

			$comp.sources.detail_Temps.DET_Date = dtDate;			
		};
		
		//update var date
		$comp.sourcesVar.dtDateInputVar = new Date($comp.sources.detail_Temps.DET_Date);	
		$comp.sources.dtDateInputVar.sync();	//mise à jour interface
		$$(textFieldDateInputRef).focus();

		//positionnement combobox DPI
		comboDPIload($comp.sources.detail_Temps.DPI_ID);
		
		//mise à jour variable saisie Temps
		$comp.sourcesVar.dtTempsInputVar = timeFloat2Str ($comp.sources.detail_Temps.DET_Temps);
		$comp.sources.dtTempsInputVar.sync();
		
		resetPrevNextButtons();
	};

	function DTdetailValide () {
		var response = {};
		var	dt = $comp.sources.detail_Temps;
		
		//debugger;
		
		response.valid = true;
		if ((dt.DPI_ID == undefined) || (dt.DET_DPI == 0))
		{
			response.valid = false;
			response.msg = "Veuillez saisir un Dossier/Poste";
				
		} else if (dt.DET_Date == undefined)
		{
			response.valid = false;
			response.msg = "Veuillez saisir une date";
				
		} else if ($comp.sourcesVar.dtTempsInputVar == '0h')
		{
			response.valid = false;
			response.msg = "Veuillez saisir le temps";
		}
		
		return response;

	};
		
	function DTdetailSave () {
		
		//debugger;
		
		var dtValid = DTdetailValide();
		if (dtValid.valid) {			
			var dt = $comp.sources.detail_Temps;

			//#TODO :calcul pour les prix à reporter coté serveur
			//dt.DET_PrixVente = dt.Lien_DPI_DT.Lien_DOSPOS_DPI.Lien_POS_DOSPOS.POS_PrixJour;
			//dt.DET_TotalVenteHT = (dt.DET_PrixVente/8)*dt.DET_Temps;
			
			//update Temps 
			dt.DET_Temps = timeStr2float($comp.sourcesVar.dtTempsInputVar);

//			if (dt.isNewElement()) {
//				dt.save( {
//					onSuccess : function(event) { 
//						//Did we create the entity with our addNewEntity or custom server method.
//						if (dt.getPosition() == -1) {
//							//debugger;
//							dt.addEntity(dt.getCurrentElement()); 
//							var myColl = dt.getEntityCollection();
//							
//							DTlistLoad ();
//							
////							myColl.refresh({ //access to the collection values on the server
////							    onSuccess: function(event){ 
////							    }
////							});
//							
//							
//						} else {
//							//DTlistLoad ();
//						}
//		        	},
//		        	onError : function(err) {
//						alert("L'enregistrement a échoué !" + " (erreur : " + String(err) + ")");        		
//		        	}
//		        });
//			} else {
				dt.save( {
		        	onError : function(err) {
						alert("L'enregistrement a échoué !" + " (erreur : " + String(err) + ")");        		
		        	}
		        });		
//			}

		} else {
			alert(dtValid.msg);	
		}

		return dtValid.valid;
	};
	
	function toogleListDetail (param) {
		if (param == 'list') {
			
//			//sélection des détail temps de la semaine sélectionnée et/ou du jour de la semaine sélectionné
//			DTlistLoad ();			

			$$(DTdetailContainer).hide();
			$$(DTlistContainer).show();
		} else {			

			$$(DTlistContainer).hide();
			$$(DTdetailContainer).show();		
			DTdetailLoad ();

		};		
	};


	//initialisations
	DTinit ();

	$$(DTlistContainer).show();
	toogleListDetail('list');
	
	// eventHandlers// @lock

	DTprintContainer.click = function DTprintContainer_click (event)// @startlock
	{// @endlock
		$$(DTprintContainerDomId).hide();
		$$(DTlistContainer).show();
	};// @lock

	buttonPrint.click = function buttonPrint_click (event)// @startlock
	{// @endlock
		DTlistPrint ();
	};// @lock

	comboWeeksArrEvent.onIDAttributeChange = function comboWeeksArrEvent_onIDAttributeChange (event)// @startlock
	{// @endlock
		//sélection détail temps de la semaine sélectionnée
		DTselectByDate ($comp.sources.comboWeeksArr.dateDebut, $comp.sources.comboWeeksArr.dateFin);
		$comp.sources.comboDayArr.select(0); //tous les jours de la semaine		
	};// @lock

	buttonFind.click = function buttonFind_click (event)// @startlock
	{// @endlock
		DTlistFindDialog ();
	};// @lock

	buttonFindOk.click = function buttonFindOk_click (event)// @startlock
	{// @endlock
		DTlistFindQuery ();
	};// @lock

	buttonFindCancel.click = function buttonFindCancel_click (event)// @startlock
	{// @endlock
		$$(dialogFindDomId).hide();
	};// @lock

	buttonDupliCancel.click = function buttonDupliCancel_click (event)// @startlock
	{// @endlock
		$$(dialogDupliDomId).hide();
	};// @lock

	buttonDupliOK.click = function buttonDupliOK_click (event)// @startlock
	{// @endlock
		//debugger;
		var dt = $comp.sources.detail_Temps;
		var	dtSelectedRows = dt.getSelection().getSelectedRows();
			err = dt.dupliSelected(dtSelectedRows, $comp.sourcesVar.dupliDecalVar);
			if (err !== 0) {
				alert("La duplication a échouée !" + "(erreur : " + String(err) + ")");
			} else {
				DTlistLoad();
			}
		$$(dialogDupliDomId).hide();
	};// @lock

	textFieldInputTemps.blur = function textFieldInputTemps_blur (event)// @startlock
	{// @endlock
		//debugger;
		var timeStr = $comp.sourcesVar.dtTempsInputVar;
		var timeFloat = timeStr2float (timeStr);
		var timeStrVerif = timeFloat2Str(timeFloat);
		if (timeStr !== timeStrVerif) {
			$comp.sourcesVar.dtTempsInputVar = timeStrVerif;
			$comp.sources.dtTempsInputVar.sync();
		}	 
	};// @lock

	buttonAdd.click = function buttonAdd_click (event)// @startlock
	{// @endlock
		//debugger;
		//#TODO : à améliorer
		$comp.sources.detail_Temps.addNewElement();
		$comp.sources.detail_Temps.serverRefresh({
			onSuccess: function(event) {
				toogleListDetail('detail');
			}
		});

//		$comp.sources.detail_Temps.newEntity();
//		$comp.sources.detail_Temps.serverRefresh({
//			onSuccess: function(event) {
//				toogleListDetail('detail');
//			}
//		});
	
	};// @lock

	buttonDupli.click = function buttonDupli_click (event)// @startlock
	{// @endlock
		DTlistDupliSelected ();
	};// @lock

	comboboxDPI.change = function comboboxDPI_change (event)// @startlock
	{// @endlock
		$comp.sources.detail_Temps.DPI_ID = $comp.sources.dosPosInt_A.DPI_ID;
	};// @lock

	dtDateInputVarEvent.onAttributeChange = function dtDateInputVarEvent_onAttributeChange (event)// @startlock
	{// @endlock
		$comp.sources.detail_Temps.DET_Date = $comp.sourcesVar.dtDateInputVar;
	};// @lock

	comboboxDay.change = function comboboxDay_change (event)// @startlock
	{// @endlock
		var selDayNum = $comp.sources.comboDayArr.getKey();
		if (selDayNum == 0) {  //tous les jours de la semaine
			//sélection détail temps de la semaine sélectionnée
			DTselectByDate ($comp.sources.comboWeeksArr.dateDebut, $comp.sources.comboWeeksArr.dateFin);	
		} else if ((selDayNum >= 1) && (selDayNum <=7)) {
			selDayNum--; //0-6
			//sélection détail temps du jour sélectionné de la semaine sélectionnée
			DTselectByDate (addDays (new Date($comp.sources.comboWeeksArr.dateDebut), selDayNum));	
//			DTselectByDate (addDays (dateObject, selDayNum));	
		};

	};// @lock

	DTdataGrid2.onRowDblClick = function DTdataGrid2_onRowDblClick (event)// @startlock
	{// @endlock
		toogleListDetail('detail');
	};// @lock

	buttonDelete.click = function buttonDelete_click (event)// @startlock
	{// @endlock
		DTlistDeleteSelected ();
	};// @lock

	buttonNext.click = function buttonNext_click (event)// @startlock
	{// @endlock
		if (DTdetailSave ()) {
			$comp.sources.detail_Temps.selectNext({
			    onSuccess:function(event) // asynchronous call (recommended)
		        {
					DTdetailLoad ();
		        }
			});
		}
	};// @lock

	buttonPrev.click = function buttonPrev_click (event)// @startlock
	{// @endlock
		if (DTdetailSave ()) {
			$comp.sources.detail_Temps.selectPrevious({
			    onSuccess:function(event) // asynchronous call (recommended)
		        {
					DTdetailLoad ();
		        }
			});
		}
	};// @lock

	buttonSave.click = function buttonSave_click (event)// @startlock
	{// @endlock
		if (DTdetailSave ()) {
			toogleListDetail('list');
		}
	};// @lock

	buttonCancel.click = function buttonCancel_click (event)// @startlock
	{// @endlock
		if ($comp.sources.detail_Temps.isNewElement()) {
			//l'élément vient d'être créé, il faut le supprimer
			$comp.sources.detail_Temps.removeCurrent( {
				onError : function(err) {
					alert("L'annulation a échouée !" + " (erreur : " + String(err) + ")");
				}
			})
		}
		toogleListDetail('list');
	};// @lock

	dtDate_varEvent.onAttributeChange = function dtDate_varEvent_onAttributeChange (event)// @startlock
	{// @endlock
		//chargement comboBox semaines centrées sur la date choisie
		comboWeeksFill($comp.sourcesVar.dtDate_var, 21);
		
		$comp.sources.comboDayArr.select(0); //tous les jours de la semaine		

		//sélection détail temps de la semaine sélectionnée
		DTselectByDate ($comp.sources.comboWeeksArr.dateDebut, $comp.sources.comboWeeksArr.dateFin);	
	};// @lock

	detail_TempsEvent.onCollectionChange = function detail_TempsEvent_onCollectionChange (event)// @startlock
	{// @endlock
	 	refreshTotalHeures();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_DTprintContainer", "click", DTprintContainer.click, "WAF");
	WAF.addListener(this.id + "_buttonPrint", "click", buttonPrint.click, "WAF");
	WAF.addListener(this.id + "_comboWeeksArr", "onIDAttributeChange", comboWeeksArrEvent.onIDAttributeChange, "WAF", "ID");
	WAF.addListener(this.id + "_buttonFind", "click", buttonFind.click, "WAF");
	WAF.addListener(this.id + "_buttonFindOk", "click", buttonFindOk.click, "WAF");
	WAF.addListener(this.id + "_buttonFindCancel", "click", buttonFindCancel.click, "WAF");
	WAF.addListener(this.id + "_buttonDupliCancel", "click", buttonDupliCancel.click, "WAF");
	WAF.addListener(this.id + "_buttonDupliOK", "click", buttonDupliOK.click, "WAF");
	WAF.addListener(this.id + "_textFieldInputTemps", "blur", textFieldInputTemps.blur, "WAF");
	WAF.addListener(this.id + "_buttonAdd", "click", buttonAdd.click, "WAF");
	WAF.addListener(this.id + "_buttonDupli", "click", buttonDupli.click, "WAF");
	WAF.addListener(this.id + "_comboboxDPI", "change", comboboxDPI.change, "WAF");
	WAF.addListener(this.id + "_dtDateInputVar", "onAttributeChange", dtDateInputVarEvent.onAttributeChange, "WAF");
	WAF.addListener(this.id + "_comboboxDay", "change", comboboxDay.change, "WAF");
	WAF.addListener(this.id + "_DTdataGrid2", "onRowDblClick", DTdataGrid2.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_buttonDelete", "click", buttonDelete.click, "WAF");
	WAF.addListener(this.id + "_buttonNext", "click", buttonNext.click, "WAF");
	WAF.addListener(this.id + "_buttonPrev", "click", buttonPrev.click, "WAF");
	WAF.addListener(this.id + "_buttonSave", "click", buttonSave.click, "WAF");
	WAF.addListener(this.id + "_buttonCancel", "click", buttonCancel.click, "WAF");
	WAF.addListener(this.id + "_dtDate_var", "onAttributeChange", dtDate_varEvent.onAttributeChange, "WAF");
	WAF.addListener(this.id + "_detail_Temps", "onCollectionChange", detail_TempsEvent.onCollectionChange, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
