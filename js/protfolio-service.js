'use strict';

var gProj = createProjects();



function getContactUrl(subject, body) {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=ariemol555@gmail.com&su=${subject}&body=${body}`
}

function getProjects() {
    return gProj;
}

function getProjById(id) {
    var proj = gProj.find(function(project) {
      return project.id === id;
   })
   return proj;
}

function createProj(id, name, title, label) {
    return {
        id,
        name,
        title,
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: `projs/${id}`,
        publishedAt: '2020',
        label
    }
}

function createProjects() {
    gProj = [];
    gProj.push(createProj('minesweeper', 'Minesweeper', 'Better beware of the mines..', 'Explosive games'));
    gProj.push(createProj('touch-nums', 'Touch Nums', 'Know your math', 'Thinking games'));
    gProj.push(createProj('todos', 'Todos', 'Keep it ordered', 'Organizer'));
    gProj.push(createProj('books-shop', 'Books Shop', 'Manage your shop', 'Organizer'));
    gProj.push(createProj('chess-game', 'Chess Game', 'Play smart or lose your pants', 'Thinking games'));
    gProj.push(createProj('who-am-i', 'Who am I', 'Make me smarter', 'Thinking games'));
    console.log(gProj);
    return gProj
}