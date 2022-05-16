import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

function DetailProductImage(props) {
    const [Images, setImages] = useState([]);

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];
            let domain =
                window.location.protocol + "//" + window.location.hostname;

            props.detail.images.map((item) => {
                images.push({
                    original: `${domain}:5000/${item}`,
                    thumbnail: `${domain}:5000/${item}`,
                });
            });
            setImages(images);
        }
    }, [props.detail]);

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    );
}

export default React.memo(DetailProductImage);
