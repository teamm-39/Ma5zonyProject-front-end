import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";
import PropTypes from "prop-types";

function UseCreatePdf({ table, pdfName,isLoading }) {
  const generatePdf = () => {
    const elements = `
      <div
        id="pdf-content"
        style="color:#333333; font-family: 'cairo', sans-serif !important;"
      >
        <div class="navbar-brand justify-content-center text-center d-flex align-items-center p-0 m-0">
          <div class="brand-name text-center d-flex flex-column">
            <h3 class="fw-bold p-0 m-0">مخزون</h3>
            <span class="brand-span m-0 p-0">
              لادارة المستودعات والمخازن
            </span>
          </div>
        </div>
      </div>
      <hr class="w-50 mx-auto"/>
      ${table}`;

    // إعدادات الـ html2pdf مع تطبيق pagebreak بشكل صحيح
    const options = {
      filename: `${pdfName}.pdf`,
      html2canvas: { scale: 2 }, // جودة الصورة
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      margin: [5, 3, 5, 3], // [top, left, bottom, right]
      pagebreak: {
        mode: 'auto',  // تجنب كسر الصفحة في أي مكان
        avoid: ['tr']         // تجنب كسر الصفوف داخل الجدول
      }
    };

    // توليد PDF من المحتوى باستخدام html2pdf مع الخيارات المحددة
    html2pdf()
      .set(options)
      .from(elements) // تحديد المحتوى الذي سيتم تحويله إلى PDF
      .save(); // حفظ ملف PDF
  };

  return (
    <div>
      <Link>
        <Button
          onClick={generatePdf}
          label="استخراج كملف pdf"
          severity="primary"
          raised
          loading={isLoading}
          className="btn-reuse rounded-3"
        />
      </Link>
    </div>
  );
}
UseCreatePdf.propTypes = {
  table: PropTypes.node.isRequired,
  pdfName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default UseCreatePdf;
