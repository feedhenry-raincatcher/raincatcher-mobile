# FeedHenry RainCatcher Mobile

This is a reference/demo implementation of the Mobile Client application of a WFM project.

## Local Setup

`npm install`

## Running on a browser

Being a cordova-based application, it is possible to test this application on a local browser:

`npm start`

or

`grunt serve:local --url=http://localhost:8001`

The `url` parameter should be the root of the API server application running the [`fh-sync`](https://github.com/feedhenry/fh-sync) endpoints required by the running mobile demo application. See the (demo-server)[https://github.com/feedhenry-raincatcher/raincatcher-core/blob/master/demo/server/] for an implementation of the server that is expected to be available.

## Running on a device emulator

To run this application on a device emulator, setup the appropriate native SDKs and run the app through the following commands:

1) Change config.xml content field to point to local folder

`<content src="index.html?url=http://localhost:8001" />`

2) Build

`cordova prepare`
`cordova build android --verbose`

3) Push apk to your device

`cordova run android`

See the [Apache Cordova project documentation](https://cordova.apache.org/docs/) for details on how to configure your environment for running applications on a device emulator.

## Repository structure

### `src/app`
Main folder containing the logic for the application. The app is mainly concerned in providing the setup and configuration values for the RainCatcher and angularjs modules that are used by it.

#### `src/app/initialization`
Contains configuration values and initial bootstrapping code for the angularjs application.

#### `src/app/services`
Contains angularjs services that are utilized by the RainCatcher modules to retrieve data. The app has the opportunity to provide an implementation that utilizes any technoligy for data retrieval, including static fixtures for testing.

This demo application utilizes an [`fh-sync`](https://github.com/feedhenry/fh-sync)-based service, which would allow a mobile client to work offline for extended amounts of time, syncronizing with the server whenever a data connection becomes available again.

### `src/res`
Contains resource files (mostly bitmaps) that are used by the UI. These are also included in the various resolutions expected by the native apps.

### `src/sass`
Contains app-wide [Sass](http://sass-lang.com/) files that are compiled by the build pipeline.

### `scripts/`
Contains auxiliary scripts for the development environment.

### `www/`
Generated directory containing the output files of the local build process.

This directory's contents are what is served by the local development web server.
