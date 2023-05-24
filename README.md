# Create a Service Mashup using the SAP Cloud Application Programming Model

It contains these folders and files, following our recommended project layout:

| File or Folder | Purpose                              |
| -------------- | ------------------------------------ |
| `app/`         | content for frontend UI goes here    |
| `db/`          | your domain models and data go here  |
| `srv/`         | your service models and code go here |
| `package.json` | project metadata and configuration   |
| `README.md`    | this getting started guide           |

## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Test the endpoint using the REST Client script in `test/mashup.http`

## Build, Deploy in SAP BTP Cloud Foundry

Build:

```
mbt build
```

Login:

```
cf login
```

Deploy:

```
cf deploy mta_archives/cap-service-mashup_1.0.0.mtar
```

## Discover the S/4HANA (Cloud) Business Partner API

Find the API by searching https://api.sap.com/ for "Business Partner" and filter for S/4HANA Cloud:

![api.sap.com S/4HANA Cloud Business Partner (A2X) API](./assets/api.sap.com-BP-A2X.png)

Login and use the tryout function to test the GET request of the Business Partner Endpoint (/A_BusinessPartner).

## Import the service

Switch back to Overview to download the API specificaiton in EDMX format. Store it in `srv/external`. If you have trouble downloading the file use the one from the `assets` folder.

Translate the EDMX file to CAP CDS using:

```
cds import srv/external/API_BUSINESS_PARTNER.edmx --keep-namespace --as cds
```

This will create the file `srv/external/API_BUSINESS_PARTNER.cds` and add:

```JSON
      "API_BUSINESS_PARTNER": {
        "kind": "odata-v2",
        "model": "srv/external/API_BUSINESS_PARTNER"
      }
```

to the cds.requires section in `package.json`.

## Create a local mock

Start the CAP Application with

```
cds watch
```

Test the endpoint with the script `test/api-business-partner.http`.

Provide mock data for the entity `A_BusinessPartner` by copying `assets/API_BUSINESS_PARTNER-A_BusinessPartner.json` to `srv/data`. The CAP Service should restart and when you query now the entity `A_BusinessPartner` you should get 3 results.

Now you can start the mock only by running:

```
cds mock API_BUSINESS_PARTNER
```

Notice the output:

```
[cds] - connect using bindings from: { registry: '~/.cds-services.json' }
```

Open the `~/.cds-services.json` file. This file provides a local service lookup.

cds-serve all --with-mocks --in-memory

call a remote mock service during development

create a destination to the remote mock service

consume the service via the deployed app.
