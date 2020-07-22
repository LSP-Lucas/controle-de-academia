const fs = require('fs'); // fs = file sistem
const data = require('../data.json');
const { date } = require('../utils');
const Intl = require('intl');


// LIST

exports.index = function(req, res) {

    let members = [...data.members];
    // let list_members = [];

    //     for (const member of members) {

    //         members = {
    //             ...member,
    //             services: member.services.split(",")
    //         }
    //         list_members.push(members);
    //     }

    return res.render("members/index", { members });
}

// CREATE

exports.create = function(req, res) {

    return res.render("members/create");
}

// POST

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

    birth = Date.parse(req.body.birth);
    
    let id = 1;
    const lastMember = data.members[data.members.length - 1];

    if(lastMember) {
        id = lastMember.id + 1;
    }
    
    data.members.push({
        id,
        ...req.body,
        birth 
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");

        return res.redirect("members");
    });

    // return res.send(req.body);
}

// SHOW

exports.show = function(req, res) {
    // req.params
    const { id } = req.params;

    const foundMember = data.members.find(function(member){
        return member.id == id;
    });

    if(!foundMember) return res.send("Member not found!");

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }
    
    return res.render("members/show", { member });
}

// EDIT

exports.edit = function(req, res) {
    // req.params
    const { id } = req.params;

    const foundMember = data.members.find(function(member){
        return member.id == id;
    });

    if(!foundMember) return res.send("Member not found!");

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }
    
    return res.render('members/edit', { member });
}

// PUT

exports.put = function(req, res) {
    const { id } = req.body;

    let index = 0;

    const foundMember = data.members.find(function(member, foundIndex){
        if (id == member.id) {
            index = foundIndex;
            return true;
        }
    });

    if(!foundMember) return res.send("Member not found!");

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member;

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");

        return res.redirect(`/members/${id}`);
    });
}

// DELETE 

exports.delete = function(req, res) {
    const { id } = req.body;

    const filteredMembers = data.members.filter(function(member) {
        return member.id != id;
    });

    data.members = filteredMembers;

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");

        return res.redirect("/members");
    });
}