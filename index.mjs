import express from 'express';
import cluster from "node:cluster";
import bodyParser from 'body-parser';

import { onMessage, onRequest, onStart } from "./challenge.mjs";

if (cluster.isPrimary) {
  cluster.fork({ NAME: "ANIKA" });
  cluster.fork({ NAME: "BASEM" });
} else {
  const NAME = process.env.NAME;
  const port = NAME === 'ANIKA' ? 3031 : 3032;

  const app = express();

  app.post('/message', bodyParser.text(), (req, res) => {
    onMessage(req.body);
    res.json({});
  });

  app.post('/work', express.json(), async (req, res) => {
    await onRequest(req.body.word);

    setTimeout(() => {
      res.json({});
    }, 500 + Math.random() * 500);
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`${NAME}: listening on 0.0.0.0:${port}`);
  });

  setTimeout(onStart, 1000);
}
