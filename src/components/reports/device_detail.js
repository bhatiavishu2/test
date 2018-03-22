import React, { Component } from 'react';
export const DeviceDetail = function (props) {
  return (

    <div className="col-md-4 col-sm-6 col-xs-12 mobileWidget">
      <div className="widget smart-standard-widget">
        <div className="row">
          <div className={`widget-caption ${props.backgroundColorType}`}>
            <div className="col-xs-4 no-pad">
              <i className={`icon ti fa fa-${props.deviceIconType}`} />
            </div>
            <div className="col-xs-8 no-pad">
              <div className="widget-detail">
                <h3 className={`cl-${props.backgroundColorType}`}>{props.deviceCount}</h3>
                <span>{props.deviceType}</span>
              </div>
            </div>
            <div className="col-xs-12">
              <div className={`widget-line bg-${props.backgroundColorType}`}>
                <span style={{ width: '70%' }} className={`bg-${props.backgroundColorType} widget-horigental-line`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
