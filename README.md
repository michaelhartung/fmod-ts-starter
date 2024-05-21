# FMOD Typescript Starter

Boilerplate to get get started scripting FMOD Studio using Typescript.

## Cloning

This repo contains [fmod-types](https://github.com/michaelhartung/fmod-types) as
submodule.

```shell
git clone --recurse-submodules https://github.com/michaelhartung/fmod-ts-starter
```

## Setup

After cloning install the required node modules.

```shell
cd fmod-ts-starter
npm install
```

## Usage

This project is using [Biome](https://biomejs.dev/) for linting.

Create your own `.ts` files in `src/`. To build the scripts run:

```
npm run build
```

Then copy the generated `.js` files to your FMOD Project `Scripts` folder and
run `Scripts -> Reload` in FMOD Studio.

To streamline the iteration process you might want to add a npm script that 
copies the generated `.js` files to your FMOD Project scripts directory.

```shell
npm run build && cp dist/example.js <path-to-fmod-project>/Scripts
```

## Example Code

You can find some example code in the `example.ts` file.

## Contributing / Issues

I'm aware that the number of examples is a bit sparse at the moment. I am aiming
to add some more over time.

The type definitions have not been tested extensively. There are likely a lot of
ways these can be improved upon.

If you encounter any issues please let me know.