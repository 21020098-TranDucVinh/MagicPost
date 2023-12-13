import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
class CommonUtils {
     static isNumber1(number) {
          if (number === 1) return true;
          return false;
     }
     static getBase64(file) {
          return new Promise((resolve, reject) => {
               const reader = new FileReader();
               reader.readAsDataURL(file);
               reader.onload = () => resolve(reader.result);
               reader.onerror = (error) => reject(error);
          });
     }
     static GenerateInvoice() {
          html2canvas(document.querySelector('#invoiceCapture')).then((canvas) => {
               const imgData = canvas.toDataURL('image/png', 1.0);
               const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: [612, 792],
               });
               pdf.internal.scaleFactor = 1;
               const imgProps = pdf.getImageProperties(imgData);
               const pdfWidth = pdf.internal.pageSize.getWidth();
               const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
               pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
               pdf.save('invoice-001.pdf');
          });
     }
}

export default CommonUtils;
