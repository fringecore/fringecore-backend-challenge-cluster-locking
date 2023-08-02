const NAME = process.env.NAME;

export async function send(message) {
    await new Promise(accept => setTimeout(accept, Math.round(50 + Math.random() * 200)));

    const otherPort = NAME === 'ANIKA' ? 3032 : 3031;

    const req = await fetch(`http://localhost:${otherPort}/message`, {
        method: 'POST',
        body: message
    });

    return await req.text();
}

export async function doWork(path) {
    await new Promise((accept) => setTimeout(accept, Math.random() * 300));
    return path.toUpperCase();
}
