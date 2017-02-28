module.exports = {
	'port': process.env.PORT || 3000,
	'secret': 'shh its a secret',
	'database': 'mongodb://localhost:27017',
	'databaseSalt': 5,
	'jwtTimeout': 3600
}