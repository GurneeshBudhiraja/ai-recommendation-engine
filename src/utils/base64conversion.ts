export default async function imageToBase64(image: File): Promise<string> {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(image);

    reader.onloadend = () => {
      resolve(reader.result as string);
    }
    reader.onerror = () => {
      reject("")
    }
  })

}