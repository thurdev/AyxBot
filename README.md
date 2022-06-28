<p align="center">
  <img src="./images/logo.png" width="250" align="center">
</p>
                                                                        
<h1 align="center">AyxBot</h1>
<p align="center" style="color: #ccc;">
Discord bot that offers the functionality to call and send messages to phone numbers.
</p>

<center>
<img src="https://img.shields.io/github/stars/thurdev/AyxBot?style=for-the-badge">
<img src="https://img.shields.io/github/license/thurdev/AyxBot?style=for-the-badge">
<img src="https://img.shields.io/github/issues/thurdev/AyxBot?style=for-the-badge">
<img src="https://img.shields.io/github/forks/thurdev/AyxBot?style=for-the-badge">
</center>

## Table of Content

- [Dependencies](#dependencies)
- [Commands](#commands)
- [Installation](#installation)
- [License](#license)

## Dependencies

<img src="https://img.shields.io/badge/>=16.0.1-B?style=for-the-badge&logo=javascript&label=dotenv">
<br>
<img src="https://img.shields.io/badge/>=5.0.8-B?style=for-the-badge&logo=sqlite&label=sqlite3">
<br>
<img src="https://img.shields.io/badge/^0.0.1--security-B?style=for-the-badge&logo=files&label=FS">
<br>
<img src="https://img.shields.io/node/v/discord.js?style=for-the-badge&logo=discord&label=Discord.js">
<br>
<img src="https://img.shields.io/badge/>=0.5.0-B?style=for-the-badge&logo=discord&label=@discordjs/rest">
<br>
<img src="https://img.shields.io/badge/>=0.34.0-B?style=for-the-badge&logo=discord&label=discord-api-types">
<br>
<img src="https://img.shields.io/badge/>=0.15.0-B?style=for-the-badge&logo=discord&label=@discordjs/builders">
<br>
<img src="https://img.shields.io/badge/>=2.11.1-B?style=for-the-badge&logo=vonage&label=@vonage/server-sdk">

## Documentation

- **Discord.js** https://discord.js.org/#/
- **Vonage (Nexmo)** https://developer.vonage.com/api

## Commands

``/credits @user(optional)`` - See the credits of a user, or your credits.
<img src="./images/credits_self.png">
<img src="./images/credits_user.png">

``/call phone(required) message(required)`` - Calls to a phone number and say the message
<img src="./images/calling.png">
<img src="./images/invalidapikey.png">


## Installation

```bash
# Clone this repository
$ git clone https://github.com/thurdev/AyxBot

# Go into the repository
$ cd AyxBot

# Install dependencies
$ yarn install

# Don't forget to configure your .env file, just rename the .env.example to .env

# Run the app
$ yarn dev
```

## License

MIT


 <i style='text-align: center; color: red;font-size: 13px;'>CopyRight © ThurDev</i> 
