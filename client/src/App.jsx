import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pdfImg from "./assets/pdf.png";
import Loader from "./components/Loader.jsx";
import { Axios } from "./configs/axiosConfig.js";

const App = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingTextMap, setIsGeneratingTextMap] = useState({});
    const [isGeneratingText, setIsGeneratingText] = useState(false);

    const getAllFiles = async () => {
        const res = await Axios.get(`/allfiles`);
        setUploadedFiles((prev) => [...prev, ...res.data.data]);
    };

    useEffect(() => {
        getAllFiles();
    }, []);

    function handleChange(event) {
        setFiles(event.target.files);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (files.length < 1) return;
        setIsLoading(true);
        const url = "/upload";
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("pdfFiles", files[i]);
        }

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        Axios
            .post(url, formData, config)
            .then((response) => {
                setUploadedFiles((prev) => [...response.data.data, ...prev]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error uploading file: ", error);
                setError(error);
            });
    }

    const quizHandler = async (id) => {
        if (!id) {
            getAllFiles();
            return alert("Processing PDF, Try Again in a few moments");
        }
        // Set the corresponding entry to true when starting the quiz generation
        setIsGeneratingTextMap((prevMap) => ({ ...prevMap, [id]: true }));
        setIsGeneratingText(true);

        try {
            const res = await Axios.get(
                `/genquiz/${id}`
            );
            if (res.data.success) {
                navigate(`/${res.data.data.file.name}`, {
                    state: res.data.data,
                });
            }
            // Handle the quiz result as needed
        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.message);
        } finally {
            // Set the corresponding entry back to false when the generation is complete
            setIsGeneratingTextMap((prevMap) => ({ ...prevMap, [id]: false }));
            setIsGeneratingText(false);
        }
    };

    // Add a CSS class to the body to disable scrolling when the loader is displayed
    useEffect(() => {
        if (isLoading || isGeneratingText) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = ""; // Reset to the default value
        }
    }, [isLoading, isGeneratingText]);

    return (
        <div className="App">
            {isGeneratingText && (
                <Loader loaderText={"Generating Questions..."} />
            )}
            {isLoading && <Loader loaderText={"Uploading Files..."} />}
            <form onSubmit={handleSubmit}>
                <h2 className="upHead">Upload Your Files</h2>
                <div className="inputWrap">
                    <input
                        type="file"
                        multiple
                        accept="application/pdf"
                        onChange={handleChange}
                        className="inputBox"
                    />
                    <div>
                        <br />
                        <p>OR</p>
                        <p>Drag & Drop PDF files</p>
                    </div>
                </div>
                <button
                    className="buttonStyle submitBtn"
                    disabled={isLoading}
                    type="submit"
                >
                    {isLoading ? "Uploading" : "Upload"}
                </button>
            </form>
            <div className="allPdf">
                <h2 className="upHead">Uploaded Files</h2>
                {uploadedFiles?.map((file, index) => (
                    // <Link key={index} to={`/${file.id || file.name}`}>
                    <div className="pdfBox" key={index}>
                        <div className="boxLeft">
                            <img src={pdfImg} alt={file.id || file.name} />
                            <h3>{file.id || file.name}</h3>
                        </div>
                        <div className="boxRight">
                            <button
                                className="buttonStyle"
                                onClick={() => quizHandler(file._id)}
                                disabled={isGeneratingTextMap[file._id]}
                            >
                                {isGeneratingTextMap[file._id]
                                    ? "Generating Quiz"
                                    : "Generate Quiz"}
                            </button>
                        </div>
                    </div>
                    // </Link>
                ))}
            </div>
            {error && <p>Error uploading file: {error.message}</p>}
        </div>
    );
};

export default App;
