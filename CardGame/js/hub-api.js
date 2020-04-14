/**
 * @author Hubble Africa <lizaam@hubbleafrica.com>
 * @license Copyright (c) 2018, Hubble Africa. All rights reserved.
 * @file An API that interacts with Cab-Api for statistics reporting
 * @version 1.0.0 
 */

 function hubapi () {
  /**!
   * @type {Object}
   * main object
   */
 }

/**
 * Post statistics as json data
 * @param {json} json
 */
hubapi.jsonStats = function (contentType, json) {
  if (typeof(json) !== "string") {
    /**!
     * @type {constant} END_POINT - cab-api constant
     * @type {variable} gImageID - cab-api variable
     */
    var url = END_POINT + 'stats?imageid=' + gImageID;
    var json = JSON.stringify(json);

    // data posting
    postData(this, url, contentType, json);
    console.log(json);
  }
}