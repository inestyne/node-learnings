// taken from: http://jeffstieler.com/2015/05/restify-specify-api-version-in-url/
// allow path based API versioning
// based on https://stackoverflow.com/a/29706259
// requires: semver

// This allows use to put the version numbmer in the url. Restify only supports
// accept-version header so we use this middleware to swap out the parts
// (ie. /api/v1/admin_users/sign_in)

// TODO: I used pieces[1] instead of pieces[0] because we are prefixing our api with '/api'
// this is kinda kludgy and probably should be dont better

import semver from 'semver'

module.exports = ( app, server, namespace ) => {
  server.pre(function (req, res, next) {
    var pieces = req.url.replace(/^\/+/, '').split('/'),
      pathVersion = pieces[1],
      semVersion = semver.valid(pathVersion);
   
    // only if you want to use this routes:
    // /api/v1/resource
    // /api/v1.0/resource
    // /api/v1.0.0/resource
    if (!semVersion) {
      semVersion = pathVersion.replace(/v(\d{1})\.(\d{1})\.(\d{1})/, '$1.$2.$3');
      semVersion = semVersion.replace(/v(\d{1})\.(\d{1})/, '$1.$2.0');
      semVersion = semVersion.replace(/v(\d{1})/, '$1.0.0');
    }
   
    if (semver.valid(semVersion) && server.versions.indexOf(semVersion) > -1) {
      req.url = req.url.replace(pathVersion + '/', '');
      req.headers['accept-version'] = semVersion;
    }
   
    return next();
  })
}
