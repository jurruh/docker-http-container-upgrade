const express = require('express')
const Docker = require('dockerode');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const app = express()

app.get('/:name', async (req, res) => {
  const { name } = req.params;

  listedContainer = (await docker.listContainers()).filter(c => c.Names.includes(`/${name}`))[0];

  if (!listedContainer) return res.sendStatus(404);

  try {
    await docker.pull(listedContainer.Image);
  }catch(err){
    console.log(err);
  }
  const container = docker.getContainer(listedContainer.Id);
  const inspectedContainer = await container.inspect();

  await container.stop();
  await container.remove();

  const config = inspectedContainer.Config;
  config.HostConfig = inspectedContainer.HostConfig;
  config.name = name;

  const newContainer = await docker.createContainer(config);

  await newContainer.start();

  res.sendStatus(200);
});

app.listen(3000);