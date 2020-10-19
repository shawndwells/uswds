'use strict';
const receptor = require('receptor').once;
const { behavior } = require('../../../utils');
const { prefix: PREFIX } = require('../../../config');

const CLICK = 'click';
const LINK = `.${PREFIX}-skipnav[href^="#"], .${PREFIX}-footer__return-to-top [href^="#"]`;
const MAINCONTENT = 'main-content';

function setTabindex() {
  // NB: we know because of the selector we're delegating to below that the
  // href already begins with '#'
  const id = this.getAttribute('href');
  const target = document.getElementById(
    id === '#' ? MAINCONTENT : id.slice(1)
  );

  if (target) {
    target.style.outline = '0';
    target.setAttribute('tabindex', 0);
    target.focus();
    target.addEventListener(
      'blur',
      receptor.once(() => {
        target.setAttribute('tabindex', -1);
      })
    );
  }
  else {
    // throw an error?
  }
}

module.exports = behavior({
  [CLICK]: {
    [LINK]: setTabindex
  }
});
