import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Input, Tooltip } from '@mui/material';
import { Button, ButtonGroup, IconButton, TextField } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import AddIcon from '@mui/icons-material/Add';
import Business from '@/assets/icons/business.png';
import Crypto from '@/assets/icons/crypto.png';
import Government from '@/assets/icons/government.png';
import Micro from '@/assets/icons/micro.png';
import Football from '@/assets/icons/football.png';
import DateTimePickerComponent from '@/components/Picker/DateTimePicker';



const CreatePropositionDialog = ({ open, onClose, setSuccess }) => {
  const images = [
    { src: 'https://img.icons8.com/material-outlined/24/228BE6/briefcase.png', alt: 'Business' },
    { src: 'https://img.icons8.com/windows/24/228BE6/bitcoin.png', alt: 'Crypto' },
    { src: 'https://img.icons8.com/ios/24/228BE6/museum.png', alt: 'Politics' },
    { src: 'https://img.icons8.com/windows/24/228BE6/micro.png', alt: 'Pop' },
    { src: 'https://img.icons8.com/ios-filled/24/228BE6/football2--v1.png', alt: 'Sport' },
  ];
  const [page, setPage] = useState(1);
  const [activeButton, setActiveButton] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [filter, setFilter] = useState("");
  const [toolTipOpen, setToolTipOpen] = useState(false);

  const [proposition, setProposition] = useState({
    name: '',
    category: '',
    startDate: '',
    endDate: '',
    description: '',
    dataSource: ''
  });

  const handleTooltipClose = () => {
    setToolTipOpen(false);
  };
  const handleTooltipOpen = () => {
    setToolTipOpen(true);
  };

  const handleCategoryChange = (category) => {
    setProposition((prevState) => ({
      ...prevState,
      ['category']: category
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProposition((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputText = (event) => {
    const inputText = event.target.value;
    if (inputText.length <= 100) {
      setText(inputText);
    }
  };

  const handleUrlChange = (event) => {
    const inputURL = event.target.value;
    setUrl(inputURL);
  }

  const handleFilterChange = (event) => {
    const inputFilter = event.target.value;
    setFilter(inputFilter);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const next = () => { setPage(page + 1); }
  const prev = () => { setPage(page - 1); }
  const handleSubmit = () => { setSuccess(true); close() };

  const close = () => {
    onClose();
    setProposition({
      name: '',
      category: '',
      startDate: '',
      endDate: '',
      description: '',
      dataSource: ''
    });
    setPage(1);
    setActiveButton(null);
    setPreviewImage("");
  }

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '4em',
    height: '4em',
    borderRadius: '50%',
    border: '2px solid #5f9ff8',
    overflow: 'hidden',
    cursor: 'pointer',
  };

  const h4Style = {
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
    letterSpacing: '0.05em',
    marginTop: '0.8rem',
    marginBottom: '0.8rem',
    fontFamily: 'Oswald system-ui'
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  function PasswordInput() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
     }


  return (
    <Dialog open={open} onClose={close} PaperProps={{
      style: {
        backgroundColor: '#f5f8fc',
        boxShadow: 'none',
        borderRadius: '10px',
        width: '500px',
        height: '520px',
      },
    }}>

      <DialogTitle sx={{ fontSize: '1.5em', fontWeight:"bold", textAlign:'center' }} color="black"> Get your tickets</DialogTitle>
      <DialogContent>
        {page === 1 &&
          <>
            <div className='step1'>
              <h5 style={h4Style}>🤔️ #Enter your invitation code</h5>
              <div style={{ display: 'flex', width: '80%', margin: '0 auto' }}>
                {images.map((image, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 0.2rem' }}>
                    <div style={{ ...divStyle, backgroundColor: proposition.category === image.alt ? '#94a7f2' : 'transparent' }}
                      onClick={() => handleCategoryChange(image.alt)}
                    >
                      <img src={image.src} alt={image.alt} style={{ width: '50%', height: 'auto' }} />
                    </div>
                    <p style={{ color: 'black', marginTop: '0', fontSize: '12px' }}>{image.alt} </p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: '80%', fontSize: '14px', marginRight: '5px', textAlign:'center' }}>
                  <p style={{ marginBottom: '15px' }}>Invitation Code</p>
                  <TextField fullWidth color='success' size='small' value={text} onChange={handleInputText} placeholder='Title'
                    inputProps={{ maxLength: 100, }} helperText={`${text.length} / 8 numbers`}
                  />
                </div>
           

          </>
        }

        {page === 2 &&
          <>
            <div className='step4' style={{ marginTop: '-10px' }}>
            

              <div className='image-title' style={{ display: 'flex', marginTop: '-10px' }}>
              

                <div style={{ width: '40%', fontSize: '14px', marginLeft: '10px' }}>
                  <p style={{ marginBottom: '0', textAlign:'center'}}>Upload your Image</p>
                  <IconButton component="label" sx={{ fontSize: '100px' }} disableRipple>
                    <div style={{ width: '200px', height: '200px', borderRadius: '20px', border: '1px solid lightgray', backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                      ) : (
                        <AddIcon />
                      )}
                    </div>
                    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
                  </IconButton>
                </div>

              </div>
            </div>

          
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <div>
                
              </div>
            </ClickAwayListener>

            <div>
            </div>
          </>
        }
      </DialogContent>



      <DialogActions>
        <Button size='small' onClick={close} style={{ color: '#5f9ff8', fontWeight: 'bold' }}>Cancel</Button>
        {page === 1 && <Button size='small' onClick={next} style={{ color: '#5f9ff8', fontWeight: 'bold' }}>Next</Button>}
        {page === 2 && <Button size='small' onClick={prev} style={{ color: '#5f9ff8', fontWeight: 'bold' }}>Previous</Button>}
        {page === 2 && <Button size='small' onClick={handleSubmit} style={{ color: '#5f9ff8', fontWeight: 'bold' }}>Submit</Button>}
      </DialogActions>
    </Dialog >
  );
};

export default CreatePropositionDialog;