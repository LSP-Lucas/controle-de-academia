const { age, date } = require('../../lib/utils');
const Intl = require('intl');


module.exports = {
    index(req, res){
        return res.render("members/index");

    },
    create(req, res){
        return res.render("members/create");

    },
    post(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            // req.body.key == "";
            if(req.body[key] == "")
                return res.send("Preencha todos os campos!");
        }
    
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
