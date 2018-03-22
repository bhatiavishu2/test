import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
export const ReportItemsNav = React.createClass({
    render: function () {
        return (

            <div className="singlePages">
                <ul className="list-inline">
                    <li className="activeMain"><a href="index.html"><span /> Energy</a></li>
                    <li><a href="gas.html"><span /> Gas</a></li>
                    <li><a href="water.html"><span /> Water</a></li>
                </ul>
            </div>
        );
    }
});