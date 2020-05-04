import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  root: {
    height: 200,
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function VerticalSlider({ update, state, updateHasInteraction, updateShowSlider, hasInteraction }) {
  const classes = useStyles();
  const [value, setValue] = useState(state);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTouchEnd = (event) => {
    update(value)
    updateShowSlider(false);
    updateHasInteraction(false);
  }

  const handleInteractionStart = (event) => {
    updateHasInteraction(true);
  }

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };


  return (
    <Fragment>
      <Typography id="vertical-slider" gutterBottom>
        <span className='brightness-label'>Brightness</span>
      </Typography>
      <div className={classes.root}>
        <Slider
          onChange={handleSliderChange}
          onTouchEnd={handleTouchEnd}
          onMouseUp={handleTouchEnd}
          onTouchStart={handleInteractionStart}
          onMouseDown={handleInteractionStart}
          orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={50}
          aria-labelledby="vertical-slider"
        />
      </div>
      <Grid item>
        <Input
          className={classes.input}
          value={value}
          margin="dense"
          onChange={handleInputChange}
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Grid>
    </Fragment>
  );
}
