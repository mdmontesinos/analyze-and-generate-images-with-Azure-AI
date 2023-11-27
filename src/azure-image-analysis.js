export function analyzeImage(imageUrl, endpoint, key) {
    return fetch(
        `${endpoint}/vision/v3.1/analyze?visualFeatures=Categories,Description,Color&details=Landmarks&language=en`,
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
            return error.json();
        });
}
