---
title: Fisheries industry body platform
kind: Client work
summary: A multi-phase platform for a WA fisheries industry body, from a supplies ordering app and a Xero to Dataverse financial sync to a Moodle LMS on Azure and a Power Pages member portal.
order: 1
stack:
  - Power Pages
  - Dataverse
  - Azure Functions
  - Logic Apps
  - Dynamics 365
  - Power Automate
  - Azure AD B2C
  - Next.js
  - TypeScript
  - Prisma
  - PostgreSQL
  - C#
  - JavaScript
  - jQuery
  - Bootstrap
  - Moodle
previewFlow:
  - Xero
  - Logic Apps
  - Dataverse
---

Client work for a WA fisheries industry body, delivered at Diversus. I worked on it from its inception through several phases.

## Phases

- **Initial MVP**
- **Phase 1:** enhancing the existing website
- **Phase 2:** a project management application

## What I built

A web-responsive interface with a custom UI, using JavaScript, jQuery, CSS, Bootstrap and C#, on Power Pages, Dynamics 365, Dataverse, Logic Apps and Azure Function Apps.

### Supplies ordering app

A Next.js and TypeScript ordering application for fishing trip supplies, with a Prisma and PostgreSQL data layer, API-key-secured REST endpoints and automated HTML email notifications. It is deployed to AWS and integrated with the member portal.

### Xero → Dataverse financial sync

A financial integration using Azure Logic Apps and Azure Functions that syncs manual journals, spend money and receive money transactions from Xero into Dynamics 365 Project Operations. Transactions are stored at line level to attribute spend to the correct account codes. The sync was extended to payroll and superannuation, with a historical backfill and scheduled incremental updates. The figures were validated by the Client's finance team.

### Moodle LMS on Azure

A highly available Moodle LMS on Azure (Load Balancer, VM Scale Set, Nginx, Varnish, PHP-FPM) with automated Let's Encrypt SSL, Recovery Services backups and an SMTP relay. Single sign-on runs through Azure AD B2C and OpenID Connect, with the OIDC plugin extended to handle B2C's email claim format.

### Power Pages member portal

A Power Pages member portal with Azure AD B2C authentication, a Content Security Policy, custom forms, HTML email templates and Power Automate flows.
