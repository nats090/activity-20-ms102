exports.contentSecurityPolicy = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],        // blocks inline <script>
    styleSrc: ["'self'"],         // disallow inline CSS
    imgSrc: ["'self'", 'data:'],  // allow data URIs for images
    connectSrc: ["'self'"],       // AJAX, fetch, EventSource
    objectSrc: ["'none'"]         // no <object>, <embed>, <applet>
  }
};
