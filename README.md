# foundry-js

The foundry binary published to npmjs. See all the available versions [here](https://www.npmjs.com/package/foundry-js?activeTab=versions).

## Install

```bash
npm install foundry-js@nightly

# or install globally
# npm install -g foundry-js@nightly-0.2.0
# or specify a release tag (version)
# npm install foundry-js@nightly-0.2.0-a170021
```

## Usage

If installed globally:

```bash
forge -V

# forge 0.2.0 (a170021 2024-02-16T00:17:36.445247161Z)
```

If installed locally:

```bash
npx forge -V

# forge 0.2.0 (a170021 2024-02-16T00:17:36.445247161Z)
```

## Development
### Set up the Github Actions

1. Clone the repository.
2. Change the package name in `package.json`. Don't alter the version (leave it to 1.0.0), as the version will be self managed by the Github Actions.
3. Add your npm token to the Github Actions repository secrets: NODE_AUTH_TOKEN = <your-npm-token>.

### Publish workflow

1. `.github/workflows/publish.yml` is triggered either scheduled-ly or manually.
2. This workflow will set the npm token and execute `ci.sh`.
3. In `ci.sh`, it will fetch all releases of `foundry`, and check if there is a new release. 
4. If there is, it will download the pre-compiled binary using `download.js` and publish it to npm.
5. `bin/<>-delegate.sh` (e.g., `bin/forge-delegate.sh`) will link the pre-compiled binary to the PATH while installing the package, and handle different architectures (currently support linux-amd64, linux-arm64, darwin-amd64 and darwin-arm64).
