import logo from "./logo.svg";
import "./App.css";
import React, {useState} from "react";
import {analyzeImage} from "./azure-image-analysis";
import {Loader} from "./Loader";

function App() {
    const [azureComputerVisionKey, setAzureComputerVisionKey] = useState("");
    const [azureComputerVisionEndpoint, setAzureComputerVisionEndpoint] =
        useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageAnalysis, setImageAnalysis] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function displayResults() {
        if (!imageUrl) {
            return;
        }

        setIsLoading(true);
        setImageAnalysis("");

        const analysis = await analyzeImage(
            imageUrl,
            azureComputerVisionEndpoint,
            azureComputerVisionKey
        );

        setImageAnalysis(analysis);

        setIsLoading(false);
    }

    function onChangeImageUrl(url) {
        setImageUrl(url);
        setImageAnalysis("");
    }

    return (
        <main className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Analyze images using Azure AI</h1>

            <div className="azure-computer-vision">
                <div>
                    <label>Azure Computer Vision Endpoint:</label>
                    <input
                        type="text"
                        placeholder="Enter azure computer vision endpoint"
                        value={azureComputerVisionEndpoint}
                        onChange={(e) => {
                            setAzureComputerVisionEndpoint(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label>Azure Computer Vision Key:</label>
                    <input
                        type="text"
                        placeholder="Enter azure computer vision key"
                        value={azureComputerVisionKey}
                        onChange={(e) => {
                            setAzureComputerVisionKey(e.target.value);
                        }}
                    />
                </div>
            </div>

            <hr />

            <p>Insert URL or type prompt:</p>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Enter URL from image to analyze"
                    value={imageUrl}
                    onChange={(e) => {
                        onChangeImageUrl(e.target.value);
                    }}
                />
                <button onClick={displayResults} disabled={!imageUrl}>
                    Analyze
                </button>
            </div>

            {isLoading && <Loader />}

            {imageAnalysis && (
                <div className="analysis-results">
                    <img alt="Rendered from URL" src={imageUrl} />
                    <textarea
                        value={JSON.stringify(imageAnalysis, null, 2)}
                        readOnly
                    />
                </div>
            )}
        </main>
    );
}

export default App;
