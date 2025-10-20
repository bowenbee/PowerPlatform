/*
Update a grand total on the PO table with the summation of the PO Items from the related table
https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/updaterecord
*/

function updateGrandTotal(executionContext) {

    var parentLogicalTableName = "bb89_purchaseorder"; // Orders Table
    var childLogicalTableName = "bb89_purchaseorderitem"; // Order Line Items Table

    const formContext = executionContext.getFormContext();
    const curPurchaseOrderRecordId = formContext.data.entity.getId().replace("{", "").replace("}", "");
    const purchaseOrderParentRecord = formContext.getAttribute("bb89_polookup").getValue();
    const purchaseOrderId = purchaseOrderParentRecord[0].id.replace("{", "").replace("}", "");
    const curRecordCost = formContext.getAttribute("bb89_cost").getValue();

    // Set the total cost to start with the current cost of the selected order item. The remaining costs will be appended to this

    let totalCost = curRecordCost;

    if (!purchaseOrderParentRecord || purchaseOrderParentRecord.length === 0) {
    console.warn("Purchase Order lookup is empty.");
    return;
    }

    const query = `?$select=bb89_cost,bb89_purchaseorderitemid&$filter=_bb89_polookup_value eq ${encodeURIComponent("'" + purchaseOrderId + "'")} and bb89_purchaseorderitemid ne ${encodeURIComponent("'" + curPurchaseOrderRecordId + "'")}`;

    // Fetch related Purchase Order Items but exclude the current Purchase Order Item
    Xrm.WebApi.retrieveMultipleRecords(
    childLogicalTableName,query).then(
        
        function (result) {
        result.entities.forEach(function (item) {
            totalCost += item.bb89_cost || 0;
        });

        totalCost = parseFloat(totalCost.toFixed(2));

        var updateBody = {
            "bb89_grandtotal": totalCost
        };

        // Update the Grand Total field on the Purchase Order
        Xrm.WebApi.updateRecord(parentLogicalTableName,purchaseOrderId, updateBody).then(
            function () {
            console.log("Total Cost updated to:", totalCost);

        }, function (error) {
            console.error("Error updating Grand Total: " + error.message);
        });

    }, function (error) {
        console.error("Error retrieving Purchase Order Items: " + error.message);
    });
}