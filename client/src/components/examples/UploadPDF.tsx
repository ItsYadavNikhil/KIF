import UploadPDF from '../UploadPDF';

export default function UploadPDFExample() {
  return (
    <UploadPDF 
      onUpload={(data) => console.log('PDF uploaded:', data)}
      onCancel={() => console.log('Upload cancelled')}
    />
  );
}