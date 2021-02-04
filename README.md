# Snoop on repos

Find out who commits and when.

Output looks like:

```
$ node index.js 
radishmouse/commit-snooper
[
    {
        "name": "radishmouse/commit-snooper",
        "contributions": {
            "radishmouse": {
                "count": 4,
                "last": "216 minutes ago (3.60 hours)"
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
