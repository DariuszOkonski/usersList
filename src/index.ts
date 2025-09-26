import inquirer from 'inquirer';
import consola from 'consola';

enum Action {
  List = 'list',
  Add = 'add',
  Remove = 'remove',
  Quit = 'quit',
}

enum MessageVariant {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

interface User {
  name: string;
  age: number;
}

type InquirerAnswers = {
  action: Action;
};

class Message {
  constructor(private content: string) {}

  public static showColorized(action: MessageVariant, message: string) {
    switch (action) {
      case MessageVariant.Error:
        consola.error(message);
        break;
      case MessageVariant.Success:
        consola.success(message);
        break;
      case MessageVariant.Info:
        consola.info(message);
    }
  }

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

class UsersData {
  private data: User[] = [];

  public showAll() {
    Message.showColorized(MessageVariant.Info, 'Users data');

    if (this.data.length) {
      console.table(this.data);
    } else {
      console.log('No data...');
    }
  }

  public add(user: User) {
    if (user.age > 0 && user.name.length > 0) {
      this.data.push(user);
      Message.showColorized(
        MessageVariant.Success,
        'User has been successfully added!'
      );
    } else {
      Message.showColorized(MessageVariant.Error, 'Wrong data!');
    }
  }

  public remove(name: string) {
    const basicLength = this.data.length;

    this.data = this.data.filter((user) => user.name !== name);

    if (this.data.length !== basicLength) {
      Message.showColorized(MessageVariant.Success, 'User deleted!');
    } else {
      Message.showColorized(MessageVariant.Error, 'User not found...');
    }
  }
}

const users = new UsersData();

console.log('\n');
console.info('???? Welcome to the UsersApp!');
console.log('====================================');
Message.showColorized(MessageVariant.Info, 'Available actions');
console.log('\n');
console.log('list – show all users');
console.log('add – add new user to the list');
console.log('remove – remove user from the list');
console.log('quit – quit the app');
console.log('\n');

const startApp = () => {
  inquirer
    .prompt([
      {
        name: 'action',
        type: 'input',
        message: 'How can I help you?',
      },
    ])
    .then(async (answers: InquirerAnswers) => {
      switch (answers.action) {
        case Action.List:
          users.showAll();
          break;
        case Action.Add:
          const user = await inquirer.prompt([
            {
              name: 'name',
              type: 'input',
              message: 'Enter name',
            },
            {
              name: 'age',
              type: 'number',
              message: 'Enter age',
            },
          ]);
          users.add(user);
          break;
        case Action.Remove:
          const name = await inquirer.prompt([
            {
              name: 'name',
              type: 'input',
              message: 'Enter name',
            },
          ]);
          users.remove(name.name);
          break;
        case Action.Quit:
          Message.showColorized(MessageVariant.Info, 'Bye bye!');
          return;
      }

      startApp();
    });
};

startApp();
