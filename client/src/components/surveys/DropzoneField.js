import React, { Component } from "react";
import Dropzone from 'react-dropzone';

export default class DropezoneField extends Component {
    
  handleDropOrClick = (acceptedFiles, rejectedFiles, e) => {
    let eventOrValue = e;
    let {input: {onChange, onBlur}} = this.props;
    if (e.type === 'drop') {
      if (acceptedFiles.length) {
        // FileList or [File]
        eventOrValue = (e.dataTransfer && e.dataTransfer.files) || acceptedFiles;
      } else {
        eventOrValue = null;
      }
    }
    onBlur(eventOrValue); // update touched
    onChange(eventOrValue); // update value
  }


  render() {
    let {label, input, meta: {touched, error}} = this.props;
    let {accept, multiple} = this.props;
    let selectedFile = (input && input.value && input.value[0]) || null;
    let dropzoneProps = {
      accept,
      multiple,
      onDrop: this.handleDropOrClick
    };
    return (
      <div>
        <input type='hidden' disabled {...input} />
        <Dropzone {...dropzoneProps} 
          style = {{ backgroundColor: "#E1E1E1", 
                     borderRadius: "5px", 
                     textAlign: "center", 
                     padding: "55px", 
                     minHeight: "60px",
                     border: "2px dashed #C7C7C7" }}
        >
          <div> Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        {selectedFile? <span>{selectedFile.name}</span> : null}
      </div>
      );
  }
}