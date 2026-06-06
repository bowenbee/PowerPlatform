# Approvals Management Solution

## Description
This solution provides an end-to-end interface for managing internal approval requests, including generation, tracking, reminders, and reporting.

**Key capabilities:**
- Generate approval requests to internal users via a Canvas App interface
- Fetch and display all pending approval requests from the `msdyn_approvalrequests` table
- Track approver status — showing who has approved vs. who is still pending
- Trigger reminder notifications to pending approvers
- Run a scheduled flow to identify outstanding approvals and deliver a summary report to the administrator

## Technologies Used

![Canvas App](https://img.shields.io/static/v1?label=App%20Type&message=Canvas%20App&color=742774)
![Power Automate](https://img.shields.io/static/v1?label=Automation&message=Power%20Automate&color=0066FF)
![Dataverse](https://img.shields.io/static/v1?label=Data%20Source&message=Dataverse&color=008000)

## Prerequisites

![Premium License](https://img.shields.io/badge/Premium%20License-Required-orange.svg)

- Power Platform environment with a **Premium license**
- System Administrator or System Customizer security role to import solutions
- Access to the `msdyn_approvalrequests` Dataverse table

## Setup Instructions

### 1. Import the Solution
- Navigate to [make.powerapps.com](https://make.powerapps.com)
- Select the target environment
- Go to **Solutions** > **Import Solution**
- Upload the managed solution `.zip` file and follow the import wizard

### 2. Configure Environment Variables
After import, update the following environment variables:

| Variable | Description |
|---|---|
| `Admin Email` | Email address to receive the scheduled approval summary report |

### 3. Configure Connections
Ensure the following connections are authorized:
- **Dataverse** — for reading and writing approval records
- **Office 365 Outlook** — for sending reminder and report emails
- **Office 365 Users** — for resolving user display names and emails

### 4. Enable Cloud Flows
After import, flows may be disabled by default:
- Go to **Solutions** > open the solution > **Cloud Flows**
- Turn on each flow

### 5. Share the Canvas App
- Go to **Apps** in Power Apps
- Select the app