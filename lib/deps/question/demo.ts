import question from './mod.ts'

await question('confirm', 'Confirm?', true)
await question('list', 'List?', ['hello', 'world'])
await question('checkbox', 'Checkboxes?', ['hello', 'world'])
await question('input', 'Input?')
await question('input', 'Input with default?', 'default')
console.log('Result: %s', await question('password', 'Password? (will print result)'))
console.log('Result: %s', await question('password', 'Password with custom pattern? (will print result)', '<>'))
console.log('Result: %s', await question('password', 'Password with no printing characters? (will print result)', false))
console.log('Result: %s', await question('list', 'List with object? (will print result)', {
  'Cheese': 'cheese',
  'Milk': 'milk',
  'Tofu': 'tofu',
}))
console.log('Result: %s', await question('checkbox', 'Select stuff with object? (will print result)', {
  'Cheese': { value: 'cheese', selected: true },
  'Garlic': { value: 'garlic' },
  'Salami': { value: 'salami' },
}))

const commonPorts = {
  'SSH': 22,
  'DNS': 53,
  'HTTP': 80,
  'HTTPS': 443,
  'Gopher': 70,
  'MySQL': 3306,
  'Postgres': 5432,
  'MongoDB': 27017,
  'Minecraft': 25565,
  'LDAP': 389,
  'LDAPS': 636,
  'Telnet': 23,
  'Telnet TLS': 992,
  'SMTP': 25,
  'IMAP': 143,
  'STUN/TURN': 3478,
  'STUN/TURN TLS': 5349,
  'FTP Data Transfer': 20,
  'FTP Control': 21,
  'FTPS Data Transfer': 989,
  'FTPS Control': 990,
}

await question('list', 'Select Service:', commonPorts, { windowSize: 7, filtering: true })
await question(
  'checkbox',
  'Select Services:',
  Object.fromEntries(Object.entries(commonPorts).map(([label, value]) => [label, { value }])),
  {
    windowSize: 7,
    filtering: true
  }
)

void (await question('list', 'Should a thing be done?', {
  'Yes': () => console.log('It will be done!'),
  'No': () => console.log('It will not be done...'),
  'Maybe': () => console.log('Be more decisive, please.')
}, { inline: true }))?.()
