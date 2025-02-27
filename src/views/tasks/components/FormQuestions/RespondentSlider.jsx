import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const marks = {
    20: '20',
    50: '50',
    100: '100',
    200: '200',
    500: '500',
    1000: '1000',
};

const RespondentSlider = ({ value, onChange }) => {
    return (
        <div className="w-full px-4">
            <Slider
                min={20}
                max={1000}
                step={null} // Important:  No intermediate steps
                marks={marks}
                value={value}
                onChange={onChange}
                className="my-4"
                railStyle={{ backgroundColor: '#e9e9e9', height: 8 }}
                trackStyle={{ backgroundColor: '#6366f1', height: 8 }}
                handleStyle={{
                    borderColor: '#6366f1',
                    height: 20,
                    width: 20,
                    marginTop: -6,
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
                }}
                dotStyle={{
                    borderColor: '#ddd',
                    height:10,
                    width:10,
                    marginLeft:-4,
                    marginBottom:-2,
                }}

                activeDotStyle={{
                    borderColor: '#6366f1',
                    border:'2px solid #6366f1',
                }}

            />
        </div>
    );
};

export default RespondentSlider;