const fs = require('fs'); // fs = file sistem
const data = require('./data.json');
const { age, date } = require('./utils');
const Intl = require('intl');

// SHOW

exports.show = function(req, res) {
    // req.params
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id;
    });

    if(!foundInstructor) return res.send("Instructor not found!");

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR', ).format(foundInstructor.created_at)
    }
    
    return res.render("instructors/show", { instructor });
}

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

    let { avatar_url, birth, name, services, gender } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);

    
    data.instructors.push({
        avatar_url,
        id,
        name,
        birth,
        gender,
        services,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");

        return res.redirect("instructors");
    });

    // return res.send(req.body);
}

// EDIT

exports.edit = function(req, res) {
    // req.params
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id;
    });

    if(!foundInstructor) return res.send("Instructor not found!");

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }
    
    return res.render('instructors/edit', { instructor });
}