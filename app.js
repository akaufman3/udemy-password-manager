console.log('starting password manager');

var storage = require('node-persist');
// gets computer ready to write and save variables
storage.initSync();

// register new passwords
// get exisiting passwords

var argv = require('yargs')
	.command('create', 'Create a new account', function(yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (example Twitter, Facebook)',
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				description: 'Account username or email',
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				description: 'Account password',
				type: 'string'
			}
		}).help('help');
	})
	.command('get', 'Get an existing account', function(yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (example Twitter, Facebook)',
				type: 'string'
			}
		}).help('help');
	})
	.help('help')
	.argv;
var command = argv._[0];

// three attributes:
// account.name
// account.username
// account.password
function createAccount(account) {
	// fetching whatever is stored under accounts
	var accounts = storage.getItemSync('accounts');
	if (typeof accounts === 'undefined') {
		accounts = [];
	}

	accounts.push(account);
	// save account
	storage.setItemSync('accounts', accounts);

	return account;
}

function getAccount(accountName) {
	// fetch account using getItemSync
	var accounts = storage.getItemSync('accounts');

	var matchedAccount;

	accounts.forEach(function(account) {
		if (account.name === accountName) {
			matchedAccount = account;
		}
	});

	return matchedAccount;
}

if (command === 'create') {
	var createdAccount = createAccount({
		name: argv.name,
		username: argv.username,
		password: argv.password
	});
	console.log('Account created!');
	console.log(createdAccount);
} else if (command === 'get') {
	var fetchedAccount = getAccount(argv.name);
	if (typeof fetchedAccount === 'underfined') {
		console.log('Account not found!');
	} else {
		console.log('Account found!');
		console.log(fetchedAccount);
	}
}





