# :whale2: Docker HTTP container upgrade
This application can pull a new docker image and restart a running container with just a simple HTTP call.

## :wrench: Usage
At first we need to start the web server this can be done with a docker image:
```bash
docker run -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 jurruh/http-container-upgrade
```
If the web server is started we can perform a GET request with the container name:
```bash
curl localhost:3000/:containername
```

## :notebook: Notes
Currently this is a hobby project the code does not have any tests and the HTTP requests do not require any type of authorization. I do not recommend to use this project in any kind of a production system, but feel free to build on top of this repo or fork it.
