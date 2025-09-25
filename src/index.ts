import inquirer from 'inquirer';

enum Action {
  List = 'list',
  Add = 'add',
  Remove = 'remove',
  Quit = 'quit',
}

type InquirerAnswers = {
  action: Action;
};

class Message {
  constructor(private content: string) {}

  static showColorized() {}

  public show() {
    console.log('content: ', this.content);
  }

  public capitalize() {
    if (this.content.length === 0) return;
    this.content =
      this.content.charAt(0).toUpperCase() +
      this.content.slice(1).toLowerCase();
  }

  public toUpperCase() {
    if (this.content.length === 0) return;
    this.content = this.content.toUpperCase();
  }

  public toLowerCase() {
    if (this.content.length === 0) return;
    this.content = this.content.toLowerCase();
  }
}

const startApp = () => {
  inquirer
    .prompt([
      {
        name: 'action',
        type: 'input',
        message: 'How can I help you?',
      },
    ])
    .then((answers: { action: Action }) => {
      console.log('Chosen action: ' + answers.action);
      if (answers.action === 'quit') {
        console.log('I SHOULD QUIT');
        return process.exit();
      }

      startApp();
    });
};

startApp();
