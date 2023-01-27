import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useFetcher } from "react-router-dom";
import { Backdrop } from "../ui/Backdrop";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddManual = ({ navBack }) => {
  const fetch = useFetcher();
  const inputTitle = useRef();
  const inputDesc = useRef();
  const [uploadedImg, setUploadedImg] = useState();
  const [imgUrl, setImgUrl] = useState();
  // const inputImagePath = useRef();

  const getImg = (e) => {
    setUploadedImg(e.target.files[0]);
  };
  console.log(uploadedImg);
  const uploadFile = () => {
    if (uploadedImg == null) return;
    const imageRef = ref(
      storage,
      `images/${uploadedImg.name + crypto.randomUUID()}`
    );
    uploadBytes(imageRef, uploadedImg).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImgUrl(url);
      });
    });
  };
  console.log(imgUrl);

  // const uploadHandler = (e) => {
  //   e.preventDefault();
  //   const title = inputTitle.current.value;
  //   const desc = inputDesc.current.value;
  //   // const imgPath = inputImagePath.current.value;

  //   fetch.submit(
  //     { title, desc },
  //     { method: "post", action: "/your-manuals/upload" }
  //   );
  // };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={navBack} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <form
          // onSubmit={uploadHandler}
          className="fixed overflow-y-scroll text-white top-0 left-1/2 -translate-x-1/2 z-50 w-[60%] h-full bg-zinc-700 mx-auto"
        >
          <button
            onClick={navBack}
            className="w-16 block text-zinc-600 ml-auto mr-8 mt-4 py-1 font-bold bg-cyan-300 rounded-lg "
          >
            Esc
          </button>
          <label
            className="cursor-pointer border-2 text-cyan-300 block mx-auto text-center w-1/2 mt-4 mb-6 py-12 font-bold  border-cyan-300"
            htmlFor="uploadedImage"
          >
            {!uploadedImg ? (
              "Upload image"
            ) : (
              <img
                className="w-full h-full object-fit"
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
        </form>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default AddManual;
