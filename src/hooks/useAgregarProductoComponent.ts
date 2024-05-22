import { useState, ChangeEvent } from 'react';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useAgregarProductoComponent = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews: string[] = [];
      const newFiles: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          newPreviews.push(result);
          setImagePreviews([...newPreviews]);
        };
        reader.readAsDataURL(files[i]);
        newFiles.push(files[i]);
      }
      setImages(newFiles);
    }
  };

  const handleAddProduct = async () => {
    setLoading(true);
    try {
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(storage, `images/${image.name}`);
          const snapshot = await uploadBytes(storageRef, image);
          const url = await getDownloadURL(snapshot.ref);
          return url;
        })
      );

      await addDoc(collection(db, "products"), {
        title,
        description,
        price,
        imageUrls
      });

      setTitle("");
      setDescription("");
      setPrice("");
      setImagePreviews([]);
      setImages([]);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return {
    imagePreviews,
    handleImageChange,
    handleAddProduct,
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    loading,
  };
};

export default useAgregarProductoComponent;
