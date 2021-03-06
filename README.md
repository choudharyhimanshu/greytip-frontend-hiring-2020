# speech-repo-ui

A simple web application to create & share a public speech and to view in other speeches(of course!).

### See it LIVE! : https://speech-repos.web.app/

### Technical Stack

- Framework: **React (with Typescript)**
- Deployment: **Docker**

### CI/CD

- [CI] All the commits are being tested for docker image build & code level unit tests

    Config file path: `.circleci/config.yml`

    Circle CI : https://circleci.com/gh/choudharyhimanshu/greytip-frontend-hiring-2020

- [CD] To be done!

### Setup guide

#### Running with Docker locally

1. Start the service using `docker-compose-local.yml` file by running the below command at the project root

```
docker-compose -file docker-compose-local.yml up --build
```

2. Once the service is stated you can access it at `http://localhost:3000`

#### Running with Node [Recommended]

1. Get Node & npm installed in your system. Recommended versions are:

- Node: ^10.x
- npm: ^6.x

2. Download the dependencies using the command `npm install` at the project root

3. Now, start the application using the below command at the project root:

- `npm start`
