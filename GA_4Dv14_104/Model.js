model.mergeOutsideCatalog("GA_4Dv14_Catalog", {	hostname: "127.0.0.1:15000",	user: "",	password: "",	// jsFile: "my4DCatalog.js",	timeout:15 } );//Creating the Employee classmodel.Employee = new DataClass("Employees"); model.Employee.ID = new Attribute("storage", "long", "key auto"); model.Employee.firstname = new Attribute("storage", "string", "btree");model.Employee.lastname = new Attribute("storage", "string", "btree");model.Employee.salary = new Attribute("storage", "number", "cluster");model.Employee.woman = new Attribute("storage", "bool", "cluster");model.Employee.birthdate = new Attribute("storage", "date", "btree");model.Employee.hiringDate = new Attribute("storage", "date");model.Employee.manager = new Attribute("relatedEntity", "Employee", "Employee");model.Employee.directReports = new Attribute("relatedEntities", "Employees", "manager", {reversePath:true}); model.Employee.isManager = new Attribute("calculated", "bool"); //onGet method is defined belowmodel.Employee.employer = new Attribute("relatedEntity", "Company", "Company"); // relation to the Company classmodel.Employee.workingPlace = new Attribute("relatedEntity", "City", "employer.location"); // relation to the City class //onGet for the calculated atttibutemodel.Employee.isManager.onGet = function(){    return this.directReports.length != 0;};     //Creating the Company classmodel.Company = new DataClass("Companies");model.Company.ID = new Attribute("storage", "long", "key auto");model.Company.name = new Attribute("storage", "string", "btree");model.Company.revenues = new Attribute("storage", "number");model.Company.creationDate = new Attribute("storage", "date");model.Company.location = new Attribute("relatedEntity", "City", "City");model.Company.employees = new Attribute("relatedEntities", "Employees", "employer", {reversePath:true});//model.Company.managers = new Attribute("alias", "Employees", "employees.manager");model.Company.country = new Attribute("alias", "string", "location.country");     //Creating the City classmodel.City = new DataClass("Cities");model.City.ID = new Attribute("storage", "long", "key auto");model.City.name = new Attribute("storage", "string" , {autoComplete:true});model.City.country = new Attribute("storage", "string", {unique:true , not_null : true });model.City.companies = new Attribute("relatedEntities", "Companies", "location", { reversePath:true } );model.City.workForce = new Attribute("relatedEntities", "Employees", "workingPlace", { reversePath:true } );    // this last relation could also have been defined like this:    // new Attribute("relatedEntities", "Employees", "companies.employees")