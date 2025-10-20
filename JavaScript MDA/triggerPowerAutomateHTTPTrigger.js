function triggerHTTPFlow(formContext) {
    var recordId = formContext.data.entity.getId().replace("{", "").replace("}", "");
    console.log("Record Id:", recordId);

    var systemUser = Xrm.Utility.getGlobalContext().userSettings;
    var systemUserId = systemUser.userId.replace("{", "").replace("}", "");
    var systemUserName = systemUser.userName;
    console.log("SystemUser Id:", systemUserId, "User Name:", systemUserName);

    var envSchemaNameColumn = 'bb89_EmailHRFlowURL';

    // Step 1: Ask for confirmation
    var confirmStrings = {
        title: "Send Email",
        text: "Are you sure you want to email HR?",
        confirmButtonLabel: "Yes",
        cancelButtonLabel: "No"
    };
    var confirmOptions = { height: 200, width: 450 };

    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (dialogResult) {
        if (dialogResult.confirmed) {
            // Step 2: Only continue if user clicked "Yes"

            Xrm.WebApi.retrieveMultipleRecords(
                "environmentvariablevalue",
                `?$select=value&$expand=EnvironmentVariableDefinitionId&$filter=EnvironmentVariableDefinitionId/schemaname eq '${envSchemaNameColumn}'`
            ).then(
                function success(results) {
                    if (!results.entities || results.entities.length === 0) {
                        console.warn(`No environment variable found for schema name: ${envSchemaNameColumn}`);
                        return;
                    }

                    var flowURL = results.entities[0].value;
                    if (!flowURL) {
                        console.warn(`No value set for environment variable: ${envSchemaNameColumn}`);
                        return;
                    }

                    console.log("Flow URL:", flowURL);

                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    var raw = JSON.stringify({
                        username: systemUserName,
                        systemUserId: systemUserId,
                        recordId: recordId
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw
                    };

                    console.log("Calling flow now...");
                    fetch(flowURL, requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            console.log("Flow response:", result);
                            var alertStrings = {
                                confirmButtonLabel: "OK",
                                text: "The message has been sent",
                                title: "Process Complete"
                            };
                            var alertOptions = { height: 120, width: 260 };
                            return Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                        })
                        .catch(error => console.error("Error calling flow:", error));
                },
                function (error) {
                    console.error("Error retrieving environment variable:", error.message);
                    Xrm.Navigation.openErrorDialog({
                        details: error.message,
                        message: "A problem occurred while retrieving an Environment Variable value. Please contact support."
                    });
                }
            );
        } else {
            console.log("User cancelled the flow trigger.");
        }
    });
}
