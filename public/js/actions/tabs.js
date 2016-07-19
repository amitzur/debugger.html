/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 /* global window */

const constants = require("../constants");

function newTabs(tabs) {
  return {
    type: constants.ADD_TABS,
    value: tabs
  };
}

function selectTab({ id }) {
  return {
    type: constants.SELECT_TAB,
    id: id,
  };
}

module.exports = {
  newTabs,
  selectTab
};
