const words = `
    tomato
    mango
    sparrow
    train
    bus
    truck
    potato
    doom
    tyre
    lira
    mongo
    engine
    bottle
    percy
    drone
    camera
    screen
    keyboard
    dell
    black
    grey
    white
    godhuli
    magic
    bangla
    english
`
  .replace(/\s+/g, " ")
  .trim()
  .split(" ");

for (const word of words) {
  for (let i = 0; i < 3; i++) {
    try {
        console.log("SENDING", word);
    
        const fetches = await Promise.all(
          Array(128)
            .fill("")
            .map((_, i) =>
              fetch(`http://localhost:${(i & 1) === 0 ? 3031 : 3032}/work`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  word: word,
                }),
              })
            )
        );

        await Promise.race(fetches.map((fetch) => fetch.json()));
      } catch (error) {
        console.error(error);
        await new Promise((accept) => setTimeout(accept, 4000));
      }
  }
}

console.log("DONE");
