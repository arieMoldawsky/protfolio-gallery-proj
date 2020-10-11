'use strict';


function onInitPage() {
  onRenderProjects();
}

function onContactSubmit() {
  var subject = document.querySelector('.sub-input');
  var body = document.querySelector('.body-input');
  var email = document.querySelector('.email-input');
  var strLink = getContactUrl(subject.value, body.value);
  subject.value = '';
  body.value = '';
  email.value = '';
  return strLink;
}

function onRenderModal(id) {
  var elModalBody = document.querySelector('.projects-modal-body');
  var project = getProjById(id);
  var strHtml = `<h2>${project.name}</h2>
  <p class="item-intro text-muted">${project.title}</p>
  <img class="img-fluid d-block mx-auto" src="img/portfolio/${project.id}.jpg" alt="">
  <p>${project.desc}</p>
  <ul class="list-inline">
    <li>Date: ${project.publishedAt}</li>
    <li>Category: ${project.label}</li>
  </ul>
  <button class="btn btn-primary" data-dismiss="modal" type="button">
      <i class="fa fa-times"></i>
      Close Project</button>`;
  elModalBody.innerHTML = strHtml;
}

function onRenderProjects() {
  var proj = getProjects();
  var projectsRow = document.querySelector('.portfolio-section .projects-row');
  var strHtml = '';
  proj.forEach(function (project) {
    strHtml += `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1" onclick="onRenderModal('${project.id}')">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${project.id}.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${project.name}</h4>
          <p class="text-muted">${project.label}</p>
          <a class="btn btn-warning check-out-btn" href="projs/${project.id}/index.html" target="_blank">Check it Out!</a>
        </div>
      </div>`
  })
  projectsRow.innerHTML = strHtml;
}