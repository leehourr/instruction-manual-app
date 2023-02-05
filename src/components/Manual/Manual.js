import { useEffect } from "react";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import { getDataUri } from "../../utils/api";

const Manual = ({ img, name, desc }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const generatePdf = async () => {
      const doc = new jsPDF("p", "mm", "a4");
      let logo;
      logo = await getDataUri(img);
      let lMargin = 23; //left margin in mm
      let rMargin = 15; //right margin in mm
      let pdfInMM = 210; // width of A4 in mm

      doc.addImage(logo, "PNG", 50, 5, 120, 100);
      doc.text(`${name}`, 50, 120);
      let lines = doc.splitTextToSize(`${desc}`, pdfInMM - lMargin - rMargin);
      doc.text(lines, lMargin, 130);
      // doc.text(`${desc}`, 10, 130);
      // doc.save(`${name}.pdf`);
      await window.open(doc.output("bloburl"));
      navigate("/", { replace: true });
    };
    generatePdf();
  }, [img, desc, navigate, name]);

  // return <Navigate replace to="/" />;
};

export default Manual;
