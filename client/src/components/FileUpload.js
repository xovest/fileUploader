import React, { Fragment, useState } from 'react'
import axios from 'axios';

export const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Upload');
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch(err) {
      if (err.response.status === 500) {
        console.log('Problem with server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="input-group mb-4">
          <label className="input-group-text" htmlFor="inputGroupFile02">{filename}</label>
          <input type="file" className="form-control" id="inputGroupFile02" onChange={onChange} />
        </div>
        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
      </form>
      { uploadedFile ? <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <h3 className="text-center">{ uploadedFile.fileName }</h3>
          <img style={{ width: '100%' }} src={uploadedFile.filePath} />
        </div>
      </div> : null }
    </Fragment>
  )
}
