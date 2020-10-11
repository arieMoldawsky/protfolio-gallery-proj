'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  // console.log('Started...');
  createQuestsTree();
  saveToStorage(STORAGE_KEY, getQuests())
}

function onStartGuessing() {
  // TODO: hide the game-start section  *DONE*
  $('.game-start').hide();
  renderQuest();
  // TODO: show the quest section    *DONE*
  $('.quest').show();
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update   *DONE*
  // its text by the currQuest text
  var questionContainer = getCurrQuest()
  $('.quest h2').text(questionContainer.txt);
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.quest').hide();
      $('.victory').show('slow');
      $('.genie-bottle').show('fast');
      $('.winner').show('fast');
      // TODO: improve UX            *DONE*
    } else {
      // TODO: hide and show new-quest section   *DONE*
      $('.quest').hide();
      $('.new-quest').show('fast');
    }
  } else {
    // TODO: update the lastRes global var     *DONE*
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  // TODO: Get the inputs' values   *DONE*
  // TODO: Call the service addGuess   *DONE*
  addGuess(newQuest, newGuess, gLastRes)
  saveToStorage(STORAGE_KEY, getQuests())
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
}
