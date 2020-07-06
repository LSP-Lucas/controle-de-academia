const fs = require('fs'); // fs = file sistem
const data = require('./data.json');

// CREATE

exports.post = function(req, res) {
    // req.body
    // {"avatar_url":"hhtp://google.com","name":"Lucas da Silva Pedroso","birth":"1990-06-09","gender":"M","serveces":"Musculação"}

    // ["avatar_url","name","birth","gender","serveces"]
    // com o uso do Object.keys conseguimos pegar as chaves dos objetos
    const keys = Object.keys(req.body);

    for(key of keys) {
        // req.body.key == "";
        if(req.body[key] == "")
            return res.send("Preencha todos os campos!");
    }

    req.body.birth = Date.parse(req.body.birth);
    req.body.created_at = Date.now();

    data.instructors.push(req.body);

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");

        return res.redirect("instructors");
    });

    // return res.send(req.body);
}