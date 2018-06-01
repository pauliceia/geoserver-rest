# API REST WITH NODEJS

## Connection with Geoserver

### Pré:
1) running geoserver
2) create workspace
3) create datastore (type: POSTGIS connection)

4) install nodejs (version >= 6)

### Install API
1) git clone https://github.com/betonr/geoserver-rest.git
2) cd geoserver-rest
3) npm install
4) create _config/environment.js (example parameters: _config/environment-test.js)

 - **DOCUMENTATION**:
    - npm run docs
    - access the file index.html (public/doc/)

### Running
1) npm run dev
