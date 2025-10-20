function getEnvironmentVariableValue(executionContext) {

    var formContext = executionContext.getFormContext();
    var interviewNotSuccessfulValue = 614250001; // This is the choice value for 'Not successful' in my Candidate Interview Table
    var envSchemaNameColumn = "bb89_HREmail"; // ensure this is the schema name of your environment variable

    var interviewOutcome = formContext.getAttribute("bb89_interviewoutcome").getInitialValue();
    console.log(interviewOutcome);

    if (interviewOutcome !== interviewNotSuccessfulValue) {
        return;
    }

    Xrm.WebApi.retrieveMultipleRecords(
        "environmentvariablevalue",
        `?$select=value&$expand=EnvironmentVariableDefinitionId&$filter=EnvironmentVariableDefinitionId/schemaname eq '${envSchemaNameColumn}'`
    ).then(
        function success(result) {
            if (!result.entities || result.entities.length === 0) {
                console.warn(`No environment variable found for schema name: ${envSchemaNameColumn}`);
                return;
            }

            var envValue = result.entities[0].value;
            console.log("Environment Variable Value:", envValue);

            var messageText = `The interview outcome was not successful. Contact ${envValue} for further assistance.`;

            formContext.ui.setFormNotification(messageText, "INFO", "_messageId");
        },
        function (error) {
            Xrm.Navigation.openErrorDialog({
                details: error.message,
                message: "A problem occurred while retrieving an Environment Variable value. Please contact support."
            });
        }
    );
}
