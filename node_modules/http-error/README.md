## http-error

Exposes HTTP error codes as Error constructors.

### Install

    npm install http-error

### Example


```javascript

    var HttpError = require("http-error");

    // in your app:
    app.get("/:project", function(req, res, next){
        db.loadProject(req.params.project, function(err, project){
            if(err) return next(new HttpError.InternalServerError("Something went wrong"));
            if(!project) return next(new HttpError.notFound("This project does not exist"));
            
            res.json(project.toObject());
        });
    });
    
    // in your error handler:
    app.use(function(err, req, res, next){
        res.status(err.code).json({ error: err.message });
    });
```

### List of errors

This module implements the following error constructors:

| Code | Function
|:---  | :---
| 400  | BadRequest
| 401  | Unauthorized
| 402  | PaymentRequired
| 403  | Forbidden
| 404  | NotFound
| 405  | MethodNotAllowed
| 406  | NotAcceptable
| 407  | ProxyAuthenticationRequired
| 408  | RequestTimeout
| 409  | Conflict
| 410  | Gone
| 411  | LengthRequired
| 412  | PreconditionFailed
| 413  | RequestEntityTooLarge
| 414  | RequestURITooLong
| 415  | UnsupportedMediaType
| 416  | RequestedRangeNotSatisfiable
| 417  | ExpectationFailed
| 420  | EnhanceYourCalm
| 422  | UnprocessableEntity
| 423  | Locked
| 424  | FailedDependency
| 425  | UnorderedCollection
| 426  | UpgradeRequired
| 428  | PreconditionRequired
| 429  | TooManyRequests
| 431  | RequestHeaderFieldsTooLarge
| 444  | NoResponse
| 449  | RetryWith
| 450  | BlockedByWindowsParentalControls
| 499  | ClientClosedRequest
| 500  | InternalServerError
| 501  | NotImplemented
| 502  | BadGateway
| 503  | ServiceUnavailable
| 504  | GatewayTimeout
| 505  | HTTPVersionNotSupported
| 506  | VariantAlsoNegotiates
| 507  | InsufficientStorage
| 508  | LoopDetected
| 509  | BandwidthLimitExceeded
| 510  | NotExtended
| 511  | NetworkAuthenticationRequired
