
export const sendImgToImgBB = async (photoURL) => {
    const formData = new FormData();
    formData.append('image', photoURL);

    // get api from https://api.imgbb.com/
    // api is : a770fe9f71d00ec399a3b39bb0cd6ca4
    // img upload is : https://api.imgbb.com/1/upload
    // example call to api: curl --location --request POST "https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY" --form "image=R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    const uri = "https://api.imgbb.com/1/upload?key=a770fe9f71d00ec399a3b39bb0cd6ca4"
    const settings = {
        method: 'POST', body: formData
    }
    try {
        const fetchResponse = await fetch(uri, settings);
        const data = await fetchResponse.json();
        return await data.data.display_url;

    } catch (error) {
        return await error;
    }

}