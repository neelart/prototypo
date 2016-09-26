# Prototypo, Streamlining font creation 
=====================================

[![Build Status](https://travis-ci.org/byte-foundry/prototypo.svg?branch=master)](https://travis-ci.org/byte-foundry/prototypo) [![PayPayl donate button](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BP52ZEAFR9QEL "Donate once-off to this project using Paypal")
Tested with [BrowserStack](http://browserstack.com)

BEFORE ANYTHING !
-----------------
Use git flow on this branch (reactify-and-cleanup)
Add --no-ff to your merge options on this branch.
If you merge a branch on reactify-and-cleanup with ff I'll be really sad and cry

Labeling convention:
- Feature -> feat/name-of-feature
- Fix -> fix/name-of-fix_issuenumber

Before installing Prototypo
---------------------------

In order to build Prototypo, you need to install the following software-packages on your system:
- Git
- Node.js v4.X with npm@2 (Prototypo is currently incompatible with npm@3)
- Gulp

Installing Prototypo
--------------------

Clone a copy of the main Prototypo git repository

```bash
$ git clone git://github.com/byte-foundry/prototypo.git && cd prototypo
```

Install build scripts and frontend libraries

```bash
$ npm install
```

Running Prototypo
-----------------

```bash
$ gulp serve
```

You'll want the server to be running on localhost:9000 if you want to connect to our hoodie app.

Running Prototypo with you own Hoodie app
-----------------------------------------

### Requirements
* Install hoodie and its requirements by following the doc (http://docs.hood.ie/en/start/)
* Install adhoc-cors-proxy by running `npm install -g adhoc-cors-proxy`

### Creating and launching the hoodie app (http://docs.hood.ie/en/start/getting-started/getting-started-1.html)
* Create your hoodie app `hoodie new prototypo-hoodie`
* Launch the hoodie app
```bash
$ cd prototypo-hoodie
$ hoodie start
```
* Set up the cors proxy (there is other to circumvent this problem using nginx as a proxy, even without cors, but this is easier)
```bash
 corsproxy <hoodie_couchdb_address>:<hoodie_couchdb_port> --port=<port_you_want_to_access_hoodie_from> --origin=http://localhost:<port_of_prototypo> --credentials
 ```

### Configuring Prototypo
* In `app/scripts/services/hoodie.services.js` line 6 change `backUrl` to
```js
const backUrl = 'http://localhost:<port_you_want_to_access_hoodie_from>';
```
* Launch Prototypo
```bash
gulp serve
```

Roadmap to v1.0
===============

- possibility to modify text directly in the preview ([#78](../../issues/78)) ……… ✓
- a complete alphabet with alternates (some numbers, punctuation and accents are missing) ……… ✓
- automatic spacing ([#124](../../issues/124))
- generating binary font-files such as .otf, see the [current workaround](#converting-an-svg-font-to-other-font-formats) ([#12](../../issues/12)) ……… ✓
- personnal library to save and load different fonts ([#125](../../issues/125)) ……… ✓
- undo/redo history ([#94](../../issues/94)) ……… ✓

Known issues
------------

- font export is broken in Safari ([#111](../../issues/111))


Converting an .svg font to other font formats
---------------------------------------------

This operation currently requires either [Fontforge](http://fontforge.github.io/en-US/) or using a hosted service such as [onlinefontconverter](http://onlinefontconverter.com).

License
=======

Files with a `.js`, `.jsx` or `.json` extension in this repository are licensed under MPLv2. All other files (including `.css`, `.scss`, `.svg` and `.png` files) are the property of Prototypo SAS and cannot be redistributed outside of a Github.com repository. Prototypo and its logo are registered trademarks of Prototypo SAS.
