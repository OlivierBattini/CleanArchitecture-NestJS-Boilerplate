# Clean Architecture 🗙 NestJS

## About the project

This project is intended as a **boilerplate** for future development using **NestJS** and built upon **Clean Architecture**, while being primarily a learning journey through NestJS.

It aims at implementing all the Clean Code and Security best practices, especially :

- [OWASP security recommendations](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html) ;
- [Twelve-Factor App criteria](https://12factor.net).

## Twelve-Factor App

- [ ] [Codebase](https://12factor.net/codebase)<br>
    This project is tracked using git and is deployed in Heroku for development and staging purposes.

- [ ] [Dependencies](https://12factor.net/dependencies)<br>
    Dependencies are declared and isolated.

- [ ] [Config](https://12factor.net/config)<br>
    Configuration is stored in the environment or using .env file during development.

- [ ] [Backing services](https://12factor.net/backing-services)<br>
    All services are independant. As well, the use of sequelize allows to switch from one RDBMS to another transparently.

- [ ] [Build, release, run](https://12factor.net/build-release-run)<br>
    Steps of build, release, run are separate.

- [ ] [Processes](https://12factor.net/processes)<br>
    The app does not rely on any state and is run using clustering (optional)

- [ ] [Port binding](https://12factor.net/port-binding)<br>
    Port binding is staisfied by using express/http bound to the standard HTTP ports, possibly behind Elastic Load Balancers in Amazon Web Services.

- [ ] [Concurrency](https://12factor.net/concurrency)<br>
    Concurrency is achieved by spanning multiple NodeJS child processes via NodeJS clustering  for vertical scaling and via Amazon EC2 / ELB for horizontal scaling.

- [ ] [Disposability](https://12factor.net/disposability)<br>
    The app can dispose gracefully, as interuption signals like SIGTERM are catched and used to properly close connections, services and resources.

- [ ] [Dev/prod parity](https://12factor.net/dev-prod-parity)<br>
    We commit to comply to deploying in hours, by the same persons, and keeping dev/staging/prod environments as similar as possible. Development and staging will be achieved using Heroku.

- [ ] [Logs](https://12factor.net/logs)<br>
    Logs are formatted using the debug library then managed by the operating system and aggregated using log tools such as syslog, or ELK...

- [ ] [Admin processes](https://12factor.net/admin-processes)<br>


## OWASP security recommendations

- [ ] [Set request size limits](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#set-request-size-limits)
- [ ] [Do not block the event loop](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#do-not-block-the-event-loop)
- [x] [Perform input validation](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#perform-input-validation)
- [ ] [Perform output escaping](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#perform-output-escaping)
- [ ] [Perform application activity logging](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#perform-application-activity-logging)
- [ ] [Monitor the event loop](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#monitor-the-event-loop)
- [ ] [Take precautions against brute-forcing](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#take-precautions-against-brute-forcing)
- [ ] [Use Anti-CSRF tokens](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#use-anti-csrf-tokens)
- [x] [Remove unnecessary routes](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#remove-unnecessary-routes)
- [ ] [Prevent HTTP Parameter Pollution](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#prevent-http-parameter-pollution)
- [ ] [Only return what is necessary](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#only-return-what-is-necessary)
- [ ] [Use object property descriptors](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#use-object-property-descriptors)
- [ ] [Use access control lists](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#use-access-control-lists)
- [ ] [Handle uncaughtException](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#handle-uncaughtexception)
- [ ] [Listen to errors when using EventEmitter](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#listen-to-errors-when-using-eventemitter)
- [ ] [Handle errors in asynchronous calls](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#handle-errors-in-asynchronous-calls)
- [ ] [Set cookie flags appropriately](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#set-cookie-flags-appropriately)
- [ ] [Use appropriate security headers](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#use-appropriate-security-headers)
- [ ] [Keep your packages up-to-date](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#keep-your-packages-up-to-date)
- [ ] [Do not use dangerous functions](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#do-not-use-dangerous-functions)
- [ ] [Stay away from evil regexes](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#stay-away-from-evil-regexes)
- [ ] [Run security linters](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#run-security-linters)
- [ ] [Use strict mode](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#use-strict-mode)
