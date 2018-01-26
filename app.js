const yargs = require('yargs');
const notes = require('./notes');

const command = yargs.argv._[0];

const titleOptions = {
  describe: 'Title of Note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of Note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
      title: titleOptions,
      body: bodyOptions
    })
  .command('list', 'List all notes')
  .command('remove', 'Removes the note', {
    title: titleOptions
  })
  .command('read', 'Reads a note', {
    title: titleOptions
  })
  .command('count-notes', 'Counts all notes')
  .command('remove-all', 'Removes all the notes')
  .help().argv;


if (command === 'add') {
  let note = notes.add(argv.title, argv.body);

  if (note) {
    console.log('Note added');
    notes.logNote(note);
  } else {
    console.log('Note already exists');
  }
}

else if (command === "list") {
  const all_notes = notes.list();

  if (all_notes.length === 0) {
    console.log('No Notes');
  } else {
    console.log('Printing all notes')
    all_notes.forEach(x => notes.logNote(x));
  }
}

else if (command === 'read') {
  const note = notes.read(argv.title)

  if (note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
}

else if (command === 'remove') {
  let result = notes.remove(argv.title);
  result ? console.log('Note is removed') : console.log('Note not found');
}

else if (command === 'count-notes') {
  const no_of_notes = notes.count();
  no_of_notes ? console.log(`Number of notes are: ${no_of_notes}`) : console.log('No notes are available');
}

else if (command === "remove-all") {
  notes.removeAll();
  console.log('All notes are erased');
}

else {
  console.log('Command not recognized');
}
