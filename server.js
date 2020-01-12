const express = require('express');
const ComplexPackage = require('./src/complex-package.json');
const axios = require('axios');
const path = require('path');
var cors = require('cors');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.get('/dependencies', async function (req, res) {
    console.log('grabbing dependency tree');
    const lib = req.query.library || "react";
    const version = req.query.version || "latest";
    const dependencyTree = await grabDependencyTree(lib, version);
    res.send(JSON.stringify(dependencyTree));
});

/** A recursive function to generate the dependencyTree.
 * @library: the top level library of our json object
 * @version: library version, default latest.
 * @node: each node in the tree tha isn't a leaf.
 * @return: a node or the dependencyTree as seen in a package.json.
 * */
async function grabDependencyTree (library, version, node= {name: library, version: version}) {
    //TODO: Implement saved libraries and discuss how to collapse the tree.
    const response = await axios.get(`https://registry.npmjs.org/${library}/${version.replace('^', '')}`);
    if(!response.data || !response.data.dependencies){
        return {[response.data.name]: response.data.version};
    } else {
        const dependencyPromiseArray = [];
        const {}
        for(const key of Object.keys(response.data.dependencies) {
            requests.push(grabDependencyTree(key, response.data.dependencies[key]));
        }
        node.dependencies = await Promise.all(requests);
    }
    return node
}

app.listen(process.env.PORT || 8080);
