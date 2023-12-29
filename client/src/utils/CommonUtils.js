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
                    // format: [1000, 1000],
               });
               pdf.internal.scaleFactor = 1;
               const imgProps = pdf.getImageProperties(imgData);
               const pdfWidth = pdf.internal.pageSize.getWidth();
               const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
               pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
               pdf.save('invoice-001.pdf');
          });
     }
     //build option select collection except node with zipcode
     static buildSelectionOptionExceptNodeWithZipCode = (nodes, zip_code) => {
          // const { arrCollections, userInfo } = this.props;
          let options = [];
          let collections = nodes.filter((item) => item.zip_code !== zip_code);
          if (collections && collections.length > 0) {
               options = collections.map((item, index) => {
                    let obj = {};
                    if (item.zip_code !== zip_code) {
                         obj.value = item.zip_code;
                         obj.label = item.name;
                    }
                    return obj;
               });
          }
          return options;
     };
     //build option select collection
     static buildSelectionOptions = (nodes) => {
          let options = [];
          if (nodes && nodes.length > 0) {
               options = nodes.map((item, index) => {
                    let obj = {};
                    obj.value = item.zip_code;
                    obj.label = item.name;

                    return obj;
               });
          }
          return options;
     };
}

export default CommonUtils;
