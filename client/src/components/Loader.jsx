import loader from "../assets/gifLoader.gif";

const Loader = ({ loaderText }) => {
    
    return (
        <div className="Loader">
            <div className="loaderWrap">
                <h1>{loaderText}</h1>
                <img src={loader} alt="" />
            </div>
        </div>
    );
};

export default Loader;
