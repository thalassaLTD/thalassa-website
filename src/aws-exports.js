import AWS from "aws-sdk";

export const S3BucketName = "react-uploads-uplyft";
const REGION = "us-east-1";

AWS.config.update({
    accessKeyId: "---",
    secretAccessKey: "--",
});

const S3Bucket = new AWS.S3({
    params: { Bucket: S3BucketName },
    region: REGION,
});

export const S3Download = (filePath,fileName) => {
    if (filePath.charAt(0) === "/") {
      filePath = filePath.substring(1);
    }
    // file_path = file_path.substring(1, file_path.length);

    S3Bucket.getObject({ Key: `${filePath}` }, (err, data) => {
      if (err) {
        // setLoading(false);
      } else {
        const url = URL.createObjectURL(new Blob([data.Body]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        // setLoading(false);
      }
    });
  };
export default S3Bucket
