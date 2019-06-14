// Temporal keyboard events
function keyboardEventFor(type, keyCode, modifiers, key) {
  const event = new CustomEvent(type, {
    detail: 0,
    bubbles: true,
    cancelable: true,
    // Allow event to go outside a ShadowRoot.
    composed: true,
  });

  event.keyCode = keyCode;
  event.code = keyCode;

  modifiers = modifiers || [];
  if (typeof modifiers === 'string') {
    modifiers = [modifiers];
  }
  event.shiftKey = modifiers.indexOf('shift') !== -1;
  event.altKey = modifiers.indexOf('alt') !== -1;
  event.ctrlKey = modifiers.indexOf('ctrl') !== -1;
  event.metaKey = modifiers.indexOf('meta') !== -1;

  event.key = key;

  return event;
}

function keyEventOn(target, type, keyCode, modifiers, key) {
  target.dispatchEvent(keyboardEventFor(type, keyCode, modifiers, key));
}

function keyDownOn(target, keyCode, modifiers, key) {
  keyEventOn(target, 'keydown', keyCode, modifiers, key);
}

function keyUpOn(target, keyCode, modifiers, key) {
  keyEventOn(target, 'keyup', keyCode, modifiers, key);
}

function pressAndReleaseKeyOn(target, keyCode, modifiers, key) {
  keyDownOn(target, keyCode, modifiers, key);
  setTimeout(() => {
    keyUpOn(target, keyCode, modifiers, key);
  }, 1);
}

export function pressSpace(target) {
  pressAndReleaseKeyOn(target, 32);
}

export function dispatchCustomEvent(target, typeOfEvent, payload = {}) {
  target.dispatchEvent(new CustomEvent(typeOfEvent, {
    bubbles: true,
    detail: payload,
  }));
}
