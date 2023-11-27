export function analyzeImage(imageUrl, endpoint, key) {
    return fetch(
        `${endpoint}/vision/v3.1/analyze?visualFeatures=Categories,Description,Color,Objects,Tags&language=en`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": key,
            },
            body: JSON.stringify({
                url: imageUrl,
            }),
        }
    )
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            return "An error has ocurred";
        });
}
