const express = require('express')
const Docker = require('dockerode');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const app = express()

app.get('/:name', async (req, res) => {

  docker.listContainers(function (err, listedContainers) {
    listedContainer = listedContainers.filter(c => c.Names.includes(`/${req.params.name}`))[0];

    if (!listedContainer) {
      res.sendStatus(404);
    }

    docker.pull(listedContainer.Image, () => {
      let container = docker.getContainer(listedContainer.Id)

      container.restart(); // FIXME: Currently not working because it does not update the image of the container

      res.sendStatus(200);
    });
  });
})

app.listen(3000);