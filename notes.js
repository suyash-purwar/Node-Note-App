// Fetch fs module from npm module
const fs = require('fs');

// Utility Function 1
const getNotes = () => {
  try {
    let noteString = fs.readFileSync('user-data.json');
    return JSON.parse(noteString);
  } catch (e) {
    return [];
  }
}

// Utility Function 2
const saveNotes = (notes) => {
  if (typeof notes === 'object') {
    fs.writeFileSync('user-data.json', JSON.stringify(notes, undefined, 4));
  }
}


module.exports.logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

// Add note
module.exports.add = (title, body) => {
  let notes = getNotes();
  let note = {
    title,
    body
  };

  let duplicates = notes.filter(obj => obj.title === title);
  if (duplicates.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

// List all notes
module.exports.list = () => getNotes();

// Read note
module.exports.read = (title) => {
  const fetchNotes = getNotes();
  const note = fetchNotes.filter(obj => obj.title === title);
  return note[0];
}

// Remove note
module.exports.remove = (title) => {
  const existingNotes = getNotes();
  const filteredNotes = existingNotes.filter(obj => obj.title !== title);
  saveNotes(filteredNotes);

  return existingNotes.length !== filteredNotes.length;
}

// Count number of notes stored
module.exports.count = () => getNotes().length;

// Delete all notes
module.exports.removeAll = () => saveNotes([]);
