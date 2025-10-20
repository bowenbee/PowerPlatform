function getUserRoles(executionContext){
    // Get User roles of the current logged on user and return as list

    var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles.getAll();

    var roleNames = [];

    userRoles.forEach(function(role) {
        roleNames.push(role.name);
    });

    console.log("User Roles:", roleNames);

    return roleNames;

}

// Check if the user has one of the roles in the list, then do something

function lockBFPBasedonSecRole (executionContext){

    var allowedRoles = ["Testing 1","Testing 2"];

    var formContext = executionContext.getFormContext();
    // Call getUserRolesFunction
    var userRoles = getUserRoles(executionContext);

    var bfpFieldLogicialName = "testing";
    var bfpControl = formContext.getControl(bfpFieldLogicialName);
    var bfpControlPresent = bfpControl !== null && bfpControl !== undefined

    var hasAllowedRole = allowedRoles.some(function(role){
        return userRoles.includes(role);
    })


    if (!bfpControlPresent){

        console.log("BFP Control not present " + bfpFieldLogicialName);
        return;
    }

    if (hasAllowedRole){

        console.log ("User holds at least one role. " + bfpFieldLogicialName + " field CAN be edited");
        bfpControl.setDisabled(false);

    } else {
        console.log ("User does not hold at least one role. " + bfpFieldLogicialName + " field CANNOT be edited");
        bfpControl.setDisabled(true);
    }

}