const { age, date } = require('../../lib/utils');
const Intl = require('intl');


module.exports = {
    index(req, res){
        return res.render("instructors/index");

    },
    create(req, res){
        return res.render("instructors/create");

    },
    post(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            // req.body.key == "";
            if(req.body[key] == "")
                return res.send("Preencha todos os campos!");
        }
    
        let { avatar_url, birth, name, services, gender } = req.body;
    
        return

    },
    show(req, res){
        return

    },
    edit(req, res){
        return

    },
    put(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            // req.body.key == "";
            if(req.body[key] == "")
                return res.send("Preencha todos os campos!");
        }

        return

    },
    delete(req, res){
        return

    }
}
