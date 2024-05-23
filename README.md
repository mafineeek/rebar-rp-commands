# Rebar Roleplay Commands
This plugin provides essential roleplay commands for the Rebar framework. It allows players to communicate actions, background descriptions, and dialogue with varying voice levels within a defined distance.

## Showcase
<img src="https://i.imgur.com/H1cfZdw.png"/>

## Features
* /me Command: Describe an action made by your character.
* /do Command: Describe a background event or scene.
* /low Command: Speak in a low voice with a reduced distance.
* /shout Command: Speak in a high voice with an increased distance.
* /megaphone Command: Speak through a megaphone with a much larger distance.
* /looc Command: Speak out-of-character locally.

## Installation

From the main directory of your `Rebar` installation.

```
git clone https://github.com/mafineeek/rebar-rp-commands src/plugins/rp-commands
```

## ⚠️ IMPORTANT!
Rebar Chat natively adds /says/ to your message. You need to do a few changes, to get rid of it:

### 1. Navigate to ChatMessage.vue from Stuyk's chat
And then, remove these lines (selected one):

<img src="https://i.imgur.com/lw6p7IZ.png" />

### 2. Navigate to <chat resource>/server/index.ts
And refactor below method as shown on screenshot:

<img src="https://i.imgur.com/V34lkYo.png"/>
