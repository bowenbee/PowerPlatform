function checkUnsavedChanges(executionContext) {
    
    var formContext = executionContext.getFormContext();
    // Check if the form has unsaved changes
    if (formContext.data.entity.getIsDirty()) {
        // There are unsaved changes
        console.log("There are unsaved changes.");
    } else {
        // No unsaved changes
        console.log("No unsaved changes.");
    }
}
