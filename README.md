# foundry-js

The foundry binary published to npmjs.

## Install

```bash
npm install foundry-js@nightly

# or install globally
# npm install -g foundry-js@0.2.0-nightly
# or specify a release tag (version)
# npm install foundry-js@0.2.0-nightly-87bc53fc6c874bd4c92d97ed180b949e3a36d78c
```

## Usage

If installed globally:

```bash
forge -V

# forge 0.2.0 (87bc53 2024-02-09T00:16:22.953958126Z)
```

If installed locally:

```bash
npx forge -V

# forge 0.2.0 (87bc53 2024-02-09T00:16:22.953958126Z)
```

## Set up the Github Actions

1. Clone the repository.
2. Change the package name in `package.json`. Don't alter the version (leave it to 1.0.0), as the version will be self managed by the Github Actions.
3. Add your npm token to the Github Actions repository secrets. i.e., NODE_AUTH_TOKEN = <your-npm-token>.
