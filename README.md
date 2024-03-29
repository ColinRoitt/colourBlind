# Welcome to Colour Blind
My wonderful friends Jack and Jessamy (I only talk to people with J names) brought this idea up one evening so I figured I would make it.

~~Currently hosted on Heroku at [colourblind.herokuapp.com](https://colourblind.herokuapp.com/).~~

## But what is it?
It's a simple website where a user can upload a picture, say a graph in a presentation, and see what it looks like to people with various kinds of colour blindnesses.

Based on an Express server, written in Node, we use [Jimp](https://www.npmjs.com/package/jimp) to process images, and a wonderful library, [colour-blind](https://www.npmjs.com/package/color-blind), to generate colour values.

We just perform a 2d loop over an image extracting per-pixel RGB hex values, create a new image with altered colours, and submit that back to the user asynchronously.

## I am not a ophthalmologist
I really don't know anything about eyes or colour blindness, I just do web design. If there are any problems or inaccuracies do get in touch.

## Running this
Clone, install, and serve. There's a docker file included or you can run natively.

### Natively with npm

    git clone https://github.com/ColinRoitt/colourBlind.git

    cd colourBlind

    npm install

    npm run serve

### With Docker

    git clone https://github.com/ColinRoitt/colourBlind.git

    cd colourBlind

    docker build -t colourBlind .

    docker run -p 3000:3000 colourBlind
