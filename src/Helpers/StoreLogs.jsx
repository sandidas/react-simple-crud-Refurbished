const storeLog = () => {
    // console.log({ log });
    // store log into data base
    const uri = "https://server-side-xi.vercel.app/log";
    const settings = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ log })
    };
    try {
        const fetchResponse = fetch(uri, settings);
        const data = fetchResponse.json();
        if (data.success === true) {
            // console.log('local', data.message);
        } else if (data.success === false) {
            // console.log('local', data.message);

        } else {
            //  console.log('local', data.message);
        }
    } catch (error) {
        // console.log('Local store fail: ', error);
    }
}