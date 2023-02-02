import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useFetcher } from "react-router-dom";
import { Backdrop } from "../ui/Backdrop";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddManual = ({ navBack }) => {
  const fetch = useFetcher();
  const inputTitle = useRef();
  const inputDesc = useRef();
  const [uploadedImg, setUploadedImg] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  // const [imgUrl, setImgUrl] = useState();

  const getImg = (e) => {
    setUploadedImg(e.target.files[0]);
  };

  const uploadImg = async () => {
    // console.log("selected img");
    // console.log(uploadedImg);

    if (uploadedImg.name === null) return;
    const imageRef = await ref(
      storage,
      `images/${uploadedImg.name + crypto.randomUUID()}`
    );
    // console.log("after storages");
    const imgPath = await uploadBytes(imageRef, uploadedImg).then(
      async (snapshot) => {
        const path = await getDownloadURL(snapshot.ref).then((url) => {
          // console.log("in upload");
          // console.log(url);
          return url;
        });
        // console.log("after download");
        // console.log(path);
        return path;
      }
    );
    // console.log("after upload");
    // console.log(imgPath);
    return imgPath;
  };
  // console.log(imgUrl);

  const uploadHandler = async (e) => {
    e.preventDefault();
    const title = inputTitle.current.value;
    const desc = inputDesc.current.value;
    setIsloading(true);
    const getImgUrl = await uploadImg();
    // setImgUrl(getImgUrl);
    // console.log("img url");
    // console.log(getImgUrl);
    // const imgPath = inputImagePath.current.value;
    await fetch.submit(
      { title, desc, imgUrl: getImgUrl },
      { method: "post", action: "/your-manuals/upload" }
    );
  };

  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(
        <>
          {isLoading && (
            <p className="fixed text-lg top-0 font-semibold sm:text-3xl z-50 w-full h-screen pt-24 bg-white/40 text-cyan-400">
              <span className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
                Uploading...
              </span>
            </p>
          )}
          <form
            onSubmit={uploadHandler}
            className="fixed overflow-y-scroll text-white top-0 left-1/2 -translate-x-1/2 z-40 w-[60%] h-screen bg-zinc-700 mx-auto"
          >
            <button
              disabled={isLoading}
              onClick={navBack}
              className="w-16 block text-zinc-600 ml-auto mr-8 mt-4 py-1 font-bold bg-cyan-300 rounded-lg "
            >
              Esc
            </button>
            <label
              className="cursor-pointer relative border-2 text-cyan-300 block mx-auto text-center w-2/5 h-64 mt-4 mb-6 font-bold  border-cyan-300"
              htmlFor="uploadedImage"
            >
              {!uploadedImg ? (
                <p className="">Upload image</p>
              ) : (
                <img
                  className="w-full h-full object-contain"
                  src={URL.createObjectURL(uploadedImg)}
                  alt="img"
                />
              )}
              <input
                className=" hidden"
                onChange={getImg}
                id="uploadedImage"
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg"
              />
            </label>
            <input
              ref={inputTitle}
              className="w-96 my-2 mx-auto block h-9 font-sans pl-6 bg-zinc-600 font-normal self-center  rounded-lg outline-none caret-cyan-300  border-b-2 border-b-transparent focus:border-b-cyan-300"
              type="text"
              name="title"
              placeholder="Manual Title"
              required
            />
            <p className="text-center my-3 text-lg font-semibold ">
              Keep the description clear and consise for readers.
            </p>
            <textarea
              ref={inputDesc}
              className="w-full mx-auto block h-[63%] font-sans pl-6 pt-4 bg-zinc-600 font-normal self-center mt-2 rounded-lg outline-none caret-cyan-300  border-b-2 border-b-transparent focus:border-b-cyan-300"
              type="text"
              name="title"
              placeholder="Description"
              required
            ></textarea>
            <button className="w-24 py-1 text-zinc-700  font-bold bg-cyan-300 my-2 block ml-auto mr-8 rounded-lg">
              Submit
            </button>
          </form>
        </>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default AddManual;
