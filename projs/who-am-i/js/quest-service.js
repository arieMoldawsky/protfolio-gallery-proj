const STORAGE_KEY = 'questsDB';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    if (loadFromStorage(STORAGE_KEY)) gQuestsTree = loadFromStorage(STORAGE_KEY);
    else {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}



function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function getQuests() {
    return gQuestsTree;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars  *DONE*
    // var currQuest = gCurrQuest;
    gPrevQuest = gCurrQuest;
    (res === 'yes') ? gCurrQuest = gCurrQuest.yes : gCurrQuest = gCurrQuest.no;
}


function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    var newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = createQuest(gCurrQuest.txt);
    if (lastRes === 'yes') {
        gPrevQuest.yes = newQuest
    } else gPrevQuest.no = newQuest;
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}


function getCurrQuest() {
    return gCurrQuest
}


