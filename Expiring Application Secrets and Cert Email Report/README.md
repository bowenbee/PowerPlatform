# Entra (Azure) AD – Fetch App Registration Secrets and Certificates That Are Expiring

![Component Preview](assets/alphagalpreview.gif)

## Description

The purpose of this Power Automate flow is to fetch App Registration information and retrieve registered secrets and certificate data under each application. Microsoft Graph API is used to obtain the details, including the Application Owner.  

It outputs an HTML-formatted email showing the expiring entries within **x** number of days (as specified), as well as any already expired secrets and certificates. The email also includes a CSV file listing all applications that have secrets and certificates.  

This is a scheduled flow that can be configured to run as needed.

## Install Instructions

### 1. Register an App Registration

1. Create a new [Azure App Registration](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps)
2. Under Manage, choose API Permissions, select Microsoft Graph and ensure that Application-Level Permissions are granted for **Application.Read.All**. 
3. Ensure **Grant admin consent for your tenant** is done.
4. Create a new secret under Certificates & secrets. Copy the secret value that is generated. Back on the overview page, also copy the Application (client) ID and Directory (tenant) ID.

### 2. Import the Power Automate Package

1. Download the [ZIP Package](EntraADAppRegistrationExpiringSecretsandCerts_20250626025735.zip).
2. In [Power Automate](https://make.powerautomate.com/), go to **My Flows**.
3. Select the **Import** dropdown and choose **"Import Package (legacy)"**.
4. Browse to the downloaded ZIP file and click **Upload**.
5. You will need to configure the Outlook connection. Choose to either create a new or use an existing connection.
6. Click **Import**.
7. After the import is successful, edit the flow and update a few variable settings:
   - Update variables `varClientId`, `varTenantId`, and `varClientSecret` with the respective values from your app registration.
   - Update variable `varEmailTo` with the email address where you want the report sent.
   - Adjust variable `varDaysUntilExpire` as needed. The default is **14**, meaning any secrets or certificates expiring in less than 14 days (as well as already expired) will be included in the email body.
8. You may also wish to edit the schedule trigger occurrence as needed. Default is set to once a month.
9. Good to go!
