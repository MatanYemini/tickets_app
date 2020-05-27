# tickets_app
**Ticketing Website - Managing Small Event-Driven Distributed System**

## Tech Stack: 

* **NATS Streaming Server** Implementation
* Using **Docker and Kubernetes** (w/ minikube) - Including _Ingress-Nginx_, all services and the database were deployed with their exposed     services
* Build my **own common NPM library**  - https://www.npmjs.com/package/@yemini/common (a readme for this package will be published soon)
* **The Services** are written with: Node.js , Express , TypeScript  , JavaScript
* **The Client** is written with: React.js and Next.js as _Server Side Redered App_
* MongoDB as my database (Documents)
* Tests with jest, supertest and mongodb-memory-server

### Some Important Notes:

**All K8S configurations are in:**_infra/k8s_ 
* It includes all the deployments and services of all the microservices in the repository
* NATS Streaming deployment and service
* MongoDB deployments and services
* Ingress-Nginx deployment and service
* Includes configuratons for google cloud

**The Authentication middleware is handled in the custom package using JWT**

**The Error Handling middlewate is handled in the custom package**

**The 'Common' folder includes the custom NPM package**  _not finished yet.._

-- **Now I am building the CI using digital ocean**

#### NATS Streaming

* You can read my post on the implementation process in: https://medium.com/beyond-coding/nats-streaming-server-in-the-node-js-world-with-kubernetes-how-to-guide-2595dd598acc

* You can get the graphes from the folder 'graphes' and open it with draw io


