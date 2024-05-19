import { useState, ChangeEvent } from 'react';

const useAgregarProductoComponent = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          newPreviews.push(result);
          setImagePreviews([...newPreviews]);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  return { imagePreviews, handleImageChange };
};

export default useAgregarProductoComponent;
