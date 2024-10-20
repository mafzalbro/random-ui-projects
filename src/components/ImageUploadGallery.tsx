import { CSSProperties, FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsX, BsCloudUpload, BsDownload } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

interface ImageFile {
    id: string;
    src: string;
}

const dottedBoxStyle: CSSProperties = {
    border: "2px dashed #ccc",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
    transition: "background-color 0.3s",
    width: "300px",
    height: "300px",
    position: "relative",
};

const ImageUploadGallery: FC = () => {
    const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
    const [tempImages, setTempImages] = useState<ImageFile[]>([]); // Temporary images for preview
    const [isLoading, setIsLoading] = useState(false);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null); // For modal
    const [modalOpen, setModalOpen] = useState(false); // Modal state


    useEffect(() => {
        const imgs = localStorage.getItem('images')
        if (imgs) {
            const parsedImages = JSON.parse(imgs)
            setUploadedImages(() => parsedImages)
        }

        // console.log(uploadedImages);

    }, [])


    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);

        // Create an array of promises for reading each file
        const filePromises = files.map((file) => {
            return new Promise<ImageFile>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        // Create an ImageFile object with the Data URL
                        resolve({
                            id: URL.createObjectURL(file), // Keep the original Object URL for unique ID
                            src: reader.result as string, // Use the Data URL
                        });
                    } else {
                        reject(new Error("Failed to read file"));
                    }
                };
                reader.onerror = reject; // Handle read errors
                reader.readAsDataURL(file); // Read file as Data URL
            });
        });

        // Wait for all file promises to resolve and then update the state
        Promise.all(filePromises)
            .then((imageFiles) => {
                // Update the temporary images for preview
                setTempImages((prev) => [...prev, ...imageFiles]);
            })
            .catch((error) => {
                console.error("Error reading files:", error);
            });

        setDraggingIndex(null);
    };


    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Prevent default to allow drop
    };

    const handleDragLeave = () => {
        setDraggingIndex(null); // Reset dragging index when leaving
    };

    const handleDragEnter = () => {
        setDraggingIndex(0); // Show active state
    };

    const handleDeletePreviewImage = (id: string) => {
        setTempImages((prev) => prev.filter((img) => img.id !== id));
    };

    const handleSaveImages = async () => {
        setIsLoading(true);
        setUploadedImages(prev => [...prev, ...tempImages])
        setTempImages([])
        setIsLoading(false);
        setDraggingIndex(null)
        if (tempImages) {
            localStorage.setItem('images', JSON.stringify(tempImages))
        }
    };

    // Handle download image
    const handleDownloadImage = (src: string) => {
        const link = document.createElement("a");
        link.href = src;
        link.download = "downloaded-image.png"; // Change the filename if needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Handle delete image from the uploaded images
    const handleDeleteImage = (id: string) => {
        setUploadedImages((prev) => prev.filter((img) => img.id !== id));
        setModalOpen(false);
        if (uploadedImages) {
            localStorage.setItem('images', JSON.stringify(uploadedImages.filter((img) => img.id !== id)))
        }
    };

    // Render the uploaded images in a staggered gallery
    const renderGallery = () => (
        <div className="flex flex-wrap justify-center mt-5">
            {uploadedImages.map((image, index) => (
                <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }} // Staggered animation
                    className="m-2"
                >
                    <div className="relative">
                        <img
                            src={image.src}
                            alt="Uploaded"
                            className="object-cover h-24 w-24 rounded-xl cursor-pointer"
                            onClick={() => {
                                setSelectedImage(image);
                                setModalOpen(true);
                            }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Render the temporary images for preview
    const renderPreviewImages = () => (
        <div className="flex flex-wrap justify-center mt-5">
            {tempImages.map((image) => (
                <div key={image.id} className="relative m-2">
                    <img
                        src={image.src}
                        alt="Preview"
                        className="object-cover h-24 w-24 rounded-full border border-gray-300"
                    />
                    <button
                        onClick={() => handleDeletePreviewImage(image.id)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                        <BsX size={16} />
                    </button>
                </div>
            ))}
        </div>
    );

    // Modal for viewing images
    const renderModal = () => (
        <motion.div
            className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center ${modalOpen ? "block" : "hidden"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-black rounded-lg p-5 w-full max-w-lg"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <button
                    className="absolute top-2 right-2 bg-red-900 text-white rounded-full p-1"
                    onClick={() => setModalOpen(false)}
                >
                    <BsX size={20} />
                </button>
                {selectedImage && (
                    <div className="flex flex-col items-center">
                        <div className="flex justify-around mt-3 w-full text-xs my-10">
                            <button
                                className="flex items-center bg-blue-800 hover:bg-blue-900 text-white rounded-full px-4 py-2"
                                onClick={() => handleDownloadImage(selectedImage.src)}
                            >
                                <BsDownload size={20} className="mr-2" />
                                Download Image
                            </button>
                            <button
                                className="flex items-center bg-red-800 hover:bg-red-900 text-white rounded-full px-4 py-2"
                                onClick={() => handleDeleteImage(selectedImage.id)}
                            >
                                <MdOutlineDelete size={20} className="mr-2" />
                                Delete Image
                            </button>
                        </div>
                        <img
                            src={selectedImage.src}
                            alt="Selected"
                            className="object-cover max-h-80 w-auto rounded"
                        />
                    </div>
                )}
            </motion.div>
        </motion.div>
    );

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold my-5">Image Upload Gallery</h2>
            <motion.div
                style={{
                    ...dottedBoxStyle,
                    backgroundColor: draggingIndex === 0 ? "#999" : "#000",
                    borderColor: draggingIndex === 0 ? "#999" : "#555",
                }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                onDragEnter={handleDragEnter}
            >
                <span className="text-lg font-semibold text-gray-600">Drag Here</span>
            </motion.div>

            {/* Render Preview Images */}
            {tempImages.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold mt-5">Preview Images</h3>
                    {renderPreviewImages()}
                </div>
            )}



            {/* Save Images Button */}
            <motion.button
                onClick={handleSaveImages}
                disabled={isLoading || tempImages.length === 0}
                className={`mt-5 flex items-center bg-slate-800 hover:bg-slate-900 rounded-full cursor-pointer text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {isLoading ? (
                    <span className="loader mr-2">Loading...</span> // Optional loading indicator
                ) : (
                    <BsCloudUpload className="mr-2" />
                )}
                Save Images
            </motion.button>

            {/* Separate Gallery for Uploaded Images */}
            {uploadedImages.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold mt-5">Uploaded Images</h3>
                    {renderGallery()}
                </div>
            )}

            {/* Render Modal */}
            {renderModal()}
        </div>
    );
};

export default ImageUploadGallery;
