function setBFPVisiblity (executionContext){
    
const formContext = executionContext.getFormContext();
const bfpId = formContext.data.process.getInstanceId();

    if (!bfpId) {
        console.log("No BPF instance found.");
        return;
    }

const bfpStatus = formContext.data.process.getStatus();
const isVisible = bfpStatus !== 'finished';

// Hides the BFP based on bfp Status boolean result

formContext.ui.process.setVisible(isVisible);
console.log("BFP Status is " + bfpStatus + ". " + "BFP Visible " + isVisible);

}