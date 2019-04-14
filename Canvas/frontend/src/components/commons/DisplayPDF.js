import React, { Component } from "react";
import { Document, Page , pdfjs} from "react-pdf";
import {Grid, Button} from '@material-ui/core'
import {Redirect} from 'react-router-dom';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class DisplayPDF extends Component {
  state = { 
    numPages: null, 
    pageNumber: 1,
    redirectVar: '' };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  goBack = () => {
    this.setState({
      redirectVar :  <Redirect to={{
        pathname: "/course/assignment/view",
        state : {
          assignment : this.props.location.assignment
        }
      }}/>
    })
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const file = this.props.location.assignment.FILE_PATH;
    console.log(this.props.location)
    return (
      <div>
        {this.state.redirectVar}
        <Grid 
        style={{ width: '65%', display: 'inline-flex', marginTop : '25px'}}
        container spacing={12}>
          <Grid item xs={4}>
              <Button
              type="submit"
              variant="contained"
              color="primary" 
              onClick={this.goToPrevPage}>
                Prev
              </Button>
              <Button
              type="submit"
              variant="contained"
              color="primary"  
              onClick={this.goToNextPage}>
                Next
              </Button>
          </Grid>
          <Grid item xs={4}>
          <Button
              type="submit"
              variant="contained"
              color="primary"  
              onClick={this.goBack}>
                Back
              </Button>
          </Grid>
          <Grid item xs={4}>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </Grid>
        </Grid>
        
        <div style={{ width: 600, display:'inline-block'}}>
          <Document
            file={file}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>

        
      </div>
    );
  }
}

export default DisplayPDF;