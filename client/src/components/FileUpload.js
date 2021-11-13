import React, { Fragment } from 'react'

export const FileUpload = () => {
  return (
    <Fragment>
      <form>
        <div className="input-group mb-4">
          <input type="file" className="form-control" id="inputGroupFile01" />
        </div>
        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
      </form>
    </Fragment>
  )
}
