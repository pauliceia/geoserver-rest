const environment = {
  name: process.env.NAME || 'API geoserver REST',
  pathBase: process.env.PATHBASE || '',
  port: process.env.PORT || 3000,
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'KeyOauthJwt',
    jwtSession: {session: false},
    enableHTTPS: process.env.ENABLE_HTTPS || false,
    certificate: process.env.CERT_FILE || '',
    key: process.env.CERT_KEY_FILE || ''
  }
}

export default environment;