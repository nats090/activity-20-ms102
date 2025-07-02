exports.contentSecurityPolicy = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'trusted.cdn.com'],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: []
  }
};
