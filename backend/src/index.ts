
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const graphqlHttp = require('express-graphql');
const graphiqlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const path = require('path');
const compression = require('compression');

const app = express();
app.use(compression())
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(process.env.PWD || __dirname, 'build')));
app.get('/', function(req: any, res: any) {
  res.set('Content-Encoding', 'gzip');
  res.sendFile(path.join(process.env.PWD || __dirname, 'build', 'index.html'));
});
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphiqlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);
//TODO add token middleware
const PORT = process.env.PORT || 3001;

app.listen(PORT);