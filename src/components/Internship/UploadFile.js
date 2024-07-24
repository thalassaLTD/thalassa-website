import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import AWS from 'aws-sdk'

const S3_BUCKET = 'react-uploads-uplyft';
const REGION = 'us-east-1';


export default function UploadComponent() {

  AWS.config.update({
    accessKeyId: "AKIAU77UJPOWFJYTFRP3",
    secretAccessKey: "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"
  })

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION
  })


  const s3 = new AWS.S3({
    params: {
      Bucket: 'react-uploads-uplyft',
    },
  });

  

const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
}

const uploadFile = (file, taskId) => {
    if (file === null){
        alert("Choose file to upload")
    }
    else{
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: `${currentUser.uid}/${internshipData?.project_id}/${value}/` + file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
        axios.post(baseURL + "/addTaskDone", {
            student_id: currentUser.uid,
            project_id: internshipData?.project_id,
            task_id: taskId,
            task_filename:  file.name,
            task_number: value + 1,
            task_file_submit: S3_BUCKET + `/${currentUser.uid}/${internshipData?.project_id}/${value}/` + file.name,
        })
            .then((response) => {
                alert("File Uploaded: ", file.name)
            });
    }
    
}


  return (
    <>
      <Typography variant="h4">Task Background</Typography>
      <Typography variant="paragraph">video</Typography>
    </>
  );
}
