# Snoop on repos

Find out who commits and when.

Output looks like:

```
$ node index.js 
radishmouse/commit-snooper
{
    "radishmouse": {
        "count": 3,
        "last": "0 hours"
    }
}
============
```

## Requirements

You'll need to generate a personal access token from https://github.com/settings/tokens


## Installation

```sh
git clone git@github.com:radishmouse/commit-snooper.git
cd commit-snooper
npm i
```

## Configuration

```sh
cp dist.config.js config.js
# edit config.js, adding token and repos
```

## Usage

```sh
node index.js
```
