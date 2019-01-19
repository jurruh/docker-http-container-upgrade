# :whale2: Docker HTTP container upgrade
Pull a new docker image and restart a running container with just a simple HTTP call.

## :wrench: Usage
At first we need to start the web server this can be done with a docker container:
```bash
docker run -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 jurruh/http-container-upgrade
```
If the web server is started we can perform a GET request with the container name:
```bash
curl localhost:3000/:containername
```

## :notebook: Notes
Currently this is a hobby project the code does not have any tests and the HTTP requests do not require authorization. I do not recommend to use this project in a production system. But feel free to build on top of this repo or use it as an inspiration.
