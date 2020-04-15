/**
 * @author DTVI Group <info@dtvigroup.co.za>
 * @license Copyright (c) 2018, DTVI Group. All rights reserved.
 * @file Provides an API for communicating between a custom webpage and the CabMedia Android Application
 * @version 1.0.0 
 */

/**
 * constants
 */
const END_POINT = 'http://localhost:8090/' 
const URL_PARAM_DEBUG_MODE = 'debug';
const URL_PARAM_CAMPAIGN = 'imageid';
const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded';
const CONTENT_TYPE_JSON = 'application/json';
const CONTENT_TYPE_PLAIN_TEXT = 'text/plain';
const REPORT_USER_ACTIVITY = "report_user_activity";

/**
 * global variables
 */
var gDebugMode = false;
var gImageID = 0;
var gObj = null; 

/**
 * cabapi object
 */
function cabapi() { }

/**
 * initialize the cabapi object
 */
cabapi.init = function() {  
  gDebugMode = (getParameterByName(URL_PARAM_DEBUG_MODE) == "true")
  gImageID = getParameterByName(URL_PARAM_CAMPAIGN)
  gObj = this;
  
  this.log("Current Image ID : " + gImageID);    
  this.startListeningUserInput();
}

/**
 * start listening for user input (mouse and touch)
 */
cabapi.startListeningUserInput = function(){
  window.onclick = function(context){
    var url = END_POINT + 'useractivity?imageid=' + gImageID;
    postData(gObj, url, CONTENT_TYPE_PLAIN_TEXT, REPORT_USER_ACTIVITY);
  }
};

/**
 * Uploads form data for a particular interactive web page
 * @param {string} contentType - refer to constants. Represents the data content type
 * @param {string} data - form data 
 */
cabapi.uploadFormData = function(contentType, data) {
  var url = END_POINT + 'form?imageid=' + gImageID;
  postData(this, url, contentType, data);
}

/**
 * This function allows the caller to upload stats based on their requirements 
 * @param {string} contentType - refer to constants. Represents the data content type
 * @param {string} data 
 */
cabapi.uploadStats = function(contentType, data) {
  var url = END_POINT + 'stats?imageid=' + gImageID;
  postData(this, url, contentType, data);
}

/**
 * This function stops the wait timer
 */
cabapi.waitStop = function() {
  var url = END_POINT + 'waitstop/';
  postData(this, url, CONTENT_TYPE_FORM, null);
}

/**
 * This function starts the wait timer 
 * @param {Number} seconds - number of seconds to wait
 */
cabapi.waitStart = function(seconds) {
  var url = END_POINT + 'waitstart?time=' + seconds;
  postData(this, url, CONTENT_TYPE_FORM, null);
}

/**
 * Internal wrapper used for logging
 * @param {string} str 
 */
cabapi.log = function(str) {
  if (gDebugMode) {
    var dateTimeStamp = (new Date).toLocaleString();
    console.log('DEBUG : ' + dateTimeStamp + " - " +  str);
  }    
}

/**
 * Returns the URL paramter
 * @param {string} name - name of the URL parameter
 */
function getParameterByName(name) {
  try {    
    name = name.replace(/[\[\]]/g, '\\$&');
    
    var url = window.location.href;        
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), 
        results = regex.exec(url);

    if (!results) {
      return null;
    }

    if (!results[2]){
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  } catch (err) {
    return null;
  }
}

/**
 * Generic function to post data
 * @param {object} caller - pointer to the caller 
 * @param {string} url - url to post the data to
 * @param {string} contentType - refer to constants 
 * @param {*} data - data to post
 */
function postData(caller, url, contentType, data) {
  xhr = new XMLHttpRequest();

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', contentType);
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      caller.log('Successful ' + url + ' ' + contentType);
    } else if (xhr.status !== 200) {
      caller.log('Request failed. Returned status of ' + xhr.status + ' ' + url + ' ' + contentType);
    }
  };

  xhr.send(data);
}