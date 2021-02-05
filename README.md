# Snoop on repos

Find out who is active with a repo and when.

Output looks like:

```
$ node index.js 
radishmouse/commit-snooper
[
    {
        "name": "radishmouse/commit-snooper",
        "contributions": {
            "radishmouse": {
                "count": 6,
                "last": "1005 minutes ago (16.75 hours)",
                "type": "PushEvent"
            }
        }
    }
]
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
