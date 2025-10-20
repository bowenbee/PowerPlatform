// Test - Based on the Environment Schema Name column passed into the script, fetch the boolean value result and display a message notification

function determineIsProd(executionContext, envSchemaNameColumn)  {

    var formContext = executionContext.getFormContext();

    Xrm.WebApi.retrieveMultipleRecords(
        "environmentvariablevalue",
        `?$select=value&$expand=EnvironmentVariableDefinitionId&$filter=EnvironmentVariableDefinitionId/schemaname eq '${envSchemaNameColumn}'`
    ).then(
        function success(result) {
            if (!result.entities || result.entities.length === 0) {
                console.warn(`No environment variable found for schema name: ${envSchemaNameColumn}`);
                return;
            }

            var isProduction = result.entities[0].value === 'yes'
            console.log("Is Production:", isProduction);

            if(isProduction === false){

            var messageText = `This environment is a non-production environment.`;

            formContext.ui.setFormNotification(messageText, "WARNING", "_messageId");

            }


        },
        function (error) {
            Xrm.Navigation.openErrorDialog({
                details: error.message,
                message: "A problem occurred while retrieving an Environment Variable value. Please contact support."
            });
        }
    );
}
